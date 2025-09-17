// // src/components/FilterModal.tsx
// import React from 'react'
// import { X } from 'lucide-react'

// interface Vendor {
//   id: string
//   store_name: string
//   store_logo: string
// }

// interface Category {
//   id: string
//   category_name: string
// }

// interface Filters {
//   categories: string[]
//   vendors: string[]
//   priceRange: [number, number]
//   inStock: boolean
// }

// interface FilterModalProps {
//   isOpen: boolean
//   onClose: () => void
//   categories: Category[]
//   vendors: Vendor[]
//   filters: Filters
//   onFiltersChange: (filters: Filters) => void
// }

// const FilterModal: React.FC<FilterModalProps> = ({ 
//   isOpen, 
//   onClose, 
//   categories, 
//   vendors, 
//   filters, 
//   onFiltersChange 
// }) => {
//   if (!isOpen) return null

//   const handleCategoryChange = (categoryId: string) => {
//     const newCategories = filters.categories.includes(categoryId)
//       ? filters.categories.filter(id => id !== categoryId)
//       : [...filters.categories, categoryId]
    
//     onFiltersChange({ ...filters, categories: newCategories })
//   }

//   const handleVendorChange = (vendorId: string) => {
//     const newVendors = filters.vendors.includes(vendorId)
//       ? filters.vendors.filter(id => id !== vendorId)
//       : [...filters.vendors, vendorId]
    
//     onFiltersChange({ ...filters, vendors: newVendors })
//   }

//   const clearFilters = () => {
//     onFiltersChange({
//       categories: [],
//       vendors: [],
//       priceRange: [0, 10000000],
//       inStock: false
//     })
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
//       {/* ... rest of your JSX remains the same ... */}
//         <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
//         <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
//           <h2 className="text-lg sm:text-xl font-bold text-gray-900">Filters</h2>
//           <button
//             onClick={onClose}
//             className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="h-5 w-5 sm:h-6 sm:w-6" />
//           </button>
//         </div>
        
//         <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          
//           {/* Categories */}
//           <div>
//             <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3">Categories</h3>
//             <div className="space-y-2 max-h-40 overflow-y-auto">
//               {categories.map((category) => (
//                 <label key={category.id} className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     checked={filters.categories.includes(category.id)}
//                     onChange={() => handleCategoryChange(category.id)}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                   <span className="text-xs sm:text-sm text-gray-700">{category.category_name}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
          
//           {/* Vendors */}
//           <div>
//             <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3">Vendors</h3>
//             <div className="space-y-2 max-h-40 overflow-y-auto">
//               {vendors.map((vendor) => (
//                 <label key={vendor.id} className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     checked={filters.vendors.includes(vendor.id)}
//                     onChange={() => handleVendorChange(vendor.id)}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                   <span className="text-xs sm:text-sm text-gray-700">{vendor.store_name}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
          
//           {/* Price Range */}
//           <div>
//   <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3">Price Range (TZS)</h3>
//   <div className="space-y-2 sm:space-y-3">
//     <div className="flex gap-2">
//       <input
//         type="number"
//         placeholder="Min"
//         value={filters.priceRange[0]}
//         onChange={(e) => onFiltersChange({
//           ...filters,
//           priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]]
//         })}
//         className="flex-1 px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm"
//       />
//       <span className="flex items-center">to</span>
//       <input
//         type="number"
//         placeholder="Max"
//         value={filters.priceRange[1]}
//         onChange={(e) => onFiltersChange({
//           ...filters,
//           priceRange: [filters.priceRange[0], parseInt(e.target.value) || 10000000]
//         })}
//         className="flex-1 px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm"
//       />
//     </div>
//     <div className="px-2">
//       <input
//         type="range"
//         min="0"
//         max="10000000"
//         step="1000"
//         value={filters.priceRange[0]}
//         onChange={(e) => onFiltersChange({
//           ...filters,
//           priceRange: [parseInt(e.target.value), filters.priceRange[1]]
//         })}
//         className="w-full"
//       />
//       <input
//         type="range"
//         min="0"
//         max="10000000"
//         step="1000"
//         value={filters.priceRange[1]}
//         onChange={(e) => onFiltersChange({
//           ...filters,
//           priceRange: [filters.priceRange[0], parseInt(e.target.value)]
//         })}
//         className="w-full"
//       />
//     </div>
//   </div>
// </div>
          
