import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { anthropic, buildMatchRationalePrompt, buildDealStructuresPrompt } from '@/lib/anthropic'
import { mockHaves, mockWants } from '@/lib/mockListings'

// Demo match for development
const demoMatch = {
  id: 'demo-match-1',
  score: 0.85,
  rationale: `This is a high-quality match for several key reasons:

**Geographic Synergy**: The Atlanta multifamily property owner needs to complete a 1031 exchange within 60 days, while the Charlotte buyer is actively seeking assumable financing opportunities in the Southeast corridor.

**Complementary Needs**: The Have listing offers assumable financing ($1.2M debt) and strong cash flow ($165K NOI), which directly addresses the Want listing's need for "debt relief/assume debt" and "creative financing" solutions.

**Timeline Alignment**: The seller's high urgency (60-day 1031 deadline) matches well with a buyer who appears ready to move quickly on the right opportunity.

**Value-Add Opportunity**: The below-market basis and value-add upside mentioned could provide the equity growth the Charlotte investor is seeking.`,
  suggestedStructures: [
    {
      title: "Assumption + Partner Structure",
      description: "Charlotte buyer assumes $1.2M debt, Atlanta seller provides seller financing for remaining equity, creating partnership opportunity"
    },
    {
      title: "1031 Exchange Facilitation", 
      description: "Structure as qualified intermediary transaction to meet seller's 1031 timeline requirements"
    }
  ],
  createdAt: new Date().toISOString(),
  listingA: {
    id: mockHaves[0].id,
    title: `${mockHaves[0].propertyType} Investment Opportunity`,
    mode: mockHaves[0].kind,
    user: { name: 'Atlanta Investor' },
    asset: { 
      title: `${mockHaves[0].propertyType} - ${mockHaves[0].city}, ${mockHaves[0].state}`,
      type: mockHaves[0].packageType 
    }
  },
  listingB: {
    id: mockWants[0].id,
    title: `Seeking ${mockWants[0].propertyType} Opportunity`,
    mode: mockWants[0].kind,
    user: { name: 'Charlotte Buyer' },
    want: { 
      title: `${mockWants[0].propertyType} - ${mockWants[0].city}, ${mockWants[0].state}`,
      category: mockWants[0].packageType 
    }
  }
}

