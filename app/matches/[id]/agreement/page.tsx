'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'

interface Agreement {
  id: string
  title: string
  content: string
  status: string
  createdAt: string
  createdBy: { name?: string }
}

export default function AgreementDraftPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const matchId = params.id as string
  
  const [match, setMatch] = useState<any>(null)
  const [agreements, setAgreements] = useState<Agreement[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedStructure, setSelectedStructure] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    partyA: '',
    partyB: '',
    keyTerms: ''
  })

  useEffect(() => {
    // Parse structure from URL params if available
    const structureParam = searchParams.get('structure')
    if (structureParam) {
      try {
        const structure = JSON.parse(decodeURIComponent(structureParam))
        setSelectedStructure(structure)
        setFormData(prev => ({
          ...prev,
          title: `${structure.name} - Letter of Intent`
        }))
      } catch (e) {
        console.error('Error parsing structure:', e)
      }
    }

    fetchMatch()
    fetchAgreements()
  }, [matchId])

  const fetchMatch = async () => {
    try {
      const response = await fetch(`/api/match?id=${matchId}`)
      if (response.ok) {
        const data = await response.json()
        setMatch(data)
        
        // Set default party names
        if (data && !formData.partyA && !formData.partyB) {
          setFormData(prev => ({
            ...prev,
            partyA: data.listingA?.user?.name || 'Party A',
            partyB: data.listingB?.user?.name || 'Party B'
          }))
        }
      }
    } catch (error) {
      console.error('Error fetching match:', error)
    }
  }

  const fetchAgreements = async () => {
    try {
      const response = await fetch(`/api/agreements?matchId=${matchId}`)
      if (response.ok) {
        const data = await response.json()
        setAgreements(data)
      }
    } catch (error) {
      console.error('Error fetching agreements:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAgreement = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    setError(null)

    try {
      const response = await fetch('/api/agreements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchId,
          title: formData.title,
          structureChoice: selectedStructure,
          parties: {
            partyA: formData.partyA,
            partyB: formData.partyB
          },
          keyTerms: formData.keyTerms
        })
      })

      if (response.ok) {
        await fetchAgreements()
        setFormData({ title: '', partyA: '', partyB: '', keyTerms: '' })
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to create agreement')
      }
    } catch (error) {
      console.error('Error creating agreement:', error)
      setError('Failed to create agreement')
    } finally {
      setCreating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading agreement workspace...</p>
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
            <Link href="/matches" className="text-gray-600 hover:text-gray-900">Matches</Link>
            <UserButton />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href={`/matches/${matchId}`} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            ← Back to Match
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Draft Agreement</h1>
          <p className="text-gray-600">Create legally-structured agreements for your match</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Agreement Creation Form */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Agreement</h2>
            
            {selectedStructure && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-indigo-900 mb-2">Selected Structure</h3>
                <p className="text-indigo-800 font-medium">{selectedStructure.name}</p>
                <p className="text-indigo-700 text-sm mt-1">{selectedStructure.howItWorks}</p>
              </div>
            )}

            <form onSubmit={handleCreateAgreement} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Agreement Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  placeholder="e.g., Joint Venture Partnership - Letter of Intent"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="partyA" className="block text-sm font-medium text-gray-700 mb-2">
                    Party A Name *
                  </label>
                  <input
                    type="text"
                    id="partyA"
                    value={formData.partyA}
                    onChange={(e) => setFormData(prev => ({ ...prev, partyA: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="partyB" className="block text-sm font-medium text-gray-700 mb-2">
                    Party B Name *
                  </label>
                  <input
                    type="text"
                    id="partyB"
                    value={formData.partyB}
                    onChange={(e) => setFormData(prev => ({ ...prev, partyB: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="keyTerms" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Key Terms & Conditions
                </label>
                <textarea
                  id="keyTerms"
                  rows={4}
                  value={formData.keyTerms}
                  onChange={(e) => setFormData(prev => ({ ...prev, keyTerms: e.target.value }))}
                  placeholder="Any specific terms, timelines, or conditions you want included..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={creating}
                className={`w-full py-3 px-4 rounded-lg font-medium ${
                  creating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {creating ? 'Generating Agreement...' : 'Generate Agreement'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Legal Disclaimer:</strong> This generates template agreements for informational purposes only. 
                Always consult with a qualified attorney before signing any legal agreements.
              </p>
            </div>
          </div>

          {/* Existing Agreements */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Existing Agreements</h2>
            
            {agreements.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No agreements yet</h3>
                <p className="text-gray-600">Create your first agreement using the form</p>
              </div>
            ) : (
              <div className="space-y-4">
                {agreements.map((agreement) => (
                  <div key={agreement.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{agreement.title}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        agreement.status === 'DRAFT' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : agreement.status === 'SENT'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {agreement.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Created by {agreement.createdBy.name || 'You'} on {new Date(agreement.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex space-x-2">
                      <Link
                        href={`/agreements/${agreement.id}`}
                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                      >
                        View & Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}