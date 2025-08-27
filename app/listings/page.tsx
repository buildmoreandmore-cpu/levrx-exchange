'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'

// Sample listings data - shown when no database listings exist
const sampleListings = [
  {
    id: 'listing-1',
    kind: 'HAVE',
    title: '25% Equity in SaaS Startup',
    description: 'B2B software company with $50K ARR, built for small business workflow automation. Looking for strategic partner with sales expertise.',
    category: 'Equity',
    value: 250000,
    city: 'Atlanta',
    state: 'GA',
    createdAt: '2024-01-15T10:00:00Z',
    owner: { name: 'Sarah Chen' }
  },
  {
    id: 'listing-2', 
    kind: 'WANT',
    title: 'Looking for Tech Co-Founder',
    description: 'E-commerce business generating $500K revenue needs technical partner for mobile app development and scaling infrastructure.',
    category: 'Partnership',
    value: 200000,
    city: 'Atlanta',
    state: 'GA', 
    createdAt: '2024-01-14T15:30:00Z',
    owner: { name: 'Mike Rodriguez' }
  },
  {
    id: 'listing-3',
    kind: 'HAVE',
    title: 'Commercial Real Estate Portfolio',
    description: '$2M in commercial properties across downtown district. Generating $200K annual rental income with long-term tenants.',
    category: 'Real Estate',
    value: 2000000,
    city: 'Atlanta',
    state: 'GA',
    createdAt: '2024-01-13T09:15:00Z',
    owner: { name: 'Jennifer Park' }
  },
  {
    id: 'listing-4',
    kind: 'WANT',
    title: '$100K Investment for Restaurant Expansion',
    description: 'Growing restaurant chain with 3 locations seeking capital for 2 new locations. Strong financials and proven concept.',
    category: 'Cash',
    value: 100000,
    city: 'Atlanta', 
    state: 'GA',
    createdAt: '2024-01-12T14:20:00Z',
    owner: { name: 'David Kim' }
  },
  {
    id: 'listing-5',
    kind: 'HAVE',
    title: 'Full-Stack Development Services', 
    description: '10+ years experience in React, Node.js, Python, AWS. Available for equity partnerships in early-stage startups.',
    category: 'Skills',
    value: 150000,
    city: 'Atlanta',
    state: 'GA',
    createdAt: '2024-01-11T11:45:00Z',
    owner: { name: 'Alex Johnson' }
  }
]

export default function ListingsPage() {
  const { user, isLoaded } = useUser()
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchListings = async () => {
      if (!isLoaded) return
      
      try {
        if (user) {
          // Fetch from API if user is authenticated
          const response = await fetch('/api/listings')
          if (response.ok) {
            const data = await response.json()
            setListings(data.length > 0 ? data : sampleListings)
          } else {
            // Fall back to sample data if API fails
            setListings(sampleListings)
          }
        } else {
          // Show sample data for non-authenticated users
          setListings(sampleListings)
        }
      } catch (err) {
        console.error('Error fetching listings:', err)
        setListings(sampleListings)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [user, isLoaded])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading listings...</p>
        </div>
      </div>
    )
  }

  // Transform API listings to match expected format
  const transformedListings = listings.map(listing => {
    if (listing.mode) {
      // Database listing from API
      return {
        id: listing.id,
        kind: listing.mode,
        title: listing.asset?.title || listing.want?.title,
        description: listing.asset?.description || listing.want?.description,
        category: listing.asset?.type || listing.want?.category,
        value: listing.asset?.estValueNumeric || listing.want?.targetValueNumeric,
        city: 'Atlanta', // Default for demo
        state: 'GA', // Default for demo  
        createdAt: listing.createdAt,
        owner: { name: listing.user?.name || 'Anonymous' }
      }
    } else {
      // Sample listing
      return listing
    }
  })

  const haveListings = transformedListings.filter(l => l.kind === 'HAVE')
  const wantListings = transformedListings.filter(l => l.kind === 'WANT')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">LevrX</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/listings/new"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Create Listing
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace Listings</h1>
          <p className="text-gray-600">Browse opportunities and partnerships in the LevrX marketplace</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Listings</h3>
            <p className="text-3xl font-bold text-indigo-600">{transformedListings.length}</p>
            <p className="text-sm text-gray-600 mt-1">Active opportunities</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Have Listings</h3>
            <p className="text-3xl font-bold text-blue-600">{haveListings.length}</p>
            <p className="text-sm text-gray-600 mt-1">Assets & services offered</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Want Listings</h3>
            <p className="text-3xl font-bold text-green-600">{wantListings.length}</p>
            <p className="text-sm text-gray-600 mt-1">Seeking partnerships</p>
          </div>
        </div>

        {/* Create Listing CTA */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
              <p className="text-indigo-100">
                Create your listing and connect with potential partners in minutes
              </p>
            </div>
            <Link
              href="/listings/new"
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Listing
            </Link>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid gap-6">
          {transformedListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    listing.kind === 'HAVE' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {listing.kind === 'HAVE' ? 'Offering' : 'Seeking'}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Link
                  href={`/listings/${listing.id}`}
                  className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                >
                  View Details →
                </Link>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">{listing.title}</h3>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{listing.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div>
                    <span className="text-sm text-gray-500">Category:</span>
                    <span className="ml-1 text-sm font-medium">{listing.category}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Location:</span>
                    <span className="ml-1 text-sm font-medium">{listing.city}, {listing.state}</span>
                  </div>
                  {listing.value && (
                    <div>
                      <span className="text-sm text-gray-500">
                        {listing.kind === 'HAVE' ? 'Est. Value' : 'Target'}:
                      </span>
                      <span className="ml-1 text-sm font-medium">
                        ${listing.value.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Listed by</div>
                  <div className="text-sm font-medium">{listing.owner.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Getting Started Section */}
        <div className="mt-12 bg-white rounded-xl border border-gray-200 p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How LevrX Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Create Your Listing</h4>
              <p className="text-sm text-gray-600">Share what you have to offer or what you're looking for</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI Finds Matches</h4>
              <p className="text-sm text-gray-600">Our AI analyzes compatibility and suggests potential partners</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Make Connections</h4>
              <p className="text-sm text-gray-600">Connect, discuss, and structure deals with matched partners</p>
            </div>
          </div>
        </div>

        {/* Status Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                {user ? 'Marketplace Data' : 'Sample Data'}
              </h3>
              <p className="mt-1 text-sm text-blue-700">
                {user 
                  ? listings.some(l => l.mode) 
                    ? 'Showing real listings from the database. Your created listings will appear here.'
                    : 'No listings created yet. Sample data is shown for demonstration.'
                  : 'These are example listings for demonstration purposes.'
                }
                <Link href="/listings/new" className="font-medium underline ml-1">
                  Create your own listing
                </Link> to get started with real partnerships.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}