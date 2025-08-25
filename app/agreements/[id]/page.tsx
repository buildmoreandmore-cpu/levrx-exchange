'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'

interface Agreement {
  id: string
  title: string
  content: string
  status: string
  createdAt: string
  createdBy: { name?: string; id: string }
  match: {
    id: string
    listingA: { user: { name?: string } }
    listingB: { user: { name?: string } }
  }
}

export default function AgreementViewPage() {
  const params = useParams()
  const router = useRouter()
  const agreementId = params.id as string
  
  const [agreement, setAgreement] = useState<Agreement | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [editedContent, setEditedContent] = useState('')
  const [editedTitle, setEditedTitle] = useState('')

  useEffect(() => {
    fetchAgreement()
  }, [agreementId])

  const fetchAgreement = async () => {
    try {
      const response = await fetch(`/api/agreements/${agreementId}`)
      if (response.ok) {
        const data = await response.json()
        setAgreement(data)
        setEditedContent(data.content)
        setEditedTitle(data.title)
      } else {
        setError('Agreement not found')
      }
    } catch (error) {
      console.error('Error fetching agreement:', error)
      setError('Failed to fetch agreement')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)

    try {
      const response = await fetch(`/api/agreements/${agreementId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editedTitle,
          content: editedContent
        })
      })

      if (response.ok) {
        const updatedAgreement = await response.json()
        setAgreement(updatedAgreement)
        setEditMode(false)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to save agreement')
      }
    } catch (error) {
      console.error('Error saving agreement:', error)
      setError('Failed to save agreement')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this agreement? This cannot be undone.')) {
      return
    }

    setDeleting(true)

    try {
      const response = await fetch(`/api/agreements/${agreementId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.push(`/matches/${agreement?.match.id}`)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to delete agreement')
      }
    } catch (error) {
      console.error('Error deleting agreement:', error)
      setError('Failed to delete agreement')
    } finally {
      setDeleting(false)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/agreements/${agreementId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        const updatedAgreement = await response.json()
        setAgreement(updatedAgreement)
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading agreement...</p>
        </div>
      </div>
    )
  }

  if (error || !agreement) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement not found</h2>
          <p className="text-gray-600 mb-4">{error || 'The agreement you are looking for does not exist.'}</p>
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
            <Link href="/matches" className="text-gray-600 hover:text-gray-900">Matches</Link>
            <UserButton />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href={`/matches/${agreement.match.id}/agreement`} 
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
          >
            ← Back to Match Agreements
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start mb-4">
              {editMode ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-2xl font-bold text-gray-900 bg-transparent border-none outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1 flex-1 mr-4"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-900">{agreement.title}</h1>
              )}
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                agreement.status === 'DRAFT' 
                  ? 'bg-yellow-100 text-yellow-800'
                  : agreement.status === 'SENT'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {agreement.status}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-600">
              <p>
                Created by {agreement.createdBy.name || 'You'} on {new Date(agreement.createdAt).toLocaleDateString()}
              </p>
              <p>
                Between {agreement.match.listingA.user.name || 'Party A'} and {agreement.match.listingB.user.name || 'Party B'}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {editMode ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={20}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                placeholder="Agreement content in Markdown format..."
              />
            ) : (
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                  {agreement.content}
                </pre>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-200 flex justify-between">
            <div className="flex space-x-3">
              {agreement.status === 'DRAFT' && (
                <>
                  <button
                    onClick={() => handleStatusChange('SENT')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Mark as Sent
                  </button>
                  <button
                    onClick={() => handleStatusChange('SIGNED')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Mark as Signed
                  </button>
                </>
              )}
              {agreement.status === 'SENT' && (
                <button
                  onClick={() => handleStatusChange('SIGNED')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Mark as Signed
                </button>
              )}
            </div>

            <div className="flex space-x-3">
              {editMode ? (
                <>
                  <button
                    onClick={() => {
                      setEditMode(false)
                      setEditedContent(agreement.content)
                      setEditedTitle(agreement.title)
                    }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Edit Agreement
                </button>
              )}
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            <strong>Legal Disclaimer:</strong> This agreement template is for informational purposes only and does not constitute legal advice. 
            Please consult with a qualified attorney to review all agreements before signing.
          </p>
        </div>
      </main>
    </div>
  )
}