'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'

export default function TestPaymentPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const { user, isSignedIn, isLoaded } = useUser()

  const testCheckout = async (plan: 'starter' | 'professional') => {
    if (!isSignedIn) {
      alert('Please sign in first')
      window.location.href = '/sign-up'
      return
    }

    setLoading(true)
    setResult('Testing...')

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`)
      }

      if (data.sessionId) {
        setResult(`✅ Success! Session ID: ${data.sessionId}`)
        
        try {
          // Load Stripe and redirect
          const { getStripeJs } = await import('@/lib/stripe')
          const stripe = await getStripeJs()
          
          if (stripe) {
            setResult(`✅ Stripe loaded, redirecting to checkout...`)
            const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId })
            if (error) {
              setResult(`❌ Stripe redirect error: ${error.message}`)
            }
          } else {
            setResult(`❌ Failed to load Stripe`)
          }
        } catch (stripeError) {
          setResult(`❌ Stripe loading error: ${stripeError}`)
        }
      } else {
        setResult('❌ No session ID received')
      }
      
    } catch (error) {
      setResult(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h1 className="text-2xl font-bold mb-6">Direct Payment Test</h1>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <p><strong>User Status:</strong></p>
              <p>Loaded: {isLoaded ? '✅' : '❌'}</p>
              <p>Signed In: {isSignedIn ? '✅' : '❌'}</p>
              <p>User ID: {user?.id || 'None'}</p>
              <p>Email: {user?.emailAddresses[0]?.emailAddress || 'None'}</p>
              <p className="text-sm text-gray-600 mt-2">
                Button State: {loading ? 'Loading' : !isLoaded ? 'Waiting for Clerk' : 'Ready'}
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => testCheckout('starter')}
                disabled={loading || !isLoaded}
                className="w-full bg-gray-200 text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Test Starter Plan ($29)'}
              </button>
              
              <button
                onClick={() => testCheckout('professional')}
                disabled={loading || !isLoaded}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Test Professional Plan ($79)'}
              </button>
            </div>

            {result && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-mono text-sm">{result}</p>
              </div>
            )}

            <div className="text-center mt-6">
              <a href="/pricing" className="text-blue-600 hover:text-blue-700">
                ← Back to Pricing Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}