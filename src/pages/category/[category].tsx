// // import { useRouter } from 'next/router'
// // import React, { useState, useEffect, useMemo } from 'react'
// // import Head from 'next/head'
// // import { Loader2 } from 'lucide-react'
// // import ProductCard from '../../components/ProductCard'
// // import HeaderBar from '../../components/HeaderBar'
// // import { fetchWithRetry, SearchResult } from '../../utils/api'
// // import type { NextPage } from 'next'
// // import { Product } from '../../utils/api'

// // // Use a consistent API base URL
// // const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://bhababackend.onrender.com'

// // interface CategoryPageProps {
// //   initialProducts: Product[]
// // }

// // const CategoryPage: NextPage<CategoryPageProps> = ({ initialProducts = [] }) => {
// //   const router = useRouter()
// //   const { category } = router.query
// //   const [products, setProducts] = useState<Product[]>(initialProducts)
// //   const [loading, setLoading] = useState(false)
// //   const [searchQuery, setSearchQuery] = useState('')
// //   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
// //   const [sortOption, setSortOption] = useState('relevance')
// //   const [showFilters, setShowFilters] = useState(false)

// // //   useEffect(() => {
// // //     console.log('Initial products:', initialProducts) // Debug log
// // //     console.log('Category from router:', category) // Debug log
    
// // //     if (category && (!initialProducts || initialProducts.length === 0)) {
// // //       const fetchCategoryProducts = async () => {
// // //         setLoading(true)
// // //         try {
// // //           const response = await fetchWithRetry<Product[]>(
// // //             `${API_BASE}/search?category=${category}`
// // //           )
// // //           console.log('API response:', response) // Debug log
// // //           setProducts(Array.isArray(response) ? response : [])
// // //         } catch (error) {
// // //           console.error('Error fetching category products:', error)
// // //           setProducts([])
// // //         } finally {
// // //           setLoading(false)
// // //         }
// // //       }
// // //       fetchCategoryProducts()
// // //     }
// // //   }, [category, initialProducts])

// //   // Filter products based on search query
 
 
 
// // useEffect(() => {
// //   if (category && (!initialProducts || initialProducts.length === 0)) {
// //     const fetchCategoryProducts = async () => {
// //       setLoading(true);
// //       try {
// //         const categoryName = typeof category === 'string' 
// //           ? category.replace(/-/g, ' ')
// //           : '';
        
// //         const response = await fetchWithRetry<SearchResult>(
// //           `${API_BASE}/search?category=${encodeURIComponent(categoryName)}`
// //         );
        
// //         setProducts(Array.isArray(response?.hits) ? response.hits : []);
// //       } catch (error) {
// //         console.error('Error fetching category products:', error);
// //         setProducts([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchCategoryProducts();
// //   }
// // }, [category, initialProducts]);
 
 
 
// //   const filteredProducts = useMemo(() => {
// //     if (!Array.isArray(products)) return []
// //     if (!searchQuery) return products
    
// //     return products.filter(product => 
// //       product?.product_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       product?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       product?.vendorName?.toLowerCase().includes(searchQuery.toLowerCase())
// //     )
// //   }, [products, searchQuery])

// //   // Sort products based on sort option
// //   const sortedProducts = useMemo(() => {
// //     if (!Array.isArray(filteredProducts)) return []
    
// //     const productsToSort = [...filteredProducts]
    
// //     switch(sortOption) {
// //       case 'price-asc':
// //         return productsToSort.sort((a, b) => {
// //           const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price
// //           const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price
// //           return priceA - priceB
// //         })
// //       case 'price-desc':
// //         return productsToSort.sort((a, b) => {
// //           const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price
// //           const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price
// //           return priceB - priceA
// //         })
// //       case 'newest':
// //         return productsToSort.sort((a, b) => 
// //           new Date(b.added_at).getTime() - new Date(a.added_at).getTime()
// //         )
// //       case 'discount':
// //         return productsToSort.sort((a, b) => b.discount - a.discount)
// //       default:
// //         return productsToSort
// //     }
// //   }, [filteredProducts, sortOption])

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <Loader2 className="h-10 w-10 animate-spin text-blue-500 mx-auto mb-3" />
// //           <p className="text-sm text-gray-600">Loading products...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Head>
// //         <title>{category} Products | Bhaba Marketplace</title>
// //         <meta name="description" content={`Browse ${category} products on Bhaba Marketplace`} />
// //       </Head>

// //       <HeaderBar 
// //         showBackButton={true}
// //         searchQuery={searchQuery}
// //         setSearchQuery={setSearchQuery}
// //         viewMode={viewMode}
// //         setViewMode={setViewMode}
// //         setShowFilters={setShowFilters}
// //         sortOption={sortOption}
// //         setSortOption={setSortOption}
// //       />

