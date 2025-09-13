export interface SampleListing {
  id: string
  kind: 'HAVE' | 'WANT'
  packageType: string
  location: {
    address: string
    city: string
    state: string
    zipCode: string
  }
  financials: {
    purchasePrice?: number
    currentValue?: number
    investmentAmount?: number
    equityPercentage?: number
  }
  description: string
  timeline: string
  createdAt: string
  user: {
    name: string
    initials: string
  }
}

export const sampleListings: SampleListing[] = [
  {
    id: 'demo-1',
    kind: 'HAVE',
    packageType: 'Commercial Property',
    location: {
      address: '1250 Tech Park Drive',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30309'
    },
    financials: {
      currentValue: 2800000,
      equityPercentage: 65
    },
    description: 'Modern office building in premier tech district. Fully leased with AAA tenants including Fortune 500 companies. Excellent cash flow and appreciation potential.',
    timeline: 'Ready for immediate partnership',
    createdAt: '2024-01-15T10:30:00Z',
    user: {
      name: 'Sarah Chen',
      initials: 'SC'
    }
  },
  {
    id: 'demo-2',
    kind: 'WANT',
    packageType: 'Residential Property',
    location: {
      address: 'Buckhead District',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30305'
    },
    financials: {
      investmentAmount: 500000,
      equityPercentage: 25
    },
    description: 'Seeking luxury residential development opportunities in Buckhead. Looking for experienced developer partner for high-end condominiums or townhomes.',
    timeline: 'Q2 2024 start preferred',
    createdAt: '2024-01-20T14:15:00Z',
    user: {
      name: 'Marcus Johnson',
      initials: 'MJ'
    }
  },
  {
    id: 'demo-3',
    kind: 'HAVE',
    packageType: 'Development Land',
    location: {
      address: '500 Acre Tract on Highway 85',
      city: 'Fayetteville',
      state: 'GA',
      zipCode: '30214'
    },
    financials: {
      currentValue: 12000000,
      equityPercentage: 40
    },
    description: 'Prime development land with mixed-use zoning approved. Perfect for retail, residential, and office complex. All utilities available, environmental studies complete.',
    timeline: 'Looking to break ground in 6 months',
    createdAt: '2024-01-18T09:45:00Z',
    user: {
      name: 'Robert Kim',
      initials: 'RK'
    }
  },
  {
    id: 'demo-4',
    kind: 'WANT',
    packageType: 'Industrial Property',
    location: {
      address: 'I-285 Corridor',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30349'
    },
    financials: {
      investmentAmount: 8000000,
      equityPercentage: 50
    },
    description: 'Looking for warehouse/distribution facility investment opportunities. Prefer properties with rail access and proximity to major logistics hubs.',
    timeline: 'Flexible timeline, quality over speed',
    createdAt: '2024-01-12T11:20:00Z',
    user: {
      name: 'Jennifer Martinez',
      initials: 'JM'
    }
  },
  {
    id: 'demo-5',
    kind: 'HAVE',
    packageType: 'Mixed-Use Property',
    location: {
      address: '2200 Peachtree Road',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30309'
    },
    financials: {
      currentValue: 15000000,
      equityPercentage: 30
    },
    description: 'Historic mixed-use building with retail on ground floor and office space above. Located in the heart of Midtown with excellent foot traffic and parking.',
    timeline: 'Seeking partnership within 90 days',
    createdAt: '2024-01-22T16:00:00Z',
    user: {
      name: 'David Wilson',
      initials: 'DW'
    }
  },
  {
    id: 'demo-6',
    kind: 'WANT',
    packageType: 'Hospitality Property',
    location: {
      address: 'Downtown Atlanta',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30303'
    },
    financials: {
      investmentAmount: 25000000,
      equityPercentage: 60
    },
    description: 'Interested in boutique hotel development or acquisition in downtown Atlanta. Seeking experienced hospitality operator as partner.',
    timeline: 'Market research phase, 12-18 month timeline',
    createdAt: '2024-01-10T13:30:00Z',
    user: {
      name: 'Lisa Thompson',
      initials: 'LT'
    }
  }
]

export interface SampleMatch {
  id: string
  listingId: string
  matchScore: number
  title: string
  description: string
  user: {
    name: string
    initials: string
  }
  status: 'new' | 'contacted' | 'discussing' | 'agreement'
  lastActivity: string
}

export const sampleMatches: SampleMatch[] = [
  {
    id: 'match-1',
    listingId: 'demo-1',
    matchScore: 94,
    title: 'Commercial Real Estate Fund',
    description: 'Institutional investor seeking commercial properties in Atlanta tech corridor. Perfect match for your office building.',
    user: {
      name: 'Alexandra Partners',
      initials: 'AP'
    },
    status: 'discussing',
    lastActivity: '2024-01-23T10:15:00Z'
  },
  {
    id: 'match-2',
    listingId: 'demo-2',
    matchScore: 87,
    title: 'Buckhead Development Group',
    description: 'Experienced luxury residential developer with successful track record in Buckhead area. Looking for capital partner.',
    user: {
      name: 'Michael Chang',
      initials: 'MC'
    },
    status: 'new',
    lastActivity: '2024-01-22T14:30:00Z'
  },
  {
    id: 'match-3',
    listingId: 'demo-3',
    matchScore: 82,
    title: 'Southeast Development Capital',
    description: 'Private equity firm specializing in mixed-use developments. Interested in your Fayetteville land opportunity.',
    user: {
      name: 'Investment Team',
      initials: 'IT'
    },
    status: 'agreement',
    lastActivity: '2024-01-24T09:00:00Z'
  }
]

