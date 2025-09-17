// hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react'
import { User } from 'firebase/auth'
import { GoogleAuthService } from '../services/googleAuthService'

interface UseAuthReturn {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signOut: () => Promise<void>
  refreshUser: () => void
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(() => {
    const currentUser = GoogleAuthService.getCurrentUser()
    setUser(currentUser)
  }, [])

  const signOut = useCallback(async () => {
    try {
      await GoogleAuthService.signOut()
      setUser(null)
      
      // Track sign out
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'logout', {
          method: 'Google'
        })
      }
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }, [])

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = GoogleAuthService.onAuthStateChanged((user) => {
      setUser(user)
      setIsLoading(false)
    })

    // Initial user check
    refreshUser()
    setIsLoading(false)

    return () => unsubscribe()
  }, [refreshUser])

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signOut,
    refreshUser
  }
}