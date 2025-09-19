'use client'

import Link from 'next/link'
import { useState } from 'react'

export const dynamic = 'force-dynamic'

const sampleMessages = [
  {
    id: 'msg-1',
    sender: { name: 'Mike Rodriguez', avatar: 'MR', isCurrentUser: false },
    content: 'Hi Sarah! I saw our match for the SaaS startup partnership. Your B2B platform looks really promising, especially with the $50K ARR. I think there could be great synergy with my e-commerce business.',
    timestamp: '2024-01-15T09:00:00Z',
    type: 'message'
  },
  {
    id: 'msg-2',
    sender: { name: 'Sarah Chen', avatar: 'SC', isCurrentUser: true },
    content: 'Thanks for reaching out, Mike! I reviewed your e-commerce operation and I\'m impressed with the $500K revenue. The mobile app development need aligns perfectly with where I want to expand.',
    timestamp: '2024-01-15T09:30:00Z',
    type: 'message'
  },
  {
    id: 'msg-3',
    sender: { name: 'Mike Rodriguez', avatar: 'MR', isCurrentUser: false },
    content: 'The AI suggested two interesting structures - the joint venture and cross-equity investment. I\'m leaning towards the joint venture. What are your thoughts?',
    timestamp: '2024-01-15T10:15:00Z',
    type: 'message'
  },
  {
    id: 'msg-4',
    sender: { name: 'Sarah Chen', avatar: 'SC', isCurrentUser: true },
    content: 'I agree the joint venture could work well. Before we dive deeper, would you be open to a call this week to discuss technical requirements and integration possibilities?',
    timestamp: '2024-01-15T11:00:00Z',
    type: 'message'
  },
  {
    id: 'msg-5',
    sender: { name: 'System', avatar: 'AI', isCurrentUser: false },
    content: 'AI Deal Structure Update: Based on your conversation, I\'ve refined the joint venture proposal. The updated terms suggest a 50/50 partnership with shared technology resources and combined revenue streams.',
    timestamp: '2024-01-15T11:30:00Z',
    type: 'system'
  },
  {
    id: 'msg-6',
    sender: { name: 'Mike Rodriguez', avatar: 'MR', isCurrentUser: false },
    content: 'Perfect timing on that AI update! I\'m definitely interested in exploring this further. How about we schedule a call for Wednesday afternoon? I can share our tech stack and current development roadmap.',
    timestamp: '2024-01-16T10:30:00Z',
    type: 'message'
  }
]

export default function DiscussionDetail() {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState(sampleMessages)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: `msg-${Date.now()}`,
      sender: { name: 'Sarah Chen', avatar: 'SC', isCurrentUser: true },
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'message' as const
    }

    setMessages([...messages, message])
    setNewMessage('')

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: `ai-${Date.now()}`,
        sender: { name: 'System', avatar: 'AI', isCurrentUser: false },
        content: 'AI Assistant: I can help generate a Letter of Intent or schedule a video call if you\'d like to move forward with this partnership discussion.',
        timestamp: new Date().toISOString(),
        type: 'system' as const
      }
      setMessages(prev => [...prev, aiResponse])
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/demo/discussions" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">LVRXchange</h1>
          </Link>
          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            DEMO MODE
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Chat Header */}
        <div className="bg-white rounded-t-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/demo/discussions" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm mb-2 inline-block">
                ← Back to Discussions
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">SaaS Startup x E-commerce Partnership</h1>
              <p className="text-sm text-gray-600">with Mike Rodriguez</p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm">
                Generate LOI
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm">
                Schedule Call
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm">
                View Match Details
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white shadow max-h-96 overflow-y-auto">
          <div className="p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender.isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-3 max-w-xs lg:max-w-md ${
                  message.sender.isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    message.type === 'system' 
                      ? 'bg-purple-600 text-white' 
                      : message.sender.isCurrentUser
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}>
                    {message.sender.avatar}
                  </div>
                  <div>
                    <div className={`rounded-lg p-3 ${
                      message.type === 'system'
                        ? 'bg-purple-100 text-purple-900 border border-purple-200'
                        : message.sender.isCurrentUser
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white rounded-b-lg shadow p-6">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Send
            </button>
          </form>
          <div className="mt-3 flex space-x-2">
            <button className="text-sm text-gray-600 hover:text-gray-900">
              📎 Attach File
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-900">
              🤖 Get AI Suggestion
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-900">
              📅 Suggest Meeting
            </button>
          </div>
        </div>

        {/* AI Insights Sidebar */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium text-green-800">Positive Signals</h4>
              <p className="text-sm text-green-700">Both parties expressed interest in joint venture structure</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-medium text-yellow-800">Next Steps</h4>
              <p className="text-sm text-yellow-700">Schedule technical discussion call to align on development roadmap</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium text-blue-800">Suggested Actions</h4>
              <p className="text-sm text-blue-700">Generate Letter of Intent with 50/50 partnership terms</p>
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <strong>Demo Mode:</strong> This chat interface demonstrates real-time messaging between matched users. 
            Messages and AI suggestions are simulated for demonstration purposes.
          </p>
        </div>
      </div>
    </div>
  )
}