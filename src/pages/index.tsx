

import React, { useState, useMemo, useEffect, Suspense } from 'react'
import Head from 'next/head'
import { AlertCircle, X, ChevronRight, TrendingUp, Star, Users } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { slugify } from '../utils/api'
import { smartShuffle, shuffleArray } from '../utils/shuffle'

const ProductCard = dynamic(() => import('../components/ProductCard'), {
  loading: () => <ProductCardSkeleton />
})
const FilterModal = dynamic(() => import('../components/FilterModal'))
const AppDownloadBanner = dynamic(() => import('../components/AppDownloadBanner'))

import UpdatedHeaderBar from '../components/UpdatedHeaderBar'
import BottomNavigation from '../components/BottomNavigation'
import type { NextPage } from 'next'
import { useRouter, NextRouter } from 'next/router'

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

interface HomeProps {
  products: Product[]
  vendors: Vendor[]
  categories: string[]
}

interface ModernCategorySectionProps {
  categories: string[]
  categoryImages: Record<string, string>
  isLoading: boolean
  router: NextRouter
}

const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
    <div className="w-full aspect-square bg-gray-200" />
    <div className="p-3 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-6 bg-gray-200 rounded w-1/3" />
      <div className="flex gap-2">
        <div className="h-8 bg-gray-200 rounded flex-1" />
        <div className="h-8 bg-gray-200 rounded flex-1" />
      </div>
    </div>
  </div>
)

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .card-3d {
          transform-style: preserve-3d;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
          will-change: transform;
        }

        .card-3d:hover {
          transform: rotateX(10deg) rotateY(-10deg) translateZ(30px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .floating-animation {
          animation: rotate3D 8s ease-in-out infinite;
        }

        .floating-animation:nth-child(1) {
          animation-delay: 0s;
        }

        .floating-animation:nth-child(2) {
          animation-delay: 2s;
        }

        .card-container .space-y-4 > div:nth-child(1) {
          animation-delay: 4s;
        }

        .card-container .space-y-4 > div:nth-child(2) {
          animation-delay: 6s;
        }

        @keyframes rotate3D {
          0% {
            transform: translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1);
          }
          25% {
            transform: translateY(-10px) rotateX(15deg) rotateY(15deg) rotateZ(5deg) scale(1.02);
          }
          50% {
            transform: translateY(-20px) rotateX(0deg) rotateY(30deg) rotateZ(0deg) scale(1.05);
          }
          75% {
            transform: translateY(-10px) rotateX(-15deg) rotateY(15deg) rotateZ(-5deg) scale(1.02);
          }
          100% {
            transform: translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1);
          }
        }

        .glow-effect {
          position: relative;
          overflow: hidden;
        }

        .glow-effect::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: translateX(-100%);
          transition: transform 1s;
        }

        .glow-effect:hover::before {
          transform: translateX(100%);
        }

        .mouse-track {
          transition: transform 0.1s ease-out;
        }

        .pulse-icon {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>

      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span>Tanzania&apos;s #1 Marketplace</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Discover Amazing
                  <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Products
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-blue-100 max-w-lg">
                  Shop from thousands of verified vendors across Tanzania. Quality products, competitive prices, fast delivery.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">10K+</div>
                  <div className="text-sm text-blue-200">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">500+</div>
                  <div className="text-sm text-blue-200">Vendors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">50K+</div>
                  <div className="text-sm text-blue-200">Happy Customers</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center">
                  Start Shopping
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>

                <a
                  href="https://play.google.com/store/apps/details?id=com.vendor.bhaba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
                >
                  Download App
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="perspective-1000 relative w-full h-96">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 rounded-2xl" />
                  <div className="grid grid-cols-2 gap-4 h-full card-container">
                    <div className="space-y-4">
                      <div
                        className="bg-white/20 backdrop-blur-sm rounded-xl p-4 h-32 card-3d floating-animation glow-effect mouse-track transform-gpu"
                        style={{
                          transform: `rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center pulse-icon">
                            <Star className="h-4 w-4 text-yellow-800" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold">Quality Products</div>
                            <div className="text-xs text-blue-200">Verified sellers</div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="bg-white/20 backdrop-blur-sm rounded-xl p-4 h-40 card-3d floating-animation glow-effect mouse-track transform-gpu"
                        style={{
                          transform: `rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg)`
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center pulse-icon">
                            <Users className="h-4 w-4 text-green-800" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold">Trusted Community</div>
                            <div className="text-xs text-blue-200">50K+ customers</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-8">
                      <div
                        className="bg-white/20 backdrop-blur-sm rounded-xl p-4 h-40 card-3d floating-animation glow-effect mouse-track transform-gpu"
                        style={{
                          transform: `rotateX(${mousePosition.y * 0.4}deg) rotateY(${mousePosition.x * 0.4}deg)`
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-400 rounded-lg flex items-center justify-center pulse-icon">
                            <TrendingUp className="h-4 w-4 text-purple-800" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold">Best Prices</div>
                            <div className="text-xs text-blue-200">Competitive rates</div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="bg-white/20 backdrop-blur-sm rounded-xl p-4 h-32 card-3d floating-animation glow-effect mouse-track transform-gpu"
                        style={{
                          transform: `rotateX(${mousePosition.y * 0.6}deg) rotateY(${mousePosition.x * 0.6}deg)`
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center pulse-icon">
                            <ChevronRight className="h-4 w-4 text-orange-800" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold">Fast Delivery</div>
                            <div className="text-xs text-blue-200">Quick shipping</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const ModernCategorySection = ({ categories, categoryImages, isLoading, router }: ModernCategorySectionProps) => {
  const featuredCategories = categories.slice(0, 6)
  const remainingCategories = categories.slice(6)

  return (
    <div className="mb-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h3>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Find exactly what you&apos;re looking for in our carefully organized categories
        </p>
      </div>

      {/* Featured categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {isLoading ? (
          Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200 h-56 animate-pulse">
              <div className="absolute inset-0 bg-gray-200" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="h-6 bg-gray-300 rounded w-32 mb-2" />
                <div className="h-4 bg-gray-300 rounded w-24" />
              </div>
            </div>
          ))
        ) : (
          featuredCategories.map((categoryName: string) => (
            <button
              key={categoryName}
              onClick={() => router.push(`/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`)}
              className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200 hover:border-transparent h-56 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
            >
              {categoryImages[categoryName as keyof typeof categoryImages] && (
                <div className="absolute inset-0">
                  <Image
                    src={categoryImages[categoryName as keyof typeof categoryImages]}
                    alt={categoryName}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
              )}

              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                  <h4 className="text-2xl font-bold text-white mb-2">{categoryName}</h4>
                  <div className="flex items-center text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Shop Collection</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))
        )}
      </div>

      {/* Remaining categories */}
      {remainingCategories.length > 0 && (
        <div>
          <h4 className="text-xl font-semibold text-gray-900 mb-6 text-center">More Categories</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {isLoading ? (
              Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4 animate-pulse">
                  <div className="w-full aspect-square bg-gray-200 rounded-xl mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              ))
            ) : (
              remainingCategories.map((categoryName: string) => (
                <button
                  key={categoryName}
                  onClick={() => router.push(`/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`)}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 p-4 hover:scale-105"
                >
                  {categoryImages[categoryName as keyof typeof categoryImages] && (
                    <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-xl">
                      <Image
                        src={categoryImages[categoryName as keyof typeof categoryImages]}
                        alt={categoryName}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 12.5vw"
                      />
                    </div>
                  )}
                  <p className="text-xs font-medium text-gray-700 text-center leading-tight">
                    {categoryName}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const Home: NextPage<HomeProps> = ({ products = [], vendors = [], categories = [] }) => {
  const router = useRouter()
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
  const [showWholesale, setShowWholesale] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100)
    return () => clearTimeout(timer)
  }, [])

  const categoryImages = {
    Electronics: '/category-images/electronics.jpeg',
    Shoes: '/category-images/shoes.webp',
    Clothing: '/category-images/clothing.webp',
    Automotive: '/category-images/automotive.webp',
    Bags: '/category-images/bags.webp',
    Cars: '/category-images/cars.jpg',
    "Computer & Accessories": '/category-images/computer-accessories.png',
    Furniture: '/category-images/furniture.jpeg',
    "Grains & Pulses": '/category-images/grains_pulses.jpeg',
    "Health & Beauty": '/category-images/health_beauty.jpeg',
    "Home Appliances": '/category-images/home_appliances.jpeg',
    "Home Textile": '/category-images/home_textile.jpeg',
    "Jewelry & Watches": '/category-images/jewelry_watches.jpeg',
    Phone: '/category-images/phone.jpg',
    Smokeables: '/category-images/smokeables.webp',
    "Sports & Outdoors": '/category-images/sports_outdoors.jpeg',
    "Office Supplies": '/category-images/office_supplies.jpeg',
  }

  const wholesaleVendors = ['dPpBnTL3CDN879g7X1cRVoRG5wn2']

  // FIXED: Ensure filteredProducts is always defined with proper fallback
  const filteredProducts = useMemo(() => {
    // Ensure products is always an array
    if (!Array.isArray(products)) {
      console.warn('Products is not an array:', products);
      return [];
    }

    let filtered = [...products]; // Create a copy to avoid mutations

    if (searchQuery) {
      filtered = filtered.filter(product => {
        const searchLower = searchQuery.toLowerCase()
        return (
          (product.product_name || '').toLowerCase().includes(searchLower) ||
          (product.description || '').toLowerCase().includes(searchLower) ||
          (product.vendorName || '').toLowerCase().includes(searchLower) ||
          (product.categoryName || '').toLowerCase().includes(searchLower)
        )
      })
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.categoryName)
      )
    }

    if (filters.vendors.length > 0) {
      filtered = filtered.filter(product =>
        filters.vendors.includes(product.vendorId)
      )
    }

    filtered = filtered.filter(product => {
      const price = product.discount > 0
        ? product.price * (1 - product.discount / 100)
        : product.price
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })

    if (filters.inStock) {
      filtered = filtered.filter(product => product.isAvailable)
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

    if (sortOption === 'relevance' || !sortOption) {
      return smartShuffle(filtered, 'categoryName')
    } else {
      return shuffleArray(filtered)
    }
  }, [products, searchQuery, filters, sortOption])

  const handleProductClick = (product: Product) => {
    const slug = `${slugify(product.product_name)}_${product.id}`
    const categorySlug = product.categoryName.toLowerCase().replace(/\s+/g, '-')
    router.push(`/product/${categorySlug}/${slug}`)
  }

  const handleWholesaleClick = () => {
    setShowWholesale(true)
    setFilters({
      ...filters,
      vendors: wholesaleVendors
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <Head>
        <title>Bhaba Marketplace - Shop Online in Tanzania</title>
        <meta name="description" content="Discover the best products at affordable prices in Tanzania. Shop electronics, clothing, shoes and more from verified vendors." />
        <meta name="keywords" content="Tanzania ecommerce, online shopping, Bhaba Marketplace, electronics, clothing, shoes" />
        <meta property="og:title" content="Bhaba Marketplace - Shop Online in Tanzania" />
        <meta property="og:description" content="Discover the best products at affordable prices in Tanzania." />
        <meta property="og:type" content="website" />
        <link rel="preload" href="/Bhaba_logo.png" as="image" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
      </Head>

      <UpdatedHeaderBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        setShowFilters={setShowFilters}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      {/* Hero Section */}
      <HeroSection />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {showWholesale && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-blue-900">
                Wholesale Products
              </h2>
              <p className="text-sm text-blue-700">Special bulk pricing available</p>
            </div>
            <button
              onClick={() => {
                setShowWholesale(false)
                setFilters({ ...filters, vendors: [] })
              }}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Show All Products
            </button>
          </div>
        )}

        {/* Categories */}
        <ModernCategorySection
          categories={categories}
          categoryImages={categoryImages}
          isLoading={isLoading}
          router={router}
        />

        {/* Products Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Featured Products'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {(filters.categories.length > 0 || filters.vendors.length > 0 || filters.inStock) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Filters:</span>
              {filters.categories.map(categoryName => (
                <span key={categoryName} className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {categoryName}
                  <button
                    onClick={() => {
                      setFilters({
                        ...filters,
                        categories: filters.categories.filter(name => name !== categoryName)
                      })
                    }}
                    className="hover:text-blue-600 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Products Grid */}
        {isLoading ? (
         // <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 space-y-4">
       <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
            {Array.from({ length: 12 }, (_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setFilters({
                  categories: [],
                  vendors: [],
                  priceRange: [0, 10000000],
                  inStock: false
                })
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <Suspense fallback={<div>Loading products...</div>}>
           <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 space-y-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleProductClick}
                  viewMode="grid"
                />
              ))}
            </div>
          </Suspense>
        )}
      </main>

      <BottomNavigation onWholesaleClick={handleWholesaleClick} />
      <AppDownloadBanner position="floating" />

      <Suspense fallback={null}>
        <FilterModal
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          categories={categories.map(name => ({ id: name, category_name: name }))}
          vendors={vendors}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </Suspense>
    </div>
  )
}

export async function getStaticProps() {
  const apiBase = "https://bhababackend.onrender.com"

  try {
    const [featuredProductsRes, vendorsRes, categoriesRes] = await Promise.all([
      fetch(`${apiBase}/search?limit=100`, {
        headers: { 'Cache-Control': 'no-cache' }
      }),
      fetch(`${apiBase}/vendors`, {
        headers: { 'Cache-Control': 'no-cache' }
      }),
      fetch(`${apiBase}/categories`, {
        headers: { 'Cache-Control': 'no-cache' }
      })
    ])

    const parseResponse = async (res: Response) => {
      if (!res.ok) return []
      const text = await res.text()
      try {
        return text ? JSON.parse(text) : []
      } catch (e) {
        console.error('Failed to parse response:', e)
        return []
      }
    }

    // In getStaticProps function, replace the products parsing logic:
const [productsData, vendorsData, categoriesData] = await Promise.all([
  parseResponse(featuredProductsRes),
  parseResponse(vendorsRes),
  parseResponse(categoriesRes)
])

return {
  props: {
    products: Array.isArray(productsData?.hits) ? productsData.hits : [],
    vendors: Array.isArray(vendorsData) ? vendorsData : [],
    categories: Array.isArray(categoriesData) ? categoriesData : [],
  },
  revalidate: 1800,
}
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        products: [],
        vendors: [],
        categories: []
      },
      revalidate: 300,
    }
  }
}

export default Home


