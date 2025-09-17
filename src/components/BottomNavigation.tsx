// // // // components/BottomNavigation.tsx
// // // import React from 'react';
// // // import Link from 'next/link';
// // // import { Home, ShoppingBag, Search, User, Box } from 'lucide-react';

// // // interface BottomNavigationProps {
// // //   onWholesaleClick: () => void;
// // // }

// // // const BottomNavigation: React.FC<BottomNavigationProps> = ({ onWholesaleClick }) => {
// // //   return (
// // //     <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
// // //       <div className="flex justify-around items-center py-2">
// // //         <Link href="/" className="flex flex-col items-center p-2 text-gray-700 hover:text-blue-500">
// // //           <Home className="h-6 w-6" />
// // //           <span className="text-xs mt-1">Home</span>
// // //         </Link>
        
// // //         {/* <button className="flex flex-col items-center p-2 text-gray-700 hover:text-blue-500">
// // //           <Search className="h-6 w-6" />
// // //           <span className="text-xs mt-1">Search</span>
// // //         </button> */}
        
// // //         <button 
// // //           onClick={onWholesaleClick}
// // //           className="flex flex-col items-center p-2 text-gray-700 hover:text-blue-500"
// // //         >
// // //           <Box className="h-6 w-6" />
// // //           <span className="text-xs mt-1">Wholesale</span>
// // //         </button>
        
// // //         <button className="flex flex-col items-center p-2 text-gray-700 hover:text-blue-500">
// // //           <ShoppingBag className="h-6 w-6" />
// // //           <span className="text-xs mt-1">Cart</span>
// // //         </button>
        
// // //         <button className="flex flex-col items-center p-2 text-gray-700 hover:text-blue-500">
// // //           <User className="h-6 w-6" />
// // //           <span className="text-xs mt-1">Account</span>
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default BottomNavigation;

// // // components/BottomNavigation.tsx
// // import React from 'react';
// // import Link from 'next/link';
// // import { Home, ShoppingBag, User, Box } from 'lucide-react';

// // interface BottomNavigationProps {
// //   onWholesaleClick: () => void;
// // }

// // // const BottomNavigation: React.FC<BottomNavigationProps> = ({ onWholesaleClick }) => {
// // //   return (
// // //     <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 border-t border-white/20 shadow-lg z-50">
// // //       <div className="flex justify-around items-center py-2">
// // //         <Link href="/" className="flex flex-col items-center p-2 text-white hover:text-gray-200">
// // //           <Home className="h-6 w-6" />
// // //           <span className="text-xs mt-1">Home</span>
// // //         </Link>
        
// // //         <button 
// // //           onClick={onWholesaleClick}
// // //           className="flex flex-col items-center p-2 text-white hover:text-gray-200"
// // //         >
// // //           <Box className="h-6 w-6" />
// // //           <span className="text-xs mt-1">Wholesale</span>
// // //         </button>
        
// // //         <button className="flex flex-col items-center p-2 text-white hover:text-gray-200">
// // //           <ShoppingBag className="h-6 w-6" />
// // //           <span className="text-xs mt-1">Cart</span>
// // //         </button>
        
// // //         <button className="flex flex-col items-center p-2 text-white hover:text-gray-200">
// // //           <User className="h-6 w-6" />
// // //           <span className="text-xs mt-1">Account</span>
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // const BottomNavigation: React.FC<BottomNavigationProps> = ({ onWholesaleClick }) => {
// //   return (
// //     <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 border-t border-white/20 shadow-lg z-50">
// //       <div className="flex justify-around items-center py-2">
// //         <Link href="/" className="flex flex-col items-center p-2 text-white hover:text-gray-200">
// //           <Home className="h-6 w-6" />
// //           <span className="text-xs mt-1">Home</span>
// //         </Link>
        
// //         <button 
// //           onClick={onWholesaleClick}
// //           className="flex flex-col items-center p-2 text-white hover:text-gray-200"
// //         >
// //           <Box className="h-6 w-6" />
// //           <span className="text-xs mt-1">Wholesale</span>
// //         </button>
        
