'use client'

import { useState } from 'react'

export const faqData = [
  {
    id: 'ai-matches',
    question: 'How do AI matches work?',
    answer: 'Our AI analyzes your property details, investment criteria, and market conditions to identify complementary opportunities. It considers factors like location, asset type, financial requirements, risk profiles, and strategic alignment to surface the most relevant matches with detailed rationale for each pairing.'
  },
  {
    id: 'markets',
    question: 'What markets are supported?',
    answer: 'LevrX currently supports major metropolitan areas across the United States, including primary and secondary markets. We\'re expanding coverage based on user demand and market activity. You can list properties and opportunities nationwide, with AI matches prioritizing geographic compatibility and market dynamics.'
  },
  {
    id: 'privacy',
    question: 'Is my data private and secure?',
    answer: 'Yes. We use enterprise-grade encryption for all data transmission and storage. Your listings are only visible to verified users, and sensitive financial information is never shared without your explicit consent. We comply with SOC 2 standards and never sell user data to third parties.'
  },
  {
    id: 'cancel',
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. You can cancel your subscription at any time with no cancellation fees or penalties. Your account remains active until the end of your billing period, and you can export your data at any time. We believe in providing value, not locking you in.'
  },
  {
    id: 'fees',
    question: 'Do you take a fee on matches?',
    answer: 'No. LevrX operates on a transparent subscription model only. We don\'t take transaction fees, success fees, or commissions on deals made through our platform. Your subscription gives you unlimited access to matches, messaging, and agreement tools.'
  },
  {
    id: 'agreements',
    question: 'What if I need help with agreements?',
    answer: 'Our AI generates professional Letter of Intent (LOI) templates and deal structure suggestions based on your specific match. While we provide legally-informed templates, we always recommend having agreements reviewed by qualified attorneys before signing. We can connect you with our network of real estate legal professionals.'
  },
  {
    id: 'teams',
    question: 'Do you support team accounts?',
    answer: 'Yes. Our Enterprise plan includes multi-user seats with role-based permissions, shared listings, collaborative deal management, and team analytics. Team members can work together on deals while maintaining appropriate access controls and audit trails.'
  }
]

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know about LevrX</p>
        </div>

        <div className="space-y-4">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                aria-expanded={openItem === item.id}
                aria-controls={`faq-answer-${item.id}`}
              >
                <span className="text-lg font-semibold text-gray-900">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openItem === item.id ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openItem === item.id && (
                <div 
                  id={`faq-answer-${item.id}`}
                  className="px-6 pb-4"
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                >
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Disclaimer and Contact */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 mb-4">
            <strong>Disclaimer:</strong> LevrX is an informational tool and does not provide legal or financial advice.
          </p>
          <p className="text-gray-600">
            Have questions not covered here?{' '}
            <a 
              href="mailto:sales@levrx.app"
              className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2"
            >
              Contact sales
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}