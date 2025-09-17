import Link from 'next/link'

export const dynamic = 'force-dynamic'

const sampleMatches = [
  {
    id: 'match-1',
    score: 0.87,
    listingA: {
      title: '25% Equity in SaaS Startup',
      mode: 'HAVE',
      type: 'EQUITY',
      user: { name: 'Sarah Chen' }
    },
    listingB: {
      title: 'Looking for Tech Co-Founder',
      mode: 'WANT',
      category: 'PARTNER',
      user: { name: 'Mike Rodriguez' }
    },
    rationale: '• Strong strategic alignment between B2B SaaS expertise and e-commerce technical needs\n• Complementary skill sets: SaaS scaling experience meets mobile development requirements\n• Similar revenue stages and growth trajectories\n• Both parties seeking long-term partnership rather than short-term arrangements',
    suggestedStructures: [
      {
        name: 'Joint Venture Partnership',
        howItWorks: 'Create a new entity combining SaaS platform expertise with mobile e-commerce development capabilities',
        keyTerms: ['50/50 ownership split', 'Combined revenue streams', 'Shared technology stack'],
        risks: ['Integration complexity', 'Cultural alignment challenges'],
        nextSteps: ['Due diligence on both businesses', 'Legal structure consultation']
      },
      {
        name: 'Cross-Equity Investment',
        howItWorks: 'Each party takes minority stake in the other\'s business while maintaining operational independence',
        keyTerms: ['15% cross-equity exchange', 'Board observer rights', 'Technology sharing agreement'],
        risks: ['Divided attention between ventures', 'Exit strategy complications'],
        nextSteps: ['Business valuations', 'Legal documentation']
      }
    ],
    createdAt: '2024-01-15T14:30:00Z'
  },
  {
    id: 'match-2',
    score: 0.79,
    listingA: {
      title: 'Commercial Real Estate Portfolio',
      mode: 'HAVE',
      type: 'CASHFLOW',
      user: { name: 'Jennifer Park' }
    },
    listingB: {
      title: '$100K Investment for Restaurant Expansion',
      mode: 'WANT',
      category: 'CASH',
      user: { name: 'David Kim' }
    },
    rationale: '• Real estate cashflow provides stable capital for restaurant expansion\n• Geographic synergy with commercial properties in same market area\n• Restaurant business model aligns with real estate investment strategy\n• Both parties have established track records in their respective fields',
    suggestedStructures: [
      {
        name: 'Real Estate Partnership',
        howItWorks: 'Property owner provides capital in exchange for securing restaurant locations in their properties',
        keyTerms: ['$100K investment for 20% restaurant equity', 'Preferred lease terms', 'Revenue sharing agreement'],
        risks: ['Restaurant business volatility', 'Location dependency'],
        nextSteps: ['Restaurant financial audit', 'Lease term negotiation']
      },
      {
        name: 'Revenue Share Agreement',
        howItWorks: 'Property owner provides capital in exchange for percentage of restaurant revenues',
        keyTerms: ['$100K for 8% gross revenue share', '5-year term', 'Performance milestones'],
        risks: ['Revenue fluctuation', 'Operational oversight complexity'],
        nextSteps: ['Revenue projections review', 'Legal agreement drafting']
      }
    ],
    createdAt: '2024-01-14T11:20:00Z'
  },
  {
    id: 'match-3',
    score: 0.71,
    listingA: {
      title: 'Full-Stack Development Services',
      mode: 'HAVE',
      type: 'SKILL',
      user: { name: 'Alex Johnson' }
    },
    listingB: {
      title: 'Manufacturing Equipment Lease Partnership',
      mode: 'WANT',
      category: 'EQUIPMENT',
      user: { name: 'Lisa Wong' }
    },
    rationale: '• Technical expertise can optimize manufacturing operations through software solutions\n• Opportunity to develop IoT and automation systems for equipment\n• Developer skills valuable for creating efficiency tools and monitoring systems\n• Potential for scaling solution to other manufacturers',
    suggestedStructures: [
      {
        name: 'Technology Partnership',
        howItWorks: 'Developer creates custom software solutions in exchange for manufacturing partnership and revenue share',
        keyTerms: ['Custom manufacturing software development', '15% revenue share from efficiency gains', 'Joint IP ownership'],
        risks: ['Technology development timeline', 'Manufacturing process integration'],
        nextSteps: ['Technical requirements gathering', 'Pilot project scoping']
      }
    ],
    createdAt: '2024-01-13T16:45:00Z'
  }
]

export default function DemoMatches() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Generated Matches</h1>
          <p className="text-gray-600">Sample matches showing how the AI algorithm pairs complementary listings</p>
        </div>

        {/* Matches List */}
        <div className="space-y-8">
          {sampleMatches.map((match) => (
            <div key={match.id} className="bg-white rounded-lg shadow-lg p-8">
              {/* Match Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {Math.round(match.score * 100)}% Match
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">
                      {new Date(match.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Matched Listings */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-medium">
                      OFFERING
                    </span>
                    <span className="text-xs text-gray-500">{match.listingA.type}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{match.listingA.title}</h3>
                  <p className="text-sm text-gray-600">by {match.listingA.user.name}</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      SEEKING
                    </span>
                    <span className="text-xs text-gray-500">{match.listingB.category}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{match.listingB.title}</h3>
                  <p className="text-sm text-gray-600">by {match.listingB.user.name}</p>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">AI Match Analysis</h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-900 whitespace-pre-line">{match.rationale}</p>
                </div>
              </div>

              {/* Suggested Deal Structures */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Suggested Deal Structures</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {match.suggestedStructures.map((structure, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">{structure.name}</h5>
                      <p className="text-sm text-gray-600 mb-3">{structure.howItWorks}</p>
                      
                      <div className="space-y-2">
                        <div>
                          <h6 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Key Terms</h6>
                          <ul className="text-xs text-gray-600 list-disc list-inside">
                            {structure.keyTerms.map((term, termIdx) => (
                              <li key={termIdx}>{term}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h6 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Risks</h6>
                          <ul className="text-xs text-gray-600 list-disc list-inside">
                            {structure.risks.map((risk, riskIdx) => (
                              <li key={riskIdx}>{risk}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h6 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Next Steps</h6>
                          <ul className="text-xs text-gray-600 list-disc list-inside">
                            {structure.nextSteps.map((step, stepIdx) => (
                              <li key={stepIdx}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex space-x-4">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm">
                  Generate LOI (Demo)
                </button>
                <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm">
                  Start Conversation (Demo)
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">AI Matching Technology</h3>
              <p className="mt-1 text-sm text-blue-700">
                This demonstrates how the AI analyzes listings using rule-based scoring and vector embeddings 
                to find complementary opportunities. In production, it uses Anthropic Claude API for generating 
                rationales and deal structure suggestions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}