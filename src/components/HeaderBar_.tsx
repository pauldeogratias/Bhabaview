// // // // // src/components/HeaderBar.tsx
// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { Search, Filter, Grid, List, ChevronLeft, ArrowUpDown, Menu, X, Sparkles } from 'lucide-react';
// // // // import Head from 'next/head';
// // // // import Image from 'next/image';
// // // // import Link from 'next/link';
// // // // import { useDebounce } from '../hooks/useDebounce';

// // // // interface HeaderBarProps {
// // // //   searchQuery?: string;
// // // //   setSearchQuery?: (query: string) => void;
// // // //   viewMode?: 'grid' | 'list';
// // // //   setViewMode?: (mode: 'grid' | 'list') => void;
// // // //   setShowFilters?: (show: boolean) => void;
// // // //   sortOption?: string;
// // // //   setSortOption?: (option: string) => void;
// // // //   showBackButton?: boolean;
// // // //   onBack?: () => void;
// // // //   showSearch?: boolean;
// // // //   showViewToggle?: boolean;
// // // //   showSort?: boolean;
// // // //   showFilter?: boolean;
// // // // }

// // // // const HeaderBar: React.FC<HeaderBarProps> = ({
// // // //   searchQuery = '',
// // // //   setSearchQuery = () => {},
// // // //   viewMode = 'grid',
// // // //   setViewMode = () => {},
// // // //   setShowFilters = () => {},
// // // //   sortOption = 'relevance',
// // // //   setSortOption = () => {},
// // // //   showBackButton = false,
// // // //   onBack = () => {},
// // // //   showSearch = true,
// // // //   showViewToggle = true,
// // // //   showSort = true,
// // // //   showFilter = true,
// // // // }) => {
// // // //   const [showSortPopup, setShowSortPopup] = useState(false);
// // // //   const [showMobileMenu, setShowMobileMenu] = useState(false);
// // // //   const [isSearchFocused, setIsSearchFocused] = useState(false);
// // // //   const [scrollY, setScrollY] = useState(0);
// // // //   const debouncedSearchQuery = useDebounce(searchQuery, 300);
// // // //   const sortPopupRef = useRef<HTMLDivElement>(null);

// // // //   const sortOptions = [
// // // //     { value: 'relevance', label: 'Relevance', icon: '⭐' },
// // // //     { value: 'price-asc', label: 'Price: Low to High', icon: '📈' },
// // // //     { value: 'price-desc', label: 'Price: High to Low', icon: '📉' },
// // // //     { value: 'newest', label: 'Newest', icon: '🆕' },
// // // //     { value: 'discount', label: 'Best Discount', icon: '🏷️' },
// // // //   ];

// // // //   const handleSortChange = (option: string) => {
// // // //     setSortOption(option);
// // // //     setShowSortPopup(false);
// // // //   };

// // // //   // Handle scroll effect for header transparency
// // // //   useEffect(() => {
// // // //     const handleScroll = () => setScrollY(window.scrollY);
// // // //     window.addEventListener('scroll', handleScroll);
// // // //     return () => window.removeEventListener('scroll', handleScroll);
// // // //   }, []);

// // // //   // Close sort popup when clicking outside
// // // //   useEffect(() => {
// // // //     const handleClickOutside = (event: MouseEvent) => {
// // // //       if (sortPopupRef.current && !sortPopupRef.current.contains(event.target as Node)) {
// // // //         setShowSortPopup(false);
// // // //       }
// // // //     };

// // // //     document.addEventListener('mousedown', handleClickOutside);
// // // //     return () => document.removeEventListener('mousedown', handleClickOutside);
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     if (debouncedSearchQuery.trim() === '') return;
// // // //     console.log('Searching for:', debouncedSearchQuery);
// // // //   }, [debouncedSearchQuery]);

// // // //   return (
// // // //     <>
// // // //       <Head>
// // // //         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
// // // //       </Head>
      
// // // //       {/* Mobile Menu Overlay */}
// // // //       {showMobileMenu && (
// // // //         <div 
// // // //           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden animate-in fade-in duration-200"
// // // //           onClick={() => setShowMobileMenu(false)}
// // // //         >
// // // //           <div 
// // // //             className="absolute right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-200/50 animate-in slide-in-from-right duration-300"
// // // //             onClick={(e) => e.stopPropagation()}
// // // //           >
// // // //             <div className="p-6 border-b border-gray-200/80 bg-gradient-to-r from-blue-50 to-purple-50">
// // // //               <div className="flex items-center justify-between">
// // // //                 <div className="flex items-center gap-3">
// // // //                   <Sparkles className="h-5 w-5 text-blue-600" />
// // // //                   <h3 className="font-bold text-gray-900 text-lg">Menu</h3>
// // // //                 </div>
// // // //                 <button 
// // // //                   onClick={() => setShowMobileMenu(false)}
// // // //                   className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
// // // //                 >
// // // //                   <X className="h-5 w-5 text-gray-600" />
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //             <nav className="p-6">
// // // //               <div className="space-y-2">
// // // //                 {[
// // // //                   { href: '/privacy-policy', label: 'Privacy Policy', icon: '🛡️' },
// // // //                   { href: '/terms-of-service', label: 'Terms of Service', icon: '📋' },
// // // //                   { href: '/privacy-policy-full', label: 'Full Privacy Policy', icon: '🔒' },
// // // //                   { href: '/terms-of-service-full', label: 'Full Terms of Service', icon: '📄' },
// // // //                   { href: '/account', label: 'Account', icon: '👤' },
// // // //                 ].map((item) => (
// // // //                   <Link 
// // // //                     key={item.href}
// // // //                     href={item.href} 
// // // //                     className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
// // // //                   >
// // // //                     <span className="text-lg group-hover:scale-110 transition-transform duration-200">
// // // //                       {item.icon}
// // // //                     </span>
// // // //                     <span className="font-medium">{item.label}</span>
// // // //                   </Link>
// // // //                 ))}
// // // //               </div>
// // // //             </nav>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       <header className={`sticky top-0 z-40 transition-all duration-300 ${
// // // //         scrollY > 20 
// // // //           ? 'bg-white/80 backdrop-blur-xl shadow-xl border-b border-gray-200/50' 
// // // //           : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg'
// // // //       }`}>
// // // //         <div className="max-w-7xl mx-auto px-3 sm:px-6">
// // // //           <div className="flex items-center justify-between h-16 sm:h-18">
// // // //             {/* Left side - logo, menu button, and title */}
// // // //             <div className="flex items-center space-x-2 sm:space-x-4">
// // // //               {/* Mobile menu button */}
// // // //               <button
// // // //                 onClick={() => setShowMobileMenu(true)}
// // // //                 className={`lg:hidden p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
// // // //                   scrollY > 20 
// // // //                     ? 'text-gray-700 hover:bg-gray-100' 
// // // //                     : 'text-white hover:bg-white/20'
// // // //                 }`}
// // // //                 aria-label="Open menu"
// // // //               >
// // // //                 <Menu className="h-5 w-5" />
// // // //               </button>

