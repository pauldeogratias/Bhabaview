// components/LoadingOverlay.tsx
import React from 'react'

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full animate-bounce"
            style={{
              backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'][i],
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default LoadingOverlay