import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { anthropic, buildMatchRationalePrompt, buildDealStructuresPrompt } from '@/lib/anthropic'

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
      take: 10,
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
        let ruleScore = 0.5 // Base score

        // Category matching
        if (listing.mode === 'HAVE' && potentialMatch.mode === 'WANT') {
          const assetType = listing.asset?.type
          const wantCategory = potentialMatch.want?.category
          
          if (
            (assetType === 'EQUITY' && wantCategory === 'PARTNER') ||
            (assetType === 'CASHFLOW' && wantCategory === 'CASH') ||
            (assetType === 'EQUIPMENT' && wantCategory === 'EQUIPMENT') ||
            (assetType === 'CREDIT' && wantCategory === 'CASH') ||
            (assetType === 'SKILL' && wantCategory === 'PARTNER')
          ) {
            ruleScore += 0.3
          }
        }

        // For MVP, use rule-based score (in production, would include embeddings)
        const score = Math.min(ruleScore, 1.0)

        if (score > 0.6) { // Only create matches above threshold
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