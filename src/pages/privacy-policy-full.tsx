import React from 'react'
import Head from 'next/head'
import UpdatedHeaderBar from '../components/UpdatedHeaderBar'
//import Link from 'next/link'
import { Shield } from 'lucide-react'

const PrivacyPolicyFull: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Complete Privacy Policy | Bhaba Marketplace</title>
        <meta name="description" content="Complete Privacy Policy for Bhaba Marketplace" />
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
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Complete Privacy Policy</h1>
            </div>
            {/* <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button> */}
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 p-4 rounded-md mb-6">
              <p className="text-blue-800">
                <strong>Last Updated:</strong> January 15, 2024<br />
                <strong>Effective Date:</strong> January 15, 2024
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to Bhaba Marketplace (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your 
                personal information and your right to privacy. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our marketplace platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">2.1 Personal Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Contact Information (name, email, phone number)</li>
                <li>Account Credentials (username, password)</li>
                <li>Payment Information (credit card details, billing address)</li>
                <li>Demographic Information (age, gender, location)</li>
                <li>Communication Preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">2.2 Usage Data</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>IP Address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Clickstream data and navigation patterns</li>
                <li>Transaction history and purchase behavior</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>To provide and maintain our services</li>
                <li>To process transactions and send order confirmations</li>
                <li>To communicate with you about products, services, and promotions</li>
                <li>To personalize your experience and provide content recommendations</li>
                <li>To improve our website and services</li>
                <li>To prevent fraud and enhance security</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Sharing and Disclosure</h2>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">4.1 Service Providers</h3>
              <p className="text-gray-700 mb-4">
                We may share your information with third-party service providers who perform services on our behalf, 
                including payment processing, data analysis, email delivery, hosting services, and customer service.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">4.2 Business Transfers</h3>
              <p className="text-gray-700 mb-4">
                In connection with any merger, sale of company assets, financing, or acquisition of all or a portion 
                of our business to another company, we may transfer your information.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">4.3 Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose your information where required to do so by law or in response to valid requests 
                by public authorities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We will retain your personal information only for as long as is necessary for the purposes set out 
                in this Privacy Policy. We will retain and use your information to the extent necessary to comply 
                with our legal obligations, resolve disputes, and enforce our policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Access:</strong> You can request copies of your personal data</li>
                <li><strong>Rectification:</strong> You can request correction of inaccurate data</li>
                <li><strong>Erasure:</strong> You can request deletion of your personal data</li>
                <li><strong>Restriction:</strong> You can request processing restriction</li>
                <li><strong>Data Portability:</strong> You can request transfer of your data</li>
                <li><strong>Objection:</strong> You can object to our processing of your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Security Measures</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. These include:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Data encryption at rest and in transit</li>
                <li>Regular security training for employees</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your information may be transferred to and processed in countries other than the country in 
                which you reside. These countries may have data protection laws that are different from the 
                laws of your country.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Children&apos;s Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our service is not intended for use by children under the age of 18. We do not knowingly 
                collect personal information from children under 18. If you become aware that a child has 
                provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Information</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700 mb-2">
                  <strong>Bhaba Limited</strong><br />
                  P.O. Box <br />
                  Dar es Salaam, Tanzania
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> info@bhabalimited.com<br />
                  <strong>Phone:</strong> +255 741 162 288
                </p>
                <p className="text-gray-700">
                  <strong>Data Protection Officer:</strong> info@bhabalimited.com
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                This Privacy Policy shall be governed by and construed in accordance with the laws of 
                the United Republic of Tanzania, without regard to its conflict of law provisions.
              </p>
            </section>
          </div>
        </div>

        {/* <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/terms-of-service-full" className="p-4 bg-gray-50 rounded-md hover:bg-gray-100">
              <h4 className="font-semibold text-blue-600">Complete Terms of Service</h4>
              <p className="text-sm text-gray-600">Read our full terms and conditions</p>
            </Link>
            <Link href="/privacy-policy" className="p-4 bg-gray-50 rounded-md hover:bg-gray-100">
              <h4 className="font-semibold text-blue-600">Summary Privacy Policy</h4>
              <p className="text-sm text-gray-600">Quick overview of our privacy practices</p>
            </Link>
          </div>
        </div> */}
      </main>
    </div>
  )
}

export default PrivacyPolicyFull
