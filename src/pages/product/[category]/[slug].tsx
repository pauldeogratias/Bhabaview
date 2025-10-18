// src/pages/product/[slug].tsx
import { useRouter } from 'next/router'
import React, { useState, useMemo, useEffect } from 'react'
import Head from 'next/head'
import { ChevronLeft, ChevronRight, Phone, MessageCircle, X, Loader2 } from 'lucide-react'
import Image from 'next/image'
import ProductCard from '../../../components/ProductCard'
import UpdatedHeaderBar from '../../../components/UpdatedHeaderBar'
import FilterModal from '../../../components/FilterModal'
import { formatCurrency } from '../../../utils/formatCurrency'
import type { NextPage } from 'next'
import { slugify } from '@/utils/api'
import { fetchWithRetry } from '../../../utils/api'
import Link from 'next/link'
import { smartShuffle } from '../../../utils/shuffle'

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

interface Vendor {
  id: string
  store_name: string
  store_logo: string
}

interface ProductDetailProps {
  products: Product[]
  vendors: Vendor[]
  categories: string[]
}


// const ProductDetail: NextPage<ProductDetailProps> = ({ products: initialProducts, vendors, categories }) => {
//   const router = useRouter()
//   const { slug } = router.query
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)
//   const [products, setProducts] = useState<Product[]>(initialProducts)
//   const [loading, setLoading] = useState(false)


const ProductDetail: NextPage<ProductDetailProps> = ({ products: initialProducts, vendors, categories }) => {
  const router = useRouter()
  const { slug } = router.query
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [loading, setLoading] = useState(false)
  
  // Extract product ID from slug
  const productId = typeof slug === 'string' ? slug.split('_').pop() : ''
  const product = products.find(p => p.id.toString() === productId)
  
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    categories: [] as string[],
    vendors: [] as string[],
    priceRange: [0, 10000000] as [number, number],
    inStock: false
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [sortOption, setSortOption] = useState('relevance')
  const [expandedDescription, setExpandedDescription] = useState(false);


  useEffect(() => {
     const apiBase = "https://bhababackend.onrender.com";
    // Fetch product details if not found in initial props
    if (!product && productId) {
      const fetchProduct = async () => {
        setLoading(true)
        try {
          const response = await fetch(`${apiBase}/products/${productId}`)
          const data = await response.json()
          setProducts(prev => [...prev, data])
        } catch (error) {
          console.error('Error fetching product:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchProduct()
    }
  }, [product, productId])

  // Filter and sort all products except the current one
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => p.id.toString() !== productId)
    
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      filtered = filtered.filter(p => 
        (p.product_name || '').toLowerCase().includes(searchLower) ||
        (p.description || '').toLowerCase().includes(searchLower) ||
        (p.vendorName || '').toLowerCase().includes(searchLower)
      )
    }
    
    if (filters.categories.length > 0) {
      filtered = filtered.filter(p => 
        filters.categories.includes(p.categoryName)
      )
    }
    
    if (filters.vendors.length > 0) {
      filtered = filtered.filter(p => 
        filters.vendors.includes(p.vendorId)
      )
    }
    
    filtered = filtered.filter(p => {
      const price = p.discount > 0 
        ? p.price * (1 - p.discount / 100) 
        : p.price
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })
    
    if (filters.inStock) {
      filtered = filtered.filter(p => p.isAvailable)
    }
    
    switch(sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => {
          const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price
          const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price
          return priceA - priceB
        })
        break
      case 'price-desc':
        filtered.sort((a, b) => {
          const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price
          const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price
          return priceB - priceA
        })
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.added_at).getTime() - new Date(a.added_at).getTime())
        break
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount)
        break
      default:
        break
    }
    
    return filtered
  }, [products, productId, searchQuery, filters, sortOption])

  // const relatedProducts = useMemo(() => {
  //   if (!product) return []
  //   return filteredProducts.filter(p => 
  //     p.categoryId === product.categoryId
  //   ).slice(0, 120)
  // }, [filteredProducts, product])

  

  // const otherProducts = useMemo(() => {
  //   if (!product) return []
  //   return filteredProducts.filter(p => 
  //     p.categoryId !== product.categoryId
  //   ).slice(0, 120) // Reduced from 400 to 12 for better performance
  // }, [filteredProducts, product])


  // In src/pages/product/[category]/[slug].tsx - Replace the existing relatedProducts and otherProducts useMemo

