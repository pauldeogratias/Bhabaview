import React from 'react'
import Head from 'next/head'
import UpdatedHeaderBar from '../components/UpdatedHeaderBar'
import Link from 'next/link'

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Privacy Policy | Bhaba Marketplace</title>
        <meta name="description" content="Bhaba Marketplace Privacy Policy" />
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information that you provide directly to us, including when you:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Create an account</li>
                <li>Make a purchase</li>
                <li>Contact customer support</li>
                <li>Participate in promotions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Process transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-blue-600 mt-2">
                Email: info@bhabalimited.com<br />
                Phone: +255 741 162 288
              </p>
            </section>

            {/* <div className="border-t pt-6 mt-6">
              <p className="text-sm text-gray-500">
                For the complete and most updated version of our Privacy Policy, please visit:{' '}
                <a 
                  href="https://bhabalimited.com/public/privacy_policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://bhabalimited.com/public/privacy_policy
                </a>
              </p>
            </div> */}
<div className="border-t pt-6 mt-6">
  <p className="text-sm text-gray-500 mb-4">
    For the complete and most updated version of our Privacy Policy, please visit our full policy page:
  </p>
  <Link 
    href="/privacy-policy-full" 
    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
  >
    View Complete Privacy Policy →
  </Link>
</div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PrivacyPolicy
