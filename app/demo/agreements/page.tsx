import Link from 'next/link'

export const dynamic = 'force-dynamic'

const sampleAgreements = [
  {
    id: 'agreement-1',
    title: 'Joint Venture Partnership Agreement',
    parties: ['Sarah Chen', 'Mike Rodriguez'],
    description: 'B2B SaaS platform expansion with e-commerce mobile development partnership',
    dealValue: 400000,
    dealStructure: 'Joint Venture - 50/50 Partnership',
    status: 'draft',
    progress: 45,
    createdAt: '2024-01-16T14:00:00Z',
    lastUpdated: '2024-01-17T10:30:00Z',
    keyTerms: [
      '50/50 ownership split in new joint entity',
      'Combined technology stack and development resources',
      'Shared revenue from both SaaS and e-commerce operations',
      'Board representation: 2 members each party'
    ],
    nextSteps: [
      'Legal review of partnership structure',
      'Financial due diligence completion',
      'Technology integration planning',
      'Final agreement execution'
    ]
  },
  {
    id: 'agreement-2',
    title: 'Real Estate Investment Agreement',
    parties: ['Jennifer Park', 'David Kim'],
    description: 'Commercial real estate investment for restaurant expansion funding',
    dealValue: 100000,
    dealStructure: 'Revenue Share - 8% Gross Revenue for 5 years',
    status: 'negotiating',
    progress: 75,
    createdAt: '2024-01-15T11:00:00Z',
    lastUpdated: '2024-01-17T15:20:00Z',
    keyTerms: [
      '$100K investment for restaurant expansion',
      '8% of gross revenue for 5-year term',
      'Preferred lease terms on commercial properties',
      'Performance milestones for additional locations'
    ],
    nextSteps: [
      'Restaurant financial audit completion',
      'Lease agreement negotiations',
      'Performance milestone definitions',
      'Final terms approval'
    ]
  },
  {
    id: 'agreement-3',
    title: 'Technology Development Partnership',
    parties: ['Alex Johnson', 'Lisa Wong'],
    description: 'Custom software development for manufacturing automation in exchange for equity partnership',
    dealValue: 75000,
    dealStructure: 'Equity Partnership - 15% Revenue Share',
    status: 'completed',
    progress: 100,
    createdAt: '2024-01-10T09:00:00Z',
    lastUpdated: '2024-01-14T16:00:00Z',
    keyTerms: [
      'Custom manufacturing software development',
      '15% revenue share from efficiency gains',
      'Joint IP ownership of developed solutions',
      '2-year minimum partnership commitment'
    ],
    nextSteps: [
      'Partnership execution complete',
      'Software development in progress',
      'First milestone review scheduled',
      'Success metrics tracking active'
    ]
  }
]

const statusConfig = {
  draft: { color: 'bg-gray-100 text-gray-800', label: 'Draft' },
  negotiating: { color: 'bg-yellow-100 text-yellow-800', label: 'Negotiating' },
  reviewing: { color: 'bg-blue-100 text-blue-800', label: 'Under Review' },
  completed: { color: 'bg-green-100 text-green-800', label: 'Completed' }
}

export default function DemoAgreements() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/demo/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">LevrX</h1>
          </Link>
          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            DEMO MODE
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/demo/dashboard" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Agreements & Deals</h1>
          <p className="text-gray-600">Track partnership agreements from initial drafts to completion</p>
        </div>

        {/* Agreement Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Deals</h3>
            <p className="text-3xl font-bold text-indigo-600">3</p>
            <p className="text-sm text-gray-600 mt-1">$575K combined value</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">In Progress</h3>
            <p className="text-3xl font-bold text-yellow-600">2</p>
            <p className="text-sm text-gray-600 mt-1">Active negotiations</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Completed</h3>
            <p className="text-3xl font-bold text-green-600">1</p>
            <p className="text-sm text-gray-600 mt-1">Partnership active</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Success Rate</h3>
            <p className="text-3xl font-bold text-purple-600">95%</p>
            <p className="text-sm text-gray-600 mt-1">From match to deal</p>
          </div>
        </div>

        {/* Agreements List */}
        <div className="space-y-6">
          {sampleAgreements.map((agreement) => (
            <div key={agreement.id} className="bg-white rounded-lg shadow-lg p-8">
              {/* Agreement Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{agreement.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[agreement.status as keyof typeof statusConfig].color}`}>
                      {statusConfig[agreement.status as keyof typeof statusConfig].label}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{agreement.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>Parties: {agreement.parties.join(' & ')}</span>
                    <span>Value: ${agreement.dealValue.toLocaleString()}</span>
                    <span>Updated: {new Date(agreement.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right">
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Agreement Progress</span>
                  <span className="text-sm text-gray-600">{agreement.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      agreement.status === 'completed' ? 'bg-green-600' :
                      agreement.progress > 70 ? 'bg-yellow-600' :
                      agreement.progress > 40 ? 'bg-blue-600' : 'bg-gray-400'
                    }`}
                    style={{ width: `${agreement.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Deal Structure */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Deal Structure</h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{agreement.dealStructure}</p>
              </div>

              {/* Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Key Terms */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Terms</h4>
                  <ul className="space-y-2">
                    {agreement.keyTerms.map((term, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Steps */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Next Steps</h4>
                  <ul className="space-y-2">
                    {agreement.nextSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className={`w-4 h-4 rounded-full mr-2 mt-0.5 flex-shrink-0 ${
                          agreement.status === 'completed' ? 'bg-green-500' :
                          idx < Math.floor(agreement.nextSteps.length * agreement.progress / 100) ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                        <span className="text-sm text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              {agreement.status !== 'completed' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm">
                      Update Progress
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm">
                      Generate Document
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm">
                      Schedule Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Create New Agreement */}
        <div className="mt-8 bg-white rounded-lg shadow p-8 text-center">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start New Agreement</h3>
          <p className="text-gray-600 mb-4">
            Turn your successful matches into formal partnership agreements
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/demo/discussions"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm"
            >
              View Discussions
            </Link>
            <Link
              href="/demo/matches"
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm"
            >
              View Matches
            </Link>
          </div>
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
              <h3 className="text-sm font-medium text-blue-800">Agreement Management</h3>
              <p className="mt-1 text-sm text-blue-700">
                This demonstrates the full deal lifecycle from initial match to completed partnership. 
                In production, users can create, negotiate, and execute legal agreements with integrated document signing and progress tracking.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}