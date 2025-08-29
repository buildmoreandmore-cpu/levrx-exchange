'use client'

import { useState, useEffect } from 'react'
import CheckoutButton from '@/components/pricing/CheckoutButton'
import Link from 'next/link'

export default function TestStripePage() {
  const [testResult, setTestResult] = useState<string>('')
  const [envCheck, setEnvCheck] = useState({
    publishableKey: false,
    baseUrl: false
  })

  useEffect(() => {
    // Check environment variables via API
    fetch('/api/check-env')
      .then(res => res.json())
      .then(data => {
        setEnvCheck({
          publishableKey: data.stripe_publishable_key === 'SET',
          baseUrl: data.base_url === 'SET'
        })
      })
      .catch(err => {
        console.error('Failed to check environment:', err)
      })
  }, [])

  const testStripeConfig = async () => {
    setTestResult('🔄 Testing...')
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: 'starter' }),
      })
      
      if (response.ok) {
        setTestResult('✅ Stripe configuration is working correctly!')
      } else {
        const error = await response.text()
        setTestResult(`❌ Error: ${error}`)
      }
    } catch (error) {
      setTestResult(`❌ Network error: ${error}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Stripe Integration Test</h1>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              ← Back to Home
            </Link>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Environment Variables Check:</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className={`w-4 h-4 rounded-full mr-3 ${envCheck.publishableKey ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>Publishable Key: {envCheck.publishableKey ? '✅ Set' : '❌ Missing'}</span>
                </div>
                <div className="flex items-center">
                  <span className={`w-4 h-4 rounded-full mr-3 ${envCheck.baseUrl ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>Base URL: {envCheck.baseUrl ? '✅ Set' : '❌ Missing'}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">API Test:</h2>
              <button
                onClick={testStripeConfig}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-4 disabled:opacity-50"
              >
                Test API Connection
              </button>
              {testResult && (
                <div className="p-4 bg-gray-100 rounded-lg">
                  {testResult}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Live Checkout Test:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CheckoutButton
                  plan="starter"
                  className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 text-center"
                >
                  Test Starter Plan ($29)
                </CheckoutButton>
                <CheckoutButton
                  plan="professional"
                  className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 text-center"
                >
                  Test Professional Plan ($79)
                </CheckoutButton>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Test Card Numbers:</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Success:</strong> 4242 4242 4242 4242</p>
                <p><strong>Decline:</strong> 4000 0000 0000 0002</p>
                <p><strong>Expiry:</strong> Any future date</p>
                <p><strong>CVC:</strong> Any 3 digits</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">Next Steps:</h3>
              <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
                <li>Click "Test API Connection" above</li>
                <li>If successful, try a checkout button</li>
                <li>Set up webhook forwarding: <code className="bg-white px-1 rounded">stripe listen --forward-to localhost:3000/api/webhooks/stripe</code></li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}