// //       <main className="max-w-7xl mx-auto px-4 py-6">
// //         <h1 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
// //           {category} Products
// //         </h1>

// //         {sortedProducts.length > 0 ? (
// //           <div className={viewMode === 'grid' 
// //             ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
// //             : "space-y-4"
// //           }>
// //             {sortedProducts.map((product) => (
// //               <ProductCard 
// //                 key={product.id}
// //                 product={product}
// //                 viewMode={viewMode}
// //               />
// //             ))}
// //           </div>
// //         ) : (
// //           <div className="text-center py-12">
// //             <p className="text-gray-600">
// //               {searchQuery 
// //                 ? `No products found matching "${searchQuery}"`
// //                 : 'No products found in this category'
// //               }
// //             </p>
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   )
// // }

// // export async function getStaticProps({ params }: { params: { category: string } }) {
// //   try {
// //     // Convert URL param back to proper category name
// //     const categoryName = params.category.replace(/-/g, ' ');
    
// //     const response = await fetchWithRetry<SearchResult>(
// //       `${API_BASE}/search?category=${encodeURIComponent(categoryName)}`
// //     );
    
// //     return {
// //       props: {
// //         initialProducts: Array.isArray(response?.hits) ? response.hits : []
// //       },
// //       revalidate: 3600
// //     };
// //   } catch (error) {
// //     console.error('Error fetching category products:', error);
// //     return {
// //       props: {
// //         initialProducts: []
// //       }
// //     };
// //   }
// // }


// // export async function getStaticPaths() {
// //   try {
// //     const categories = await fetchWithRetry<string[]>(
// //       `${API_BASE}/categories`
// //     )
// //     console.log('Categories for paths:', categories) // Debug log
    
// //     const paths = Array.isArray(categories) ? categories.map((category) => ({
// //       params: { category: category.toLowerCase().replace(/\s+/g, '-') }
// //     })) : []

// //     return {
// //       paths,
// //       fallback: 'blocking'
// //     }
// //   } catch (error) {
// //     console.error('Error generating category paths:', error)
// //     return {
// //       paths: [],
// //       fallback: 'blocking'
// //     }
// //   }
// // }

// // export default CategoryPage





// import { useRouter } from 'next/router'
// import React, { useState, useEffect, useMemo } from 'react'
// import Head from 'next/head'
// import { Loader2 } from 'lucide-react'
// import ProductCard from '../../components/ProductCard'
// import HeaderBar from '../../components/HeaderBar'
// import { fetchWithRetry, SearchResult } from '../../utils/api'
// import type { NextPage } from 'next'
// import { Product } from '../../utils/api'
// import { slugify } from '../../utils/api'

// // Use a consistent API base URL
// //const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://bhababackend.onrender.com'
//  const API_BASE = "https://bhababackend.onrender.com"

// interface CategoryPageProps {
//   initialProducts: Product[]
// }

// const CategoryPage: NextPage<CategoryPageProps> = ({ initialProducts = [] }) => {
//   const router = useRouter()
//   const { category } = router.query
//   const [products, setProducts] = useState<Product[]>(initialProducts)
//   const [loading, setLoading] = useState(false)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
//   const [sortOption, setSortOption] = useState('relevance')
//   const [, setShowFilters] = useState(false)

//   useEffect(() => {
//     if (category && (!initialProducts || initialProducts.length === 0)) {
//       const fetchCategoryProducts = async () => {
//         setLoading(true);
//         try {
//           const categoryName = typeof category === 'string' 
//             ? category.replace(/-/g, ' ')
//             : '';
          
//           const response = await fetchWithRetry<SearchResult>(
//             `${API_BASE}/search?category=${encodeURIComponent(categoryName)}`
//           );
          
//           setProducts(Array.isArray(response?.hits) ? response.hits : []);
//         } catch (error) {
//           console.error('Error fetching category products:', error);
//           setProducts([]);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchCategoryProducts();
//     }
//   }, [category, initialProducts]);

//   const filteredProducts = useMemo(() => {
//     if (!Array.isArray(products)) return []
//     if (!searchQuery) return products
    
//     return products.filter(product => 
//       product?.product_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product?.vendorName?.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   }, [products, searchQuery])

//   const sortedProducts = useMemo(() => {
//     if (!Array.isArray(filteredProducts)) return []
    
//     const productsToSort = [...filteredProducts]
    
