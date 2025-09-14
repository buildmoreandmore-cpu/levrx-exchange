'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    category: "Getting Started",
    question: "How do I create my first listing?",
    answer: "To create your first listing, sign up for an account, complete your profile, then click 'Create Listing' from your dashboard. Choose whether you're offering something (HAVE) or seeking something (WANT), fill in the details about your property or investment criteria, and our AI will start finding matches immediately."
  },
  {
    category: "Getting Started", 
    question: "What types of listings can I create?",
    answer: "You can list various types of real estate assets including residential properties, commercial properties, land, notes/mortgages, equity partnerships, and even services. Each listing type has specific fields to help our AI understand exactly what you're offering or seeking."
  },
  {
    category: "Getting Started",
    question: "How does the free trial work?",
    answer: "Every new user gets a 7-day free trial with full access to all features. You can create listings, view matches, and communicate with other users. No credit card required to start. After the trial, choose a plan that fits your needs."
  },
  {
    category: "AI Matching",
    question: "How does your AI matching work?",
    answer: "Our AI analyzes hundreds of data points including property details, financial metrics, geographic preferences, investment criteria, risk tolerance, and market timing. It then identifies potential matches and ranks them by compatibility score, showing you why each match makes sense."
  },
  {
    category: "AI Matching",
    question: "Why am I not getting matches?",
    answer: "If you're not seeing matches, try: 1) Adding more detail to your listings, 2) Expanding your geographic or price range, 3) Checking that your criteria aren't too restrictive, 4) Making sure your listing is set to 'Active' status. Our AI needs sufficient information to find good matches."
  },
  {
    category: "AI Matching", 
    question: "Can I adjust my matching preferences?",
    answer: "Yes! You can update your investment criteria, geographic preferences, deal size ranges, and other parameters anytime from your profile settings. Changes take effect immediately and may surface new matches."
  },
  {
    category: "Platform Features",
    question: "How do I communicate with matched users?",
    answer: "When you find an interesting match, click 'Message' to start a conversation. All communications happen through our secure messaging system. You can also request additional property information or schedule calls directly through the platform."
  },
  {
    category: "Platform Features",
    question: "Can I see who viewed my listings?",
    answer: "Yes, professional and enterprise users can see analytics about their listings including views, saves, and engagement metrics. This helps you understand market interest and optimize your listings."
  },
  {
    category: "Platform Features",
    question: "How do deal structures and LOIs work?",
    answer: "Our AI suggests deal structures based on successful transactions with similar properties and participants. You can customize these suggestions and generate Letters of Intent (LOIs) directly from the platform, which can be shared with your attorney for review."
  },
  {
    category: "Account & Billing",
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription anytime from your account settings. You'll retain access until the end of your current billing period. All your data remains accessible, but you'll have limited functionality on the free plan."
  },
  {
    category: "Account & Billing",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover) and ACH bank transfers. All payments are processed securely through industry-leading payment processors."
  },
  {
    category: "Account & Billing",
    question: "Do you offer refunds?",
    answer: "We offer a 30-day satisfaction guarantee. If you're not satisfied with our service within the first 30 days of your paid subscription, contact our support team for a full refund."
  },
  {
    category: "Privacy & Security",
    question: "How secure is my information?",
    answer: "We use bank-level security including 256-bit SSL encryption, secure data centers, regular security audits, and strict access controls. Your financial and personal information is never shared without your explicit permission."
  },
  {
    category: "Privacy & Security",
    question: "Who can see my listings and information?",
    answer: "You control what information is visible to other users. Basic listing details are visible to potential matches, but sensitive financial information and contact details are only shared when you choose to connect with someone."
  },
  {
    category: "Privacy & Security",
    question: "Can I make my profile private?",
    answer: "Yes, you can adjust your privacy settings to control what information is visible in your public profile. You can choose to show only basic professional information or be completely anonymous until you engage with a match."
  }
]

const categories = Array.from(new Set(faqData.map(item => item.category)))

export default function HelpCenter() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

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
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Help Center</h1>
          <p className="text-xl mb-8">Find answers to common questions and get the most out of LVRXchange</p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-12 text-gray-900 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <svg className="absolute left-4 top-4 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Quick Links */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Links</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="#getting-started" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow text-center group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Getting Started</h3>
              <p className="text-sm text-gray-600">Learn the basics of using LVRXchange</p>
            </Link>

            <Link href="/contact" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow text-center group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Support</h3>
              <p className="text-sm text-gray-600">Get personalized help from our team</p>
            </Link>

            <Link href="/status" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow text-center group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">System Status</h3>
              <p className="text-sm text-gray-600">Check platform uptime and performance</p>
            </Link>

            <a href="mailto:support@lvrxchange.com" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow text-center group">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-sm text-gray-600">Send us a message anytime</p>
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({faqData.length})
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category} ({faqData.filter(item => item.category === category).length})
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((item, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors rounded-xl"
                  onClick={() => toggleExpanded(index)}
                >
                  <div>
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full mb-2 inline-block">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                  </div>
                  <svg
                    className={`w-6 h-6 text-gray-400 transform transition-transform ${
                      expandedItems.has(index) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedItems.has(index) && (
                  <div className="px-6 pb-4 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed pt-4">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search or browse all categories</p>
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section className="mt-16 bg-indigo-50 rounded-2xl border border-indigo-200 p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is here to help you succeed with LVRXchange.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@lvrxchange.com"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Contact Support
            </a>
            <Link
              href="/about"
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}