const relatedProducts = useMemo(() => {
  if (!product) return []
  
  const related = filteredProducts.filter(p =>
    p.categoryId === product.categoryId
  ).slice(0, 120)
  
  // Shuffle related products by vendor to show variety within the same category
  return smartShuffle(related, 'vendorId')
}, [filteredProducts, product])

const otherProducts = useMemo(() => {
  if (!product) return []
  
  const others = filteredProducts.filter(p =>
    p.categoryId !== product.categoryId
  ).slice(0, 120)
  
  // Shuffle other products by category to show diverse categories
  return smartShuffle(others, 'categoryName')
}, [filteredProducts, product])

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500 mx-auto mb-3" />
          <p className="text-sm text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <X className="h-10 w-10 text-red-500 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Product not found</h2>
          <button
            onClick={() => router.back()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price

  // const handleContactVendor = (e: React.MouseEvent, type: 'whatsapp' | 'call') => {
  //   e.preventDefault()
  //   e.stopPropagation()
    
  //   if (!product.mobile_number) {
  //     alert('Mobile number not available for this vendor')
  //     return
  //   }
    
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
    
  //   try {
  //     if (type === 'whatsapp') {
  //       if (productImage) {
  //         message += `\n\n*Product Image:* ${productImage}`
  //       }
        
  //       let cleanNumber = product.mobile_number.replace(/[^\d+]/g, '')
        
  //       if (cleanNumber.startsWith('+255')) {
  //         cleanNumber = cleanNumber.substring(1)
  //       } else if (cleanNumber.startsWith('255')) {
  //         // Keep as is
  //       } else if (cleanNumber.startsWith('0')) {
  //         cleanNumber = '255' + cleanNumber.substring(1)
  //       } else {
  //         cleanNumber = '255' + cleanNumber
  //       }
        
  //       const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
  //       window.open(whatsappUrl, '_blank')
        
  //     } else if (type === 'call') {
  //       const callUrl = `tel:${product.mobile_number}`
  //       window.location.href = callUrl
  //     }
  //   } catch (error) {
  //     console.error('Error handling contact:', error)
  //     alert('Unable to open contact method. Please try again.')
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

    // ✅ Add Meta Pixel tracking before opening WhatsApp
if (typeof window !== 'undefined' && (window as any).fbq) {
  (window as any).fbq(
    'trackSingle',
    '1166816512038836',
    'Purchase',
    {
      action: 'contact_whatsapp_click',
      platform: 'web',
      product_name: product.product_name,
      price: finalPrice
    }
  )
}


  
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.product_images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.product_images.length - 1 : prev - 1
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{product.product_name} | Bhaba Marketplace</title>
        <meta name="description" content={product.description || `Buy ${product.product_name} at ${formatCurrency(discountedPrice)} in Tanzania`} />
        <meta name="keywords" content={`${product.product_name}, ${product.categoryName}, Tanzania, buy online`} />
        <meta property="og:title" content={`${product.product_name} | Bhaba Marketplace`} />
        <meta property="og:description" content={product.description || `Buy ${product.product_name} at ${formatCurrency(discountedPrice)}`} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://yourstore.com/product/${slug}`} />
        {product.product_images.length > 0 && (
          <meta property="og:image" content={product.product_images[0]} />
        )}
      </Head>

      <UpdatedHeaderBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        setShowFilters={setShowFilters}
        sortOption={sortOption}
        setSortOption={setSortOption}
        showBackButton={true}
        onBack={handleBack}
      />

      {/* ... rest of your JSX remains exactly the same ... */}
      {/* Make sure to keep all your existing JSX for the product display */}
    
       <div className="p-4 sm:p-6 w-full mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 w-full">
           {/* Product Images Section */}
           <div className="space-y-3 sm:space-y-4 w-full">
             <div className="relative w-full aspect-square">
               <Image
                 src={product.product_images?.[currentImageIndex] || '/category-images/placeholder-image.jpg'}
                 alt={product.product_name}
                 fill
                 className="w-full h-full object-contain rounded-lg bg-white"
                 priority={true}
                 quality={90}
               />
       
               {product.product_images && product.product_images.length > 1 && (
                 <>
                   <button
                     onClick={prevImage}
                     className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                   >
                     <ChevronLeft className="h-5 w-5" />
                   </button>
                   <button
                     onClick={nextImage}
                     className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                   >
                     <ChevronRight className="h-5 w-5" />
                   </button>
                 </>
               )}
             </div>
             
             {product.product_images && product.product_images.length > 1 && (
               <div className="flex gap-2 overflow-x-auto pb-2">
                 {product.product_images.map((image, index) => (
                   <button
                     key={index}
                     onClick={() => setCurrentImageIndex(index)}
                     className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                       index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                     }`}
                   >
              
       
       <Image
        //  src={product.product_images?.[currentImageIndex] || '/placeholder-image.jpg'}
        // src={image}
        src={image || '/category-images/placeholder-image.jpeg'}
         alt={product.product_name}
         width={800}
         height={800}
         className="w-full h-full object-contain rounded-lg bg-white"
         priority={true}
         quality={75}
         placeholder="blur"
         blurDataURL="/category-images/placeholder-image.jpeg" // Add a small placeholder image
         onError={(e) => {
           (e.target as HTMLImageElement).src = '/category-images/placeholder-image.jpeg';
         }}
       />
       
                   </button>
                 ))}
               </div>
             )}
           </div>
           
           {/* Product Info Section */}
           <div className="space-y-4 sm:space-y-6 w-full">
             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
               {product.product_name}
             </h1>
             
             <div>
               <div className="flex flex-wrap items-center gap-2 mb-2">
                 <span className="text-xs sm:text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                   {product.categoryName}
                 </span>
                 {!product.isAvailable && (
                   <span className="text-xs sm:text-sm text-red-600 bg-red-50 px-2 py-1 rounded-md">
                     Out of Stock
                   </span>
                 )}
               </div>
               
               <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                 <div>
                   <span className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">
                     {formatCurrency(discountedPrice)}
                   </span>
                   {product.discount > 0 && (
                     <span className="text-sm sm:text-lg text-gray-500 line-through ml-2">
                       {formatCurrency(product.price)}
                     </span>
                   )}
                 </div>
                 {product.discount > 0 && (
                   <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-semibold">
                     -{product.discount}% OFF
                   </span>
                 )}
               </div>
             </div>
             
             {/* Description and Details */}
             
             {/* Description and Details */}
<div className="space-y-4">
  <div>
    <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2">Description</h3>
    <div className="relative">
      <p 
        className={`text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line ${
          !expandedDescription && product.description && product.description.length > 200 
            ? 'line-clamp-4' 
            : ''
        }`}
      >
        {product.description || 'No description available'}
      </p>
      {product.description && product.description.length > 200 && (
        <button
          onClick={() => setExpandedDescription(!expandedDescription)}
          className="text-blue-500 hover:text-blue-700 text-sm font-medium mt-1 focus:outline-none"
        >
          {expandedDescription ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  </div>
  
  {product.details && (
    <div>
      <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2">Details</h3>
      <p className="text-gray-700 text-sm sm:text-base">{product.details}</p>
    </div>
  )}
  
  <div>
    <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2">Vendor</h3>
    <p className="text-gray-700 text-sm sm:text-base">{product.vendorName}</p>
    <p className="text-gray-600 text-sm sm:text-base">
      Contact: {"0618205278"}
    </p>
  </div>
  
  {product.moq > 0 && (
    <div>
      <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2">
        Minimum Order Quantity
      </h3>
      <p className="text-gray-700 text-sm sm:text-base">
        {product.moq} units
      </p>
    </div>
  )}
</div>
             
             {/* Contact Buttons */}
             <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-2 sm:pt-4">
               <button
                 onClick={(e) => handleContactVendor(e, 'whatsapp')}
                 className="flex-1 bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-semibold"
                 type="button"
               >
                 <MessageCircle className="h-5 w-5" />
                 WhatsApp
               </button>
               <button
                 onClick={(e) => handleContactVendor(e, 'call')}
                 className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-semibold"
                 type="button"
               >
                 <Phone className="h-5 w-5" />
                 Call
               </button>
             </div>
           </div>
         </div>
       
         {/* Related Products Section */}
         {relatedProducts.length > 0 && (
           <div className="mt-8 border-t pt-8 w-full">
             <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
               Related Products
             </h3>
            {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 w-full"> */}
             <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
               {relatedProducts.map((relatedProduct) => (
                 <ProductCard
                   key={relatedProduct.id}
                   product={relatedProduct}
                   viewMode="grid"
                 />
               ))}
             </div>
           </div>
         )}
       
         {/* Other Products Section */}
         {otherProducts.length > 0 && (
           <div className="mt-8 border-t pt-8 w-full">
             <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
               You Might Also Like
             </h3>
             {/*<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 w-full"> */}
           <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
               {otherProducts.map((otherProduct) => (
               <ProductCard
                   key={otherProduct.id}
                   product={otherProduct}
                   viewMode="grid"
                 />
               ))}
             </div>
           </div>
         )}

         {/* Legal Links Section - Add this section */}
      <div className="mt-12 border-t pt-8">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <Link href="/privacy-policy" className="hover:text-blue-600 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-blue-600 transition-colors">
            Terms of Service
          </Link>
          {/* <a 
            href="https://bhabalimited.com/privacy_policy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            Full Privacy Policy
          </a>
          <a 
            href="https://bhabalimited.com/terms_of_service" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            Full Terms of Service
          </a> */}
        </div>
      </div>
    </div>
       
       
             <FilterModal
               isOpen={showFilters}
               onClose={() => setShowFilters(false)}
               categories={categories.map(name => ({ id: name, category_name: name }))}
               vendors={vendors}
               filters={filters}
               onFiltersChange={setFilters}
             />
    
    </div>
  )
}


// export async function getStaticPaths() {
//  const apiBase = "https://bhababackend.onrender.com";
// //     const isBrowser = typeof window !== 'undefined';
// // const isLocalhost = isBrowser && window.location.hostname === 'localhost';

// //   const apiBase = (
// //   isLocalhost
// //     ? 'https://bhababackend.onrender.com'
// //     : 'http://192.168.1.165:5000'
// // );
  
  
//   try {
//     const products = await fetchWithRetry<Product[]>(`${apiBase}/products`)

//     // const paths = products.map((product) => ({
//     //   params: {
//     //     category: product.categoryName.toLowerCase().replace(/\s+/g, '-'),
//     //     slug: `${slugify(product.product_name)}_${product.id}`
//     //   }
//     // }))

//     const paths = products
//   .filter(product => product.categoryName && product.product_name && product.id) // Only valid products
//   .map((product) => ({
//     params: {
//       category: product.categoryName.toLowerCase().replace(/\s+/g, '-'),
//       slug: `${slugify(product.product_name)}_${product.id}`
//     }
//   }))


//     return { paths, fallback: 'blocking' }
//   } catch (error) {
//     console.error('Error generating paths:', error)
//     return { paths: [], fallback: 'blocking' }
//   }
// }

export async function getStaticPaths() {
  const apiBase = "https://bhababackend.onrender.com";
  
  try {
    const products = await fetchWithRetry<Product[]>(`${apiBase}/products`)
    
    // Ensure products is an array before calling filter
    if (!Array.isArray(products)) {
      console.error('Products response is not an array:', products)
      return { paths: [], fallback: 'blocking' }
    }

    const paths = products
      .filter(product => product.categoryName && product.product_name && product.id) // Only valid products
      .map((product) => ({
        params: {
          category: product.categoryName.toLowerCase().replace(/\s+/g, '-'),
          slug: `${slugify(product.product_name)}_${product.id}`
        }
      }))

    return { paths, fallback: 'blocking' }
  } catch (error) {
    console.error('Error generating paths:', error)
    return { paths: [], fallback: 'blocking' }
  }
}


export async function getStaticProps({ params }: { params: { category: string, slug: string } }) {
  const apiBase = "https://bhababackend.onrender.com";
//       const isBrowser = typeof window !== 'undefined';
// const isLocalhost = isBrowser && window.location.hostname === 'localhost';

//   const apiBase = (
//   isLocalhost
//     ? 'https://bhababackend.onrender.com'
//     : 'http://192.168.1.165:5000'
// );
   try {
    const productId = params.slug.split('_').pop() || ''
    
    const [, featuredProductsRes, vendorsRes, categoriesRes] = await Promise.all([
      fetch(`${apiBase}/products/${productId}`),
      fetch(`${apiBase}/search?limit=10`),
      fetch(`${apiBase}/vendors`),
      fetch(`${apiBase}/categories`)
    ])

    // Handle non-JSON responses
    const parseResponse = async (res: Response) => {
      const text = await res.text()
      try {
        return text ? JSON.parse(text) : []
      } catch (e) {
        console.error('Failed to parse response:', text, e)
        return []
      }
    }

    return {
      props: {
        products: await parseResponse(featuredProductsRes),
        vendors: await parseResponse(vendorsRes),
        categories: await parseResponse(categoriesRes),
      },
      revalidate: 3600
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        products: [],
        vendors: [],
        categories: []
      }
    }
  }
}

export default ProductDetail


