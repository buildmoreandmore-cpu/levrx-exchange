'use client'

import { useEffect, useState, useRef } from 'react'
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
  const agreementRef = useRef<HTMLDivElement>(null)
  
  const [match, setMatch] = useState<any>(null)
  const [agreements, setAgreements] = useState<Agreement[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedStructure, setSelectedStructure] = useState<any>(null)
  const [generatedAgreement, setGeneratedAgreement] = useState<string | null>(null)
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
      // Use demo match data for now
      const demoMatch = {
        id: 'demo-match-1',
        score: 0.85,
        listingA: {
          id: 'have-1',
          title: 'Multifamily (5+ units) Investment Opportunity',
          mode: 'HAVE',
          user: { name: 'Atlanta Investor' }
        },
        listingB: {
          id: 'want-1',
          title: 'Seeking Single-Family Opportunity', 
          mode: 'WANT',
          user: { name: 'Charlotte Buyer' }
        }
      }
      
      setMatch(demoMatch)
      
      // Set default party names
      if (!formData.partyA && !formData.partyB) {
        setFormData(prev => ({
          ...prev,
          partyA: demoMatch.listingA?.user?.name || 'Party A',
          partyB: demoMatch.listingB?.user?.name || 'Party B',
          title: 'Real Estate Investment Partnership Agreement'
        }))
      }
    } catch (error) {
      console.error('Error fetching match:', error)
    }
  }

  const fetchAgreements = async () => {
    try {
      // For demo, return empty array
      setAgreements([])
    } catch (error) {
      console.error('Error fetching agreements:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateAgreementContent = () => {
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })

    return `
**${formData.title}**

This Letter of Intent ("LOI") is entered into on ${currentDate}, between:

**Party A (Property Owner):** ${formData.partyA}
**Party B (Investor/Buyer):** ${formData.partyB}

**Property Description:**
${match?.listingA?.title || 'Real Estate Investment Property'}

**Proposed Transaction Structure:**

**Financial Terms:**
• Property Value: $2,200,000
• Existing Debt: $1,200,000 (4.5% interest rate)
• Net Operating Income: $165,000 annually
• Proposed Partnership: 50/50 equity split after debt assumption

**Key Terms:**
1. **Debt Assumption**: ${formData.partyB} will assume the existing $1.2M mortgage at current terms
2. **Timeline**: Transaction to close within 45 days to accommodate 1031 exchange requirements
3. **Due Diligence Period**: 14 days for property inspection and financial review
4. **Management**: Joint decision-making on major property decisions
5. **Cash Flow Distribution**: Net cash flow split equally between parties after debt service

**Additional Terms:**
${formData.keyTerms || 'None specified'}

**Contingencies:**
• Satisfactory property inspection
• Lender approval for debt assumption
• Clear title transfer
• Completion of all required 1031 exchange documentation

**Next Steps:**
1. Execute this Letter of Intent
2. Begin due diligence process
3. Submit loan assumption paperwork
4. Schedule property inspection
5. Prepare final purchase/partnership agreement

**Legal Disclaimer:**
This Letter of Intent is non-binding and for preliminary discussion purposes only. All parties should consult with qualified legal and financial professionals before proceeding with any transaction.

**Signatures:**

_________________________    Date: ___________
${formData.partyA}

_________________________    Date: ___________
${formData.partyB}

---
Generated by LevrX - The Leverage Exchange
${new Date().toLocaleString()}
    `
  }

  const downloadAsPDF = async () => {
    setDownloading(true)
    try {
      // Dynamic import to avoid SSR issues
      const jsPDF = (await import('jspdf')).default
      
      const doc = new jsPDF('p', 'mm', 'a4')
      const content = generatedAgreement || generateAgreementContent()
      
      // Split content into lines and format for PDF
      const lines = content.split('\n')
      let yPos = 20
      
      doc.setFontSize(16)
      doc.text(formData.title, 20, yPos)
      yPos += 10
      
      doc.setFontSize(11)
      
      lines.forEach((line, index) => {
        if (yPos > 280) {
          doc.addPage()
          yPos = 20
        }
        
        if (line.startsWith('**') && line.endsWith('**')) {
          // Bold headers
          doc.setFont('helvetica', 'bold')
          doc.text(line.replace(/\*\*/g, ''), 20, yPos)
          doc.setFont('helvetica', 'normal')
        } else if (line.startsWith('•')) {
          // Bullet points
          doc.text(line, 25, yPos)
        } else if (line.trim()) {
          // Regular text
          doc.text(line, 20, yPos)
        }
        
        yPos += line.trim() ? 6 : 3
      })
      
      // Save the PDF
      const fileName = `${formData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${new Date().getTime()}.pdf`
      doc.save(fileName)
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      setError('Failed to generate PDF. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  const handleCreateAgreement = async (e: React.FormEvent) => {
    e.preventDefault()
    setGenerating(true)
    setError(null)

    try {
      // Generate agreement content
      const content = generateAgreementContent()
      setGeneratedAgreement(content)
      
      // Success message
      setTimeout(() => {
        setGenerating(false)
      }, 1000)
      
    } catch (error) {
      console.error('Error generating agreement:', error)
      setError('Failed to generate agreement')
      setGenerating(false)
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
                disabled={generating}
                className={`w-full py-3 px-4 rounded-lg font-medium ${
                  generating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {generating ? 'Generating Agreement...' : 'Generate Agreement'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Legal Disclaimer:</strong> This generates template agreements for informational purposes only. 
                Always consult with a qualified attorney before signing any legal agreements.
              </p>
            </div>
          </div>

          {/* Agreement Preview */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Agreement Preview</h2>
              {generatedAgreement && (
                <button
                  onClick={downloadAsPDF}
                  disabled={downloading}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    downloading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {downloading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Downloading...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download PDF
                    </span>
                  )}
                </button>
              )}
            </div>
            
            {!generatedAgreement ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No agreement generated yet</h3>
                <p className="text-gray-600">Fill out the form and click "Generate Agreement" to create a professional legal document</p>
              </div>
            ) : (
              <div 
                ref={agreementRef}
                className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {generatedAgreement.split('\n').map((line, index) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <div key={index} className="font-bold text-gray-900 mb-2 mt-4">
                          {line.replace(/\*\*/g, '')}
                        </div>
                      )
                    } else if (line.startsWith('•')) {
                      return (
                        <div key={index} className="ml-4 mb-1">
                          {line}
                        </div>
                      )
                    } else if (line.match(/^\d+\./)) {
                      return (
                        <div key={index} className="ml-4 mb-2 font-medium">
                          {line}
                        </div>
                      )
                    } else if (line.trim() === '---') {
                      return (
                        <hr key={index} className="my-4 border-gray-300" />
                      )
                    } else {
                      return (
                        <div key={index} className="mb-1">
                          {line || '\u00A0'}
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}