//           {/* Stock Status */}
//           <div>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={filters.inStock}
//                 onChange={(e) => onFiltersChange({ ...filters, inStock: e.target.checked })}
//                 className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//               />
//               <span className="text-xs sm:text-sm text-gray-700">In Stock Only</span>
//             </label>
//           </div>
          
//           <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
//             <button
//               onClick={clearFilters}
//               className="flex-1 bg-gray-200 text-gray-800 py-2 px-3 sm:px-4 rounded-md hover:bg-gray-300 transition-colors text-xs sm:text-sm"
//             >
//               Clear All
//             </button>
//             <button
//               onClick={onClose}
//               className="flex-1 bg-blue-500 text-white py-2 px-3 sm:px-4 rounded-md hover:bg-blue-600 transition-colors text-xs sm:text-sm"
//             >
//               Apply Filters
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FilterModal
// src/components/FilterModal.tsx - Fixed TypeError with null checks
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { X, Search, Check, Sliders, RefreshCw } from 'lucide-react'

interface Vendor {
  id: string
  store_name: string
  store_logo: string
}

interface Category {
  id: string
  category_name: string
}

interface Filters {
  categories: string[]
  vendors: string[]
  priceRange: [number, number]
  inStock: boolean
}

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
  vendors: Vendor[]
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

