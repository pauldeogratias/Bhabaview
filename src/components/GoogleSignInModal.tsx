// components/GoogleSignInModal.tsx
import React, { useState, useCallback } from 'react'
import { X, Download, Smartphone, Star, AlertCircle, Phone } from 'lucide-react'
import { User } from 'firebase/auth'
import { GoogleAuthService } from '../services/googleAuthService'

interface GoogleSignInModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  onError?: (error: string) => void
}

const GoogleSignInModal: React.FC<GoogleSignInModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPhoneInput, setShowPhoneInput] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedCountryCode, setSelectedCountryCode] = useState('+255')
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  const countryCodes = [
    { code: '+255', country: '🇹🇿 Tanzania', flag: '🇹🇿' },
    { code: '+254', country: '🇰🇪 Kenya', flag: '🇰🇪' },
    { code: '+256', country: '🇺🇬 Uganda', flag: '🇺🇬' },
    { code: '+250', country: '🇷🇼 Rwanda', flag: '🇷🇼' },
    { code: '+1', country: '🇺🇸 US', flag: '🇺🇸' },
    { code: '+44', country: '🇬🇧 UK', flag: '🇬🇧' }
  ]

  const resetModal = useCallback(() => {
    setIsLoading(false)
    setShowPhoneInput(false)
    setPhoneNumber('')
    setSelectedCountryCode('+255')
    setCurrentUser(null)
    setError(null)
  }, [])

  const handleClose = useCallback(() => {
    if (!isLoading) {
      resetModal()
      onClose()
    }
  }, [isLoading, resetModal, onClose])

  const validatePhoneNumber = useCallback((phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '')
    // Validate Tanzanian phone numbers (9-10 digits, starting with 6 or 7)
    return /^[67]\d{8,9}$/.test(cleaned)
  }, [])

  const handleGoogleSignIn = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await GoogleAuthService.signIn()
      
      if (!result) {
        // User cancelled sign-in
        setIsLoading(false)
        return
      }

      const { user, isNewUser } = result

      if (isNewUser) {
        // New user - show phone input
        setCurrentUser(user)
        setShowPhoneInput(true)
        setIsLoading(false)
      } else {
        // Existing user - complete sign in
        await completeSignIn()
      }
    } catch (error: unknown) {
      setIsLoading(false)
      const errorMessage = error instanceof Error ? error.message : 'Google Sign-In failed. Please try again.'
      setError(errorMessage)
      onError?.(errorMessage)
    }
  }, [onError])

  const handleCompleteRegistration = useCallback(async () => {
    if (!currentUser) return

    const trimmedPhone = phoneNumber.trim()
    
    if (!trimmedPhone) {
      setError('Please enter your phone number')
      return
    }

    if (!validatePhoneNumber(trimmedPhone)) {
      setError('Please enter a valid phone number (9-10 digits, starting with 6 or 7)')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const formattedPhone = GoogleAuthService.formatPhoneNumber(trimmedPhone, selectedCountryCode)
      await GoogleAuthService.completeCustomerRegistration(currentUser, formattedPhone)
      await completeSignIn()
    } catch (error: unknown) {
      setIsLoading(false)
      const errorMessage = error instanceof Error ? error.message : 'Failed to complete registration. Please try again.'
      setError(errorMessage)
      onError?.(errorMessage)
    }
  }, [currentUser, phoneNumber, selectedCountryCode, validatePhoneNumber, onError])

  const completeSignIn = useCallback(async () => {
    // Close modal and call success callback
    resetModal()
    onClose()
    onSuccess?.()
    
    // Track successful sign-in
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'login', {
        method: 'Google'
      })
    }
  }, [resetModal, onClose, onSuccess])

  const handlePhoneNumberChange = useCallback((value: string) => {
    // Only allow digits
    const cleaned = value.replace(/\D/g, '')
    setPhoneNumber(cleaned)
    
    // Clear error when user starts typing
    if (error) {
      setError(null)
    }
  }, [error])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {showPhoneInput ? 'Complete Your Profile' : 'Welcome to Bhaba'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {showPhoneInput 
                ? 'Please provide your phone number to complete registration'
                : 'Sign in with your Google account to continue'
              }
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showPhoneInput ? (
            /* Google Sign-In Section */
            <div className="space-y-4">
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                <span className="font-medium">
                  {isLoading ? 'Signing in...' : 'Continue with Google'}
                </span>
              </button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>

              {/* Features highlight */}
              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Star className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs font-medium text-blue-900">Quality Products</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <Download className="h-6 w-6 text-green-600 mx-auto mb-1" />
                  <p className="text-xs font-medium text-green-900">Fast Delivery</p>
                </div>
              </div>
            </div>
          ) : (
            /* Phone Number Input Section */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-3">
                  {/* Country Code Selector */}
                  <select
                    value={selectedCountryCode}
                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                    disabled={isLoading}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>

                  {/* Phone Number Input */}
                  <div className="flex-1 relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => handlePhoneNumberChange(e.target.value)}
                      placeholder="712345678"
                      disabled={isLoading}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      maxLength={10}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter your phone number (9-10 digits, starting with 6 or 7)
                </p>
              </div>

              {/* Error Display */}
              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Complete Registration Button */}
              <button
                onClick={handleCompleteRegistration}
                disabled={isLoading || !phoneNumber.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  'Complete Registration'
                )}
              </button>

              {/* Back Button */}
              <button
                onClick={() => {
                  setShowPhoneInput(false)
                  setCurrentUser(null)
                  setPhoneNumber('')
                  setError(null)
                }}
                disabled={isLoading}
                className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors disabled:opacity-50"
              >
                Back to Sign In
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <p className="text-xs text-center text-gray-500">
            Need help? Contact us at{' '}
            <a href="tel:+255618205278" className="text-blue-600 hover:underline">
              +255 618 205 278
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default GoogleSignInModal