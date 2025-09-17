// components/UserProfile.tsx
import React from 'react'
import { User, Mail, Calendar, Shield } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import AuthButton from './AuthButton'
import AuthGuard from './AuthGuard'

const UserProfile: React.FC = () => {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-6">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'User'}
            className="w-16 h-16 rounded-full border-4 border-blue-100"
          />
        ) : (
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {user.displayName || 'User'}
          </h2>
          <p className="text-gray-600">Customer Account</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Mail className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-900">Email</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Shield className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-900">Email Verified</p>
            <p className="text-sm text-gray-600">
              {user.emailVerified ? 'Verified' : 'Not verified'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Calendar className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-900">Member Since</p>
            <p className="text-sm text-gray-600">
              {user.metadata.creationTime ? 
                new Date(user.metadata.creationTime).toLocaleDateString() : 
                'Recently'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { AuthButton, AuthGuard, UserProfile }