// // // //               {showBackButton && (
// // // //                 <button
// // // //                   onClick={onBack}
// // // //                   className={`p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
// // // //                     scrollY > 20 
// // // //                       ? 'text-gray-700 hover:bg-gray-100' 
// // // //                       : 'text-white hover:bg-white/20'
// // // //                   }`}
// // // //                 >
// // // //                   <ChevronLeft className="h-5 w-5" />
// // // //                 </button>
// // // //               )}
              
// // // //               <Link href="/" className="flex items-center group">
// // // //                 <div className="relative w-10 h-10 sm:w-12 sm:h-12 mr-3 group-hover:scale-110 transition-transform duration-200">
// // // //                   <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg"></div>
// // // //                   <Image
// // // //                     src="/Bhaba_logo.png"
// // // //                     alt="Bhaba Logo"
// // // //                     layout="fill"
// // // //                     objectFit="contain"
// // // //                     className="rounded-xl p-1"
// // // //                     priority
// // // //                   />
// // // //                 </div>
// // // //                 <div>
// // // //                   <h1 className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
// // // //                     scrollY > 20 ? 'text-gray-900' : 'text-white'
// // // //                   }`}>
// // // //                     Bhaba
// // // //                   </h1>
// // // //                   <p className={`text-xs transition-colors duration-300 ${
// // // //                     scrollY > 20 ? 'text-gray-500' : 'text-white/80'
// // // //                   }`}>
// // // //                     Discover Amazing
// // // //                   </p>
// // // //                 </div>
// // // //               </Link>
// // // //             </div>

// // // //             {/* Desktop Navigation - Hidden on mobile */}
// // // //             <nav className="hidden lg:flex items-center space-x-1">
// // // //               {[
// // // //                 { href: '/privacy-policy', label: 'Privacy' },
// // // //                 { href: '/terms-of-service', label: 'Terms' },
// // // //                 { href: '/account', label: 'Account' },
// // // //               ].map((item) => (
// // // //                 <Link 
// // // //                   key={item.href}
// // // //                   href={item.href} 
// // // //                   className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 ${
// // // //                     scrollY > 20 
// // // //                       ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
// // // //                       : 'text-white hover:text-gray-200 hover:bg-white/20'
// // // //                   }`}
// // // //                 >
// // // //                   {item.label}
// // // //                 </Link>
// // // //               ))}
// // // //             </nav>

// // // //             {/* Center - search bar */}
// // // //             {showSearch && (
// // // //               <div className="flex-1 mx-4 sm:mx-6 min-w-0 max-w-2xl">
// // // //                 <div className={`relative transition-all duration-300 ${
// // // //                   isSearchFocused ? 'transform scale-105' : ''
// // // //                 }`}>
// // // //                   <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
// // // //                     isSearchFocused ? 'text-blue-500' : 'text-gray-400'
// // // //                   }`} />
// // // //                   <input
// // // //                     type="text"
// // // //                     placeholder="Search for amazing products..."
// // // //                     value={searchQuery}
// // // //                     onChange={(e) => setSearchQuery(e.target.value)}
// // // //                     onFocus={() => setIsSearchFocused(true)}
// // // //                     onBlur={() => setIsSearchFocused(false)}
// // // //                     className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500 shadow-lg hover:shadow-xl transition-all duration-300"
// // // //                   />
// // // //                   {searchQuery && (
// // // //                     <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
// // // //                       <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {/* Right side - actions */}
// // // //             <div className="flex items-center gap-2">
// // // //               {/* Sort dropdown - desktop */}
// // // //               {showSort && (
// // // //                 <>
// // // //                   <div className="hidden sm:block">
// // // //                     <select
// // // //                       value={sortOption}
// // // //                       onChange={(e) => setSortOption(e.target.value)}
// // // //                       className="text-sm border border-gray-200/50 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
// // // //                     >
// // // //                       {sortOptions.map((option) => (
// // // //                         <option key={option.value} value={option.value}>
// // // //                           {option.icon} {option.label}
// // // //                         </option>
// // // //                       ))}
// // // //                     </select>
// // // //                   </div>

// // // //                   {/* Sort button - mobile */}
// // // //                   <div className="sm:hidden relative" ref={sortPopupRef}>
// // // //                     <button
// // // //                       onClick={() => setShowSortPopup(!showSortPopup)}
// // // //                       className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${
// // // //                         showSortPopup 
// // // //                           ? 'bg-blue-500 text-white shadow-blue-500/50' 
// // // //                           : scrollY > 20 
// // // //                             ? 'bg-white/80 text-gray-700 hover:bg-gray-100' 
// // // //                             : 'bg-white/20 text-white hover:bg-white/30'
// // // //                       }`}
// // // //                       title="Sort options"
// // // //                     >
// // // //                       <ArrowUpDown className="h-4 w-4" />
// // // //                     </button>

// // // //                     {showSortPopup && (
// // // //                       <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
// // // //                         {sortOptions.map((option) => (
// // // //                           <button
// // // //                             key={option.value}
// // // //                             onClick={() => handleSortChange(option.value)}
// // // //                             className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:scale-95 ${
// // // //                               sortOption === option.value
// // // //                                 ? 'bg-blue-100 text-blue-800 font-medium'
// // // //                                 : 'text-gray-700 hover:bg-gray-50'
// // // //                             }`}
// // // //                           >
// // // //                             <span className="text-base">{option.icon}</span>
// // // //                             {option.label}
// // // //                           </button>
// // // //                         ))}
// // // //                       </div>
// // // //                     )}
// // // //                   </div>
// // // //                 </>
// // // //               )}

// // // //               {/* Filter button */}
// // // //               {showFilter && (
// // // //                 <button
// // // //                   onClick={() => setShowFilters(true)}
// // // //                   className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${
// // // //                     scrollY > 20 
// // // //                       ? 'bg-white/80 text-gray-700 hover:bg-gray-100' 
// // // //                       : 'bg-white/20 text-white hover:bg-white/30'
// // // //                   }`}
// // // //                   title="Filters"
// // // //                 >
// // // //                   <Filter className="h-4 w-4" />
// // // //                 </button>
// // // //               )}

// // // //               {/* View toggle */}
// // // //               {showViewToggle && (
// // // //                 <button
// // // //                   onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
// // // //                   className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${
// // // //                     scrollY > 20 
// // // //                       ? 'bg-white/80 text-gray-700 hover:bg-gray-100' 
// // // //                       : 'bg-white/20 text-white hover:bg-white/30'
// // // //                   }`}
// // // //                   title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
// // // //                 >
// // // //                   {viewMode === 'grid' ? (
// // // //                     <List className="h-4 w-4" />
// // // //                   ) : (
// // // //                     <Grid className="h-4 w-4" />
// // // //                   )}
// // // //                 </button>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Progress indicator */}
// // // //         <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30"></div>
// // // //       </header>
// // // //     </>
// // // //   );
// // // // };

// // // // export default HeaderBar;



