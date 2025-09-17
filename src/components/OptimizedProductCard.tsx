// src/components/OptimizedProductCard.tsx - Improved ProductCard with layout stability
import React, { memo, useState, useCallback } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { formatCurrency } from '@/utils/formatCurrency'
import { useRouter } from 'next/router'
import { slugify } from '@/utils/api'

interface Product {
  id: string
  productId: string
  product_name: string
  price: number
  description: string
  discount: number
  details: string
  tier_pricing: string[]
  product_images: string[]
  mobile_number: string
  isAvailable: boolean
  moq: number
  added_at: string
  vendorId: string
  vendorName: string
  categoryId: string
  categoryName: string
}

interface ProductCardProps {
  product: Product
  onClick?: (product: Product) => void
  viewMode?: 'grid' | 'list'
  priority?: boolean
  sizes?: string
}

const OptimizedProductCard = memo<ProductCardProps>(({ 
  product, 
  onClick, 
  viewMode = 'grid',
  priority = false,
  sizes = "(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
}) => {
  const router = useRouter()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price

  const handleContactVendor = useCallback((e: React.MouseEvent, type: 'whatsapp' | 'call') => {
    e.preventDefault()
    e.stopPropagation()
    
    const hardcodedNumber = '0618205278'
    const productImage = product.product_images?.[0] || ''
    const originalPrice = formatCurrency(product.price)
    const finalPrice = formatCurrency(discountedPrice)
    const discountText = product.discount > 0 ? ` (${product.discount}% OFF)` : ''
    
    let message = `Hi, I'm interested in your product:\n\n`
    message += `*Product Name:* ${product.product_name}\n`
    message += `*Price:* ${finalPrice}${discountText}\n`
    if (product.discount > 0) {
      message += `*Original Price:* ${originalPrice}\n`
    }
    message += `*Category:* ${product.categoryName}\n`
    if (product.description) {
      message += `\n*Description:* ${product.description}\n`
    }
    message += `\nPlease let me know more about this product.`
    
    try {
      if (type === 'whatsapp') {
        if (productImage) {
          message += `\n\n*Product Image:* ${productImage}`
        }
        
        let cleanNumber = hardcodedNumber.replace(/[^\d+]/g, '')
        
        if (cleanNumber.startsWith('+255')) {
          cleanNumber = cleanNumber.substring(1)
        } else if (cleanNumber.startsWith('255')) {
          // Keep as is
        } else if (cleanNumber.startsWith('0')) {
          cleanNumber = '255' + cleanNumber.substring(1)
        } else {
          cleanNumber = '255' + cleanNumber
        }
        
        const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
        
      } else if (type === 'call') {
        const callUrl = `tel:${hardcodedNumber}`
        window.location.href = callUrl
      }
    } catch (error) {
      console.error('Error handling contact:', error)
    }
  }, [product, discountedPrice])

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(product)
    } else {
      const slug = `${slugify(product.product_name)}_${product.id}`
      const categorySlug = product.categoryName.toLowerCase().replace(/\s+/g, '-')
      router.push(`/product/${categorySlug}/${slug}`)
    }
  }, [onClick, product, router])

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback(() => {
    setImageError(true)
    setImageLoaded(true)
  }, [])

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-300 cursor-pointer flex gap-4 w-full"
        onClick={handleClick}
      >
        {/* Image Container - List View with fixed dimensions */}
        <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
          {!imageError ? (
            <Image
              src={product.product_images?.[0] || '/placeholder-image.jpg'}
              alt={product.product_name}
              fill
              className={`object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              sizes="96px"
              priority={priority}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              No Image
            </div>
          )}
          
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </div>
        
        {/* Product Info - List View */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
            {product.product_name}
          </h3>
          <p className="text-xs text-gray-600 mb-2 truncate">{product.vendorName}</p>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-blue-600">
                {formatCurrency(discountedPrice)}
              </span>
              {product.discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => handleContactVendor(e, 'whatsapp')}
                className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                title="WhatsApp"
                type="button"
              >
                <MessageCircle className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => handleContactVendor(e, 'call')}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                title="Call"
                type="button"
              >
                <Phone className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid View with fixed aspect ratio to prevent layout shift
  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group w-full break-inside-avoid mb-4"
      onClick={handleClick}
    >
      {/* Image Container - Grid View with fixed aspect ratio */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        {!imageError ? (
          <Image
            src={product.product_images?.[0] || '/placeholder-image.jpg'}
            alt={product.product_name}
            fill
            className={`object-cover group-hover:scale-105 transition-all duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            sizes={sizes}
            priority={priority}
            quality={75}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
            <div className="text-center p-4">
              <div className="text-2xl mb-2">📦</div>
              <div className="text-xs">No Image</div>
            </div>
          </div>
        )}
        
        {/* Loading placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold z-10">
            -{product.discount}%
          </div>
        )}
        
        {/* Out of Stock Overlay */}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      {/* Product Info - Grid View with consistent padding */}
      <div className="p-3 sm:p-4 space-y-2">
        {/* Product name with consistent height */}
        <h3 className="font-semibold text-gray-900 text-sm leading-tight h-10 overflow-hidden">
          <span className="line-clamp-2">{product.product_name}</span>
        </h3>
        
        {/* Description with consistent height */}
        <p className="text-xs text-gray-600 h-8 overflow-hidden">
          <span className="line-clamp-2">{product.description}</span>
        </p>
        
        {/* Vendor and category */}
        <div className="space-y-1">
          <p className="text-xs text-gray-600 truncate">{product.vendorName}</p>
          <p className="text-xs text-blue-600 truncate">{product.categoryName}</p>
        </div>
        
        {/* Price section with consistent height */}
        <div className="h-12 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold text-blue-600">
              {formatCurrency(discountedPrice)}
            </span>
            {product.discount > 0 && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
        </div>
        
        {/* Action buttons with consistent height */}
        <div className="flex gap-2 h-8">
          <button
            onClick={(e) => handleContactVendor(e, 'whatsapp')}
            className="flex-1 bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center text-xs font-medium"
            type="button"
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            <span className="hidden xs:inline">WhatsApp</span>
          </button>
          <button
            onClick={(e) => handleContactVendor(e, 'call')}
            className="flex-1 bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center text-xs font-medium"
            type="button"
          >
            <Phone className="h-3 w-3 mr-1" />
            <span className="hidden xs:inline">Call</span>
          </button>
        </div>
      </div>
    </div>
  )
})

OptimizedProductCard.displayName = 'OptimizedProductCard'

export default OptimizedProductCard

// src/components/LazyLoadSection.tsx - Intersection Observer for lazy loading
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

// src/components/ErrorBoundary.tsx - Error boundary for better UX
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-gray-600">Something went wrong. Please refresh the page.</p>
        </div>
      )
    }

    return this.props.children
  }
}