//     switch(sortOption) {
//       case 'price-asc':
//         return productsToSort.sort((a, b) => {
//           const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price
//           const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price
//           return priceA - priceB
//         })
//       case 'price-desc':
//         return productsToSort.sort((a, b) => {
//           const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price
//           const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price
//           return priceB - priceA
//         })
//       case 'newest':
//         return productsToSort.sort((a, b) => 
//           new Date(b.added_at).getTime() - new Date(a.added_at).getTime()
//         )
//       case 'discount':
//         return productsToSort.sort((a, b) => b.discount - a.discount)
//       default:
//         return productsToSort
//     }
//   }, [filteredProducts, sortOption])

// const handleProductClick = (product: Product) => {
//   const slug = `${slugify(product.product_name)}_${product.id}`
//   const categorySlug = product.categoryName.toLowerCase().replace(/\s+/g, '-')
//   router.push(`/product/${categorySlug}/${slug}`)
// }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-10 w-10 animate-spin text-blue-500 mx-auto mb-3" />
//           <p className="text-sm text-gray-600">Loading products...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head>
//         <title>{category} | Bhaba Marketplace</title>
//         <meta name="description" content={`Browse ${category} products on Bhaba Marketplace`} />
//       </Head>

//       <HeaderBar 
//         showBackButton={true}
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         viewMode={viewMode}
//         setViewMode={setViewMode}
//         setShowFilters={setShowFilters}
//         sortOption={sortOption}
//         setSortOption={setSortOption}
//       />

//       <main className="max-w-7xl mx-auto px-4 py-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
//           {category}
//         </h1>

//         {sortedProducts.length > 0 ? (
//           // <div className={viewMode === 'grid' 
//           //   ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
//           //   : "space-y-4"
//           // }>
//                <div className={
//   viewMode === 'grid'
//     ? "columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4"
//     : "space-y-4"
// }>
//             {sortedProducts.map((product) => (
//               <ProductCard 
//                 key={product.id}
//                 product={product}
//                 viewMode={viewMode}
//                 onClick={handleProductClick}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-600">
//               {searchQuery 
//                 ? `No products found matching "${searchQuery}"`
//                 : 'No products found in this category'
//               }
//             </p>
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }

// export async function getStaticProps({ params }: { params: { category: string } }) {
//   try {
//     // Convert URL param back to proper category name
//     const categoryName = params.category.replace(/-/g, ' ');
    
//     const response = await fetchWithRetry<SearchResult>(
//       `${API_BASE}/search?category=${encodeURIComponent(categoryName)}`
//     );
    
//     return {
//       props: {
//         initialProducts: Array.isArray(response?.hits) ? response.hits : []
//       },
//       revalidate: 3600
//     };
//   } catch (error) {
//     console.error('Error fetching category products:', error);
//     return {
//       props: {
//         initialProducts: []
//       }
//     };
//   }
// }

// export async function getStaticPaths() {
//   try {
//     const categories = await fetchWithRetry<string[]>(
//       `${API_BASE}/categories`
//     )
    
//     const paths = Array.isArray(categories) ? categories.map((category) => ({
//       params: { category: category.toLowerCase().replace(/\s+/g, '-') }
//     })) : []

//     return {
//       paths,
//       fallback: 'blocking'
//     }
//   } catch (error) {
//     console.error('Error generating category paths:', error)
//     return {
//       paths: [],
//       fallback: 'blocking'
//     }
//   }
// }

// export default CategoryPage

// src/pages/category/[category].tsx - Updated with null safety
import { useRouter } from 'next/router'
import React, { useState, useEffect, useMemo } from 'react'
import Head from 'next/head'
import { Loader2 } from 'lucide-react'
import ProductCard from '../../components/ProductCard'
 import UpdatedHeaderBar from '../../components/UpdatedHeaderBar' 
import { fetchWithRetry, SearchResult } from '../../utils/api'
import type { NextPage } from 'next'
import { Product } from '../../utils/api'
import { slugify } from '../../utils/api'
import { smartShuffle, shuffleArray } from '../../utils/shuffle'

const API_BASE = "https://bhababackend.onrender.com"

interface CategoryPageProps {
  initialProducts: Product[]
}

