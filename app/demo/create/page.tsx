'use client'

import Link from 'next/link'
import { useState } from 'react'

export const dynamic = 'force-dynamic'

export default function CreateListing() {
  const [mode, setMode] = useState<'HAVE' | 'WANT'>('HAVE')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    value: '',
    userName: '',
    userEmail: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setFormData({
        title: '',
        description: '',
        type: '',
        value: '',
        userName: '',
        userEmail: ''
      })
    }, 3000)
  }

  const haveTypes = ['EQUITY', 'CASHFLOW', 'SKILL', 'ASSET', 'NETWORK']
  const wantCategories = ['PARTNER', 'CASH', 'EQUIPMENT', 'SKILL', 'PROPERTY']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/demo/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">LVRXchange</h1>
          </Link>
          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            DEMO MODE
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/demo/dashboard" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Listing</h1>
          <p className="text-gray-600">Add a new "Have" or "Want" listing to the marketplace</p>
        </div>

        {showSuccess && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-800 font-medium">Listing created successfully! (Demo mode - not saved)</p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mode Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Listing Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setMode('HAVE')}
                  className={`p-4 rounded-lg border-2 text-center transition-colors ${
                    mode === 'HAVE'
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">HAVE</div>
                  <div className="text-sm mt-1">I'm offering something</div>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('WANT')}
                  className={`p-4 rounded-lg border-2 text-center transition-colors ${
                    mode === 'WANT'
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">WANT</div>
                  <div className="text-sm mt-1">I'm looking for something</div>
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={mode === 'HAVE' ? 'What are you offering?' : 'What are you looking for?'}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Provide detailed information about your listing..."
                required
              />
            </div>

            {/* Type/Category */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                {mode === 'HAVE' ? 'Type' : 'Category'}
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select {mode === 'HAVE' ? 'type' : 'category'}</option>
                {(mode === 'HAVE' ? haveTypes : wantCategories).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Value */}
            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
                {mode === 'HAVE' ? 'Estimated Value' : 'Target Value'} (Optional)
              </label>
              <input
                type="number"
                id="value"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter value in USD"
              />
            </div>

            {/* User Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="userName"
                  value={formData.userName}
                  onChange={(e) => setFormData({...formData, userName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="userEmail"
                  value={formData.userEmail}
                  onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Create Listing (Demo)
              </button>
              <Link
                href="/demo/dashboard"
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Demo Mode</h3>
              <p className="mt-1 text-sm text-blue-700">
                This form demonstrates the listing creation process. In the full application, 
                listings would be saved to the database and become available for AI matching.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}