'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'

interface Listing {
  id: string
  mode: 'HAVE' | 'WANT'
  status: string
  createdAt: string
  user: {
    id: string
    name: string
    email: string
  }
  asset?: {
    id: string
    type: string
    title: string
    description: string
    estValueNumeric?: number
    terms?: Record<string, unknown>
  }
  want?: {
    id: string
    category: string
    title: string
    description: string
    targetValueNumeric?: number
    constraints?: Record<string, unknown>
  }
}

interface Match {
  id: string
  score: number
  rationale?: string
  suggestedStructures?: {
    structures: Array<{
      name: string
      howItWorks: string
      keyTerms: string[]
      risks: string[]
      nextSteps: string[]
    }>
  }
  listingB: Listing
}

export default function ListingDetail() {
  const params = useParams()
  const [listing, setListing] = useState<Listing | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [findingMatches, setFindingMatches] = useState(false)

  useEffect(() => {
    fetchListing()
  }, [params.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchListing = async () => {
    try {
      const response = await fetch(`/api/listings/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setListing(data)
      }
    } catch (error) {
      console.error('Error fetching listing:', error)
    } finally {
      setLoading(false)
    }
  }

  const findMatches = async () => {
    if (!listing) return
    
    setFindingMatches(true)
    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: listing.id }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setMatches(data)
      }
    } catch (error) {
      console.error('Error finding matches:', error)
    } finally {
      setFindingMatches(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading listing...</p>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Listing not found</h1>
          <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-800">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const item = listing.mode === 'HAVE' ? listing.asset : listing.want
  const modeColor = listing.mode === 'HAVE' ? 'indigo' : 'green'

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
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Listing Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-8">
              <div className="flex items-center justify-between mb-6">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  listing.mode === 'HAVE' 
                    ? 'bg-indigo-100 text-indigo-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {listing.mode === 'HAVE' ? 'Offering' : 'Seeking'}
                </div>
                <div className="text-sm text-gray-500">
                  Listed {new Date(listing.createdAt).toLocaleDateString()}
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {item?.title}
              </h1>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {item?.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {listing.mode === 'HAVE' ? 'Asset Type' : 'Category'}
                  </h4>
                  <p className="text-gray-600">
                    {listing.mode === 'HAVE' ? (item as { type?: string })?.type : (item as { category?: string })?.category}
                  </p>
                </div>
                
                {((listing.mode === 'HAVE' && listing.asset?.estValueNumeric) || 
                  (listing.mode === 'WANT' && listing.want?.targetValueNumeric)) && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {listing.mode === 'HAVE' ? 'Estimated Value' : 'Target Value'}
                    </h4>
                    <p className="text-gray-600">
                      ${((listing.mode === 'HAVE' ? listing.asset?.estValueNumeric : listing.want?.targetValueNumeric) || 0).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {((listing.mode === 'HAVE' && listing.asset?.terms) || 
                (listing.mode === 'WANT' && listing.want?.constraints)) && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {listing.mode === 'HAVE' ? 'Terms & Conditions' : 'Requirements'}
                  </h4>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {listing.mode === 'HAVE' 
                      ? (listing.asset?.terms as { text?: string })?.text 
                      : (listing.want?.constraints as { text?: string })?.text}
                  </p>
                </div>
              )}

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-2">Listed by</h4>
                <p className="text-gray-600">
                  {listing.user.name || listing.user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Matching */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Matches</h3>
              
              <button
                onClick={findMatches}
                disabled={findingMatches}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white mb-6 ${
                  findingMatches 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : `bg-${modeColor}-600 hover:bg-${modeColor}-700`
                }`}
              >
                {findingMatches ? 'Finding Matches...' : 'Find Matches'}
              </button>

              {matches.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    {matches.length} Match{matches.length > 1 ? 'es' : ''} Found
                  </h4>
                  
                  {matches.map((match) => (
                    <div key={match.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">
                          {match.listingB.mode === 'HAVE' 
                            ? match.listingB.asset?.title 
                            : match.listingB.want?.title}
                        </h5>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {Math.round(match.score * 100)}% match
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {match.listingB.mode === 'HAVE' 
                          ? match.listingB.asset?.description 
                          : match.listingB.want?.description}
                      </p>

                      {match.rationale && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">AI Analysis:</p>
                          <p className="text-sm text-gray-700">{match.rationale}</p>
                        </div>
                      )}

                      {(match.suggestedStructures?.structures?.length ?? 0) > 0 && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">Suggested Deal Structures:</p>
                          {match.suggestedStructures?.structures?.slice(0, 2).map((structure, idx: number) => (
                            <div key={idx} className="text-sm text-gray-700 mb-1">
                              • {structure.name}
                            </div>
                          ))}
                        </div>
                      )}

                      <Link 
                        href={`/matches/${match.id}`}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        View Details & Generate LOI →
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {matches.length === 0 && findingMatches === false && (
                <p className="text-gray-500 text-sm">
                  Click &quot;Find Matches&quot; to discover complementary listings
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}