// // // // src/components/HeaderBar.tsx
// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { Search, Filter, Grid, List, ChevronLeft, ArrowUpDown, Menu, X, Sparkles } from 'lucide-react';
// // // import Head from 'next/head';
// // // import Image from 'next/image';
// // // import Link from 'next/link';
// // // import { useDebounce } from '../hooks/useDebounce';

// // // interface HeaderBarProps {
// // //   searchQuery?: string;
// // //   setSearchQuery?: (query: string) => void;
// // //   viewMode?: 'grid' | 'list';
// // //   setViewMode?: (mode: 'grid' | 'list') => void;
// // //   setShowFilters?: (show: boolean) => void;
// // //   sortOption?: string;
// // //   setSortOption?: (option: string) => void;
// // //   showBackButton?: boolean;
// // //   onBack?: () => void;
// // //   showSearch?: boolean;
// // //   showViewToggle?: boolean;
// // //   showSort?: boolean;
// // //   showFilter?: boolean;
// // // }

// // // const HeaderBar: React.FC<HeaderBarProps> = ({
// // //   searchQuery = '',
// // //   setSearchQuery = () => {},
// // //   viewMode = 'grid',
// // //   setViewMode = () => {},
// // //   setShowFilters = () => {},
// // //   sortOption = 'relevance',
// // //   setSortOption = () => {},
// // //   showBackButton = false,
// // //   onBack = () => {},
// // //   showSearch = true,
// // //   showViewToggle = true,
// // //   showSort = true,
// // //   showFilter = true,
// // // }) => {
// // //   const [showSortPopup, setShowSortPopup] = useState(false);
// // //   const [showMobileMenu, setShowMobileMenu] = useState(false);
// // //   const [isSearchFocused, setIsSearchFocused] = useState(false);
// // //   const [scrollY, setScrollY] = useState(0);
// // //   const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
// // //   const debouncedSearchQuery = useDebounce(searchQuery, 300);
// // //   const sortPopupRef = useRef<HTMLDivElement>(null);

// // //   const sortOptions = [
// // //     { value: 'relevance', label: 'Relevance', icon: '🎯' },
// // //     { value: 'price-asc', label: 'Price: Low to High', icon: '📈' },
// // //     { value: 'price-desc', label: 'Price: High to Low', icon: '📉' },
// // //     { value: 'newest', label: 'Newest', icon: '✨' },
// // //     { value: 'discount', label: 'Best Discount', icon: '🏷️' },
// // //   ];

// // //   const handleSortChange = (option: string) => {
// // //     setSortOption(option);
// // //     setShowSortPopup(false);
// // //   };

// // //   // Handle window resize
// // //   useEffect(() => {
// // //     const handleResize = () => {
// // //       setWindowWidth(window.innerWidth);
// // //       // Close mobile menu on desktop
// // //       if (window.innerWidth >= 1024) {
// // //         setShowMobileMenu(false);
// // //         setShowSortPopup(false);
// // //       }
// // //     };

// // //     window.addEventListener('resize', handleResize);
// // //     return () => window.removeEventListener('resize', handleResize);
// // //   }, []);

// // //   // Handle scroll effect for header transparency
// // //   useEffect(() => {
// // //     const handleScroll = () => setScrollY(window.scrollY);
// // //     window.addEventListener('scroll', handleScroll);
// // //     return () => window.removeEventListener('scroll', handleScroll);
// // //   }, []);

