import { useEffect, useCallback } from 'react'

export const usePerformanceMonitor = () => {
  const measurePageLoad = useCallback(() => {
    if (typeof window === 'undefined' || !window.performance) {
      return null
    }

    try {
      const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (perfData) {
        const metrics = {
          dns: perfData.domainLookupEnd - perfData.domainLookupStart,
          tcp: perfData.connectEnd - perfData.connectStart,
          request: perfData.responseStart - perfData.requestStart,
          response: perfData.responseEnd - perfData.responseStart,
          domLoading: perfData.domContentLoadedEventEnd - perfData.responseEnd,
          total: perfData.loadEventEnd - perfData.fetchStart
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('Page Load Performance:', metrics)
        }

        return metrics
      }
    } catch (error) {
      console.warn('Performance measurement failed:', error)
    }

    return null
  }, [])

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(measurePageLoad, 100)
    }

    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        handleLoad()
      } else {
        window.addEventListener('load', handleLoad)
        return () => window.removeEventListener('load', handleLoad)
      }
    }
  }, [measurePageLoad])

  return { measurePageLoad }
}