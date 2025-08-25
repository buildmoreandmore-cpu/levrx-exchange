'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'

export default function NewListing() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialMode = searchParams.get('mode') === 'want' ? 'WANT' : 'HAVE'
  
  const [mode, setMode] = useState<'HAVE' | 'WANT'>(initialMode as 'HAVE' | 'WANT')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      mode,
      title: formData.get('title'),
      description: formData.get('description'),
      type: formData.get('type'),
      category: formData.get('category'),
      estValue: formData.get('estValue') ? parseFloat(formData.get('estValue') as string) : null,
      targetValue: formData.get('targetValue') ? parseFloat(formData.get('targetValue') as string) : null,
      terms: formData.get('terms'),
      constraints: formData.get('constraints'),
    }
    
    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        const result = await response.json()
        router.push(`/listings/${result.id}`)
      } else {
        alert('Failed to create listing')
      }
    } catch (error) {
      console.error('Error creating listing:', error)
      alert('Failed to create listing')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">LevrX</h1>
          </Link>
          <UserButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Listing</h1>
          <p className="text-gray-600">Share what you have or what you&apos;re looking for</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
          {/* Mode Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              What are you doing?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setMode('HAVE')}
                className={`p-4 border-2 rounded-lg text-left ${
                  mode === 'HAVE' 
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">I Have Something</div>
                <div className="text-sm text-gray-500">Share your assets, equity, skills, or resources</div>
              </button>
              <button
                type="button"
                onClick={() => setMode('WANT')}
                className={`p-4 border-2 rounded-lg text-left ${
                  mode === 'WANT' 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">I Want Something</div>
                <div className="text-sm text-gray-500">Describe what you&apos;re looking for</div>
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder={mode === 'HAVE' ? "e.g., 25% Equity in SaaS Company" : "e.g., Looking for Tech Co-Founder"}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              placeholder={
                mode === 'HAVE' 
                  ? "Describe what you're offering in detail..." 
                  : "Describe what you're looking for and why..."
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Type/Category */}
          <div className="mb-6">
            <label htmlFor={mode === 'HAVE' ? 'type' : 'category'} className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'HAVE' ? 'Asset Type' : 'Category'} *
            </label>
            <select
              id={mode === 'HAVE' ? 'type' : 'category'}
              name={mode === 'HAVE' ? 'type' : 'category'}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Select {mode === 'HAVE' ? 'type' : 'category'}...</option>
              {mode === 'HAVE' ? (
                <>
                  <option value="EQUITY">Equity</option>
                  <option value="CASHFLOW">Cash Flow</option>
                  <option value="EQUIPMENT">Equipment</option>
                  <option value="CREDIT">Credit Capacity</option>
                  <option value="SKILL">Skills/Services</option>
                  <option value="OTHER">Other</option>
                </>
              ) : (
                <>
                  <option value="CASH">Cash</option>
                  <option value="PARTNER">Partner</option>
                  <option value="EQUIPMENT">Equipment</option>
                  <option value="TENANT">Tenant</option>
                  <option value="BUYER">Buyer</option>
                  <option value="OTHER">Other</option>
                </>
              )}
            </select>
          </div>

          {/* Value */}
          <div className="mb-6">
            <label htmlFor={mode === 'HAVE' ? 'estValue' : 'targetValue'} className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'HAVE' ? 'Estimated Value ($)' : 'Target Value ($)'}
            </label>
            <input
              type="number"
              id={mode === 'HAVE' ? 'estValue' : 'targetValue'}
              name={mode === 'HAVE' ? 'estValue' : 'targetValue'}
              min="0"
              step="0.01"
              placeholder="Optional"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Terms/Constraints */}
          <div className="mb-8">
            <label htmlFor={mode === 'HAVE' ? 'terms' : 'constraints'} className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'HAVE' ? 'Terms & Conditions' : 'Requirements & Constraints'}
            </label>
            <textarea
              id={mode === 'HAVE' ? 'terms' : 'constraints'}
              name={mode === 'HAVE' ? 'terms' : 'constraints'}
              rows={3}
              placeholder={
                mode === 'HAVE' 
                  ? "Any specific terms, conditions, or requirements..." 
                  : "Location preferences, timeline, must-haves..."
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-between">
            <Link 
              href="/dashboard"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg font-medium ${
                mode === 'HAVE'
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Creating...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}