'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const plan = searchParams.get('plan') || 'starter'

  useEffect(() => {
    if (isLoaded && isSignedIn && !loading) {
      // Automatically trigger checkout when user is signed in
      handleCheckout()
    } else if (isLoaded && !isSignedIn) {
      // Redirect to sign-up with plan parameter if not signed in
      router.push(`/sign-up?plan=${plan}&redirect=checkout`)
    }
  }, [isLoaded, isSignedIn, plan, router])

  const handleCheckout = async () => {
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

      if (data.sessionId) {
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
        setResult('❌ No session ID received')
      }
      
    } catch (error) {
      setResult(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

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
        </div>
      </div>
    </div>
  )
}