// //         <button className="flex flex-col items-center p-2 text-white hover:text-gray-200">
// //           <ShoppingBag className="h-6 w-6" />
// //           <span className="text-xs mt-1">Cart</span>
// //         </button>
        
// //         <Link href="/account" className="flex flex-col items-center p-2 text-white hover:text-gray-200">
// //           <User className="h-6 w-6" />
// //           <span className="text-xs mt-1">Account</span>
// //         </Link>
// //       </div>
// //     </div>
// //   )
// // }

// // export default BottomNavigation;
// // components/BottomNavigation.tsx
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { Home, ShoppingBag, User, Box, X, Package} from 'lucide-react';

// interface BottomNavigationProps {
//   onWholesaleClick: () => void;
// }

// // Cart item interface
// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity?: number;
//   image?: string;
// }

// // Simple Cart Context for demo purposes
// const useCart = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
//   const addToCart = (item: Omit<CartItem, 'id'>) => {
//     setCartItems(prev => [...prev, { ...item, id: Date.now() }]);
//   };
  
//   const removeFromCart = (id: number) => {
//     setCartItems(prev => prev.filter(item => item.id !== id));
//   };
  
//   const clearCart = () => {
//     setCartItems([]);
//   };
  
//   return {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     clearCart,
//     itemCount: cartItems.length
//   };
// };

// const BottomNavigation: React.FC<BottomNavigationProps> = ({ onWholesaleClick }) => {
//   const router = useRouter();
//   const { cartItems, removeFromCart, clearCart, itemCount } = useCart();
//   const [showCartModal, setShowCartModal] = useState(false);

//   const isActive = (path: string) => {
//     return router.pathname === path;
//   };

//   const CartModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center sm:justify-center">
//       <div className="bg-white w-full sm:w-96 sm:rounded-lg max-h-[80vh] flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
//           <button
//             onClick={() => setShowCartModal(false)}
//             className="p-2 hover:bg-gray-100 rounded-full"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         {/* Cart Content */}
//         <div className="flex-1 overflow-y-auto p-4">
//           {cartItems.length === 0 ? (
//             <div className="text-center py-8">
//               <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
//               <p className="text-gray-500 mb-4">Start shopping to add items to your cart</p>
//               <button
//                 onClick={() => setShowCartModal(false)}
//                 className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
//                   <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
//                     <Package className="h-6 w-6 text-gray-400" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
//                     <p className="text-sm text-gray-500">TZS {item.price?.toLocaleString()}</p>
//                   </div>
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-red-500 hover:text-red-600"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         {cartItems.length > 0 && (
//           <div className="p-4 border-t bg-gray-50">
//             <div className="flex gap-2">
//               <button
//                 onClick={clearCart}
//                 className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
//               >
//                 Clear Cart
//               </button>
//               <button
//                 onClick={() => {
//                   // Demo checkout
//                   alert('Checkout feature will be available soon!');
//                   setShowCartModal(false);
//                 }}
//                 className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//               >
//                 Checkout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 border-t border-white/20 shadow-lg z-50">
//         <div className="flex justify-around items-center py-2">
//           {/* Home */}
//           <Link 
//             href="/" 
//             className={`flex flex-col items-center p-2 transition-colors ${
//               isActive('/') 
//                 ? 'text-yellow-300' 
//                 : 'text-white hover:text-gray-200'
//             }`}
//           >
//             <Home className="h-6 w-6" />
//             <span className="text-xs mt-1">Home</span>
//           </Link>
          
//           {/* Wholesale */}
//           <button 
//             onClick={onWholesaleClick}
//             className="flex flex-col items-center p-2 text-white hover:text-gray-200 transition-colors"
//           >
//             <Box className="h-6 w-6" />
//             <span className="text-xs mt-1">Wholesale</span>
//           </button>
          
