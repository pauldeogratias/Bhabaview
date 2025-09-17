// src/components/ProductCard.tsx
import React from 'react'
import { Phone, MessageCircle } from 'lucide-react'
//import Image from 'next/image'
import { formatCurrency } from '@/utils/formatCurrency'
import { useRouter } from 'next/router'
import { slugify } from '@/utils/api'
import DynamicAspectRatioImage from './DynamicAspectRatioImage'  

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
}

// const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, viewMode = 'grid' }) => {
const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, onClick, viewMode = 'grid' }) => {
  const router = useRouter()
  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price

  // const handleContactVendor = (e: React.MouseEvent, type: 'whatsapp' | 'call') => {
  //   e.stopPropagation()
    
  //   const productImage = product.product_images?.[0] || ''
  //   const originalPrice = formatCurrency(product.price)
  //   const finalPrice = formatCurrency(discountedPrice)
  //   const discountText = product.discount > 0 ? ` (${product.discount}% OFF)` : ''
    
  //   let message = `Hi, I'm interested in your product:\n\n`
  //   message += `*Product Name:* ${product.product_name}\n`
  //   message += `*Price:* ${finalPrice}${discountText}\n`
  //   if (product.discount > 0) {
  //     message += `*Original Price:* ${originalPrice}\n`
  //   }
  //   message += `*Category:* ${product.categoryName}\n`
  //   if (product.description) {
  //     message += `\n*Description:* ${product.description}\n`
  //   }
  //   message += `\nPlease let me know more about this product.`
    
  //   if (type === 'whatsapp') {
  //     if (productImage) {
  //       message += `\n\n*Product Image:* ${productImage}`
  //     }
  //     window.open(`https://wa.me/255${product.mobile_number.substring(1)}?text=${encodeURIComponent(message)}`, '_blank')
  //   } else if (type === 'call') {
  //     window.open(`tel:${product.mobile_number}`, '_self')
  //   }
  // }


    const handleContactVendor = (e: React.MouseEvent, type: 'whatsapp' | 'call') => {
    e.preventDefault()
    e.stopPropagation()
    
    // Hardcoded number - will always use this regardless of product.mobile_number
    const hardcodedNumber = '0618205278';
    
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
      alert('Unable to open contact method. Please try again.')
    }
  }

  // const handleClick = () => {
  //   if (onClick) {
  //     onClick(product)
  //   } else {
  //     const slug = `${product.product_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}_${product.id}`
  //     router.push(`/product/${slug}`)
  //   }
  // }

const handleClick = () => {
  if (onClick) {
    onClick(product)
  } else {
    const slug = `${slugify(product.product_name)}_${product.id}`
    router.push(`/product/${product.categoryName.toLowerCase().replace(/\s+/g, '-')}/${slug}`)
  }
}

  // Common image props
  // const imageProps = {
  //   src: product.product_images?.[0] || '/placeholder-image.jpg',
  //   alt: product.product_name,
  //   priority: false,
  //   quality: 85,
  //   onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
  //     (e.target as HTMLImageElement).src = '/placeholder-image.jpg'
  //   }
  // }

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-300 cursor-pointer flex gap-4 w-full"
        onClick={handleClick}
      >
      {/* Image Container - List View */}
        <div className="relative w-24 h-24 flex-shrink-0">
          {/* <Image
            {...imageProps}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100px, 150px"
          /> */}
          <DynamicAspectRatioImage imageUrl={product.product_images?.[0] || '/placeholder-image.jpg'} />
        </div>
        
        {/* Product Info - List View */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{product.product_name}</h3>
          <p className="text-xs text-gray-600 mb-2">{product.vendorName}</p>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-blue-600">{formatCurrency(discountedPrice)}</span>
              {product.discount > 0 && (
                <span className="text-sm text-gray-500 line-through">{formatCurrency(product.price)}</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => handleContactVendor(e, 'whatsapp')}
                className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => handleContactVendor(e, 'call')}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                title="Call"
              >
                <Phone className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid View
  return (
    <div 
      className="bg-gray-10 rounded-lg shadow-sm border border-green-600 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group w-full"
      onClick={handleClick}
    >
      {/* Image Container - Grid View */}
{/*       <div className="relative aspect-square">
        <Image
          {...imageProps}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        /> */}

   <div className="w-full relative flex-shrink-0">
      <DynamicAspectRatioImage imageUrl={product.product_images?.[0] || '/placeholder-image.jpg'} />

        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            -{product.discount}%
          </div>
        )}
        
        {/* Out of Stock Overlay */}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      {/* Product Info - Grid View */}
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{product.product_name}</h3>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2 sm:line-clamp-3">{product.description}</p>
        <p className="text-xs text-gray-600 mb-2">{product.vendorName}</p>
        <p className="text-xs text-blue-600 mb-3">{product.categoryName}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-blue-600">{formatCurrency(discountedPrice)}</span>
            {product.discount > 0 && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">{formatCurrency(product.price)}</span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={(e) => handleContactVendor(e, 'whatsapp')}
            className="flex-1 bg-green-500 text-white py-1 sm:py-2 px-2 sm:px-3 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">WhatsApp</span>
          </button>
          <button
            onClick={(e) => handleContactVendor(e, 'call')}
            className="flex-1 bg-blue-500 text-white py-1 sm:py-2 px-2 sm:px-3 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Call</span>
          </button>
        </div>
      </div>
    </div>
//   )
// }

   );
});
ProductCard.displayName = 'ProductCard';

export default ProductCard