// // //   // Close sort popup when clicking outside
// // //   useEffect(() => {
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (sortPopupRef.current && !sortPopupRef.current.contains(event.target as Node)) {
// // //         setShowSortPopup(false);
// // //       }
// // //     };

// // //     document.addEventListener('mousedown', handleClickOutside);
// // //     return () => document.removeEventListener('mousedown', handleClickOutside);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (debouncedSearchQuery.trim() === '') return;
// // //     console.log('Searching for:', debouncedSearchQuery);
// // //   }, [debouncedSearchQuery]);

// // //   // Responsive breakpoints
// // //   const isMobile = windowWidth < 640;
// // //   const isTablet = windowWidth >= 640 && windowWidth < 1024;

// // //   return (
// // //     <>
// // //       <Head>
// // //         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
// // //       </Head>
      
// // //       {/* Mobile Menu Overlay */}
// // //       {showMobileMenu && (
// // //         <div 
// // //           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 xl:hidden animate-in fade-in duration-200"
// // //           onClick={() => setShowMobileMenu(false)}
// // //         >
// // //           <div 
// // //             className={`absolute right-0 top-0 h-full bg-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-200/50 animate-in slide-in-from-right duration-300 ${
// // //               isMobile ? 'w-full' : 'w-80'
// // //             }`}
// // //             onClick={(e) => e.stopPropagation()}
// // //           >
// // //             <div className="p-4 sm:p-6 border-b border-gray-200/80 bg-gradient-to-r from-blue-50 to-purple-50">
// // //               <div className="flex items-center justify-between">
// // //                 <div className="flex items-center gap-2 sm:gap-3">
// // //                   <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
// // //                   <h3 className="font-bold text-gray-900 text-base sm:text-lg">Menu</h3>
// // //                 </div>
// // //                 <button 
// // //                   onClick={() => setShowMobileMenu(false)}
// // //                   className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 touch-manipulation"
// // //                 >
// // //                   <X className="h-5 w-5 text-gray-600" />
// // //                 </button>
// // //               </div>
// // //             </div>
// // //             <nav className="p-4 sm:p-6">
// // //               <div className="space-y-1 sm:space-y-2">
// // //                 {[
// // //                   { href: '/privacy-policy-full', label: 'Privacy Policy', icon: '🛡️' },
// // //                   { href: '/terms-of-service-full', label: 'Terms of Service', icon: '📄' },
// // //                   { href: '/account', label: 'Account', icon: '👤' },
// // //                 ].map((item) => (
// // //                   <Link 
// // //                     key={item.href}
// // //                     href={item.href} 
// // //                     className="flex items-center gap-3 py-3 sm:py-4 px-3 sm:px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group touch-manipulation"
// // //                     onClick={() => setShowMobileMenu(false)}
// // //                   >
// // //                     <span className="text-base sm:text-lg group-hover:scale-110 transition-transform duration-200">
// // //                       {item.icon}
// // //                     </span>
// // //                     <span className="font-medium text-sm sm:text-base">{item.label}</span>
// // //                   </Link>
// // //                 ))}
// // //               </div>
// // //             </nav>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <header className={`sticky top-0 z-40 transition-all duration-300 ${
// // //         scrollY > 20 
// // //           ? 'bg-white/80 backdrop-blur-xl shadow-xl border-b border-gray-200/50' 
// // //           : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg'
// // //       }`}>
// // //         <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
// // //           <div className={`flex items-center justify-between transition-all duration-300 ${
// // //             isMobile ? 'h-14' : isTablet ? 'h-16' : 'h-16 lg:h-18'
// // //           }`}>
            
// // //             {/* Left side - menu button, back button, and logo */}
// // //             <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 min-w-0">
// // //               {/* Mobile menu button */}
// // //               <button
// // //                 onClick={() => setShowMobileMenu(true)}
// // //                 className={`xl:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-105 touch-manipulation ${
// // //                   scrollY > 20 
// // //                     ? 'text-gray-700 hover:bg-gray-100' 
// // //                     : 'text-white hover:bg-white/20'
// // //                 }`}
// // //                 aria-label="Open menu"
// // //               >
// // //                 <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
// // //               </button>

// // //               {showBackButton && (
// // //                 <button
// // //                   onClick={onBack}
// // //                   className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-105 touch-manipulation ${
// // //                     scrollY > 20 
// // //                       ? 'text-gray-700 hover:bg-gray-100' 
// // //                       : 'text-white hover:bg-white/20'
// // //                   }`}
// // //                 >
// // //                   <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
// // //                 </button>
// // //               )}
              
// // //               <Link href="/" className="flex items-center group min-w-0">
// // //                 <div className={`relative mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-200 flex-shrink-0 ${
// // //                   isMobile ? 'w-8 h-8' : isTablet ? 'w-10 h-10' : 'w-10 h-10 sm:w-12 sm:h-12'
// // //                 }`}>
// // //                   <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg"></div>
// // //                   <Image
// // //                     src="/Bhaba_logo.png"
// // //                     alt="Bhaba Logo"
// // //                     layout="fill"
// // //                     objectFit="contain"
// // //                     className="rounded-lg sm:rounded-xl p-1"
// // //                     priority
// // //                   />
// // //                 </div>
// // //                 <div className="min-w-0">
// // //                   <h1 className={`font-bold transition-colors duration-300 truncate ${
// // //                     isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-xl sm:text-2xl'
// // //                   } ${scrollY > 20 ? 'text-gray-900' : 'text-white'}`}>
// // //                     Bhaba
// // //                   </h1>
// // //                   <p className={`transition-colors duration-300 truncate ${
// // //                     isMobile ? 'text-xs' : 'text-xs sm:text-sm'
// // //                   } ${scrollY > 20 ? 'text-gray-500' : 'text-white/80'}`}>
// // //                     {isMobile ? 'Discover' : 'Discover Amazing'}
// // //                   </p>
// // //                 </div>
// // //               </Link>
// // //             </div>

// // //             {/* Desktop Navigation - Hidden on mobile and tablet */}
// // //             <nav className="hidden xl:flex items-center space-x-1">
// // //               {[
// // //                 { href: '/privacy-policy-full', label: 'Privacy' },
// // //                 { href: '/terms-of-service-full', label: 'Terms' },
// // //                 { href: '/account', label: 'Account' },
// // //               ].map((item) => (
// // //                 <Link 
// // //                   key={item.href}
// // //                   href={item.href} 
// // //                   className={`px-3 lg:px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 whitespace-nowrap ${
// // //                     scrollY > 20 
// // //                       ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
// // //                       : 'text-white hover:text-gray-200 hover:bg-white/20'
// // //                   }`}
// // //                 >
// // //                   {item.label}
// // //                 </Link>
// // //               ))}
// // //             </nav>

// // //             {/* Center - search bar */}
// // //             {showSearch && (
// // //               <div className={`mx-2 sm:mx-4 lg:mx-6 min-w-0 transition-all duration-300 ${
// // //                 isMobile ? 'flex-1' : isTablet ? 'flex-1 max-w-md' : 'flex-1 max-w-2xl'
// // //               } ${isSearchFocused ? 'transform scale-105' : ''}`}>
// // //                 <div className="relative">
// // //                   <Search className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
// // //                     isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'
// // //                   } ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'}`} />
// // //                   <input
// // //                     type="text"
// // //                     placeholder={isMobile ? "Search..." : isTablet ? "Search products..." : "Search for amazing products..."}
// // //                     value={searchQuery}
// // //                     onChange={(e) => setSearchQuery(e.target.value)}
// // //                     onFocus={() => setIsSearchFocused(true)}
// // //                     onBlur={() => setIsSearchFocused(false)}
// // //                     className={`w-full bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 shadow-lg hover:shadow-xl transition-all duration-300 ${
// // //                       isMobile 
// // //                         ? 'pl-9 pr-3 py-2 text-sm' 
// // //                         : isTablet 
// // //                           ? 'pl-10 pr-4 py-2.5 text-sm' 
// // //                           : 'pl-11 pr-4 py-2.5 sm:py-3 text-sm'
// // //                     }`}
// // //                   />
// // //                   {searchQuery && (
// // //                     <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
// // //                       <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse"></div>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* Right side - actions */}
// // //             <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
// // //               {/* Sort dropdown - desktop and tablet */}
// // //               {showSort && (
// // //                 <>
// // //                   <div className="hidden md:block">
// // //                     <select
// // //                       value={sortOption}
// // //                       onChange={(e) => setSortOption(e.target.value)}
// // //                       className={`border border-gray-200/50 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer ${
// // //                         isTablet ? 'text-xs px-2 py-2' : 'text-sm px-3 py-2'
// // //                       }`}
// // //                     >
// // //                       {sortOptions.map((option) => (
// // //                         <option key={option.value} value={option.value}>
// // //                           {isTablet ? option.label.split(':')[0] : `${option.icon} ${option.label}`}
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                   </div>

// // //                   {/* Sort button - mobile */}
// // //                   <div className="md:hidden relative" ref={sortPopupRef}>
// // //                     <button
// // //                       onClick={() => setShowSortPopup(!showSortPopup)}
// // //                       className={`rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-105 shadow-lg touch-manipulation ${
// // //                         isMobile ? 'p-2' : 'p-2.5'
// // //                       } ${
// // //                         showSortPopup 
// // //                           ? 'bg-blue-500 text-white shadow-blue-500/50' 
// // //                           : scrollY > 20 
// // //                             ? 'bg-white/80 text-gray-700 hover:bg-gray-100' 
// // //                             : 'bg-white/20 text-white hover:bg-white/30'
// // //                       }`}
// // //                       title="Sort options"
// // //                     >
// // //                       <ArrowUpDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
// // //                     </button>

// // //                     {showSortPopup && (
// // //                       <div className={`absolute right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-xl lg:rounded-2xl shadow-2xl border border-gray-200/50 z-50 py-1 sm:py-2 animate-in fade-in slide-in-from-top-2 duration-200 ${
// // //                         isMobile ? 'w-48' : 'w-56'
// // //                       }`}>
// // //                         {sortOptions.map((option) => (
// // //                           <button
// // //                             key={option.value}
// // //                             onClick={() => handleSortChange(option.value)}
// // //                             className={`flex items-center gap-2 sm:gap-3 w-full text-left px-3 sm:px-4 py-2 sm:py-3 transition-all duration-200 hover:scale-95 touch-manipulation ${
// // //                               isMobile ? 'text-xs' : 'text-sm'
// // //                             } ${
// // //                               sortOption === option.value
// // //                                 ? 'bg-blue-100 text-blue-800 font-medium'
// // //                                 : 'text-gray-700 hover:bg-gray-50'
// // //                             }`}
// // //                           >
// // //                             <span className="text-sm sm:text-base">{option.icon}</span>
// // //                             <span className="truncate">{option.label}</span>
// // //                           </button>
// // //                         ))}
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </>
// // //               )}

// // //               {/* Filter button */}
// // //               {showFilter && (
// // //                 <button
// // //                   onClick={() => setShowFilters(true)}
// // //                   className={`rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-105 shadow-lg touch-manipulation ${
// // //                     isMobile ? 'p-2' : 'p-2.5'
// // //                   } ${
// // //                     scrollY > 20 
// // //                       ? 'bg-white/80 text-gray-700 hover:bg-gray-100' 
// // //                       : 'bg-white/20 text-white hover:bg-white/30'
// // //                   }`}
// // //                   title="Filters"
// // //                 >
// // //                   <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
// // //                 </button>
// // //               )}

// // //               {/* View toggle - hidden on mobile for space */}
// // //               {showViewToggle && (
// // //                 <button
// // //                   onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
// // //                   className={`rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-105 shadow-lg touch-manipulation ${
// // //                     isMobile ? 'p-2 hidden xs:flex' : 'p-2.5'
// // //                   } ${
// // //                     scrollY > 20 
// // //                       ? 'bg-white/80 text-gray-700 hover:bg-gray-100' 
// // //                       : 'bg-white/20 text-white hover:bg-white/30'
// // //                   }`}
// // //                   title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
// // //                 >
// // //                   {viewMode === 'grid' ? (
// // //                     <List className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
// // //                   ) : (
// // //                     <Grid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
// // //                   )}
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Progress indicator */}
// // //         <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30"></div>
// // //       </header>

