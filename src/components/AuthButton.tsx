// components/AuthButton.tsx
import React, { useState } from 'react'
import { User, LogOut, ShoppingBag } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import GoogleSignInModal from './GoogleSignInModal'

interface AuthButtonProps {
  className?: string
  showText?: boolean
  onSuccess?: () => void
}

const AuthButton: React.FC<AuthButtonProps> = ({ 
  className = '', 
  showText = true,
  onSuccess 
}) => {
  const { user, isAuthenticated, signOut, isLoading } = useAuth()
  const [showSignInModal, setShowSignInModal] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out failed:', error)
    } finally {
      setIsSigningOut(false)
    }
  }

  const handleSignInSuccess = () => {
    setShowSignInModal(false)
    onSuccess?.()
  }

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    )
  }

  if (isAuthenticated && user) {
    return (
      <div className="relative group">
        <button className={`flex items-center space-x-2 ${className}`}>
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'User'}
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
            />
          ) : (
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          )}
          {showText && (
            <span className="text-sm font-medium truncate max-w-32">
              {user.displayName || 'User'}
            </span>
          )}
        </button>

        {/* Dropdown Menu */}
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="p-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.displayName || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          
          <div className="p-1">
            <button
              onClick={() => {/* Handle account navigation */}}
              className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>My Orders</span>
            </button>
            
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
              <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => setShowSignInModal(true)}
        className={`flex items-center space-x-2 ${className}`}
      >
        <User className="h-5 w-5" />
        {showText && <span>Sign In</span>}
      </button>

      <GoogleSignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        onSuccess={handleSignInSuccess}
        onError={(error) => {
          console.error('Sign in error:', error)
          // You can add toast notification here
        }}
      />
    </>
  )
}

export default AuthButton