export async function GET() {
  try {
    const user = await currentUser()
    
    if (!user) {
      // For non-authenticated users, return demo match
      console.log('👋 Returning demo matches for visitor')
      return NextResponse.json([demoMatch])
    }

    // For authenticated users, return real matches
    console.log('🔍 Fetching real matches for authenticated user:', user.id)
    
    
    const matches = await prisma.match.findMany({
      where: {
        OR: [
          { listingA: { userId: user.id } },
          { listingB: { userId: user.id } }
        ]
      },
      include: {
        listingA: {
          include: {
            user: { select: { id: true, name: true } },
            asset: { select: { title: true, type: true } },
            want: { select: { title: true, category: true } }
          }
        },
        listingB: {
          include: {
            user: { select: { id: true, name: true } },
            asset: { select: { title: true, type: true } },
            want: { select: { title: true, category: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    console.log('📊 Found real matches for user:', matches.length)
    
    return NextResponse.json(matches)
  } catch (error) {
    console.error('Error fetching matches:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { listingId } = await request.json()


    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: {
        asset: true,
        want: true,
        user: true,
      },
    })

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    // Find complementary listings
    const complementaryMode = listing.mode === 'HAVE' ? 'WANT' : 'HAVE'
    
    const potentialMatches = await prisma.listing.findMany({
      where: {
        mode: complementaryMode,
        status: 'ACTIVE',
        userId: { not: user.id }, // Don't match with own listings
      },
      include: {
        asset: true,
        want: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      take: 50, // Increased to check more potential matches
    })

    const matches = []

    for (const potentialMatch of potentialMatches) {
      try {
        // Check if match already exists
        const existingMatch = await prisma.match.findUnique({
          where: {
            listingAId_listingBId: {
              listingAId: listing.id,
              listingBId: potentialMatch.id,
            },
          },
        })

        if (existingMatch) {
          matches.push({
            ...existingMatch,
            listingA: listing,
            listingB: potentialMatch,
          })
          continue
        }

        // Build summaries for AI analysis
        const haveSummary = listing.mode === 'HAVE' 
          ? `${listing.asset?.title}: ${listing.asset?.description}`
          : `${potentialMatch.asset?.title}: ${potentialMatch.asset?.description}`
          
        const wantSummary = listing.mode === 'WANT'
          ? `${listing.want?.title}: ${listing.want?.description}`
          : `${potentialMatch.want?.title}: ${potentialMatch.want?.description}`

        // Simple rule-based matching for MVP
        let ruleScore = 0.6 // Base score (increased for easier matching)

        // Category matching
        if (listing.mode === 'HAVE' && potentialMatch.mode === 'WANT') {
          const assetType = listing.asset?.type
          const wantCategory = potentialMatch.want?.category

          // Primary category matches (strong compatibility)
          if (
            (assetType === 'EQUITY' && wantCategory === 'BUYER') ||     // Property HAVE ↔ Property WANT
            (assetType === 'EQUITY' && wantCategory === 'PARTNER') ||   // Property HAVE ↔ Partnership WANT
            (assetType === 'CASHFLOW' && wantCategory === 'CASH') ||    // Cash HAVE ↔ Cash WANT
            (assetType === 'EQUIPMENT' && wantCategory === 'EQUIPMENT') || // Stuff HAVE ↔ Stuff WANT
            (assetType === 'CREDIT' && wantCategory === 'CASH') ||      // Paper HAVE ↔ Cash WANT
            (assetType === 'SKILL' && wantCategory === 'PARTNER')       // Skill HAVE ↔ Partnership WANT
          ) {
            ruleScore += 0.25
          }

          // Secondary category matches (cross-category opportunities)
          else if (
            (assetType === 'CREDIT' && wantCategory === 'BUYER') ||     // Paper HAVE ↔ Property WANT
            (assetType === 'CASHFLOW' && wantCategory === 'BUYER') ||   // Cash HAVE ↔ Property WANT
            (assetType === 'EQUITY' && wantCategory === 'CASH') ||      // Property HAVE ↔ Cash WANT
            (assetType === 'CREDIT' && wantCategory === 'PARTNER') ||   // Paper HAVE ↔ Partnership WANT
            (assetType === 'CASHFLOW' && wantCategory === 'PARTNER') || // Cash HAVE ↔ Partnership WANT
            (assetType === 'EQUIPMENT' && wantCategory === 'CASH')      // Stuff HAVE ↔ Cash WANT
          ) {
            ruleScore += 0.15
          }

          // Wild card bonus for ANY category with OTHER
          else if (wantCategory === 'OTHER' || assetType === 'OTHER') {
            ruleScore += 0.1
          }
        }

        // Geographic proximity bonus
        const listingLocation = listing.mode === 'HAVE'
          ? listing.asset?.terms?.state || listing.asset?.terms?.geography
          : listing.want?.constraints?.state || listing.want?.constraints?.geography
        const matchLocation = potentialMatch.mode === 'HAVE'
          ? potentialMatch.asset?.terms?.state || potentialMatch.asset?.terms?.geography
          : potentialMatch.want?.constraints?.state || potentialMatch.want?.constraints?.geography

        if (listingLocation && matchLocation) {
          if (listingLocation.toLowerCase() === matchLocation.toLowerCase()) {
            ruleScore += 0.1 // Same state bonus
          } else {
            // Neighboring states bonus (simplified US geography)
            const neighboringStates = {
              'ga': ['fl', 'al', 'tn', 'nc', 'sc'],
              'fl': ['ga', 'al'],
              'al': ['ga', 'fl', 'tn', 'ms'],
              'nc': ['ga', 'tn', 'va', 'sc'],
              'sc': ['ga', 'nc'],
              'tn': ['ga', 'al', 'nc', 'va', 'ky', 'ms', 'ar', 'mo'],
            }
            const state1 = listingLocation.toLowerCase()
            const state2 = matchLocation.toLowerCase()
            if (neighboringStates[state1]?.includes(state2) || neighboringStates[state2]?.includes(state1)) {
              ruleScore += 0.05 // Neighboring state bonus
            }
          }
        }

        // Price range compatibility bonus
        const listingValue = listing.mode === 'HAVE'
          ? listing.asset?.estValueNumeric
          : listing.want?.targetValueNumeric
        const matchValue = potentialMatch.mode === 'HAVE'
          ? potentialMatch.asset?.estValueNumeric
          : potentialMatch.want?.targetValueNumeric

        if (listingValue && matchValue) {
          const ratio = Math.min(listingValue, matchValue) / Math.max(listingValue, matchValue)
          if (ratio >= 0.8) {
            ruleScore += 0.1 // Very close price range
          } else if (ratio >= 0.5) {
            ruleScore += 0.05 // Reasonable price range overlap
          }
        }

        // For MVP, use rule-based score (in production, would include embeddings)
        const score = Math.min(ruleScore, 1.0)

        if (score >= 0.4) { // Only create matches above threshold (lowered to 40% for easier matching)
          // Generate AI rationale and deal structures
          let rationale = ''
          let suggestedStructures = null

          try {
            const rationalePrompt = buildMatchRationalePrompt(haveSummary, wantSummary)
            const rationaleResponse = await anthropic.messages.create({
              model: 'claude-3-5-sonnet-20241022',
              max_tokens: 1000,
              messages: [{ role: 'user', content: rationalePrompt }],
            })
            rationale = rationaleResponse.content[0].type === 'text' 
              ? rationaleResponse.content[0].text 
              : ''

            const structuresPrompt = buildDealStructuresPrompt(
              listing.mode === 'HAVE' ? (listing.asset || {}) : (potentialMatch.asset || {}),
              listing.mode === 'WANT' ? (listing.want || {}) : (potentialMatch.want || {})
            )
            const structuresResponse = await anthropic.messages.create({
              model: 'claude-3-5-sonnet-20241022',
              max_tokens: 2000,
              messages: [{ role: 'user', content: structuresPrompt }],
            })
            
            const structuresText = structuresResponse.content[0].type === 'text' 
              ? structuresResponse.content[0].text 
              : '{}'
            
            try {
              suggestedStructures = JSON.parse(structuresText)
            } catch {
              suggestedStructures = { structures: [] }
            }
          } catch (error) {
            console.error('Error generating AI content:', error)
            rationale = 'AI analysis temporarily unavailable'
            suggestedStructures = { structures: [] }
          }

          // Create match
          const match = await prisma.match.create({
            data: {
              listingAId: listing.id,
              listingBId: potentialMatch.id,
              score,
              rationale,
              suggestedStructures,
            },
          })

          matches.push({
            ...match,
            listingA: listing,
            listingB: potentialMatch,
          })
        }
      } catch (error) {
        console.error('Error processing potential match:', error)
      }
    }

    return NextResponse.json(matches)
  } catch (error) {
    console.error('Error finding matches:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}