export interface SampleMessage {
  id: string
  matchId: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  isFromCurrentUser: boolean
}

export const sampleMessages: SampleMessage[] = [
  {
    id: 'msg-1',
    matchId: 'match-1',
    senderId: 'demo-user-1',
    senderName: 'Alexandra Partners',
    content: 'Hi Sarah, we\'re very interested in your Tech Park office building. Our fund has been specifically looking for assets in this corridor. Could we schedule a call to discuss the opportunity in more detail?',
    timestamp: '2024-01-23T09:00:00Z',
    isFromCurrentUser: false
  },
  {
    id: 'msg-2',
    matchId: 'match-1',
    senderId: 'demo-user-2',
    senderName: 'Sarah Chen',
    content: 'Absolutely! I\'d be happy to discuss. The building has been performing exceptionally well, and I think it would be a great fit for your portfolio. Are you available for a call this week?',
    timestamp: '2024-01-23T09:15:00Z',
    isFromCurrentUser: true
  },
  {
    id: 'msg-3',
    matchId: 'match-1',
    senderId: 'demo-user-1',
    senderName: 'Alexandra Partners',
    content: 'Perfect! How about Thursday at 2 PM EST? I can share our investment criteria and we can dive into the financials. Also, do you have any recent appraisals or NOI statements you could share ahead of the call?',
    timestamp: '2024-01-23T10:15:00Z',
    isFromCurrentUser: false
  }
]

export interface SampleMatchFormatted {
  id: string
  score: number
  rationale?: string
  suggestedStructures?: any[]
  createdAt: string
  listingA: {
    id: string
    title: string
    mode: string
    user: { name?: string }
    asset?: { title: string; type: string }
    want?: { title: string; category: string }
  }
  listingB: {
    id: string
    title: string
    mode: string
    user: { name?: string }
    asset?: { title: string; type: string }
    want?: { title: string; category: string }
  }
}

export const sampleMatchesFormatted: SampleMatchFormatted[] = [
  {
    id: 'demo-match-1',
    score: 0.94,
    rationale: 'High compatibility match: Your commercial office building in Atlanta\'s tech corridor aligns perfectly with Alexandra Partners\' investment criteria. They focus on Class A office properties with established tenant bases in growing markets. The $2.8M value and prime location make this an ideal institutional investment opportunity.',
    suggestedStructures: [
      { type: 'Joint Venture', ownership: '65/35 split' },
      { type: 'Sale-Leaseback', terms: '15-year lease with options' }
    ],
    createdAt: '2024-01-23T08:00:00Z',
    listingA: {
      id: 'demo-1',
      title: 'Modern Office Building - Tech Park Drive',
      mode: 'HAVE',
      user: { name: 'Sarah Chen' },
      asset: { title: 'Modern Office Building - Tech Park Drive', type: 'Commercial Property' }
    },
    listingB: {
      id: 'inst-1',
      title: 'Seeking Premium Office Buildings in Atlanta',
      mode: 'WANT',
      user: { name: 'Alexandra Partners' },
      want: { title: 'Seeking Premium Office Buildings in Atlanta', category: 'Commercial Property' }
    }
  },
  {
    id: 'demo-match-2',
    score: 0.87,
    rationale: 'Strong development synergy: Your Buckhead residential investment seeking aligns well with Michael Chang\'s development expertise. His team has successfully completed 12 luxury residential projects in Buckhead with an average 18% IRR. Your $500K investment provides the capital injection needed for their next high-end development.',
    suggestedStructures: [
      { type: 'Development Partnership', ownership: '25% LP, 75% GP' },
      { type: 'Preferred Equity', terms: '12% preferred return + upside' }
    ],
    createdAt: '2024-01-22T16:30:00Z',
    listingA: {
      id: 'demo-2',
      title: 'Seeking Luxury Residential Development - Buckhead',
      mode: 'WANT',
      user: { name: 'Marcus Johnson' },
      want: { title: 'Seeking Luxury Residential Development - Buckhead', category: 'Residential Property' }
    },
    listingB: {
      id: 'dev-1',
      title: 'Experienced Buckhead Developer Seeks Capital Partner',
      mode: 'HAVE',
      user: { name: 'Michael Chang' },
      asset: { title: 'Experienced Buckhead Developer Seeks Capital Partner', type: 'Development Expertise' }
    }
  },
  {
    id: 'demo-match-3',
    score: 0.82,
    rationale: 'Excellent development opportunity match: Your 500-acre development land with approved mixed-use zoning is exactly what Southeast Development Capital targets. They specialize in large-scale mixed-use developments with their $50M fund. The approved zoning and completed environmental studies significantly reduce development risk.',
    suggestedStructures: [
      { type: 'Land Joint Venture', ownership: '40% Land / 60% Capital' },
      { type: 'Ground Lease + Development', terms: '99-year ground lease' }
    ],
    createdAt: '2024-01-24T11:15:00Z',
    listingA: {
      id: 'demo-3',
      title: 'Prime Development Land - 500 Acres Mixed-Use Approved',
      mode: 'HAVE',
      user: { name: 'Robert Kim' },
      asset: { title: 'Prime Development Land - 500 Acres Mixed-Use Approved', type: 'Development Land' }
    },
    listingB: {
      id: 'pe-1',
      title: 'Private Equity Fund Seeking Large Development Opportunities',
      mode: 'WANT',
      user: { name: 'Southeast Development Capital' },
      want: { title: 'Private Equity Fund Seeking Large Development Opportunities', category: 'Mixed-Use Development' }
    }
  }
]