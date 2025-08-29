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

    // Always redirect to checkout page with plan parameter
    router.push(`/checkout?plan=${plan}`)
    return
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