import Link from 'next/link'

export const dynamic = 'force-dynamic'

const sampleDiscussions = [
  {
    id: 'disc-1',
    matchId: 'match-1',
    participants: [
      { name: 'Sarah Chen', email: 'sarah@demo.com', avatar: 'SC' },
      { name: 'Mike Rodriguez', email: 'mike@demo.com', avatar: 'MR' }
    ],
    subject: 'SaaS Startup x E-commerce Partnership',
    lastMessage: 'I\'d be interested in exploring the joint venture option. When can we schedule a call to discuss the technical requirements?',
    lastMessageTime: '2024-01-16T10:30:00Z',
    unreadCount: 2,
    status: 'active'
  },
  {
    id: 'disc-2',
    matchId: 'match-2',
    participants: [
      { name: 'Jennifer Park', email: 'jennifer@demo.com', avatar: 'JP' },
      { name: 'David Kim', email: 'david@demo.com', avatar: 'DK' }
    ],
    subject: 'Real Estate Investment for Restaurant Expansion',
    lastMessage: 'The financials look good. I\'m ready to move forward with the revenue share agreement.',
    lastMessageTime: '2024-01-15T14:45:00Z',
    unreadCount: 0,
    status: 'negotiating'
  },
  {
    id: 'disc-3',
    matchId: 'match-3',
    participants: [
      { name: 'Alex Johnson', email: 'alex@demo.com', avatar: 'AJ' },
      { name: 'Lisa Wong', email: 'lisa@demo.com', avatar: 'LW' }
    ],
    subject: 'Tech Partnership for Manufacturing Automation',
    lastMessage: 'Thanks for the proposal. Let me review the technical specifications and get back to you by Friday.',
    lastMessageTime: '2024-01-14T09:20:00Z',
    unreadCount: 1,
    status: 'reviewing'
  }
]

const statusColors = {
  active: 'bg-green-100 text-green-800',
  negotiating: 'bg-yellow-100 text-yellow-800',
  reviewing: 'bg-blue-100 text-blue-800',
  completed: 'bg-gray-100 text-gray-800'
}

export default function DemoDiscussions() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/demo/dashboard" className="flex items-center space-x-2">
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
          <Link href="/demo/dashboard" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discussions</h1>
          <p className="text-gray-600">Conversations with potential partners from AI matches</p>
        </div>

        {/* Discussion Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active</h3>
            <p className="text-2xl font-bold text-green-600">3</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Unread</h3>
            <p className="text-2xl font-bold text-blue-600">3</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">This Week</h3>
            <p className="text-2xl font-bold text-indigo-600">8</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Agreements</h3>
            <p className="text-2xl font-bold text-purple-600">2</p>
          </div>
        </div>

        {/* Discussions List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Discussions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {sampleDiscussions.map((discussion) => (
              <div key={discussion.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Participants */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex -space-x-2">
                        {discussion.participants.map((participant, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white"
                          >
                            {participant.avatar}
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {discussion.participants.map(p => p.name).join(' & ')}
                        </p>
                        <p className="text-xs text-gray-500">
                          Match from {new Date(discussion.lastMessageTime).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Subject */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {discussion.subject}
                    </h3>

                    {/* Last Message */}
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {discussion.lastMessage}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>
                        {new Date(discussion.lastMessageTime).toLocaleString()}
                      </span>
                      {discussion.unreadCount > 0 && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {discussion.unreadCount} new
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[discussion.status as keyof typeof statusColors]}`}>
                        {discussion.status}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 ml-6">
                    <Link
                      href={`/demo/discussions/${discussion.id}`}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                    >
                      View Chat
                    </Link>
                    <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                      Archive
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State for additional discussions */}
        <div className="mt-8 bg-white rounded-lg shadow p-8 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start More Conversations</h3>
          <p className="text-gray-600 mb-4">
            Create new listings or explore matches to connect with more potential partners
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/demo/create"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm"
            >
              Create Listing
            </Link>
            <Link
              href="/demo/matches"
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm"
            >
              View Matches
            </Link>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Demo Discussions</h3>
              <p className="mt-1 text-sm text-blue-700">
                These are sample conversations between matched users. In the full application, 
                users can send real messages, share documents, and negotiate deal terms directly in the platform.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}