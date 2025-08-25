import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

const sampleListings: Record<string, any> = {
  'demo-1': {
    id: 'demo-1',
    mode: 'HAVE',
    title: '25% Equity in SaaS Startup',
    description: 'B2B software company with $50K ARR, built for small business workflow automation. Looking for strategic partner with sales expertise to help scale to $500K ARR within 18 months.\n\nThe platform currently serves 120+ small businesses with automated invoice processing, customer relationship management, and project tracking. We have strong product-market fit with 95% customer retention and average 40% month-over-month growth.\n\nIdeal partner would bring sales experience, business development skills, or complementary technology expertise.',
    type: 'EQUITY',
    estValue: 250000,
    terms: 'Seeking strategic partner for 25% equity. Must contribute either capital investment ($50K+) or sweat equity equivalent. Looking for someone with B2B sales experience or technical expertise in scaling SaaS platforms.',
    user: { name: 'Sarah Chen', email: 'sarah@demo.com' },
    createdAt: '2024-01-15T10:00:00Z',
  },
  'demo-2': {
    id: 'demo-2',
    mode: 'WANT',
    title: 'Looking for Tech Co-Founder',
    description: 'E-commerce business generating $500K revenue needs technical partner for mobile app development and scaling infrastructure.\n\nWe\'ve built a successful direct-to-consumer brand with strong social media presence and proven marketing strategies. Our current web platform is performing well, but we need mobile presence and better backend infrastructure to scale to $2M+ revenue.\n\nLooking for a technical co-founder who can build iOS/Android apps and help optimize our backend for high-volume traffic.',
    category: 'PARTNER',
    targetValue: 200000,
    constraints: 'Must have mobile app development experience (React Native preferred). Looking for someone who can commit full-time and take 20-30% equity stake. Should have experience with e-commerce platforms and scaling infrastructure.',
    user: { name: 'Mike Rodriguez', email: 'mike@demo.com' },
    createdAt: '2024-01-14T15:30:00Z',
  }
}

const sampleMatches = [
  {
    id: 'match-1',
    score: 0.87,
    rationale: '• Strong strategic alignment between B2B SaaS expertise and e-commerce technical needs\n• Complementary skill sets: SaaS scaling experience meets mobile development requirements\n• Similar revenue stages and growth trajectories\n• Both parties seeking long-term partnership rather than short-term arrangements\n• Geographic proximity enables effective collaboration',
    suggestedStructures: {
      structures: [
        {
          name: 'Joint Venture Partnership',
          howItWorks: 'Create a new entity combining SaaS platform expertise with mobile e-commerce development capabilities',
          keyTerms: ['50/50 ownership split', 'Combined revenue streams', 'Shared technology stack', 'Joint customer acquisition'],
          risks: ['Integration complexity', 'Cultural alignment challenges', 'Revenue allocation disputes'],
          nextSteps: ['Due diligence on both businesses', 'Legal structure consultation', 'Pilot project collaboration']
        },
        {
          name: 'Cross-Equity Investment',
          howItWorks: 'Each party takes minority stake in the other\'s business while maintaining operational independence',
          keyTerms: ['15% cross-equity exchange', 'Board observer rights', 'Technology sharing agreement', 'Joint marketing initiatives'],
          risks: ['Divided attention between ventures', 'Potential conflicts of interest', 'Exit strategy complications'],
          nextSteps: ['Business valuations', 'Legal documentation', 'Integration planning']
        }
      ]
    },
    listingB: sampleListings['demo-2']
  }
]

export default function DemoListingDetail({ params }: { params: { id: string } }) {
  const listing = sampleListings[params.id]
  
  if (!listing) {
    notFound()
  }

  const item = listing.mode === 'HAVE' 
    ? { type: listing.type, terms: listing.terms, value: listing.estValue }
    : { category: listing.category, constraints: listing.constraints, value: listing.targetValue }
  
  const modeColor = listing.mode === 'HAVE' ? 'indigo' : 'green'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/demo/listings" className="flex items-center space-x-2">
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
                {listing.title}
              </h1>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {listing.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {listing.mode === 'HAVE' ? 'Asset Type' : 'Category'}
                  </h4>
                  <p className="text-gray-600">
                    {listing.mode === 'HAVE' ? item.type : item.category}
                  </p>
                </div>
                
                {item.value && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {listing.mode === 'HAVE' ? 'Estimated Value' : 'Target Value'}
                    </h4>
                    <p className="text-gray-600">
                      ${item.value.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {(item.terms || item.constraints) && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {listing.mode === 'HAVE' ? 'Terms & Conditions' : 'Requirements'}
                  </h4>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {item.terms || item.constraints}
                  </p>
                </div>
              )}

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-2">Listed by</h4>
                <p className="text-gray-600">
                  {listing.user.name}
                </p>
              </div>
            </div>
          </div>

          {/* Matching */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Matching Demo</h3>
              
              <div className="mb-6">
                <div className={`w-full py-3 px-4 rounded-lg font-medium text-white text-center bg-${modeColor}-600`}>
                  Sample Match Found
                </div>
              </div>

              {sampleMatches.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    1 High-Quality Match
                  </h4>
                  
                  {sampleMatches.map((match) => (
                    <div key={match.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">
                          {match.listingB.title}
                        </h5>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {Math.round(match.score * 100)}% match
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {match.listingB.description.split('\n')[0]}
                      </p>

                      {match.rationale && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">AI Analysis:</p>
                          <p className="text-sm text-gray-700 whitespace-pre-line">{match.rationale}</p>
                        </div>
                      )}

                      {match.suggestedStructures?.structures?.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">Suggested Deal Structures:</p>
                          {match.suggestedStructures.structures.slice(0, 2).map((structure, idx: number) => (
                            <div key={idx} className="text-sm text-gray-700 mb-1">
                              • {structure.name}
                            </div>
                          ))}
                        </div>
                      )}

                      <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                        View Match Details (Demo)
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Demo Notice */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <h4 className="text-xs font-medium text-blue-800">Demo Feature</h4>
                    <p className="mt-1 text-xs text-blue-700">
                      This shows how the AI matching system analyzes listings and suggests deal structures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Navigation */}
        <div className="mt-8">
          <Link 
            href="/demo/listings"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            ← Back to Sample Listings
          </Link>
        </div>
      </main>
    </div>
  )
}