'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  mockUser, 
  mockKPIs, 
  mockActivityFeed, 
  mockMarketInsights, 
  mockMessages
} from '@/lib/mock'
import { mockListings, getListingsByKind, addListing } from '@/lib/mockListings'
import { Listing, DealKind } from '@/types/exchange'
import DealPanel from '@/components/dashboard/DealPanel'
import QuickAddModal from '@/components/dashboard/QuickAddModal'
import AIMatches from '@/components/dashboard/AIMatches'

const getIcon = (iconName: string, className: string = 'w-5 h-5') => {
  const icons: Record<string, JSX.Element> = {
    target: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    chat: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    trending: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  }
  return icons[iconName] || icons.target
}

export default function DashboardPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalKind, setModalKind] = useState<DealKind>('HAVE')

  // Load listings from localStorage on mount
  useEffect(() => {
    const storedListings = localStorage.getItem('levrx-listings')
    if (storedListings) {
      try {
        setListings(JSON.parse(storedListings))
      } catch (error) {
        console.error('Error parsing stored listings:', error)
        setListings(mockListings)
      }
    } else {
      setListings(mockListings)
    }
  }, [])

  // Save listings to localStorage whenever listings change
  useEffect(() => {
    localStorage.setItem('levrx-listings', JSON.stringify(listings))
  }, [listings])

  const haveListings = listings.filter(listing => listing.kind === 'HAVE')
  const wantListings = listings.filter(listing => listing.kind === 'WANT')

  const unreadCount = mockActivityFeed.filter(item => item.unread).length + 
                     mockMessages.filter(msg => msg.unread).length

  const handleAddNew = (kind: DealKind) => {
    setModalKind(kind)
    setIsModalOpen(true)
  }

  const handleSaveListing = (listingData: Omit<Listing, 'id' | 'createdAt'>) => {
    const newListing: Listing = {
      ...listingData,
      id: `${listingData.kind.toLowerCase()}-${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    
    setListings(prev => [...prev, newListing])
  }

  const handleViewListing = (id: string) => {
    console.log('View listing:', id)
    // TODO: Navigate to listing detail page
  }

  const handleStartDiscussion = (id: string) => {
    console.log('Start discussion for listing:', id)
    // TODO: Navigate to discussion/messages page
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">{mockUser.initials}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {mockUser.name}
            </h1>
            <p className="text-gray-600">
              {haveListings.length} haves, {wantListings.length} wants • {unreadCount > 0 ? `${unreadCount} new notifications` : 'You\'re all caught up'}
            </p>
          </div>
        </div>
      </div>

      {/* Deal Panels */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Haves Panel */}
        <DealPanel
          kind="HAVE"
          items={haveListings}
          onAddNew={() => handleAddNew('HAVE')}
          onView={handleViewListing}
          onStartDiscussion={handleStartDiscussion}
        />

        {/* Wants Panel */}
        <DealPanel
          kind="WANT"
          items={wantListings}
          onAddNew={() => handleAddNew('WANT')}
          onView={handleViewListing}
          onStartDiscussion={handleStartDiscussion}
        />
      </div>

      {/* AI Matches & Market Activity - Keep unchanged */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* AI Matches */}
        <div className="lg:col-span-8">
          <AIMatches />
        </div>

        {/* Market Activity */}
        <div className="lg:col-span-4 space-y-6">
          {/* Market Insights */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Market Insights</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Deal Volume</span>
                  <span className="text-lg font-bold text-gray-900">{mockMarketInsights.totalDealVolume}</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-3">Top Categories</div>
                <div className="space-y-2">
                  {mockMarketInsights.topCategories.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">{category.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{category.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
              <Link 
                href="/messages"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {mockMessages.slice(0, 3).map((message) => (
                <div key={message.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {message.sender.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {message.sender}
                      </h4>
                      {message.unread && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 truncate mt-1">{message.snippet}</p>
                    <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Add Modal */}
      <QuickAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        kind={modalKind}
        onSave={handleSaveListing}
      />
    </div>
  )
}