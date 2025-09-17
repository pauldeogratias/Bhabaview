import React from 'react'
import Head from 'next/head'
import UpdatedHeaderBar from '../components/UpdatedHeaderBar'
import Link from 'next/link'

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Terms of Service | Bhaba Marketplace</title>
        <meta name="description" content="Bhaba Marketplace Terms of Service" />
      </Head>

      <UpdatedHeaderBar 
        showBackButton={true}
        showSearch={false}
        showViewToggle={false}
        showSort={false}
        showFilter={false}
        onBack={() => window.history.back()}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700">
                By accessing or using Bhaba Marketplace, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                When you create an account with us, you must provide accurate and complete information. 
                You are responsible for maintaining the confidentiality of your account and password.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Products and Services</h2>
              <p className="text-gray-700 mb-4">
                All products are subject to availability. We reserve the right to limit the quantities 
                of any products that we offer and to discontinue any products at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Pricing and Payment</h2>
              <p className="text-gray-700 mb-4">
                All prices are in Tanzanian Shillings (TZS) and are subject to change without notice. 
                We are not responsible for typographical errors regarding price or any other matter.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Prohibited Uses</h2>
              <p className="text-gray-700 mb-4">
                You may not use our products:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>For any unlawful purpose</li>
                <li>To solicit others to perform or participate in any unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations</li>
                <li>To infringe upon or violate our intellectual property rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Contact Information</h2>
              <p className="text-gray-700">
                Questions about the Terms of Service should be sent to us at:
              </p>
              <p className="text-blue-600 mt-2">
                Email: info@bhabalimited.com<br />
                Phone: +255 741 162 288
              </p>
            </section>

            {/* <div className="border-t pt-6 mt-6">
              <p className="text-sm text-gray-500">
                For the complete and most updated version of our Terms of Service, please visit:{' '}
                <a 
                  href="https://bhabalimited.com/public/terms_of_service" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://bhabalimited.com/public/terms_of_service
                </a>
              </p>
            </div> */}
<div className="border-t pt-6 mt-6">
  <p className="text-sm text-gray-500 mb-4">
    For the complete and most updated version of our Terms of Service, please visit our full terms page:
  </p>
  <Link 
    href="/terms-of-service-full" 
    className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold"
  >
    View Complete Terms of Service →
  </Link>
</div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TermsOfService