const FilterModal: React.FC<FilterModalProps> = ({ 
  isOpen, 
  onClose, 
  categories, 
  vendors, 
  filters, 
  onFiltersChange 
}) => {
  const [localFilters, setLocalFilters] = useState<Filters>(filters)
  const [categorySearch, setCategorySearch] = useState('')
  const [vendorSearch, setVendorSearch] = useState('')
  const [activeTab, setActiveTab] = useState<'categories' | 'vendors' | 'price' | 'availability'>('categories')
  const [hasChanges, setHasChanges] = useState(false)

  // Sync local filters with prop filters when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters)
      setHasChanges(false)
      setCategorySearch('')
      setVendorSearch('')
    }
  }, [isOpen, filters])

  // Check for changes
  useEffect(() => {
    const filtersChanged = JSON.stringify(localFilters) !== JSON.stringify(filters)
    setHasChanges(filtersChanged)
  }, [localFilters, filters])

  // Filtered categories based on search - Fixed with null checks
  const filteredCategories = useMemo(() => {
    if (!categorySearch) return categories
    return categories.filter(category => {
      // Add null check for category_name
      if (!category?.category_name) return false
      return category.category_name.toLowerCase().includes(categorySearch.toLowerCase())
    })
  }, [categories, categorySearch])

  // Filtered vendors based on search - Fixed with null checks
  const filteredVendors = useMemo(() => {
    if (!vendorSearch) return vendors
    return vendors.filter(vendor => {
      // Add null check for store_name
      if (!vendor?.store_name) return false
      return vendor.store_name.toLowerCase().includes(vendorSearch.toLowerCase())
    })
  }, [vendors, vendorSearch])

  const handleCategoryChange = useCallback((categoryId: string) => {
    setLocalFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }))
  }, [])

  const handleVendorChange = useCallback((vendorId: string) => {
    setLocalFilters(prev => ({
      ...prev,
      vendors: prev.vendors.includes(vendorId)
        ? prev.vendors.filter(id => id !== vendorId)
        : [...prev.vendors, vendorId]
    }))
  }, [])

  const handlePriceChange = useCallback((type: 'min' | 'max', value: number) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: type === 'min' 
        ? [value, prev.priceRange[1]]
        : [prev.priceRange[0], value]
    }))
  }, [])

  const clearFilters = useCallback(() => {
    const clearedFilters = {
      categories: [],
      vendors: [],
      priceRange: [0, 10000000] as [number, number],
      inStock: false
    }
    setLocalFilters(clearedFilters)
  }, [])

  const applyFilters = useCallback(() => {
    onFiltersChange(localFilters)
    onClose()
  }, [localFilters, onFiltersChange, onClose])

  const resetToOriginal = useCallback(() => {
    setLocalFilters(filters)
    setHasChanges(false)
  }, [filters])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return
      
      if (event.key === 'Escape') {
        onClose()
      }
      if (event.key === 'Enter' && hasChanges) {
        applyFilters()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, hasChanges, applyFilters])

  if (!isOpen) return null

  const tabs: Array<{
    id: 'categories' | 'vendors' | 'price' | 'availability'
    label: string
    count: number
  }> = [
    { id: 'categories', label: 'Categories', count: localFilters.categories.length },
    { id: 'vendors', label: 'Vendors', count: localFilters.vendors.length },
    { id: 'price', label: 'Price', count: localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 10000000 ? 1 : 0 },
    { id: 'availability', label: 'Stock', count: localFilters.inStock ? 1 : 0 },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sliders className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            {hasChanges && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                Changes pending
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 max-h-96 overflow-y-auto">
          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredCategories.map((category) => (
                  <label 
                    key={category.id} 
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={localFilters.categories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        localFilters.categories.includes(category.id)
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}>
                        {localFilters.categories.includes(category.id) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-gray-700 flex-1">
                      {category?.category_name || 'Unnamed Category'}
                    </span>
                  </label>
                ))}
                
                {filteredCategories.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No categories found matching &quot;{categorySearch}&quot;</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Vendors Tab */}
          {activeTab === 'vendors' && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={vendorSearch}
                  onChange={(e) => setVendorSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredVendors.map((vendor) => (
                  <label 
                    key={vendor.id} 
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={localFilters.vendors.includes(vendor.id)}
                        onChange={() => handleVendorChange(vendor.id)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        localFilters.vendors.includes(vendor.id)
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}>
                        {localFilters.vendors.includes(vendor.id) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-gray-700 flex-1">
                      {vendor?.store_name || 'Unnamed Vendor'}
                    </span>
                  </label>
                ))}
                
                {filteredVendors.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No vendors found matching &quot;{vendorSearch}&quot;</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Price Tab */}
          {activeTab === 'price' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Price Range (TZS)</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Minimum
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        value={localFilters.priceRange[0] || ''}
                        onChange={(e) => handlePriceChange('min', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Maximum
                      </label>
                      <input
                        type="number"
                        placeholder="10,000,000"
                        value={localFilters.priceRange[1] === 10000000 ? '' : localFilters.priceRange[1]}
                        onChange={(e) => handlePriceChange('max', parseInt(e.target.value) || 10000000)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Price range slider */}
                  <div className="px-2">
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="1000000"
                        step="10000"
                        value={Math.min(localFilters.priceRange[0], 1000000)}
                        onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000000"
                        step="10000"
                        value={Math.min(localFilters.priceRange[1], 1000000)}
                        onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb mt-2"
                      />
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>TZS 0</span>
                      <span>TZS 1M+</span>
                    </div>
                  </div>

                  {/* Quick price filters */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Under 50K', range: [0, 50000] },
                      { label: '50K - 200K', range: [50000, 200000] },
                      { label: '200K - 500K', range: [200000, 500000] },
                      { label: '500K+', range: [500000, 10000000] },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => setLocalFilters(prev => ({ ...prev, priceRange: preset.range as [number, number] }))}
                        className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                          localFilters.priceRange[0] === preset.range[0] && 
                          localFilters.priceRange[1] === preset.range[1]
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Availability Tab */}
          {activeTab === 'availability' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Product Availability</h3>
              
              <label className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={localFilters.inStock}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    localFilters.inStock
                      ? 'bg-green-600 border-green-600'
                      : 'border-gray-300 hover:border-green-400'
                  }`}>
                    {localFilters.inStock && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-gray-900 font-medium">In Stock Only</span>
                  <p className="text-sm text-gray-500">Show only products that are currently available</p>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t px-4 sm:px-6 py-4">
          <div className="flex gap-3">
            <button
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <RefreshCw className="h-4 w-4" />
              Clear All
            </button>
            
            {hasChanges && (
              <button
                onClick={resetToOriginal}
                className="flex-1 bg-orange-100 text-orange-800 py-3 px-4 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium"
              >
                Reset
              </button>
            )}
            
            <button
              onClick={applyFilters}
              className={`flex-1 py-3 px-4 rounded-lg transition-colors text-sm font-medium ${
                hasChanges
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-100 text-blue-800 cursor-default'
              }`}
              disabled={!hasChanges}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterModal