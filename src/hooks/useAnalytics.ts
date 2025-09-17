// 5. Performance Analytics Hook
// src/hooks/useAnalytics.ts
import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

export const useAnalytics = () => {
  const router = useRouter()

  const trackEvent = useCallback((eventName: string, parameters?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'engagement',
        ...parameters
      })
    }
  }, [])

  const trackPageView = useCallback((url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-5EXTZ4D9MW', {
        page_path: url,
      })
    }
  }, [])

  const trackTiming = useCallback((name: string, value: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'timing_complete', {
        name,
        value: Math.round(value),
        event_category: 'performance'
      })
    }
  }, [])

  const trackError = useCallback((error: Error, context?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        custom_map: {
          context: context || 'unknown'
        }
      })
    }
  }, [])

  // Track page views automatically
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackPageView(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router, trackPageView])

  return {
    trackEvent,
    trackPageView,
    trackTiming,
    trackError
  }
}