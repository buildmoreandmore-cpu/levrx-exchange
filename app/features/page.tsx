import Link from 'next/link'

export default function Features() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">LVRXchange</h1>
            </Link>
            <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Platform Features</h1>
          <p className="text-xl mb-8">
            Discover the powerful tools that make LVRXchange the most advanced real estate exchange platform
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* AI Matching Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Matching</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proprietary AI analyzes hundreds of data points to find perfect matches between assets, cash, and opportunities
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Property Analysis</h3>
                  <p className="text-gray-600">AI evaluates property type, location, condition, market trends, and financial metrics to understand true value and potential.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Investor Profile Matching</h3>
                  <p className="text-gray-600">Matches based on investment criteria, risk tolerance, geographic preferences, deal size, and investment timeline.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Compatibility Scoring</h3>
                  <p className="text-gray-600">Get instant compatibility scores showing why matches make sense, with detailed explanations for each recommendation.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Match Score</h4>
                  <span className="text-2xl font-bold text-green-600">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location Preference</span>
                  <span className="text-green-600 font-medium">Perfect Match</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deal Size Range</span>
                  <span className="text-green-600 font-medium">Within Range</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Investment Timeline</span>
                  <span className="text-yellow-600 font-medium">Good Fit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Profile</span>
                  <span className="text-green-600 font-medium">Aligned</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Listing Management Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced Listing Management</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create detailed listings for any real estate asset type with smart templates and automated valuation tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h4m6 0v-3.87a3.37 3.37 0 00-.94-2.61c-.26-.26-.61-.42-1.06-.42s-.8.16-1.06.42A3.37 3.37 0 0012 17.13V21" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Listings</h3>
              <p className="text-gray-600 mb-4">Create detailed listings for residential, commercial, and land properties with photos, financials, and market analysis.</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Multiple property types</li>
                <li>• Financial calculators</li>
                <li>• Market comparables</li>
                <li>• Virtual tours support</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cash & Capital</h3>
              <p className="text-gray-600 mb-4">List available investment capital with specific criteria for deployment including preferred deal structures.</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Investment amount ranges</li>
                <li>• Preferred deal structures</li>
                <li>• Geographic preferences</li>
                <li>• Timeline flexibility</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8zM12 7a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Services & Expertise</h3>
              <p className="text-gray-600 mb-4">Showcase professional services like property management, renovation, legal, and financial services.</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Professional credentials</li>
                <li>• Service areas</li>
                <li>• Case studies</li>
                <li>• Client testimonials</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Communication & Deal Management */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl text-white p-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Secure Deal Management</h2>
                <p className="text-xl text-gray-300">
                  From initial contact to closing, manage every aspect of your deals with enterprise-grade security
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Encrypted Messaging</h4>
                      <p className="text-gray-300 text-sm">End-to-end encrypted communications with file sharing and deal-specific chat rooms.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Smart Contract Templates</h4>
                      <p className="text-gray-300 text-sm">AI-generated contract templates customized for your specific deal type and jurisdiction.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Progress Tracking</h4>
                      <p className="text-gray-300 text-sm">Visual deal pipeline with automated milestone tracking and deadline management.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-black bg-opacity-50 rounded-2xl p-6">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Deal Progress</h4>
                      <span className="text-sm text-green-400">75% Complete</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span>Initial Contact</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span>NDA Signed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span>Due Diligence</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <span>LOI Negotiation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 border-2 border-gray-500 rounded-full"></div>
                      <span className="text-gray-400">Contract Execution</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics & Insights */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Market Intelligence & Analytics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Make informed decisions with comprehensive market data, trend analysis, and performance insights
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Market Dashboard</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600 mb-1">$2.4M</div>
                  <div className="text-sm text-gray-600">Avg Deal Size</div>
                  <div className="text-xs text-green-600">↗ 12% vs last month</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600 mb-1">24</div>
                  <div className="text-sm text-gray-600">Active Matches</div>
                  <div className="text-xs text-green-600">↗ 8% vs last month</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600 mb-1">18 days</div>
                  <div className="text-sm text-gray-600">Avg Time to Match</div>
                  <div className="text-xs text-red-600">↘ 3 days faster</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-600 mb-1">87%</div>
                  <div className="text-sm text-gray-600">Match Success Rate</div>
                  <div className="text-xs text-green-600">↗ 5% improvement</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Top Performing Markets</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Atlanta, GA</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <span className="text-sm text-gray-500">85%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Nashville, TN</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{width: '72%'}}></div>
                      </div>
                      <span className="text-sm text-gray-500">72%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Charlotte, NC</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{width: '68%'}}></div>
                      </div>
                      <span className="text-sm text-gray-500">68%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Market Data</h3>
                  <p className="text-gray-600">Access live market trends, pricing data, and competitive analysis across all major metropolitan areas.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Analytics</h3>
                  <p className="text-gray-600">Track your listing performance, match rates, and deal conversion metrics with detailed reporting.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Predictive Insights</h3>
                  <p className="text-gray-600">AI-powered forecasting helps predict market movements, optimal timing, and future deal opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-indigo-50 rounded-3xl border border-indigo-200 p-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Experience These Features?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of real estate professionals who are already using LVRXchange to find better deals faster
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              href="/pricing"
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}