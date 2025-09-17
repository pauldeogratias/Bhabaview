import React from 'react'
import Head from 'next/head'
import UpdatedHeaderBar from '../components/UpdatedHeaderBar'
import Link from 'next/link'
import { User, Shield, FileText, LogOut } from 'lucide-react'

const Account: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Account | Bhaba Marketplace</title>
        <meta name="description" content="Your Bhaba Marketplace account" />
      </Head>

      <UpdatedHeaderBar 
        showBackButton={true}
        showSearch={false}
        showViewToggle={false}
        showSort={false}
        showFilter={false}
        onBack={() => window.history.back()}
      />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Welcome!</h1>
                <p className="text-blue-100">Manage your account settings</p>
              </div>
            </div>
          </div>

          {/* Account Options */}
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
            
            {/* <Link 
              href="/privacy-policy"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-gray-900">Privacy Policy</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>

            <Link 
              href="/terms-of-service"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-green-600" />
                <span className="text-gray-900">Terms of Service</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link> */}

            {/* External Links */}
            {/* <a 
              href="https://bhabalimited.com/public/privacy_policy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-purple-600" />
                <span className="text-gray-900">Full Privacy Policy</span>
              </div>
              <span className="text-xs text-gray-400">External</span>
            </a>

            <a 
              href="https://bhabalimited.com/public/terms_of_service"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-orange-600" />
                <span className="text-gray-900">Full Terms of Service</span>
              </div>
              <span className="text-xs text-gray-400">External</span>
            </a> */}

<Link 
  href="/privacy-policy-full"
  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
>
  <div className="flex items-center space-x-3">
    <Shield className="h-5 w-5 text-purple-600" />
    <span className="text-gray-900">Privacy Policy</span>
  </div>
  <span className="text-gray-400">→</span>
</Link>

<Link 
  href="/terms-of-service-full"
  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
>
  <div className="flex items-center space-x-3">
    <FileText className="h-5 w-5 text-orange-600" />
    <span className="text-gray-900">Terms of Service</span>
  </div>
  <span className="text-gray-400">→</span>
</Link>

            {/* Logout Button */}
            <button className="w-full flex items-center justify-center space-x-2 p-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-8">
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Support Information */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Email: info@bhabalimited.com</p>
            <p>Phone: +255 741 162 288</p>
            <p>Available 24/7 for your inquiries</p>
          </div>
        </div>
      </main>
    </div>
  )

}



  


export default Account
