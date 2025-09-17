// services/googleAuthService.ts
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User, AuthError } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc, updateDoc, serverTimestamp, FieldValue } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// ✅ Prevent duplicate initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)

interface CustomerData {
  userName: string
  email: string
  photoURL: string
  isEmailVerified: boolean
  isVendor: boolean
  phoneNumber?: string
  uid: string
  provider: string
  createdAt: FieldValue
  lastLoginAt: FieldValue
  googleInfo: {
    displayName: string | null
    email: string | null
    photoURL: string | null
    providerId: string
  }
}

export class GoogleAuthService {
  private static provider = new GoogleAuthProvider()

  static {
    // Configure Google Auth Provider
    this.provider.addScope('email')
    this.provider.addScope('profile')
    this.provider.setCustomParameters({
      prompt: 'select_account'
    })
  }

  /**
   * Sign in with Google
   */
  static async signIn(): Promise<{ user: User; isNewUser: boolean } | null> {
    try {
      // Sign out first to ensure fresh authentication
      await signOut(auth)
      
      // Start Google Sign-In flow
      const result = await signInWithPopup(auth, this.provider)
      const user = result.user

      if (!user) {
        throw new Error('Authentication failed - no user data received')
      }

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      const isNewUser = !userDoc.exists()

      if (!isNewUser) {
        // Update last login time for existing users
        await updateDoc(doc(db, 'users', user.uid), {
          lastLoginAt: serverTimestamp()
        })
      }

      return { user, isNewUser }
    } catch (error: unknown) {
      console.error('Google Sign-In Error:', error)
      
      // Handle specific error cases
      const authError = error as AuthError
      if (authError.code === 'auth/popup-closed-by-user') {
        return null // User cancelled, don't show error
      }
      
      throw new Error(this.getErrorMessage(authError))
    }
  }

  /**
   * Complete customer registration with phone number
   */
  static async completeCustomerRegistration(
    user: User, 
    phoneNumber: string
  ): Promise<void> {
    try {
      const customerData: CustomerData = {
        userName: user.displayName || 'Guest User',
        email: user.email || '',
        photoURL: user.photoURL || '',
        isEmailVerified: user.emailVerified,
        isVendor: false, // Always false for customers
        phoneNumber: phoneNumber,
        uid: user.uid,
        provider: 'google',
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        googleInfo: {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          providerId: 'google.com'
        }
      }

      // Save to Firestore users collection
      await setDoc(doc(db, 'users', user.uid), customerData)

      // Also create vendor_store entry with mobile number (for compatibility)
      await setDoc(doc(db, 'vendor_store', user.uid), {
        mobile_number: phoneNumber
      })

    } catch (error: unknown) {
      console.error('Registration Error:', error)
      throw new Error('Failed to complete registration. Please try again.')
    }
  }

  /**
   * Sign out user
   */
  static async signOut(): Promise<void> {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Sign out error:', error)
      throw new Error('Failed to sign out. Please try again.')
    }
  }

  /**
   * Get current user
   */
  static getCurrentUser(): User | null {
    return auth.currentUser
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!auth.currentUser
  }

  /**
   * Get auth state changes
   */
  static onAuthStateChanged(callback: (user: User | null) => void) {
    return auth.onAuthStateChanged(callback)
  }

  /**
   * Validate phone number format
   */
  static validatePhoneNumber(phoneNumber: string): boolean {
    // Basic validation for Tanzanian phone numbers
    const phoneRegex = /^(0[67]\d{8}|255[67]\d{8}|\+255[67]\d{8})$/
    return phoneRegex.test(phoneNumber.replace(/\s+/g, ''))
  }

  /**
   * Format phone number to standard format
   */
  static formatPhoneNumber(phoneNumber: string, countryCode: string = '+255'): string {
    const cleaned = phoneNumber.replace(/\D/g, '')
    
    if (cleaned.startsWith('255')) {
      return '+' + cleaned
    } else if (cleaned.startsWith('0')) {
      return countryCode + cleaned.substring(1)
    } else {
      return countryCode + cleaned
    }
  }

  /**
   * Get user-friendly error message
   */
  private static getErrorMessage(error: AuthError | Error): string {
    const authError = error as AuthError
    switch (authError.code) {
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with a different sign-in method. Please use a different method.'
      case 'auth/invalid-credential':
        return 'The credential is invalid or expired. Please try again.'
      case 'auth/operation-not-allowed':
        return 'Google Sign-In is not enabled. Please contact support.'
      case 'auth/user-disabled':
        return 'This user account has been disabled.'
      case 'auth/credential-already-in-use':
        return 'This credential is already associated with a different account.'
      case 'auth/popup-blocked':
        return 'Sign-in popup was blocked. Please allow popups and try again.'
      case 'auth/cancelled-popup-request':
        return 'Sign-in was cancelled. Please try again.'
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection and try again.'
      default:
        return error.message || 'An unexpected error occurred during sign-in.'
    }
  }
}