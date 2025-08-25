'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

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
    asset?: { title: string; type: string; description: string }
    want?: { title: string; category: string; description: string }
  }
  listingB: {
    id: string
    title: string
    mode: string
    user: { name?: string }
    asset?: { title: string; type: string; description: string }
    want?: { title: string; category: string; description: string }
  }
}

export default function MatchDetailPage() {
  const params = useParams()
  const matchId = params.id as string
  const [match, setMatch] = useState<Match | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStructure, setSelectedStructure] = useState<any | null>(null)

  useEffect(() => {
    fetchMatch()
  }, [matchId])

  const fetchMatch = async () => {
    try {
      const response = await fetch(`/api/match?id=${matchId}`)
      if (response.ok) {
        const data = await response.json()
        setMatch(data)
      } else {
        setError('Match not found')
      }
    } catch (error) {
      console.error('Error fetching match:', error)
      setError('Failed to fetch match')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading match details...</p>
        </div>
      </div>
    )
  }

  if (error || !match) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Match not found</h2>
          <p className="text-gray-600 mb-4">{error || 'The match you are looking for does not exist.'}</p>
          <Link href="/matches" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
            Back to Matches
          </Link>
        </div>
      </div>
    )
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
          <nav className="flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
            <Link href="/listings" className="text-gray-600 hover:text-gray-900">Listings</Link>
            <Link href="/matches" className="text-gray-600 hover:text-gray-900">Matches</Link>
            <UserButton />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/matches" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            ← Back to Matches
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h1 className="text-3xl font-bold text-gray-900">
              {Math.round(match.score * 100)}% Match
            </h1>
            <span className="text-gray-500 text-lg">
              • {new Date(match.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-600">Detailed match analysis and deal structures</p>
        </div>

        {/* Match Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Listing A */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{match.listingA.title}</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {match.listingA.mode}
              </span>
            </div>
            <p className="text-gray-600 mb-4">by {match.listingA.user.name || 'Anonymous'}</p>
            
            {match.listingA.asset && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Asset Details</h3>
                <p className="text-sm text-gray-600 mb-1">Type: {match.listingA.asset.type}</p>
                <p className="text-sm text-gray-600">{match.listingA.asset.description}</p>
              </div>
            )}
            
            {match.listingA.want && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Want Details</h3>
                <p className="text-sm text-gray-600 mb-1">Category: {match.listingA.want.category}</p>
                <p className="text-sm text-gray-600">{match.listingA.want.description}</p>
              </div>
            )}
          </div>

          {/* Listing B */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{match.listingB.title}</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {match.listingB.mode}
              </span>
            </div>
            <p className="text-gray-600 mb-4">by {match.listingB.user.name || 'Anonymous'}</p>
            
            {match.listingB.asset && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Asset Details</h3>
                <p className="text-sm text-gray-600 mb-1">Type: {match.listingB.asset.type}</p>
                <p className="text-sm text-gray-600">{match.listingB.asset.description}</p>
              </div>
            )}
            
            {match.listingB.want && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Want Details</h3>
                <p className="text-sm text-gray-600 mb-1">Category: {match.listingB.want.category}</p>
                <p className="text-sm text-gray-600">{match.listingB.want.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Match Rationale */}
        {match.rationale && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Why this match works</h2>
            <div className="text-gray-600 whitespace-pre-line bg-gray-50 p-4 rounded">
              {match.rationale}
            </div>
          </div>
        )}

        {/* Suggested Deal Structures */}
        {match.suggestedStructures && match.suggestedStructures.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Suggested Deal Structures</h2>
            <div className="space-y-6">
              {match.suggestedStructures.map((structure, index) => (
                <div 
                  key={index} 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedStructure === structure 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedStructure(structure)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{structure.name}</h3>
                    <input 
                      type="radio" 
                      checked={selectedStructure === structure}
                      onChange={() => setSelectedStructure(structure)}
                      className="mt-1"
                    />
                  </div>
                  <p className="text-gray-600 mb-4">{structure.howItWorks}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Terms</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {structure.keyTerms?.map((term: string, i: number) => (
                          <li key={i}>• {term}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Risks</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {structure.risks?.map((risk: string, i: number) => (
                          <li key={i}>• {risk}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Next Steps</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {structure.nextSteps?.map((step: string, i: number) => (
                          <li key={i}>• {step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <Link
              href={`/matches/${match.id}/message`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium"
            >
              Start Conversation
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              href={`/matches/${match.id}/agreement${selectedStructure ? `?structure=${encodeURIComponent(JSON.stringify(selectedStructure))}` : ''}`}
              className={`px-6 py-3 rounded-lg font-medium ${
                selectedStructure
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {selectedStructure ? 'Draft Agreement' : 'Select Structure First'}
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}