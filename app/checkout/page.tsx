'use client'

import { useEffect, useState, Suspense, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'

function CheckoutPageContent() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const plan = searchParams.get('plan') || 'starter'

  const handleCheckout = useCallback(async () => {
    setLoading(true)
    setResult('Creating checkout session...')

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

      if (data.sessionId && data.url) {
        setResult('Redirecting to Stripe checkout...')
        
        // Use direct URL redirect instead of redirectToCheckout
        window.location.href = data.url
        
      } else if (data.sessionId && !data.url) {
        // Fallback to old method if only sessionId is provided
        setResult('Redirecting to Stripe checkout...')
        
        // Load Stripe and redirect
        const { getStripeJs } = await import('@/lib/stripe')
        const stripe = await getStripeJs()
        
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId })
          if (error) {
            setResult(`❌ Stripe redirect error: ${error.message}`)
          }
        } else {
          setResult('❌ Failed to load Stripe')
        }
      } else {
        setResult('❌ No session ID or URL received')
      }
      
    } catch (error) {
      setResult(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }, [plan])

  useEffect(() => {
    if (isLoaded && isSignedIn && !loading && !result) {
      // Automatically trigger checkout when user is signed in
      handleCheckout()
    } else if (isLoaded && !isSignedIn) {
      // Redirect to sign-up with plan parameter if not signed in
      router.push(`/sign-up?plan=${plan}&redirect=checkout`)
    }
  }, [isLoaded, isSignedIn, plan, router, loading, result, handleCheckout])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg p-8 shadow-sm text-center">
        <h1 className="text-2xl font-bold mb-6">Processing Payment</h1>
        
        <div className="space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          
          <p className="text-gray-600">
            {result || `Setting up your ${plan} plan...`}
          </p>
          
          {result.includes('❌') && (
            <div className="mt-6">
              <button
                onClick={() => router.push('/pricing')}
                className="bg-gray-200 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                Back to Pricing
              </button>
            </div>
          )}
          
          {/* Stripe Legal Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-500">
                Payment processing powered by{' '}
                <a 
                  href="https://stripe.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Stripe
                </a>
              </p>
              <div className="flex justify-center items-center space-x-4 text-xs text-gray-400">
                <a 
                  href="https://stripe.com/docs/billing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-600 underline"
                >
                  Learn more about Stripe Billing
                </a>
                <span>•</span>
                <a 
                  href="https://stripe.com/legal/ssa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-600 underline"
                >
                  Terms
                </a>
                <span>•</span>
                <a 
                  href="https://stripe.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-600 underline"
                >
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <CheckoutPageContent />
    </Suspense>
  )
}