import Link from 'next/link'

export const dynamic = 'force-dynamic'

const sampleListings = [
  {
    id: 'demo-1',
    mode: 'HAVE',
    title: '25% Equity in SaaS Startup',
    description: 'B2B software company with $50K ARR, built for small business workflow automation. Looking for strategic partner with sales expertise.',
    type: 'EQUITY',
    estValue: 250000,
    user: { name: 'Sarah Chen', email: 'sarah@demo.com' },
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'demo-2',
    mode: 'WANT',
    title: 'Looking for Tech Co-Founder',
    description: 'E-commerce business generating $500K revenue needs technical partner for mobile app development and scaling infrastructure.',
    category: 'PARTNER',
    targetValue: 200000,
    user: { name: 'Mike Rodriguez', email: 'mike@demo.com' },
    createdAt: '2024-01-14T15:30:00Z',
  },
  {
    id: 'demo-3',
    mode: 'HAVE',
    title: 'Commercial Real Estate Portfolio',
    description: '$2M in commercial properties across downtown district. Generating $200K annual rental income with long-term tenants.',
    type: 'CASHFLOW',
    estValue: 2000000,
    user: { name: 'Jennifer Park', email: 'jennifer@demo.com' },
    createdAt: '2024-01-13T09:15:00Z',
  },
  {
    id: 'demo-4',
    mode: 'WANT',
    title: '$100K Investment for Restaurant Expansion',
    description: 'Growing restaurant chain with 3 locations seeking capital for 2 new locations. Strong financials and proven concept.',
    category: 'CASH',
    targetValue: 100000,
    user: { name: 'David Kim', email: 'david@demo.com' },
    createdAt: '2024-01-12T14:20:00Z',
  },
  {
    id: 'demo-5',
    mode: 'HAVE',
    title: 'Full-Stack Development Services',
    description: '10+ years experience in React, Node.js, Python, AWS. Available for equity partnerships in early-stage startups.',
    type: 'SKILL',
    estValue: 150000,
    user: { name: 'Alex Johnson', email: 'alex@demo.com' },
    createdAt: '2024-01-11T11:45:00Z',
  },
  {
    id: 'demo-6',
    mode: 'WANT',
    title: 'Manufacturing Equipment Lease Partnership',
    description: 'Need industrial 3D printer and packaging equipment. Can offer revenue share or joint venture partnership.',
    category: 'EQUIPMENT',
    targetValue: 75000,
    user: { name: 'Lisa Wong', email: 'lisa@demo.com' },
    createdAt: '2024-01-10T16:10:00Z',
  }
]

export default function DemoListings() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sample Listings</h1>
          <p className="text-gray-600">Browse example marketplace listings</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-8">
          <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium border-2 border-gray-900">
            All Listings (6)
          </button>
          <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-300">
            Have (3)
          </button>
          <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-300">
            Want (3)
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid gap-6">
          {sampleListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    listing.mode === 'HAVE' 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {listing.mode === 'HAVE' ? 'Offering' : 'Seeking'}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Link 
                  href={`/demo/listings/${listing.id}`}
                  className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                >
                  View Details →
                </Link>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">{listing.title}</h3>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{listing.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-sm text-gray-500">
                      {listing.mode === 'HAVE' ? 'Type' : 'Category'}:
                    </span>
                    <span className="ml-1 text-sm font-medium">
                      {listing.mode === 'HAVE' ? listing.type : listing.category}
                    </span>
                  </div>
                  {((listing.mode === 'HAVE' && listing.estValue) || (listing.mode === 'WANT' && listing.targetValue)) && (
                    <div>
                      <span className="text-sm text-gray-500">
                        {listing.mode === 'HAVE' ? 'Est. Value' : 'Target'}:
                      </span>
                      <span className="ml-1 text-sm font-medium">
                        ${((listing.mode === 'HAVE' ? listing.estValue : listing.targetValue) || 0).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Listed by</div>
                  <div className="text-sm font-medium">{listing.user.name}</div>
                </div>
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
              <h3 className="text-sm font-medium text-blue-800">Demo Data</h3>
              <p className="mt-1 text-sm text-blue-700">
                These are sample listings for demonstration purposes. In the full application, users can create, 
                edit, and manage their own listings with real data.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}