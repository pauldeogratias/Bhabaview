// components/UpdatedHeaderBar.tsx
import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Search, Filter, Grid, List, ChevronLeft, ArrowUpDown, Menu, X, Sparkles, Bell } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useDebounce } from '../hooks/useDebounce';
import  AuthButton  from './AuthButton';

interface HeaderBarProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  viewMode?: 'grid' | 'list';
  setViewMode?: (mode: 'grid' | 'list') => void;
  setShowFilters?: (show: boolean) => void;
  sortOption?: string;
  setSortOption?: (option: string) => void;
  showBackButton?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
  showViewToggle?: boolean;
  showSort?: boolean;
  showFilter?: boolean;
}

const UpdatedHeaderBar = memo<HeaderBarProps>(({
  searchQuery = '',
  setSearchQuery = () => {},
  viewMode = 'grid',
  setViewMode = () => {},
  setShowFilters = () => {},
  sortOption = 'relevance',
  setSortOption = () => {},
  showBackButton = false,
  onBack = () => {},
  showSearch = true,
  showViewToggle = true,
  showSort = true,
  showFilter = true,
}) => {
  const [showSortPopup, setShowSortPopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const sortPopupRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: '⭐' },
    { value: 'price-asc', label: 'Price: Low to High', icon: '📈' },
    { value: 'price-desc', label: 'Price: High to Low', icon: '📉' },
    { value: 'newest', label: 'Newest', icon: '🆕' },
    { value: 'discount', label: 'Best Discount', icon: '🏷️' },
  ];

  const handleSortChange = useCallback((option: string) => {
    setSortOption(option);
    setShowSortPopup(false);
  }, [setSortOption]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortPopupRef.current && !sortPopupRef.current.contains(event.target as Node)) {
        setShowSortPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setIsSearchFocused(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowSortPopup(false);
        setShowMobileMenu(false);
        searchInputRef.current?.blur();
      }
      if (event.key === '/' && !isSearchFocused) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchFocused]);

  useEffect(() => {
    if (debouncedSearchQuery.trim() === '') return;
    console.log('Searching for:', debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  const headerClasses = `sticky top-0 z-40 transition-all duration-300 ${
    isScrolled
      ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200/50'
      : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg'
  }`;

  const textColor = isScrolled ? 'text-gray-900' : 'text-white';
  const buttonColor = isScrolled
    ? 'text-gray-700 hover:bg-gray-100'
    : 'text-white hover:bg-white/20';

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </Head>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden animate-in fade-in duration-200"
          onClick={() => setShowMobileMenu(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-200/50 animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200/80 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                  <h3 className="font-bold text-gray-900 text-xl">Menu</h3>
                </div>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>
            <nav className="p-6">
              <div className="space-y-2">
                {[
                  { href: '/privacy-policy-full', label: 'Full Privacy Policy', icon: '🔒' },
                  { href: '/terms-of-service-full', label: 'Full Terms of Service', icon: '📄' },
                  { href: '/account', label: 'Account', icon: '👤' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-4 py-4 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </span>
                    <span className="font-medium text-lg">{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}

      <header className={headerClasses}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          {/* Main Header Content */}
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left Section */}
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-shrink-0">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(true)}
                className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 hover:scale-105 ${buttonColor}`}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              {showBackButton && (
                <button
                  onClick={onBack}
                  className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 ${buttonColor}`}
                  aria-label="Go back"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              )}

              <Link href="/" className="flex items-center group min-w-0">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg"></div>
                  <Image
                    src="/Bhaba_logo.png"
                    alt="Bhaba Logo"
                    fill
                    className="rounded-xl p-1 object-contain"
                    priority
                    sizes="48px"
                  />
                </div>
                <div className="min-w-0 hidden sm:block">
                  <h1 className={`text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-300 truncate ${textColor}`}>
                    Bhaba
                  </h1>
                  <p className={`text-xs transition-colors duration-300 ${
                    isScrolled ? 'text-gray-500' : 'text-white/80'
                  }`}>
                    Discover Amazing
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 flex-shrink-0">
              {[
                { href: '/privacy-policy-full', label: 'Privacy' },
                { href: '/terms-of-service-full', label: 'Terms' },
                { href: '/account', label: 'Account' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 ${
                    isScrolled
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      : 'text-white hover:text-gray-200 hover:bg-white/20'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            {showSearch && (
              <div className="hidden sm:flex flex-1 mx-4 lg:mx-6 min-w-0 max-w-2xl">
                <div className={`relative w-full transition-all duration-300 ${
                  isSearchFocused ? 'transform scale-105' : ''
                }`}>
                  <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                    isSearchFocused ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for amazing products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    className="w-full pl-12 pr-4 py-3 text-sm text-gray-900 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 shadow-lg hover:shadow-xl transition-all duration-300"
                  />
                  {searchQuery && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Right Section - Desktop */}
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              {/* Notifications */}
              <button
                className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg relative ${buttonColor}`}
                title="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </span>
              </button>

              {/* Sort Options */}
              {showSort && (
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="text-sm border border-gray-200/50 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
              )}

              {/* Filter Button */}
              {showFilter && (
                <button
                  onClick={() => setShowFilters(true)}
                  className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${buttonColor}`}
                  title="Filters"
                >
                  <Filter className="h-5 w-5" />
                </button>
              )}

              {/* View Toggle */}
              {showViewToggle && (
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${buttonColor}`}
                  title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
                >
                  {viewMode === 'grid' ? (
                    <List className="h-5 w-5" />
                  ) : (
                    <Grid className="h-5 w-5" />
                  )}
                </button>
              )}

              {/* Auth Button */}
              <AuthButton 
                className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${buttonColor}`}
                showText={false}
                onSuccess={() => {
                  // Handle successful authentication
                  console.log('User signed in successfully')
                }}
              />
            </div>

            {/* Right Section - Mobile */}
            <div className="flex sm:hidden items-center gap-2 flex-shrink-0">
              <button
                className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg relative ${buttonColor}`}
                title="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full">
                  <span className="w-1.5 h-1.5 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </span>
              </button>

              {/* Mobile Auth Button */}
              <AuthButton 
                className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${buttonColor}`}
                showText={false}
                onSuccess={() => {
                  console.log('User signed in successfully on mobile')
                }}
              />
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showSearch && (
            <div className="sm:hidden pb-4">
              <div className={`relative transition-all duration-300 ${
                isSearchFocused ? 'transform scale-[1.02]' : ''
              }`}>
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                  isSearchFocused ? 'text-blue-500' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search for amazing products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className="w-full pl-12 pr-4 py-4 text-base text-gray-900 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 shadow-lg hover:shadow-xl transition-all duration-300"
                />
                {searchQuery && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Controls */}
          <div className="sm:hidden flex items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              {/* Mobile Sort */}
              {showSort && (
                <div className="relative" ref={sortPopupRef}>
                  <button
                    onClick={() => setShowSortPopup(!showSortPopup)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg text-sm font-medium ${
                      showSortPopup
                        ? 'bg-blue-500 text-white shadow-blue-500/50'
                        : buttonColor
                    }`}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Sort</span>
                  </button>

                  {showSortPopup && (
                    <div className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSortChange(option.value)}
                          className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:scale-95 ${
                            sortOption === option.value
                              ? 'bg-blue-100 text-blue-800 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-base">{option.icon}</span>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Filter */}
              {showFilter && (
                <button
                  onClick={() => setShowFilters(true)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg text-sm font-medium ${buttonColor}`}
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              )}
            </div>

            {/* Mobile View Toggle */}
            {showViewToggle && (
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg text-sm font-medium ${buttonColor}`}
              >
                {viewMode === 'grid' ? (
                  <>
                    <List className="h-4 w-4" />
                    <span>List</span>
                  </>
                ) : (
                  <>
                    <Grid className="h-4 w-4" />
                    <span>Grid</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30"></div>
      </header>
    </>
  );
});


UpdatedHeaderBar.displayName = 'UpdatedHeaderBar';
export default UpdatedHeaderBar