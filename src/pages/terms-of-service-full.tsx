import React from 'react'
import Head from 'next/head'
import UpdatedHeaderBar from '../components/UpdatedHeaderBar'
// import Link from 'next/link'
import { FileText } from 'lucide-react'

const TermsOfServiceFull: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Complete Terms of Service | Bhaba Marketplace</title>
        <meta name="description" content="Complete Terms of Service for Bhaba Marketplace" />
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
              <FileText className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">Complete Terms of Service</h1>
            </div>
            {/* <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button> */}
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-green-50 p-4 rounded-md mb-6">
              <p className="text-green-800">
                <strong>Last Updated:</strong> January 15, 2024<br />
                <strong>Effective Date:</strong> January 15, 2024
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing or using Bhaba Marketplace (&quot;the Platform&quot;), you agree to be bound by these 
                Terms of Service and all applicable laws and regulations. If you do not agree with any of 
                these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Definitions</h2>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>&quot;Platform&quot;</strong> refers to Bhaba Marketplace website and mobile applications</li>
                <li><strong>&quot;User&quot;</strong> refers to any individual or entity accessing the Platform</li>
                <li><strong>&quot;Vendor&quot;</strong> refers to sellers offering products on the Platform</li>
                <li><strong>&quot;Buyer&quot;</strong> refers to purchasers of products on the Platform</li>
                <li><strong>&quot;Content&quot;</strong> refers to text, images, videos, and other materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts</h2>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">3.1 Account Creation</h3>
              <p className="text-gray-700 mb-4">
                To access certain features of the Platform, you must create an account. You agree to provide 
                accurate, current, and complete information during the registration process.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">3.2 Account Security</h3>
              <p className="text-gray-700 mb-4">
                You are responsible for maintaining the confidentiality of your account credentials and for 
                all activities that occur under your account. You agree to notify us immediately of any 
                unauthorized use of your account.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">3.3 Account Termination</h3>
              <p className="text-gray-700 mb-4">
                We reserve the right to suspend or terminate your account at our sole discretion, without 
                notice, for conduct that we believe violates these Terms or is harmful to other users, us, 
                or third parties, or for any other reason.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Products and Services</h2>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">4.1 Product Listings</h3>
              <p className="text-gray-700 mb-4">
                Vendors are responsible for the accuracy and completeness of their product listings, including 
                descriptions, prices, and images. All products must comply with applicable laws and regulations.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">4.2 Pricing and Availability</h3>
              <p className="text-gray-700 mb-4">
                All prices are subject to change without notice. We reserve the right to modify or discontinue 
                any product at any time. We are not responsible for typographical errors regarding price or 
                any other matter.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">4.3 Orders and Payments</h3>
              <p className="text-gray-700 mb-4">
                All orders are subject to acceptance and availability. Payment must be received before orders 
                are processed. We use third-party payment processors and are not responsible for their actions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">5.1 Platform Content</h3>
              <p className="text-gray-700 mb-4">
                All content on the Platform, including text, graphics, logos, and software, is the property 
                of Bhaba Limited or its content suppliers and is protected by intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">5.2 User Content</h3>
              <p className="text-gray-700 mb-4">
                By submitting content to the Platform, you grant us a worldwide, non-exclusive, royalty-free 
                license to use, reproduce, and display such content in connection with the Platform.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">5.3 Trademarks</h3>
              <p className="text-gray-700 mb-4">
                The Bhaba Marketplace name and logo are trademarks of Bhaba Limited. You may not use these 
                trademarks without our prior written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Prohibited Activities</h2>
              <p className="text-gray-700 mb-4">
                You agree not to engage in any of the following prohibited activities:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing upon intellectual property rights</li>
                <li>Harassing, abusing, or harming another person</li>
                <li>Uploading viruses or malicious code</li>
                <li>Collecting user information without consent</li>
                <li>Interfering with the Platform&apos;s operation</li>
                <li>Engaging in fraudulent activities</li>
                <li>Selling prohibited or illegal items</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the fullest extent permitted by law, Bhaba Limited shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including but not limited to loss 
                of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify and hold harmless Bhaba Limited and its officers, directors, employees, 
                and agents from any claims, damages, losses, liabilities, and expenses arising out of your 
                use of the Platform or violation of these Terms.
                </p>
              </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the United 
                Republic of Tanzania, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Dispute Resolution</h2>
              <p className="text-gray-700 mb-4">
                Any disputes arising out of or relating to these Terms shall be resolved through binding 
                arbitration in Dar es Salaam, Tanzania, in accordance with the Arbitration Act of Tanzania.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. We will provide notice of material 
                changes by posting the new Terms on the Platform and updating the &quot;Last Updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact Information</h2>
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
                  <strong>Hours:</strong> Monday - Sunday, 8:00 AM - 8:00 PM EAT
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/privacy-policy-full" className="p-4 bg-gray-50 rounded-md hover:bg-gray-100">
              <h4 className="font-semibold text-green-600">Complete Privacy Policy</h4>
              <p className="text-sm text-gray-600">Read our full privacy practices</p>
            </Link>
            <Link href="/terms-of-service" className="p-4 bg-gray-50 rounded-md hover:bg-gray-100">
              <h4 className="font-semibold text-green-600">Summary Terms of Service</h4>
              <p className="text-sm text-gray-600">Quick overview of our terms</p>
            </Link>
          </div>
        </div> */}
      </main>
    </div>
  )
}

export default TermsOfServiceFull
