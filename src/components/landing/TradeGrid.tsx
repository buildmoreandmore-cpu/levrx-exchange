'use client'

import { useState } from 'react'
import Link from 'next/link'

interface TradeItem {
  id: string
  title: string
  slug: string
  description: string
  examples: string[]
  icon: React.ReactNode
}

const tradeItems: TradeItem[] = [
  {
    id: 'cash',
    title: 'Cash',
    slug: 'cash',
    description: 'Do you have it or do you need it? Is it personal cash, IRA funds, or other people\'s money?',
    examples: ['IRA funds', 'private lender capital', 'capital partner'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'paper',
    title: 'Paper',
    slug: 'paper',
    description: 'Are you holding any notes you want to sell or trade? Looking to create a note on a property you own? What terms work for you?',
    examples: ['performing notes', 'non-performing notes', 'carryback/VTB'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: 'stuff',
    title: 'Stuff (Personal Property)',
    slug: 'stuff',
    description: 'Do you want to sell or trade art, vehicles, events, professional services, cryptocurrency, boats, tools, etc.?',
    examples: ['vehicles', 'services', 'crypto', 'equipment'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    id: 'property',
    title: 'Property (Real Estate)',
    slug: 'property',
    description: 'Do you have real estate to sell, rent, or trade— or what are you looking for?',
    examples: ['multifamily', 'land', 'STRs', 'retail'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  }
]

interface TradeCardProps {
  item: TradeItem
}

function TradeCard({ item }: TradeCardProps) {
  const [selectedTab, setSelectedTab] = useState<'HAVE' | 'WANT'>('HAVE')

  const primaryCTA = selectedTab === 'HAVE' ? 'List What You Have' : 'Post What You Want'
  const secondaryCTA = selectedTab === 'HAVE' ? 'Post What You Want' : 'List What You Have'
  const primaryHref = `/listings/new?kind=${selectedTab}&type=${item.slug}`
  const secondaryHref = `/listings/new?kind=${selectedTab === 'HAVE' ? 'WANT' : 'HAVE'}&type=${item.slug}`

  return (
    <div 
      className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
      aria-label={`${item.title} trading options`}
    >
      {/* Icon and Title */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex-shrink-0 text-blue-600">
          {item.icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {item.description}
      </p>

      {/* Examples */}
      <div className="mb-6">
        <p className="text-xs font-medium text-gray-500 mb-2">Examples:</p>
        <div className="flex flex-wrap gap-1">
          {item.examples.map((example, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
            >
              {example}
            </span>
          ))}
        </div>
      </div>

      {/* HAVE/WANT Toggle */}
      <div className="mb-6">
        <div 
          role="tablist" 
          aria-label="Select if you have or want this item type"
          className="flex bg-gray-100 rounded-lg p-1"
        >
          <button
            role="tab"
            aria-selected={selectedTab === 'HAVE'}
            aria-controls={`${item.id}-content`}
            onClick={() => setSelectedTab('HAVE')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              selectedTab === 'HAVE'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            I Have
          </button>
          <button
            role="tab"
            aria-selected={selectedTab === 'WANT'}
            aria-controls={`${item.id}-content`}
            onClick={() => setSelectedTab('WANT')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              selectedTab === 'WANT'
                ? 'bg-green-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            I Want
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div 
        id={`${item.id}-content`}
        role="tabpanel" 
        aria-labelledby={`${item.id}-tab`}
        className="space-y-3"
      >
        {/* Primary CTA */}
        <Link
          href={primaryHref}
          className={`block w-full px-4 py-3 text-sm font-medium text-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            selectedTab === 'HAVE'
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
              : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
          }`}
          aria-label={`${primaryCTA} for ${item.title}`}
        >
          {primaryCTA}
        </Link>

        {/* Secondary CTA */}
        <Link
          href={secondaryHref}
          className="block w-full px-4 py-3 text-sm font-medium text-gray-700 text-center bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          aria-label={`${secondaryCTA} for ${item.title}`}
        >
          {secondaryCTA}
        </Link>
      </div>
    </div>
  )
}

export default function TradeGrid() {
  return (
    <section className="py-20 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What can you trade on LVRXchange?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you have assets to offer or needs to fulfill, LVRXchange connects you with the right opportunities across multiple asset classes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tradeItems.map((item) => (
            <TradeCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}