// // //       {/* Custom CSS for extra small screens */}
// // //       <style jsx>{`
// // //         @media (min-width: 480px) {
// // //           .xs\\:flex {
// // //             display: flex !important;
// // //           }
// // //         }
// // //       `}</style>
// // //     </>
// // //   );
// // // };

// // // export default HeaderBar;

// // // src/components/HeaderBar.tsx - Enhanced with better performance and UX
// // import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
// // import { Search, Filter, Grid, List, ChevronLeft, ArrowUpDown, Menu, X, Sparkles, Bell } from 'lucide-react';
// // import Head from 'next/head';
// // import Image from 'next/image';
// // import Link from 'next/link';
// // import { useDebounce } from '../hooks/useDebounce';

// // interface HeaderBarProps {
// //   searchQuery?: string;
// //   setSearchQuery?: (query: string) => void;
// //   viewMode?: 'grid' | 'list';
// //   setViewMode?: (mode: 'grid' | 'list') => void;
// //   setShowFilters?: (show: boolean) => void;
// //   sortOption?: string;
// //   setSortOption?: (option: string) => void;
// //   showBackButton?: boolean;
// //   onBack?: () => void;
// //   showSearch?: boolean;
// //   showViewToggle?: boolean;
// //   showSort?: boolean;
// //   showFilter?: boolean;
// // }

// // const HeaderBar = memo<HeaderBarProps>(({
// //   searchQuery = '',
// //   setSearchQuery = () => {},
// //   viewMode = 'grid',
// //   setViewMode = () => {},
// //   setShowFilters = () => {},
// //   sortOption = 'relevance',
// //   setSortOption = () => {},
// //   showBackButton = false,
// //   onBack = () => {},
// //   showSearch = true,
// //   showViewToggle = true,
// //   showSort = true,
// //   showFilter = true,
// // }) => {
// //   const [showSortPopup, setShowSortPopup] = useState(false);
// //   const [showMobileMenu, setShowMobileMenu] = useState(false);
// //   const [isSearchFocused, setIsSearchFocused] = useState(false);
// //   const [, setScrollY] = useState(0);
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const debouncedSearchQuery = useDebounce(searchQuery, 300);
// //   const sortPopupRef = useRef<HTMLDivElement>(null);
// //   const searchInputRef = useRef<HTMLInputElement>(null);

// //   const sortOptions = [
// //     { value: 'relevance', label: 'Relevance', icon: '⭐' },
// //     { value: 'price-asc', label: 'Price: Low to High', icon: '📈' },
// //     { value: 'price-desc', label: 'Price: High to Low', icon: '📉' },
// //     { value: 'newest', label: 'Newest', icon: '🆕' },
// //     { value: 'discount', label: 'Best Discount', icon: '🏷️' },
// //   ];

// //   const handleSortChange = useCallback((option: string) => {
// //     setSortOption(option);
// //     setShowSortPopup(false);
// //   }, [setSortOption]);

// //   // Handle scroll effect for header transparency
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       const currentScrollY = window.scrollY;
// //       setScrollY(currentScrollY);
// //       setIsScrolled(currentScrollY > 20);
// //     };

// //     let ticking = false;
// //     const throttledScroll = () => {
// //       if (!ticking) {
// //         requestAnimationFrame(() => {
// //           handleScroll();
// //           ticking = false;
// //         });
// //         ticking = true;
// //       }
// //     };

// //     window.addEventListener('scroll', throttledScroll, { passive: true });
// //     return () => window.removeEventListener('scroll', throttledScroll);
// //   }, []);

// //   // Close sort popup when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (sortPopupRef.current && !sortPopupRef.current.contains(event.target as Node)) {
// //         setShowSortPopup(false);
// //       }
// //     };

// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, []);

// //   // Handle search input focus
// //   const handleSearchFocus = useCallback(() => {
// //     setIsSearchFocused(true);
// //   }, []);

// //   const handleSearchBlur = useCallback(() => {
// //     setIsSearchFocused(false);
// //   }, []);

// //   // Keyboard navigation
// //   useEffect(() => {
// //     const handleKeyDown = (event: KeyboardEvent) => {
// //       if (event.key === 'Escape') {
// //         setShowSortPopup(false);
// //         setShowMobileMenu(false);
// //         searchInputRef.current?.blur();
// //       }
// //       if (event.key === '/' && !isSearchFocused) {
// //         event.preventDefault();
// //         searchInputRef.current?.focus();
// //       }
// //     };

// //     document.addEventListener('keydown', handleKeyDown);
// //     return () => document.removeEventListener('keydown', handleKeyDown);
// //   }, [isSearchFocused]);

// //   useEffect(() => {
// //     if (debouncedSearchQuery.trim() === '') return;
// //     console.log('Searching for:', debouncedSearchQuery);
// //   }, [debouncedSearchQuery]);

// //   const headerClasses = `sticky top-0 z-40 transition-all duration-300 ${
// //     isScrolled 
// //       ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200/50' 
// //       : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg'
// //   }`;

// //   const textColor = isScrolled ? 'text-gray-900' : 'text-white';
// //   const buttonColor = isScrolled 
// //     ? 'text-gray-700 hover:bg-gray-100' 
// //     : 'text-white hover:bg-white/20';

// //   return (
// //     <>
// //       <Head>
// //         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
// //       </Head>
      
