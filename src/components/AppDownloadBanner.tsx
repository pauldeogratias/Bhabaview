// src/components/AppDownloadBanner.tsx
import React, { useState, useEffect } from 'react'
import { X, Download, Smartphone, Star } from 'lucide-react'
// import Image from 'next/image'

interface AppDownloadBannerProps {
  position?: 'top' | 'bottom' | 'floating'
  className?: string
}

const AppDownloadBanner: React.FC<AppDownloadBannerProps> = ({ 
  position = 'floating',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if user has dismissed the banner
    const dismissed = localStorage.getItem('bhaba-app-banner-dismissed')
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Show banner after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('bhaba-app-banner-dismissed', 'true')
  }

  const handleDownload = () => {
    // Replace with actual Play Store URL
    window.open('https://play.google.com/store/apps/details?id=com.vendor.bhaba', '_blank')
  }

  if (isDismissed || !isVisible) return null

  const bannerClasses = {
    top: 'fixed top-16 left-0 right-0 z-30',
    bottom: 'fixed bottom-16 left-0 right-0 z-30',
    floating: 'fixed bottom-20 left-4 right-4 z-30 md:left-auto md:right-4 md:w-80'
  }

  return (
    <div className={`${bannerClasses[position]} ${className}`}>
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg shadow-2xl mx-auto max-w-sm md:max-w-md animate-in slide-in-from-bottom duration-300">
        {/* Top floating banner design */}
        {position === 'floating' && (
          <div className="relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-repeat opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3C/g%3E%3C/svg%3E")`
              }} />
            </div>
            
            <div className="relative p-4">
              <button
                onClick={handleDismiss}
                className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">!</span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm truncate">
                    Download Bhaba App
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2">
                    Get the best shopping experience on mobile
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-white/80 ml-1">4.8 (2.1k)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full mt-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium text-sm"
              >
                <Download className="h-4 w-4" />
                <span>Download Free</span>
              </button>
            </div>
          </div>
        )}

        {/* Full width banner design */}
        {(position === 'top' || position === 'bottom') && (
          <div className="relative overflow-hidden">
            <div className="flex items-center justify-between p-3 md:p-4">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="hidden sm:block">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-5 w-5" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm md:text-base">
                    Get the Bhaba App
                  </h3>
                  <p className="text-xs text-white/80 truncate">
                    Better shopping experience on your phone
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDownload}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium transition-colors flex items-center space-x-1"
                >
                  <Download className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>
                
                <button
                  onClick={handleDismiss}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AppDownloadBanner