'use client'

import Link from 'next/link'

export default function SimplePricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple Test Pricing</h1>
          <p className="text-xl text-gray-600">Testing without complex components</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="bg-white rounded-lg p-8 shadow-sm border">
            <h3 className="text-2xl font-bold mb-4">Starter</h3>
            <p className="text-4xl font-bold mb-4">$29<span className="text-lg text-gray-500">/month</span></p>
            <ul className="mb-8 space-y-2">
              <li>✓ Up to 5 listings</li>
              <li>✓ Basic matching</li>
              <li>✓ Email notifications</li>
            </ul>
            <Link 
              href="/sign-up" 
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700"
            >
              Get Started (Simple)
            </Link>
          </div>

          {/* Professional Plan */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-blue-500">
            <div className="text-center mb-2">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Most Popular</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Professional</h3>
            <p className="text-4xl font-bold mb-4">$79<span className="text-lg text-gray-500">/month</span></p>
            <ul className="mb-8 space-y-2">
              <li>✓ Unlimited listings</li>
              <li>✓ Advanced AI matching</li>
              <li>✓ Priority notifications</li>
              <li>✓ Analytics dashboard</li>
            </ul>
            <Link 
              href="/sign-up" 
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700"
            >
              Get Started (Simple)
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-lg p-8 shadow-sm border">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <p className="text-4xl font-bold mb-4">Custom</p>
            <ul className="mb-8 space-y-2">
              <li>✓ Everything in Professional</li>
              <li>✓ Custom integrations</li>
              <li>✓ Dedicated support</li>
            </ul>
            <Link 
              href="/contact" 
              className="block w-full bg-gray-200 text-gray-900 text-center py-3 rounded-lg hover:bg-gray-300"
            >
              Contact Sales
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/pricing" className="text-blue-600 hover:text-blue-700">
            ← Back to Full Pricing Page
          </Link>
        </div>
      </div>
    </div>
  )
}