// //       {/* Mobile Menu Overlay */}
// //       {showMobileMenu && (
// //         <div 
// //           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden animate-in fade-in duration-200"
// //           onClick={() => setShowMobileMenu(false)}
// //         >
// //           <div 
// //             className="absolute right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-200/50 animate-in slide-in-from-right duration-300"
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <div className="p-6 border-b border-gray-200/80 bg-gradient-to-r from-blue-50 to-purple-50">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-3">
// //                   <Sparkles className="h-5 w-5 text-blue-600" />
// //                   <h3 className="font-bold text-gray-900 text-lg">Menu</h3>
// //                 </div>
// //                 <button 
// //                   onClick={() => setShowMobileMenu(false)}
// //                   className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
// //                 >
// //                   <X className="h-5 w-5 text-gray-600" />
// //                 </button>
// //               </div>
// //             </div>
// //             <nav className="p-6">
// //               <div className="space-y-2">
// //                 {[
// //                   // { href: '/privacy-policy', label: 'Privacy Policy', icon: '🛡️' },
// //                   // { href: '/terms-of-service', label: 'Terms of Service', icon: '📋' },
// //                   { href: '/privacy-policy-full', label: 'Full Privacy Policy', icon: '🔒' },
// //                   { href: '/terms-of-service-full', label: 'Full Terms of Service', icon: '📄' },
// //                   { href: '/account', label: 'Account', icon: '👤' },
// //                 ].map((item) => (
// //                   <Link 
// //                     key={item.href}
// //                     href={item.href} 
// //                     className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
// //                     onClick={() => setShowMobileMenu(false)}
// //                   >
// //                     <span className="text-lg group-hover:scale-110 transition-transform duration-200">
// //                       {item.icon}
// //                     </span>
// //                     <span className="font-medium">{item.label}</span>
// //                   </Link>
// //                 ))}
// //               </div>
// //             </nav>
// //           </div>
// //         </div>
// //       )}

// //       <header className={headerClasses}>
// //         <div className="max-w-7xl mx-auto px-3 sm:px-6">
// //           <div className="flex items-center justify-between h-16 sm:h-18">
// //             {/* Left side - logo, menu button, and title */}
// //             <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-shrink-0">
// //               {/* Mobile menu button */}
// //               <button
// //                 onClick={() => setShowMobileMenu(true)}
// //                 className={`lg:hidden p-2 rounded-xl transition-all duration-200 hover:scale-105 ${buttonColor}`}
// //                 aria-label="Open menu"
// //               >
// //                 <Menu className="h-5 w-5" />
// //               </button>

// //               {showBackButton && (
// //                 <button
// //                   onClick={onBack}
// //                   className={`p-2 rounded-xl transition-all duration-200 hover:scale-105 ${buttonColor}`}
// //                   aria-label="Go back"
// //                 >
// //                   <ChevronLeft className="h-5 w-5" />
// //                 </button>
// //               )}
              
// //               <Link href="/" className="flex items-center group min-w-0">
// //                 <div className="relative w-10 h-10 sm:w-12 sm:h-12 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
// //                   <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg"></div>
// //                   <Image
// //                     src="/Bhaba_logo.png"
// //                     alt="Bhaba Logo"
// //                     fill
// //                     className="rounded-xl p-1 object-contain"
// //                     priority
// //                     sizes="48px"
// //                   />
// //                 </div>
// //                 <div className="min-w-0">
// //                   <h1 className={`text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-300 truncate ${textColor}`}>
// //                     Bhaba
// //                   </h1>
// //                   <p className={`text-xs transition-colors duration-300 hidden sm:block ${
// //                     isScrolled ? 'text-gray-500' : 'text-white/80'
// //                   }`}>
// //                     Discover Amazing
// //                   </p>
// //                 </div>
// //               </Link>
// //             </div>

// //             {/* Desktop Navigation - Hidden on mobile */}
// //             <nav className="hidden lg:flex items-center space-x-1 flex-shrink-0">
// //               {[
// //                 { href: '/privacy-policy-full', label: 'Privacy' },
// //                 { href: '/terms-of-service-full', label: 'Terms' },
// //                 { href: '/account', label: 'Account' },
// //               ].map((item) => (
// //                 <Link 
// //                   key={item.href}
// //                   href={item.href} 
// //                   className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 ${
// //                     isScrolled 
// //                       ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
// //                       : 'text-white hover:text-gray-200 hover:bg-white/20'
// //                   }`}
// //                 >
// //                   {item.label}
// //                 </Link>
// //               ))}
// //             </nav>

// //             {/* Center - search bar */}
// //             {showSearch && (
// //               <div className="flex-1 mx-2 sm:mx-4 lg:mx-6 min-w-0 max-w-2xl">
// //                 <div className={`relative transition-all duration-300 ${
// //                   isSearchFocused ? 'transform scale-105' : ''
// //                 }`}>
// //                   <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
// //                     isSearchFocused ? 'text-blue-500' : 'text-gray-400'
// //                   }`} />
// //                   <input
// //                     ref={searchInputRef}
// //                     type="text"
// //                     placeholder="Search for amazing products..."
// //                     value={searchQuery}
// //                     onChange={(e) => setSearchQuery(e.target.value)}
// //                     onFocus={handleSearchFocus}
// //                     onBlur={handleSearchBlur}
// //                     className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500 shadow-lg hover:shadow-xl transition-all duration-300"
// //                   />
// //                   {searchQuery && (
// //                     <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
// //                       <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
// //                     </div>
// //                   )}
                  
// //                   {/* Search suggestions could be added here */}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Right side - actions */}
// //             <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
// //               {/* Notification button - future feature */}
// //               <button
// //                 className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg relative ${buttonColor}`}
// //                 title="Notifications"
// //               >
// //                 <Bell className="h-4 w-4" />
// //                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
// //                   <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
// //                 </span>
// //               </button>

// //               {/* Sort dropdown - desktop */}
// //               {showSort && (
// //                 <>
// //                   <div className="hidden sm:block">
// //                     <select
// //                       value={sortOption}
// //                       onChange={(e) => setSortOption(e.target.value)}
// //                       className="text-sm border border-gray-200/50 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
// //                     >
// //                       {sortOptions.map((option) => (
// //                         <option key={option.value} value={option.value}>
// //                           {option.icon} {option.label}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   {/* Sort button - mobile */}
// //                   <div className="sm:hidden relative" ref={sortPopupRef}>
// //                     <button
// //                       onClick={() => setShowSortPopup(!showSortPopup)}
// //                       className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${
// //                         showSortPopup 
// //                           ? 'bg-blue-500 text-white shadow-blue-500/50' 
// //                           : buttonColor
// //                       }`}
// //                       title="Sort options"
// //                     >
// //                       <ArrowUpDown className="h-4 w-4" />
// //                     </button>

// //                     {showSortPopup && (
// //                       <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
// //                         {sortOptions.map((option) => (
// //                           <button
// //                             key={option.value}
// //                             onClick={() => handleSortChange(option.value)}
// //                             className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:scale-95 ${
// //                               sortOption === option.value
// //                                 ? 'bg-blue-100 text-blue-800 font-medium'
// //                                 : 'text-gray-700 hover:bg-gray-50'
// //                             }`}
// //                           >
// //                             <span className="text-base">{option.icon}</span>
// //                             {option.label}
// //                           </button>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </div>
// //                 </>
// //               )}

