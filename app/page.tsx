import Link from 'next/link'
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">LevrX</h1>
          </div>
          
          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link 
                href="/dashboard"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Dashboard
              </Link>
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            LevrX
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-indigo-600 mb-8">
            The Leverage Exchange
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Leverage what you have to get what you want. Connect with others to create 
            mutually beneficial deals using your equity, cashflow, skills, or assets.
          </p>
          
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                Get Started
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link 
              href="/dashboard"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all inline-block"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">List Your Assets</h3>
            <p className="text-gray-600">Share what you have - equity, cashflow, equipment, credit capacity, or skills.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Find Matches</h3>
            <p className="text-gray-600">AI-powered matching connects you with complementary opportunities.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Structure Deals</h3>
            <p className="text-gray-600">Get AI-generated deal structures and draft agreements to move forward.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            <strong>Legal Disclaimer:</strong> All agreements are for informational use only. 
            This is not legal advice. Consult an attorney before signing any agreements.
          </p>
        </div>
      </footer>
    </div>
  )
}