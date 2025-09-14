import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">LVRXchange</h1>
            </Link>
            <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Welcome to LVRXchange ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our real estate exchange platform services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">2.1 Information You Provide to Us</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Account information (name, email address, password)</li>
              <li>Profile information (professional background, investment preferences)</li>
              <li>Listing information (property details, financial data, investment criteria)</li>
              <li>Communication data (messages, inquiries, support requests)</li>
              <li>Payment information (processed securely through third-party providers)</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">2.2 Information Automatically Collected</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, click patterns)</li>
              <li>Location data (general geographic location based on IP address)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Provide and maintain our platform services</li>
              <li>Create and manage your account</li>
              <li>Process and facilitate real estate transactions and matches</li>
              <li>Generate AI-powered match recommendations</li>
              <li>Communicate with you about our services</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Improve our platform and develop new features</li>
              <li>Comply with legal obligations and enforce our terms</li>
              <li>Prevent fraud and ensure platform security</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Information Sharing and Disclosure</h2>
            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">4.1 With Other Users</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you create listings or engage with matches, certain information (such as listing details and professional background) may be shared with other platform users to facilitate connections and transactions.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">4.2 With Service Providers</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your information with trusted third-party service providers who assist us in operating our platform, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Cloud hosting and data storage providers</li>
              <li>Payment processing services</li>
              <li>Analytics and monitoring services</li>
              <li>Customer support tools</li>
              <li>AI and machine learning services</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">4.3 Legal Requirements</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              We may disclose your information if required to do so by law or in response to valid requests by public authorities, court orders, or legal processes.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Your Privacy Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Access and receive a copy of your personal information</li>
              <li>Rectify inaccurate or incomplete information</li>
              <li>Delete your personal information</li>
              <li>Restrict or object to processing of your information</li>
              <li>Data portability</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookie settings through your browser preferences, though this may affect certain platform functionality.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your personal information in accordance with this Privacy Policy.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children under 18.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                Email: privacy@lvrxchange.com<br />
                Address: [Your Business Address]<br />
                Phone: [Your Contact Number]
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}