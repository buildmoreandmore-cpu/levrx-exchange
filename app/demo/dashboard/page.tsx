import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function DemoData() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to LevrX Demo
          </h1>
          <p className="text-gray-600">Explore the marketplace functionality with sample data</p>
        </div>

        {/* Demo Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Demo Mode Active</h3>
              <p className="mt-1 text-sm text-blue-700">
                This is a demonstration version with sample data. To use the full application with authentication, 
                database, and AI features, configure the required environment variables.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Sample Listings</h3>
            <p className="text-3xl font-bold text-indigo-600">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">AI Matches</h3>
            <p className="text-3xl font-bold text-green-600">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Deal Structures</h3>
            <p className="text-3xl font-bold text-blue-600">16</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Demo Features</h3>
            <p className="text-3xl font-bold text-purple-600">✓</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link 
            href="/demo/listings"
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-6 rounded-lg text-center transition-colors block"
          >
            <div className="mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Browse Listings</h3>
            <p className="text-sm">View all marketplace listings</p>
          </Link>

          <Link 
            href="/demo/create"
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg text-center transition-colors block"
          >
            <div className="mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Create Listing</h3>
            <p className="text-sm">Add a new Have/Want listing</p>
          </Link>

          <Link 
            href="/demo/matches"
            className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg text-center transition-colors block"
          >
            <div className="mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">View Matches</h3>
            <p className="text-sm">See AI-generated matches</p>
          </Link>

          <Link 
            href="/demo/discussions"
            className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg text-center transition-colors block"
          >
            <div className="mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Discussions</h3>
            <p className="text-sm">Chat with potential partners</p>
          </Link>
        </div>

        {/* Additional Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link 
            href="/demo/agreements"
            className="bg-orange-600 hover:bg-orange-700 text-white p-6 rounded-lg text-center transition-colors block"
          >
            <div className="mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Agreements</h3>
            <p className="text-sm">Manage partnership agreements</p>
          </Link>

          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <div className="mb-4">
              <svg className="w-10 h-10 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Full Platform</h3>
            <p className="text-sm text-gray-600">Configure APIs for complete functionality</p>
          </div>
        </div>

        {/* Sample Data Preview */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample "Have" Listings</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-medium text-gray-900">25% Equity in SaaS Startup</h4>
                <p className="text-sm text-gray-600">B2B software company with $50K ARR, seeking strategic partner</p>
                <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">EQUITY</span>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-medium text-gray-900">Commercial Real Estate Portfolio</h4>
                <p className="text-sm text-gray-600">$2M in commercial properties generating $200K/year</p>
                <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">CASHFLOW</span>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-medium text-gray-900">Full-Stack Development Services</h4>
                <p className="text-sm text-gray-600">10+ years experience, available for equity partnerships</p>
                <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">SKILL</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample "Want" Listings</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-medium text-gray-900">Looking for Tech Co-Founder</h4>
                <p className="text-sm text-gray-600">E-commerce business needs technical partner, 30% equity available</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">PARTNER</span>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-medium text-gray-900">$100K Investment for Expansion</h4>
                <p className="text-sm text-gray-600">Growing restaurant chain seeking capital for new locations</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">CASH</span>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-medium text-gray-900">Manufacturing Equipment Lease</h4>
                <p className="text-sm text-gray-600">Need industrial printer and packaging equipment</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">EQUIPMENT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="mt-12 bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to use the full application?</h3>
          <p className="text-gray-600 mb-4">
            To enable authentication, database, and AI features, you&apos;ll need to configure:
          </p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• <strong>Clerk</strong> - for user authentication (Apple, Google, Email)</li>
            <li>• <strong>Supabase</strong> - for PostgreSQL database with pgvector</li>
            <li>• <strong>Anthropic Claude API</strong> - for AI-powered matching and deal structures</li>
          </ul>
          <div className="mt-4">
            <a 
              href="https://github.com/buildmoreandmore-cpu/levrx-exchange#setup-instructions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View Setup Instructions →
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}