//           {/* Cart */}
//           <button 
//             onClick={() => setShowCartModal(true)}
//             className="flex flex-col items-center p-2 text-white hover:text-gray-200 transition-colors relative"
//           >
//             <div className="relative">
//               <ShoppingBag className="h-6 w-6" />
//               {itemCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {itemCount}
//                 </span>
//               )}
//             </div>
//             <span className="text-xs mt-1">Cart</span>
//           </button>
          
//           {/* Account */}
//           <Link 
//             href="/account" 
//             className={`flex flex-col items-center p-2 transition-colors ${
//               isActive('/account') 
//                 ? 'text-yellow-300' 
//                 : 'text-white hover:text-gray-200'
//             }`}
//           >
//             <User className="h-6 w-6" />
//             <span className="text-xs mt-1">Account</span>
//           </Link>
//         </div>
//       </div>

//       {/* Cart Modal */}
//       {showCartModal && <CartModal />}
//     </>
//   );
// };

// export default BottomNavigation;


// ========================================
// PERFORMANCE MONITORING AND SEO UTILITIES
// ========================================

// 1. Enhanced BottomNavigation with App Download Integration
// src/components/BottomNavigation.tsx
import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { Home, ShoppingBag, User, Box, Download, Star } from 'lucide-react'

interface BottomNavigationProps {
  onWholesaleClick: () => void
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ onWholesaleClick }) => {
  const [showAppPrompt, setShowAppPrompt] = useState(false)

  const handleAppDownload = useCallback(() => {
    // Track app download button click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'app_download_click', {
        event_category: 'engagement',
        event_label: 'bottom_navigation'
      })
    }
    
    // Open Play Store URL
    window.open('https://play.google.com/store/apps/details?id=com.vendor.bhaba', '_blank')
  }, [])

  const navigationItems = [
    {
      href: '/',
      icon: Home,
      label: 'Home',
      action: null
    },
    {
      href: null,
      icon: Box,
      label: 'Wholesale',
      action: onWholesaleClick
    },
    {
      href: null,
      icon: Download,
      label: 'Get App',
      action: handleAppDownload,
      highlight: true
    },
    {
      href: null,
      icon: ShoppingBag,
      label: 'Cart',
      action: () => setShowAppPrompt(true)
    },
    {
      href: '/account',
      icon: User,
      label: 'Account',
      action: null
    }
  ]

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 border-t border-white/20 shadow-lg z-50 safe-area-inset-bottom">
        <div className="flex justify-around items-center py-2 px-1">
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon
            
            if (item.href) {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex flex-col items-center p-2 text-white hover:text-gray-200 transition-all duration-200 hover:scale-105 ${
                    item.highlight ? 'bg-white/20 rounded-lg backdrop-blur-sm' : ''
                  }`}
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="text-xs mt-1">{item.label}</span>
                  {item.highlight && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  )}
                </Link>
              )
            }

            return (
              <button
                key={index}
                onClick={item.action || undefined}
                className={`flex flex-col items-center p-2 text-white hover:text-gray-200 transition-all duration-200 hover:scale-105 relative ${
                  item.highlight ? 'bg-white/20 rounded-lg backdrop-blur-sm' : ''
                }`}
              >
                <IconComponent className="h-6 w-6" />
                <span className="text-xs mt-1">{item.label}</span>
                {item.highlight && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                )}
              </button>
            )
          })}
        </div>
        
        {/* App download indicator */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1 animate-bounce">
            <Star className="h-3 w-3" />
            <span>New App!</span>
          </div>
        </div>
      </nav>

      {/* App prompt modal */}
      {showAppPrompt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Download Our App</h3>
              <p className="text-gray-600 mb-6">
                Get the full Bhaba experience with our mobile app. Shop easier, faster, and get exclusive deals!
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleAppDownload}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Download Now
                </button>
                <button
                  onClick={() => setShowAppPrompt(false)}
                  className="w-full text-gray-500 py-2"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BottomNavigation