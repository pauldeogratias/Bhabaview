import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Bhaba Marketplace</h3>
            <p className="text-gray-300 text-sm">
              Your trusted online marketplace for quality products in Tanzania.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
{/* <li>
  <Link href="/privacy-policy-full" className="text-gray-300 hover:text-white transition-colors">
    Full Privacy Policy
  </Link>
</li>
<li>
  <Link href="/terms-of-service-full" className="text-gray-300 hover:text-white transition-colors">
    Full Terms of Service
  </Link>
</li> */}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p>Email: info@bhabalimited.com</p>
              <p>Phone: +255 618 205 278</p>
              <p>Dar es Salaam, Tanzania</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Bhaba Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
