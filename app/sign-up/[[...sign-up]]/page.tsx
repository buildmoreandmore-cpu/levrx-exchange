'use client'

import { SignUp } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SignUpContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')
  const redirect = searchParams.get('redirect')
  
  // If coming from checkout flow, redirect to checkout after sign-up
  const redirectUrl = plan && redirect === 'checkout' 
    ? `/checkout?plan=${plan}`
    : '/dashboard'
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <SignUp redirectUrl={redirectUrl} />
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SignUpContent />
    </Suspense>
  )
}