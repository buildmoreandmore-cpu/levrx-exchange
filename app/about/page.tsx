import Link from 'next/link'

export default function About() {
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
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About LVRXchange</h1>
          <p className="text-xl leading-relaxed max-w-2xl mx-auto">
            Revolutionizing real estate investing through AI-powered matching that connects opportunities with the right investors, instantly.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                To democratize real estate investing by creating an intelligent marketplace where every asset finds its perfect match and every investor discovers their ideal opportunity.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that the future of real estate lies in technology-enabled connections that transcend traditional barriers and create unprecedented opportunities for wealth building.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">10K+</div>
                  <div className="text-gray-600">Properties Listed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">500+</div>
                  <div className="text-gray-600">Successful Matches</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">$2B+</div>
                  <div className="text-gray-600">Transaction Volume</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">95%</div>
                  <div className="text-gray-600">User Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                LVRXchange was born from the frustration of traditional real estate networking. Our founders, experienced real estate investors and technologists, witnessed countless missed opportunities due to inefficient market connections.
              </p>
              <p>
                In 2024, we set out to solve this problem by combining artificial intelligence with deep real estate expertise. We built a platform that doesn't just list properties—it understands them, analyzes market dynamics, and creates intelligent matches that would be impossible to find manually.
              </p>
              <p>
                Today, LVRXchange serves thousands of investors, developers, and real estate professionals who have discovered deals, partnerships, and opportunities they never would have found otherwise. We're not just a marketplace; we're the neural network of the real estate industry.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-700">
                We push the boundaries of what's possible in real estate technology, constantly evolving to serve our users better.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Integrity</h3>
              <p className="text-gray-700">
                Trust is the foundation of real estate. We maintain the highest standards of transparency and ethical conduct.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-700">
                We're building more than a platform—we're fostering a community of successful real estate investors.
              </p>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl text-white p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Powered by Advanced AI</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Intelligent Matching</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our proprietary AI algorithms analyze hundreds of data points to identify perfect matches between opportunities and investors, considering factors like risk tolerance, investment goals, geographic preferences, and market timing.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Market Intelligence</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Real-time market data and predictive analytics help users make informed decisions. Our AI continuously learns from successful transactions to improve recommendation accuracy.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Deal Structuring</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Automated deal structure suggestions based on successful historical transactions, helping users optimize terms and maximize value for all parties involved.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Risk Assessment</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Advanced risk modeling helps users understand potential challenges and opportunities, enabling more confident investment decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Contact CTA */}
        <section className="text-center">
          <div className="bg-indigo-50 rounded-2xl border border-indigo-200 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Real Estate Investing?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of investors who have discovered their next opportunity through LVRXchange.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Start Your Free Trial
              </Link>
              <Link
                href="/listings"
                className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Browse Opportunities
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}