// //               {/* Filter button */}
// //               {showFilter && (
// //                 <button
// //                   onClick={() => setShowFilters(true)}
// //                   className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${buttonColor}`}
// //                   title="Filters"
// //                 >
// //                   <Filter className="h-4 w-4" />
// //                 </button>
// //               )}

// //               {/* View toggle */}
// //               {showViewToggle && (
// //                 <button
// //                   onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
// //                   className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${buttonColor}`}
// //                   title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
// //                 >
// //                   {viewMode === 'grid' ? (
// //                     <List className="h-4 w-4" />
// //                   ) : (
// //                     <Grid className="h-4 w-4" />
// //                   )}
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Progress indicator */}
// //         <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30"></div>
// //       </header>
// //     </>
// //   );
// // });

// // HeaderBar.displayName = 'HeaderBar';

// // export default HeaderBar;


// // src/components/HeaderBar.tsx - Enhanced with better mobile UX and larger search
// import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
// import { Search, Filter, Grid, List, ChevronLeft, ArrowUpDown, Menu, X, Sparkles, Bell } from 'lucide-react';
// import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useDebounce } from '../hooks/useDebounce';

// interface HeaderBarProps {
//   searchQuery?: string;
//   setSearchQuery?: (query: string) => void;
//   viewMode?: 'grid' | 'list';
//   setViewMode?: (mode: 'grid' | 'list') => void;
//   setShowFilters?: (show: boolean) => void;
//   sortOption?: string;
//   setSortOption?: (option: string) => void;
//   showBackButton?: boolean;
//   onBack?: () => void;
//   showSearch?: boolean;
//   showViewToggle?: boolean;
//   showSort?: boolean;
//   showFilter?: boolean;
// }

// const HeaderBar = memo<HeaderBarProps>(({
//   searchQuery = '',
//   setSearchQuery = () => {},
//   viewMode = 'grid',
//   setViewMode = () => {},
//   setShowFilters = () => {},
//   sortOption = 'relevance',
//   setSortOption = () => {},
//   showBackButton = false,
//   onBack = () => {},
//   showSearch = true,
//   showViewToggle = true,
//   showSort = true,
//   showFilter = true,
// }) => {
//   const [showSortPopup, setShowSortPopup] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const [, setScrollY] = useState(0);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const debouncedSearchQuery = useDebounce(searchQuery, 300);
//   const sortPopupRef = useRef<HTMLDivElement>(null);
//   const searchInputRef = useRef<HTMLInputElement>(null);

//   const sortOptions = [
//     { value: 'relevance', label: 'Relevance', icon: '⭐' },
//     { value: 'price-asc', label: 'Price: Low to High', icon: '📈' },
//     { value: 'price-desc', label: 'Price: High to Low', icon: '📉' },
//     { value: 'newest', label: 'Newest', icon: '🆕' },
//     { value: 'discount', label: 'Best Discount', icon: '🏷️' },
//   ];

//   const handleSortChange = useCallback((option: string) => {
//     setSortOption(option);
//     setShowSortPopup(false);
//   }, [setSortOption]);

//   // Handle scroll effect for header transparency
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       setScrollY(currentScrollY);
//       setIsScrolled(currentScrollY > 20);
//     };

//     let ticking = false;
//     const throttledScroll = () => {
//       if (!ticking) {
//         requestAnimationFrame(() => {
//           handleScroll();
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener('scroll', throttledScroll, { passive: true });
//     return () => window.removeEventListener('scroll', throttledScroll);
//   }, []);

//   // Close sort popup when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (sortPopupRef.current && !sortPopupRef.current.contains(event.target as Node)) {
//         setShowSortPopup(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Handle search input focus
//   const handleSearchFocus = useCallback(() => {
//     setIsSearchFocused(true);
//   }, []);

//   const handleSearchBlur = useCallback(() => {
//     setIsSearchFocused(false);
//   }, []);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         setShowSortPopup(false);
//         setShowMobileMenu(false);
//         searchInputRef.current?.blur();
//       }
//       if (event.key === '/' && !isSearchFocused) {
//         event.preventDefault();
//         searchInputRef.current?.focus();
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [isSearchFocused]);

//   useEffect(() => {
//     if (debouncedSearchQuery.trim() === '') return;
//     console.log('Searching for:', debouncedSearchQuery);
//   }, [debouncedSearchQuery]);

//   const headerClasses = `sticky top-0 z-40 transition-all duration-300 ${
//     isScrolled 
//       ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200/50' 
//       : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg'
//   }`;

//   const textColor = isScrolled ? 'text-gray-900' : 'text-white';
//   const buttonColor = isScrolled 
//     ? 'text-gray-700 hover:bg-gray-100' 
//     : 'text-white hover:bg-white/20';

//   return (
//     <>
//       <Head>
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
//       </Head>
      
//       {/* Mobile Menu Overlay */}
//       {showMobileMenu && (
//         <div 
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden animate-in fade-in duration-200"
//           onClick={() => setShowMobileMenu(false)}
//         >
//           <div 
//             className="absolute right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-200/50 animate-in slide-in-from-right duration-300"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="p-6 border-b border-gray-200/80 bg-gradient-to-r from-blue-50 to-purple-50">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <Sparkles className="h-6 w-6 text-blue-600" />
//                   <h3 className="font-bold text-gray-900 text-xl">Menu</h3>
//                 </div>
//                 <button 
//                   onClick={() => setShowMobileMenu(false)}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
//                 >
//                   <X className="h-6 w-6 text-gray-600" />
//                 </button>
//               </div>
//             </div>
//             <nav className="p-6">
//               <div className="space-y-2">
//                 {[
//                   { href: '/privacy-policy-full', label: 'Full Privacy Policy', icon: '🔒' },
//                   { href: '/terms-of-service-full', label: 'Full Terms of Service', icon: '📄' },
//                   { href: '/account', label: 'Account', icon: '👤' },
//                 ].map((item) => (
//                   <Link 
//                     key={item.href}
//                     href={item.href} 
//                     className="flex items-center gap-4 py-4 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
//                     onClick={() => setShowMobileMenu(false)}
//                   >
//                     <span className="text-xl group-hover:scale-110 transition-transform duration-200">
//                       {item.icon}
//                     </span>
//                     <span className="font-medium text-lg">{item.label}</span>
//                   </Link>
//                 ))}
//               </div>
//             </nav>
//           </div>
//         </div>
//       )}

//       <header className={headerClasses}>
//         <div className="max-w-7xl mx-auto px-3 sm:px-6">
//           {/* Main header row */}
//           <div className="flex items-center justify-between h-16 sm:h-20">
//             {/* Left side - logo, menu button, and title */}
//             <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-shrink-0">
//               {/* Mobile menu button */}
//               <button
//                 onClick={() => setShowMobileMenu(true)}
//                 className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 hover:scale-105 ${buttonColor}`}
//                 aria-label="Open menu"
//               >
//                 <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
//               </button>

