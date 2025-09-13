'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useUser, UserButton } from '@clerk/nextjs'
import { sampleMatchesFormatted, SampleMatchFormatted } from '@/lib/sample-data'

export const dynamic = 'force-dynamic'

interface Match {
  id: string
  score: number
  rationale?: string
  suggestedStructures?: any[]
  createdAt: string
  listingA: {
    id: string
    title: string
    mode: string
    user: { name?: string }
    asset?: { title: string; type: string }
    want?: { title: string; category: string }
  }
  listingB: {
    id: string
    title: string
    mode: string
    user: { name?: string }
    asset?: { title: string; type: string }
    want?: { title: string; category: string }
  }
}

export default function MatchesPage() {
  const { isSignedIn, isLoaded } = useUser()
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoaded) return // Wait for Clerk to load

    if (!isSignedIn) {
      // For non-authenticated users, show sample data
      console.log('👋 Showing sample matches for visitor')
      setMatches(sampleMatchesFormatted as Match[])
      setLoading(false)
      return
    }

    // For authenticated users, fetch real data
    fetchMatches()
  }, [isSignedIn, isLoaded])

  const fetchMatches = async () => {
    try {
      console.log('🔍 Fetching real matches from API for authenticated user...')
      const response = await fetch('/api/match')
      if (response.ok) {
        const data = await response.json()
        setMatches(data)
      } else {
        setError('Failed to fetch matches')
      }
    } catch (error) {
      console.error('Error fetching matches:', error)
      setError('Failed to fetch matches')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading matches...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={isSignedIn ? "/dashboard" : "/listings"} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">LVRXchange</h1>
          </Link>
          <nav className="flex items-center space-x-6">
            {isSignedIn ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                <Link href="/listings" className="text-gray-600 hover:text-gray-900">Listings</Link>
                <Link href="/matches" className="text-indigo-600 font-medium">Matches</Link>
                <UserButton />
              </>
            ) : (
              <>
                <Link href="/listings" className="text-gray-600 hover:text-gray-900">Browse Listings</Link>
                <Link href="/matches" className="text-indigo-600 font-medium">Demo Matches</Link>
                <Link href="/sign-in" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Sign In</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignedIn ? 'Your Matches' : 'Demo Matches'}
          </h1>
          <p className="text-gray-600">
            {isSignedIn 
              ? 'AI-generated matches based on your listings'
              : 'See how our AI creates intelligent partnerships between investors and opportunities'
            }
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {matches.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No matches yet</h3>
            <p className="text-gray-600 mb-4">Create some listings to start getting matched with others</p>
            <Link 
              href="/listings/new"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Create Listing
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {matches.map((match) => (
              <div key={match.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-700">
                      {Math.round(match.score * 100)}% Match
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(match.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Link
                    href={`/matches/${match.id}`}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  {/* Listing A */}
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{match.listingA.title}</h3>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {match.listingA.mode}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      by {match.listingA.user.name || 'Anonymous'}
                    </p>
                    {match.listingA.asset && (
                      <p className="text-sm text-gray-500">
                        {match.listingA.asset.type} • {match.listingA.asset.title}
                      </p>
                    )}
                    {match.listingA.want && (
                      <p className="text-sm text-gray-500">
                        {match.listingA.want.category} • {match.listingA.want.title}
                      </p>
                    )}
                  </div>

                  {/* Listing B */}
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{match.listingB.title}</h3>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {match.listingB.mode}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      by {match.listingB.user.name || 'Anonymous'}
                    </p>
                    {match.listingB.asset && (
                      <p className="text-sm text-gray-500">
                        {match.listingB.asset.type} • {match.listingB.asset.title}
                      </p>
                    )}
                    {match.listingB.want && (
                      <p className="text-sm text-gray-500">
                        {match.listingB.want.category} • {match.listingB.want.title}
                      </p>
                    )}
                  </div>
                </div>

                {match.rationale && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Why this match:</h4>
                    <div className="text-sm text-gray-600 whitespace-pre-line bg-gray-50 p-3 rounded">
                      {match.rationale}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {match.suggestedStructures?.length || 0} suggested deal structures
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/matches/${match.id}/message`}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm font-medium"
                    >
                      Message
                    </Link>
                    <Link
                      href={`/matches/${match.id}/agreement`}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm font-medium"
                    >
                      Draft Agreement
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Demo Notice for non-authenticated users */}
        {!isSignedIn && matches.length > 0 && (
          <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Demo Matches</h3>
                <p className="mt-1 text-sm text-green-700">
                  These are sample matches showing how our AI analyzes compatibility between opportunities and investors.
                  <Link href="/sign-in" className="font-medium underline ml-1">Sign in</Link> to create real listings and get actual matches tailored to your portfolio.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}