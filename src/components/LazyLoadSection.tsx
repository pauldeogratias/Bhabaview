
// src/components/LazyLoadSection.tsx - Intersection Observer for lazy loading
import React, { useState } from 'react'


export const LazyLoadSection: React.FC<{
  children: React.ReactNode
  className?: string
  threshold?: number
}> = ({ children, className = '', threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(ref)
        }
      },
      { threshold }
    )

    observer.observe(ref)

    return () => observer.disconnect()
  }, [ref, threshold])

  return (
    <div ref={setRef} className={className}>
      {isVisible ? children : <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}
    </div>
  )
}