//               {showBackButton && (
//                 <button
//                   onClick={onBack}
//                   className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 ${buttonColor}`}
//                   aria-label="Go back"
//                 >
//                   <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
//                 </button>
//               )}
              
//               <Link href="/" className="flex items-center group min-w-0">
//                 <div className="relative w-10 h-10 sm:w-12 sm:h-12 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
//                   <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg"></div>
//                   <Image
//                     src="/Bhaba_logo.png"
//                     alt="Bhaba Logo"
//                     fill
//                     className="rounded-xl p-1 object-contain"
//                     priority
//                     sizes="48px"
//                   />
//                 </div>
//                 <div className="min-w-0 hidden sm:block">
//                   <h1 className={`text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-300 truncate ${textColor}`}>
//                     Bhaba
//                   </h1>
//                   <p className={`text-xs transition-colors duration-300 ${
//                     isScrolled ? 'text-gray-500' : 'text-white/80'
//                   }`}>
//                     Discover Amazing
//                   </p>
//                 </div>
//               </Link>
//             </div>

//             {/* Desktop Navigation - Hidden on mobile */}
//             <nav className="hidden lg:flex items-center space-x-1 flex-shrink-0">
//               {[
//                 { href: '/privacy-policy-full', label: 'Privacy' },
//                 { href: '/terms-of-service-full', label: 'Terms' },
//                 { href: '/account', label: 'Account' },
//               ].map((item) => (
//                 <Link 
//                   key={item.href}
//                   href={item.href} 
//                   className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 ${
//                     isScrolled 
//                       ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
//                       : 'text-white hover:text-gray-200 hover:bg-white/20'
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </nav>

//             {/* Desktop Search - Hidden on mobile */}
//             {showSearch && (
//               <div className="hidden sm:flex flex-1 mx-4 lg:mx-6 min-w-0 max-w-2xl">
//                 <div className={`relative w-full transition-all duration-300 ${
//                   isSearchFocused ? 'transform scale-105' : ''
//                 }`}>
//                   <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
//                     isSearchFocused ? 'text-blue-500' : 'text-gray-400'
//                   }`} />
//                   <input
//                     ref={searchInputRef}
//                     type="text"
//                     placeholder="Search for amazing products..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     onFocus={handleSearchFocus}
//                     onBlur={handleSearchBlur}
//                     className="w-full pl-12 pr-4 py-3 text-sm text-gray-900 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 shadow-lg hover:shadow-xl transition-all duration-300"
//                   />
//                   {searchQuery && (
//                     <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Right side - actions (Desktop only on first row) */}
//             <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
//               {/* Notification button */}
//               <button
//                 className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg relative ${buttonColor}`}
//                 title="Notifications"
//               >
//                 <Bell className="h-5 w-5" />
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
//                   <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
//                 </span>
//               </button>

//               {/* Sort dropdown - desktop */}
//               {showSort && (
//                 <select
//                   value={sortOption}
//                   onChange={(e) => setSortOption(e.target.value)}
//                   className="text-sm border border-gray-200/50 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
//                 >
//                   {sortOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.icon} {option.label}
//                     </option>
//                   ))}
//                 </select>
//               )}

//               {/* Filter button */}
//               {showFilter && (
//                 <button
//                   onClick={() => setShowFilters(true)}
//                   className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${buttonColor}`}
//                   title="Filters"
//                 >
//                   <Filter className="h-5 w-5" />
//                 </button>
//               )}

//               {/* View toggle */}
//               {showViewToggle && (
//                 <button
//                   onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
//                   className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${buttonColor}`}
//                   title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
//                 >
//                   {viewMode === 'grid' ? (
//                     <List className="h-5 w-5" />
//                   ) : (
//                     <Grid className="h-5 w-5" />
//                   )}
//                 </button>
//               )}
//             </div>

//             {/* Mobile Actions - Only notification and menu toggle */}
//             <div className="flex sm:hidden items-center gap-2 flex-shrink-0">
//               <button
//                 className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg relative ${buttonColor}`}
//                 title="Notifications"
//               >
//                 <Bell className="h-5 w-5" />
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full">
//                   <span className="w-1.5 h-1.5 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* Mobile Search Row - Full width on mobile */}
//           {showSearch && (
//             <div className="sm:hidden pb-4">
//               <div className={`relative transition-all duration-300 ${
//                 isSearchFocused ? 'transform scale-[1.02]' : ''
//               }`}>
//                 <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
//                   isSearchFocused ? 'text-blue-500' : 'text-gray-400'
//                 }`} />
//                 <input
//                   type="text"
//                   placeholder="Search for amazing products..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onFocus={handleSearchFocus}
//                   onBlur={handleSearchBlur}
//                   className="w-full pl-12 pr-4 py-4 text-base text-gray-900 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 shadow-lg hover:shadow-xl transition-all duration-300"
//                 />
//                 {searchQuery && (
//                   <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
//                     <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Mobile Action Bar - Only visible on mobile */}
//           <div className="sm:hidden flex items-center justify-between pb-3">
//             <div className="flex items-center gap-2">
//               {/* Sort button - mobile */}
//               {showSort && (
//                 <div className="relative" ref={sortPopupRef}>
//                   <button
//                     onClick={() => setShowSortPopup(!showSortPopup)}
//                     className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg text-sm font-medium ${
//                       showSortPopup 
//                         ? 'bg-blue-500 text-white shadow-blue-500/50' 
//                         : buttonColor
//                     }`}
//                   >
//                     <ArrowUpDown className="h-4 w-4" />
//                     <span>Sort</span>
//                   </button>

//                   {showSortPopup && (
//                     <div className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
//                       {sortOptions.map((option) => (
//                         <button
//                           key={option.value}
//                           onClick={() => handleSortChange(option.value)}
//                           className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:scale-95 ${
//                             sortOption === option.value
//                               ? 'bg-blue-100 text-blue-800 font-medium'
//                               : 'text-gray-700 hover:bg-gray-50'
//                           }`}
//                         >
//                           <span className="text-base">{option.icon}</span>
//                           {option.label}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Filter button */}
//               {showFilter && (
//                 <button
//                   onClick={() => setShowFilters(true)}
//                   className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg text-sm font-medium ${buttonColor}`}
//                 >
//                   <Filter className="h-4 w-4" />
//                   <span>Filter</span>
//                 </button>
//               )}
//             </div>

//             {/* View toggle */}
//             {showViewToggle && (
//               <button
//                 onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
//                 className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg text-sm font-medium ${buttonColor}`}
//               >
//                 {viewMode === 'grid' ? (
//                   <>
//                     <List className="h-4 w-4" />
//                     <span>List</span>
//                   </>
//                 ) : (
//                   <>
//                     <Grid className="h-4 w-4" />
//                     <span>Grid</span>
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Progress indicator */}
//         <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30"></div>
//       </header>
//     </>
//   );
// });

// HeaderBar.displayName = 'HeaderBar';

// export default HeaderBar;