const CategoryPage: NextPage<CategoryPageProps> = ({ initialProducts = [] }) => {
  const router = useRouter()
  const { category } = router.query
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortOption, setSortOption] = useState('relevance')
  const [, setShowFilters] = useState(false)

  useEffect(() => {
    if (category && (!initialProducts || initialProducts.length === 0)) {
      const fetchCategoryProducts = async () => {
        setLoading(true);
        try {
          const categoryName = typeof category === 'string' 
            ? category.replace(/-/g, ' ')
            : '';
          
          const response = await fetchWithRetry<SearchResult>(
            `${API_BASE}/search?category=${encodeURIComponent(categoryName)}`
          );
          
          setProducts(Array.isArray(response?.hits) ? response.hits : []);
        } catch (error) {
          console.error('Error fetching category products:', error);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      };
      fetchCategoryProducts();
    }
  }, [category, initialProducts]);

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return []
    if (!searchQuery) return products
    
    return products.filter(product => 
      (product?.product_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product?.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product?.vendorName || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [products, searchQuery])

  // const sortedProducts = useMemo(() => {
  //   if (!Array.isArray(filteredProducts)) return []
    
  //   const productsToSort = [...filteredProducts]
    
  //   switch(sortOption) {
  //     case 'price-asc':
  //       return productsToSort.sort((a, b) => {
  //         const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price
  //         const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price
  //         return priceA - priceB
  //       })
  //     case 'price-desc':
  //       return productsToSort.sort((a, b) => {
  //         const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price
  //         const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price
  //         return priceB - priceA
  //       })
  //     case 'newest':
  //       return productsToSort.sort((a, b) => 
  //         new Date(b.added_at).getTime() - new Date(a.added_at).getTime()
  //       )
  //     case 'discount':
  //       return productsToSort.sort((a, b) => (b.discount || 0) - (a.discount || 0))
  //     default:
  //       return productsToSort
  //   }
  // }, [filteredProducts, sortOption])

  // In src/pages/category/[category].tsx - Replace the existing sortedProducts useMemo

const sortedProducts = useMemo(() => {
  if (!Array.isArray(filteredProducts)) return []

  const productsToSort = [...filteredProducts]

  // Apply sorting first
  switch(sortOption) {
    case 'price-asc':
      productsToSort.sort((a, b) => {
        const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price
        const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price
        return priceA - priceB
      })
      break
    case 'price-desc':
      productsToSort.sort((a, b) => {
        const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price
        const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price
        return priceB - priceA
      })
      break
    case 'newest':
      productsToSort.sort((a, b) =>
        new Date(b.added_at).getTime() - new Date(a.added_at).getTime()
      )
      break
    case 'discount':
      productsToSort.sort((a, b) => (b.discount || 0) - (a.discount || 0))
      break
    default:
      // For 'relevance' or default, don't sort but apply shuffling below
      break
  }

  // Apply shuffling AFTER sorting
  if (sortOption === 'relevance' || !sortOption) {
    // Since all products in category page are from same category, 
    // shuffle by vendor to distribute vendors evenly
    return smartShuffle(productsToSort, 'vendorId')
  } else {
    // For sorted results, apply shuffle to add variety while maintaining general sort order
    return shuffleArray(productsToSort)
  }
}, [filteredProducts, sortOption])

  const handleProductClick = (product: Product) => {
    const slug = `${slugify(product.product_name)}_${product.id}`
    const categorySlug = (product.categoryName || 'uncategorized').toLowerCase().replace(/\s+/g, '-')
    router.push(`/product/${categorySlug}/${slug}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500 mx-auto mb-3" />
          <p className="text-sm text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{category} | Bhaba Marketplace</title>
        <meta name="description" content={`Browse ${category} products on Bhaba Marketplace`} />
      </Head>

      <UpdatedHeaderBar  
        showBackButton={true}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        setShowFilters={setShowFilters}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
          {category}
        </h1>

        {sortedProducts.length > 0 ? (
          <div className={
  viewMode === 'grid'
    ? "columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4"
    : "space-y-4"
}>
            {sortedProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                viewMode={viewMode}
                onClick={handleProductClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {searchQuery 
                ? `No products found matching "${searchQuery}"`
                : 'No products found in this category'
              }
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export async function getStaticProps({ params }: { params: { category: string } }) {
  try {
    const categoryName = params.category.replace(/-/g, ' ');
    
    const response = await fetchWithRetry<SearchResult>(
      `${API_BASE}/search?category=${encodeURIComponent(categoryName)}`
    );
    
    return {
      props: {
        initialProducts: Array.isArray(response?.hits) ? response.hits : []
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching category products:', error);
    return {
      props: {
        initialProducts: []
      }
    };
  }
}

export async function getStaticPaths() {
  try {
    const categories = await fetchWithRetry<string[]>(
      `${API_BASE}/categories`
    )
    
    const paths = Array.isArray(categories) ? categories.map((category) => ({
      params: { category: category.toLowerCase().replace(/\s+/g, '-') }
    })) : []

    return {
      paths,
      fallback: 'blocking'
    }
  } catch (error) {
    console.error('Error generating category paths:', error)
    return {
      paths: [],
      fallback: 'blocking'
    }
  }
}

export default CategoryPage
