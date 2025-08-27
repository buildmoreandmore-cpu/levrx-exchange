'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  type: 'text' | 'system'
}

interface Match {
  id: string
  score: number
  listingA: {
    id: string
    title: string
    mode: string
    user: { name?: string }
  }
  listingB: {
    id: string
    title: string
    mode: string
    user: { name?: string }
  }
}

export default function MessagePage() {
  const { user } = useUser()
  const params = useParams()
  const matchId = params.id as string
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [match, setMatch] = useState<Match | null>(null)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock match data for demo
  const demoMatch = {
    id: 'demo-match-1',
    score: 0.85,
    listingA: {
      id: 'have-1',
      title: 'Multifamily (5+ units) Investment Opportunity',
      mode: 'HAVE',
      user: { name: 'Atlanta Investor' }
    },
    listingB: {
      id: 'want-1',
      title: 'Seeking Single-Family Opportunity',
      mode: 'WANT',
      user: { name: 'Charlotte Buyer' }
    }
  }

  // Mock messages for demo
  const demoMessages: Message[] = [
    {
      id: '1',
      senderId: 'system',
      senderName: 'System',
      content: 'This conversation was started based on your 85% match score. You both have complementary real estate opportunities.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      type: 'system'
    },
    {
      id: '2',
      senderId: 'atlanta-investor',
      senderName: 'Atlanta Investor',
      content: 'Hi! I saw your interest in single-family properties with assumable financing. I have a 20-unit multifamily building that might work for a creative structure. Would you be interested in discussing?',
      timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(), // 90 minutes ago
      type: 'text'
    },
    {
      id: '3',
      senderId: 'charlotte-buyer',
      senderName: 'Charlotte Buyer',
      content: 'That sounds very interesting! I\'m particularly drawn to the assumable debt aspect. Can you tell me more about the current financing structure and the timeline for your 1031 exchange?',
      timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString(), // 75 minutes ago
      type: 'text'
    },
    {
      id: '4',
      senderId: 'atlanta-investor',
      senderName: 'Atlanta Investor',
      content: 'Great! The property has $1.2M in assumable debt at 4.5% interest, with about $1M in equity. I need to complete the exchange within 45 days. The NOI is $165K annually. Would you be open to a partnership structure where you assume the debt and we split the equity?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
      type: 'text'
    },
    {
      id: '5',
      senderId: 'charlotte-buyer',
      senderName: 'Charlotte Buyer',
      content: 'That timeline works well for me. The partnership structure is exactly what I was hoping for. Can we schedule a call to discuss the property details and next steps? I\'d also like to review the rent rolls and financials.',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
      type: 'text'
    }
  ]

  useEffect(() => {
    // Simulate loading match and messages
    setTimeout(() => {
      setMatch(demoMatch)
      setMessages(demoMessages)
      setLoading(false)
    }, 500)
  }, [matchId])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !user) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.fullName || 'You',
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      type: 'text'
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading conversation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/matches"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Matches
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Match Conversation</h1>
                <p className="text-sm text-gray-600">
                  {Math.round((match?.score || 0) * 100)}% compatibility • {match?.listingA.user.name} & {match?.listingB.user.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href={`/matches/${matchId}`}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                View Match Details
              </Link>
              <Link
                href={`/matches/${matchId}/agreement`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Draft Agreement
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Match Summary */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{match?.listingA.title}</h3>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {match?.listingA.mode}
                </span>
              </div>
              <p className="text-sm text-gray-600">by {match?.listingA.user.name}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{match?.listingB.title}</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {match?.listingB.mode}
                </span>
              </div>
              <p className="text-sm text-gray-600">by {match?.listingB.user.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 overflow-hidden flex flex-col">
          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'system' ? 'justify-center' : message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'system' ? (
                  <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm max-w-md text-center">
                    {message.content}
                  </div>
                ) : (
                  <div className={`max-w-sm lg:max-w-md ${message.senderId === user?.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-4 py-2`}>
                    {message.senderId !== user?.id && (
                      <p className="text-xs font-medium mb-1 opacity-70">{message.senderName}</p>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}