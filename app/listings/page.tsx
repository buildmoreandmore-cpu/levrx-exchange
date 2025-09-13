'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { mockListings } from '@/lib/mockListings'
import { Listing } from '@/types/exchange'

interface DatabaseListing {
  id: string
  mode: 'HAVE' | 'WANT'
  status: string
  createdAt: string
  asset?: {
    id: string
    title: string
    description: string
    type: string
    estValueNumeric?: number
    terms?: any
  }
  want?: {
    id: string
    title: string
    description: string
    category: string
    targetValueNumeric?: number
    constraints?: any
  }
  user: {
    id: string
    name?: string
    email: string
  }
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [filter, setFilter] = useState<'ALL' | 'HAVE' | 'WANT'>('ALL')
  const [loading, setLoading] = useState(true)

  // Fetch listings from database
  useEffect(() => {
    const fetchListings = async () => {
      try {
        console.log('🔍 Fetching listings from API...')
        const response = await fetch('/api/listings')
        console.log('🔍 API Response status:', response.status)
        
        if (response.ok) {
          const data: DatabaseListing[] = await response.json()
          console.log('🔍 Raw listings data:', data)
          
          // Transform database listings to frontend format
          const transformedListings: Listing[] = data.map(listing => {
            const isHave = listing.mode === 'HAVE'
            const content = isHave ? listing.asset : listing.want
            const terms = isHave ? listing.asset?.terms : listing.want?.constraints
            
            return {
              id: listing.id,
              kind: listing.mode,
              packageType: terms?.packageType || 'Property',
              propertyType: terms?.propertyType || 'Other',
              city: terms?.city || 'Unknown',
              state: terms?.state || 'Unknown',
              price: isHave ? listing.asset?.estValueNumeric : listing.want?.targetValueNumeric,
              noiAnnual: terms?.noiAnnual,
              currentDebt: terms?.currentDebt,
              sellerUrgency: terms?.sellerUrgency || 'Low',
              sellerReasons: terms?.sellerReasons || [],
              benefitsSought: terms?.benefitsSought || [],
              benefitsToNewOwner: terms?.benefitsToNewOwner || [],
              notes: terms?.notes,
              createdAt: listing.createdAt
            }
          })
          
          console.log('🔍 Transformed listings:', transformedListings)
          setListings(transformedListings)
        } else {
          console.error('❌ Failed to fetch listings:', response.status, response.statusText)
          // Fall back to mock data
          setListings(mockListings)
        }
      } catch (error) {
        console.error('❌ Error fetching listings:', error)
        // Fall back to mock data
        setListings(mockListings)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  const filteredListings = listings.filter(listing => 
    filter === 'ALL' || listing.kind === filter
  )

  const haveCount = listings.filter(l => l.kind === 'HAVE').length
  const wantCount = listings.filter(l => l.kind === 'WANT').length

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Listings</h1>
            <p className="text-gray-600 mt-1">
              Browse marketplace opportunities and partnerships
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              href="/matches"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              View Matches
            </Link>
            <Link
              href="/listings/new"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Create Listing
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Listings</h3>
            <p className="text-3xl font-bold text-indigo-600">{listings.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Have Listings</h3>
            <p className="text-3xl font-bold text-blue-600">{haveCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Want Listings</h3>
            <p className="text-3xl font-bold text-green-600">{wantCount}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'ALL'
                ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Listings ({listings.length})
          </button>
          <button
            onClick={() => setFilter('HAVE')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'HAVE'
                ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Have ({haveCount})
          </button>
          <button
            onClick={() => setFilter('WANT')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'WANT'
                ? 'bg-green-100 text-green-800 border-2 border-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Want ({wantCount})
          </button>
        </div>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {filter === 'ALL' ? 'No listings yet' : `No ${filter.toLowerCase()} listings yet`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'ALL' 
                ? 'Create your first listing to get started with the marketplace'
                : `Create a ${filter.toLowerCase()} listing to start sharing what you're ${filter === 'HAVE' ? 'offering' : 'seeking'}`
              }
            </p>
            <Link
              href="/listings/new"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Listing
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-xl border border-gray-200 p-6">
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

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {listing.packageType} in {listing.city}, {listing.state}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {listing.propertyType} • {listing.notes || 'No additional notes'}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div>
                      <span className="text-sm text-gray-500">Type:</span>
                      <span className="ml-1 text-sm font-medium">{listing.propertyType}</span>
                    </div>
                    {listing.price && (
                      <div>
                        <span className="text-sm text-gray-500">Price:</span>
                        <span className="ml-1 text-sm font-medium">
                          ${listing.price.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {listing.noiAnnual && (
                      <div>
                        <span className="text-sm text-gray-500">NOI:</span>
                        <span className="ml-1 text-sm font-medium">
                          ${listing.noiAnnual.toLocaleString()}/yr
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Urgency</div>
                    <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                      listing.sellerUrgency === 'High' ? 'bg-red-100 text-red-800' :
                      listing.sellerUrgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {listing.sellerUrgency || 'Low'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Demo Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Sample Data Included</h3>
              <p className="mt-1 text-sm text-blue-700">
                Some listings shown are sample data for demonstration. Your created listings are stored locally and will persist across sessions.
                <Link href="/listings/new" className="font-medium underline ml-1">Create your own listing</Link> to get started with real partnerships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}