'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

interface CheckoutButtonProps {
  plan: 'starter' | 'professional'
  className?: string
  children: React.ReactNode
}

export default function CheckoutButton({ plan, className = '', children }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Wait for Clerk to load
    if (!isLoaded) {
      return
    }

    if (!isSignedIn) {
      // Redirect to sign up if not authenticated
      router.push('/sign-up')
      return
    }

    setLoading(true)

    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      if (!data.sessionId) {
        throw new Error('No session ID received')
      }

      // Dynamically import Stripe to avoid SSR issues
      const { getStripeJs } = await import('@/lib/stripe')
      const stripe = await getStripeJs()
      
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }
    } catch (error) {
      console.error('Error during checkout:', error)
      alert(`Checkout failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  // Show a fallback after reasonable wait time
  const [showFallback, setShowFallback] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true)
    }, 3000) // Show fallback after 3 seconds
    
    return () => clearTimeout(timer)
  }, [])

  // Don't render until Clerk is loaded, but show fallback if taking too long
  if (!isLoaded && !showFallback) {
    return (
      <div className={className}>
        Loading...
      </div>
    )
  }
  
  // Fallback button if Clerk takes too long
  if (!isLoaded && showFallback) {
    return (
      <a href="/sign-up" className={className}>
        {children}
      </a>
    )
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`${className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      type="button"
    >
      {loading ? 'Processing...' : children}
    </button>
  )
}