'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'

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
  const router = useRouter()
  const { user } = useUser()
  const [listing, setListing] = useState<Listing | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [findingMatches, setFindingMatches] = useState(false)
  
  // Check if current user owns this listing
  const isOwner = user && listing && user.id === listing.user.id

  const shareToSocial = (platform: string) => {
    if (!listing) return
    
    const listingUrl = `${window.location.origin}/listings/${listing.id}`
    const title = `Check out this ${listing.mode === 'HAVE' ? 'opportunity' : 'request'} on LVRXchange`
    const description = `${listing.mode === 'HAVE' ? 'Offering' : 'Looking for'}: ${listing.asset?.title || listing.want?.title || 'Property'}`
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(listingUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(listingUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(listingUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\nView details: ${listingUrl}`)}`
    }
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(listingUrl)
      alert('Link copied to clipboard!')
      return
    }
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400')
  }

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
      console.log('🔍 Finding matches for listing:', listing.id)
      
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: listing.id }),
      })
      
      console.log('🔍 Match API response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('🔍 Match data received:', data)
        setMatches(data)
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }))
        console.error('🔍 Match API error:', response.status, errorData)
        alert(`Failed to find matches: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('🔍 Error finding matches:', error)
      alert(`Error finding matches: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setFindingMatches(false)
    }
  }

  const deleteListing = async () => {
    if (!listing || !isOwner) return
    
    const confirmDelete = confirm('Are you sure you want to delete this listing? This action cannot be undone.')
    if (!confirmDelete) return
    
    try {
      const response = await fetch(`/api/listings/${listing.id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        alert('Listing deleted successfully!')
        router.push('/listings')
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }))
        alert(`Failed to delete listing: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error deleting listing:', error)
      alert(`Error deleting listing: ${error instanceof Error ? error.message : 'Unknown error'}`)
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
              
              <Link 
                href="/listings/new" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors mb-3 block text-center"
              >
                Post Listing
              </Link>
              
              {/* Owner actions - only show if current user owns this listing */}
              {isOwner && (
                <>
                  <Link 
                    href={`/listings/${listing?.id}/edit`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors mb-3 block text-center"
                  >
                    Edit Listing
                  </Link>
                  
                  <button
                    onClick={deleteListing}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors mb-3"
                  >
                    Delete Listing
                  </button>
                </>
              )}
              
              {/* Share Listing */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Share Listing</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => shareToSocial('twitter')}
                    className="flex items-center justify-center py-2 px-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Twitter
                  </button>
                  
                  <button
                    onClick={() => shareToSocial('facebook')}
                    className="flex items-center justify-center py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
                  
                  <button
                    onClick={() => shareToSocial('linkedin')}
                    className="flex items-center justify-center py-2 px-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </button>
                  
                  <button
                    onClick={() => shareToSocial('email')}
                    className="flex items-center justify-center py-2 px-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </button>
                </div>
                
                <button
                  onClick={() => shareToSocial('copy')}
                  className="w-full mt-2 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Link
                </button>
              </div>
              
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