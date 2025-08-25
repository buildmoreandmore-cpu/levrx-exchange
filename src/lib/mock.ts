// Mock data types and implementations

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  initials: string
}

export interface KPICard {
  id: string
  title: string
  value: number
  trend: 'up' | 'down' | 'neutral'
  trendPercentage: number
  icon: string
}

export interface ActivityItem {
  id: string
  type: 'match' | 'message' | 'listing' | 'agreement'
  title: string
  description: string
  timestamp: string
  unread: boolean
}

export interface MarketInsight {
  totalDealVolume: string
  topCategories: Array<{
    name: string
    percentage: number
    value: string
  }>
  newMatchesThisWeek: number
}

export interface Message {
  id: string
  sender: string
  snippet: string
  timestamp: string
  unread: boolean
  avatar?: string
}

export interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
  action: string
  href: string
}

// Mock data
export const mockUser: User = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex@example.com',
  initials: 'AC'
}

export const mockKPIs: KPICard[] = [
  {
    id: 'listings',
    title: 'Active Listings',
    value: 3,
    trend: 'up',
    trendPercentage: 12,
    icon: 'building'
  },
  {
    id: 'matches',
    title: 'AI Matches',
    value: 8,
    trend: 'up',
    trendPercentage: 25,
    icon: 'target'
  },
  {
    id: 'discussions',
    title: 'Discussions',
    value: 5,
    trend: 'neutral',
    trendPercentage: 0,
    icon: 'chat'
  },
  {
    id: 'agreements',
    title: 'Agreements',
    value: 2,
    trend: 'up',
    trendPercentage: 100,
    icon: 'document'
  }
]

export const mockActivityFeed: ActivityItem[] = [
  {
    id: '1',
    type: 'match',
    title: 'New Match Found',
    description: 'Your listing "Atlanta Duplex" received 2 new matches from investors.',
    timestamp: '2 hours ago',
    unread: true
  },
  {
    id: '2',
    type: 'message',
    title: 'Message Received',
    description: 'Sarah Johnson sent you a message about the downtown office space.',
    timestamp: '4 hours ago',
    unread: true
  },
  {
    id: '3',
    type: 'agreement',
    title: 'Agreement Signed',
    description: 'LOI for Commercial Property Partnership has been signed by both parties.',
    timestamp: '1 day ago',
    unread: false
  },
  {
    id: '4',
    type: 'listing',
    title: 'Listing Viewed',
    description: 'Your "Mixed-Use Development" listing was viewed 15 times this week.',
    timestamp: '2 days ago',
    unread: false
  },
  {
    id: '5',
    type: 'match',
    title: 'Match Update',
    description: 'AI found 3 new potential partners for your equipment financing need.',
    timestamp: '3 days ago',
    unread: false
  },
  {
    id: '6',
    type: 'message',
    title: 'Discussion Started',
    description: 'Michael Torres started a discussion about joint venture terms.',
    timestamp: '5 days ago',
    unread: false
  }
]

export const mockMarketInsights: MarketInsight = {
  totalDealVolume: '$2.4M',
  topCategories: [
    { name: 'Real Estate', percentage: 65, value: '$1.56M' },
    { name: 'Equipment', percentage: 25, value: '$600K' },
    { name: 'Credit', percentage: 10, value: '$240K' }
  ],
  newMatchesThisWeek: 24
}

export const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Sarah Johnson',
    snippet: 'Interested in discussing the downtown office space opportunity...',
    timestamp: '2 hours ago',
    unread: true
  },
  {
    id: '2',
    sender: 'Michael Torres',
    snippet: 'The joint venture proposal looks promising. When can we...',
    timestamp: '5 hours ago',
    unread: true
  },
  {
    id: '3',
    sender: 'Jennifer Park',
    snippet: 'Thanks for the LOI. I have a few questions about the terms...',
    timestamp: '1 day ago',
    unread: false
  },
  {
    id: '4',
    sender: 'Robert Kim',
    snippet: 'Your equipment financing listing caught my attention...',
    timestamp: '2 days ago',
    unread: false
  },
  {
    id: '5',
    sender: 'Lisa Wang',
    snippet: 'Would love to explore the mixed-use development project...',
    timestamp: '3 days ago',
    unread: false
  }
]

export const mockOnboardingSteps: OnboardingStep[] = [
  {
    id: 'create-have',
    title: 'Create a HAVE listing',
    description: 'Share what you have to offer',
    completed: false,
    action: 'Create Listing',
    href: '/listings/new?mode=have'
  },
  {
    id: 'post-want',
    title: 'Post a WANT',
    description: 'Tell us what you\'re looking for',
    completed: false,
    action: 'Post Want',
    href: '/listings/new?mode=want'
  },
  {
    id: 'view-match',
    title: 'View first match',
    description: 'Explore AI-generated matches',
    completed: false,
    action: 'View Matches',
    href: '/matches'
  },
  {
    id: 'complete-profile',
    title: 'Complete profile',
    description: 'Add your details and preferences',
    completed: false,
    action: 'Edit Profile',
    href: '/settings/profile'
  }
]