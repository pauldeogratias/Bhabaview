// src/pages/_app.tsx - Complete optimized version with performance and UX improvements
import Script from 'next/script'
import Head from 'next/head'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter } from 'next/router'
import { Loader2, AlertCircle, Wifi, WifiOff } from 'lucide-react'
import dynamic from 'next/dynamic'
import { fetchAllProducts, fetchVendors, fetchAllCategories, PaginatedResponse } from '@/utils/api'
import type { Product, Vendor, Category } from '@/utils/api'
import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor'
import { useAuth } from '../hooks/useAuth'

// Dynamic imports for better performance - only load when needed
const AppDownloadBanner = dynamic(() => import('../components/AppDownloadBanner'), {
  ssr: false,
  loading: () => null
})

const ErrorBoundary = dynamic(() => import('../components/ErrorBoundary'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

interface ExtendedPageProps {
  products: PaginatedResponse<Product>
  vendors: Vendor[]
  categories: Category[]
}

// Performance monitoring component
const PerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming
            const metrics = {
              dns: navEntry.domainLookupEnd - navEntry.domainLookupStart,
              tcp: navEntry.connectEnd - navEntry.connectStart,
              request: navEntry.responseStart - navEntry.requestStart,
              response: navEntry.responseEnd - navEntry.responseStart,
              domLoading: navEntry.domContentLoadedEventEnd - navEntry.responseEnd,
              total: navEntry.loadEventEnd - navEntry.fetchStart // Use fetchStart instead of navigationStart
            }
            
            // Only log in development
            if (process.env.NODE_ENV === 'development') {
              console.log('Page Load Performance:', metrics)
            }
            
            // Report to analytics if total load time is slow
            if (metrics.total > 3000 && typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'slow_page_load', {
                event_category: 'performance',
                value: Math.round(metrics.total),
                custom_map: {
                  dns_time: Math.round(metrics.dns),
                  tcp_time: Math.round(metrics.tcp),
                  request_time: Math.round(metrics.request),
                  response_time: Math.round(metrics.response),
                  dom_loading_time: Math.round(metrics.domLoading)
                }
              })
            }
          }
        }
      })
      
      try {
        observer.observe({ entryTypes: ['navigation'] })
      } catch (error) {
        console.warn('Performance observer not supported:', error)
      }
      
      return () => observer.disconnect()
    }
  }, [])

  // Alternative: Use the newer Web Vitals API for better performance monitoring
  useEffect(() => {
    // Simple performance measurement using Performance API
    if (typeof window !== 'undefined' && window.performance) {
      const measurePageLoad = () => {
        const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        if (perfData) {
          const loadTime = perfData.loadEventEnd - perfData.fetchStart
          
          if (loadTime > 0 && process.env.NODE_ENV === 'development') {
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`)
          }

          // Report slow page loads to analytics
          if (loadTime > 3000 && typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'page_load_time', {
              event_category: 'performance',
              value: Math.round(loadTime)
            })
          }
        }
      }

      // Measure after page is fully loaded
      if (document.readyState === 'complete') {
        measurePageLoad()
      } else {
        window.addEventListener('load', measurePageLoad)
        return () => window.removeEventListener('load', measurePageLoad)
      }
    }
  }, [])
  
  return null
}

// Network status indicator component
const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowStatus(true)
      setTimeout(() => setShowStatus(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowStatus(true)
    }

    // Set initial state
    setIsOnline(navigator.onLine)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!showStatus) return null

  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-full text-white text-sm font-medium transition-all duration-300 ${
      isOnline 
        ? 'bg-green-500 animate-in slide-in-from-top' 
        : 'bg-red-500'
    }`}>
      <div className="flex items-center space-x-2">
        {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
        <span>{isOnline ? 'Back online' : 'No internet connection'}</span>
      </div>
    </div>
  )
}

// Enhanced loading screen component
const LoadingScreen = ({ message = "Loading your experience..." }: { message?: string }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center relative overflow-hidden">
    {/* Background Animation */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-400 rounded-full animate-pulse" />
      <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
    
    <div className="text-center space-y-6 animate-fade-in relative z-10">
      <div className="relative inline-flex items-center justify-center">
        {/* Outer spinning ring */}
        <div className="absolute w-24 h-24 rounded-full border-4 border-blue-200 animate-spin" style={{ animationDuration: '3s' }}></div>
        {/* Inner loader */}
        <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
        {/* Center dot */}
        <div className="absolute w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
      </div>
      
      <div className="space-y-2 max-w-sm">
        <h2 className="text-2xl font-bold text-gray-800">{message}</h2>
        <p className="text-blue-600">Curating the best products for you</p>
      </div>
      
     {/* Progress indicator */}
<div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-progress" />
</div>
      
      {/* Floating elements */}
      <div className="flex justify-center space-x-2">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  </div>
)

// Enhanced error screen component
const ErrorScreen = ({ onRetry }: { error: string; onRetry: () => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Connection Issue
        </h3>
        <p className="text-gray-600 mb-6">
          We&apos;re having trouble loading the page. Please check your connection and try again.
        </p>
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-150"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  </div>
)

// Cache for visited product pages
const visitedProducts = new Set<string>()

function MyApp({ Component, pageProps }: AppProps<ExtendedPageProps>) {
  
  const router = useRouter()
  const [products, setProducts] = useState<PaginatedResponse<Product>>({ data: [], total: 0 })
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [routeChanging, setRouteChanging] = useState(false)
  const isBackNavigation = useRef(false)
  const [retryCount, setRetryCount] = useState(0)

  


  usePerformanceMonitor()

  // Preload critical resources
  useEffect(() => {
    // Preload key images for better perceived performance
    const preloadImages = [
      '/Bhaba_logo.png',
      '/category-images/electronics.jpeg',
      '/category-images/clothing.webp',
      '/category-images/shoes.webp'
    ]
    
    preloadImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })

    // Preload critical CSS if available
    const criticalCSS = document.createElement('link')
    criticalCSS.rel = 'preload'
    criticalCSS.as = 'style'
    criticalCSS.href = '/critical.css'
    document.head.appendChild(criticalCSS)
  }, [])

  // Track navigation history and cache
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url.includes('/product/')) {
        visitedProducts.add(url)
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  // Handle back/forward navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handlePopState = () => {
        isBackNavigation.current = true
      }
      window.addEventListener('popstate', handlePopState)
      return () => window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // Route change handlers with performance optimizations
  useEffect(() => {
    const handleStart = (url: string) => {
      // Skip loading for back navigation to cached product pages
      const isCachedProduct = url.includes('/product/') && visitedProducts.has(url)
      if (isBackNavigation.current && isCachedProduct) {
        isBackNavigation.current = false
        return
      }

      // Show loading for product pages only if not cached
      if (url.includes('/product/')) {
        setRouteChanging(true)
      }
    }

    const handleComplete = () => {
      setRouteChanging(false)
      isBackNavigation.current = false
    }

    const handleError = () => {
      setRouteChanging(false)
      setError('Navigation failed. Please try again.')
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleError)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleError)
    }
  }, [router])

  // Initial data fetch with retry logic and timeout
  const fetchInitialData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Set a timeout for the fetch operation
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      )
      
      const dataPromise = Promise.all([
        fetchAllProducts(),
        fetchVendors(),
        fetchAllCategories()
      ])
      
      const [productsData, vendorsData, categoriesData] = await Promise.race([
        dataPromise,
        timeoutPromise
      ]) as [PaginatedResponse<Product>, Vendor[], Category[]]

      setProducts(productsData || { data: [], total: 0 })
      setVendors(vendorsData || [])
      setCategories(categoriesData || [])
      setRetryCount(0)
    } catch (err: unknown) {
      console.error('Data fetch error:', err)
      
      // Implement exponential backoff for retries
      if (retryCount < 3) {
        const backoffDelay = 1000 * Math.pow(2, retryCount)
        setRetryCount(prev => prev + 1)
        setTimeout(fetchInitialData, backoffDelay)
      } else {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load data'
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInitialData()
  }, []) // Empty dependency array is intentional

  // Analytics tracking
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'G-5EXTZ4D9MW', {
          page_path: url,
        })
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  // Error tracking
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
          description: event.message,
          fatal: false,
          custom_map: {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
          }
        })
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
          description: String(event.reason),
          fatal: false,
          custom_map: {
            type: 'unhandled_promise_rejection'
          }
        })
      }
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

 // Initialize auth state
  const { isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen message="Setting up authentication..." />
  }

  const handleRetry = () => {
    setRetryCount(0)
    fetchInitialData()
  }

  if (loading) {
    return <LoadingScreen message="Setting up your marketplace experience..." />
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={handleRetry} />
  }

  const extendedPageProps: ExtendedPageProps = {
    ...pageProps,
    products,
    vendors,
    categories
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="description" content="Bhaba Marketplace - Shop online in Tanzania for electronics, clothing, shoes and more at wholesale prices from verified vendors" />
        <meta name="keywords" content="Tanzania shopping, online marketplace, electronics, clothing, wholesale prices, verified vendors, Dar es Salaam" />
        
        {/* PWA Configuration */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        
        {/* Performance optimizations */}
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
        <link rel="dns-prefetch" href="https://bhababackend.onrender.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* SEO improvements */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Bhaba Marketplace" />
        <meta property="og:locale" content="en_TZ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Geographic targeting */}
        <meta name="geo.region" content="TZ" />
        <meta name="geo.country" content="Tanzania" />
        <meta name="geo.placename" content="Dar es Salaam" />
        
        <link rel="icon" href="/Bhaba_logo.png" />
        <link rel="canonical" href={`https://yourstore.com${router.asPath}`} />
      </Head>

      {/* Analytics Scripts */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-5EXTZ4D9MW"
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5EXTZ4D9MW', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `
        }}
      />














      

      {/* Facebook Meta Pixel - only run in production */}
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1750437865634260');
                fbq('track', 'PageView');
              `
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=1750437865634260&ev=PageView&noscript=1"
              alt=""
            />
          </noscript>
        </>
      )}










      
      
      {/* Performance monitoring */}
      {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 pb-16 relative overflow-x-hidden">
        {/* Network status indicator */}
        <NetworkStatus />
        
        {/* Route changing overlay */}
        {routeChanging && (
          <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
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
              <p className="text-gray-600 font-medium">Loading product details...</p>
            </div>
          </div>
        )}
        
        {/* Main content with error boundary */}
        <Suspense fallback={<LoadingScreen />}>
          <ErrorBoundary
            onError={(error, errorInfo) => {
              console.error('App Error Boundary:', error, errorInfo)
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'exception', {
                  description: error.message,
                  fatal: true,
                  custom_map: {
                    component_stack: errorInfo.componentStack
                  }
                })
              }
            }}
          >
            <Component {...extendedPageProps} />
          </ErrorBoundary>
        </Suspense>
        
        {/* App download banner */}
        <AppDownloadBanner />
      </div>
    </>
  )
}


export default MyApp
