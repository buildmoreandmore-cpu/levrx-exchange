import Link from 'next/link'

export default function TermsOfService() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              By accessing and using LVRXchange ("the Platform," "our Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              LVRXchange is a real estate exchange platform that connects investors, property owners, and real estate professionals through AI-powered matching technology. Our platform facilitates the discovery and exchange of real estate assets, investment opportunities, and related services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. User Registration and Account Security</h2>
            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">3.1 Account Registration</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>You must provide accurate, complete, and current information during registration</li>
              <li>You are responsible for maintaining the security of your account credentials</li>
              <li>You must be at least 18 years old to use our services</li>
              <li>You may only create one account per person or entity</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">3.2 Account Termination</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              We reserve the right to suspend or terminate your account for violations of these terms, fraudulent activity, or other conduct that we determine is harmful to our platform or other users.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. User Conduct and Responsibilities</h2>
            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">4.1 Prohibited Activities</h3>
            <p className="text-gray-700 leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Submit false, misleading, or fraudulent information</li>
              <li>Engage in any form of harassment or abusive behavior</li>
              <li>Attempt to circumvent our security measures or access controls</li>
              <li>Use the platform for any illegal or unauthorized purpose</li>
              <li>Interfere with or disrupt the platform's operation</li>
              <li>Create listings for properties you do not own or have authority to represent</li>
              <li>Spam, solicit, or engage in unsolicited marketing activities</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">4.2 Content Standards</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              All content you submit must be accurate, professional, and comply with applicable laws. You retain ownership of your content but grant us a license to use, display, and distribute it on our platform.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Platform Services and Limitations</h2>
            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">5.1 Service Availability</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We strive to maintain high service availability but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any aspect of our service.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">5.2 AI Matching Technology</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our AI matching system provides suggestions based on available data and algorithms. We do not guarantee the accuracy or suitability of any matches or recommendations.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">5.3 Platform Role</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              LVRXchange acts as a platform connecting users and does not participate in actual real estate transactions. We are not a real estate broker, agent, or financial advisor.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Financial Terms and Payments</h2>
            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">6.1 Subscription Fees</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Access to certain features requires a paid subscription. Fees are billed in advance and are non-refundable except as required by law.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">6.2 Free Trial</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may offer free trial periods for new users. Trial access may be limited and is subject to these terms.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">6.3 Payment Processing</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Payment processing is handled by third-party providers. You agree to their terms and acknowledge that we are not responsible for payment processing issues.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The platform and its original content, features, and functionality are owned by LVRXchange and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these terms by reference.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Disclaimers and Limitations</h2>
            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">9.1 Platform Disclaimers</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">9.2 Investment Disclaimers</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Real estate investments carry inherent risks. We do not provide investment advice and are not responsible for investment decisions or outcomes.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">9.3 User Verification</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              While we may implement verification measures, we do not guarantee the accuracy of user-provided information or the legitimacy of listings.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              TO THE FULLEST EXTENT PERMITTED BY LAW, LVRXCHANGE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              You agree to defend, indemnify, and hold harmless LVRXchange from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including attorney's fees) resulting from your use of the platform or violation of these terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Dispute Resolution</h2>
            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">12.1 Governing Law</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              These terms shall be governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law principles.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">12.2 Arbitration</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Any disputes arising out of these terms shall be resolved through binding arbitration in accordance with the rules of [Arbitration Body], except for claims that may be brought in small claims court.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">13. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We reserve the right to modify these terms at any time. We will provide notice of significant changes through the platform or via email. Continued use of the platform after such modifications constitutes acceptance of the updated terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">14. Severability</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              If any provision of these terms is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">15. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                Email: legal@lvrxchange.com<br />
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