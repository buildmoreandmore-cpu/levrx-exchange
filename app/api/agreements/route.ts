import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { anthropic, buildAgreementDraftPrompt } from '@/lib/anthropic'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { matchId, title, structureChoice, parties, keyTerms } = await req.json()
    
    if (!matchId || !title || !structureChoice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify the match exists and the user is part of it
    const match = await prisma.match.findFirst({
      where: {
        id: matchId,
        OR: [
          { listingA: { userId } },
          { listingB: { userId } }
        ]
      },
      include: {
        listingA: { include: { user: true } },
        listingB: { include: { user: true } }
      }
    })

    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 })
    }

    // Generate agreement content using Anthropic
    const prompt = buildAgreementDraftPrompt(structureChoice, parties, keyTerms)
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    })

    const content = (response.content[0] as any)?.text || 'Agreement content generation failed'

    // Save the agreement draft
    const agreement = await prisma.agreementDraft.create({
      data: {
        matchId,
        title,
        content,
        createdById: userId,
        status: 'DRAFT'
      },
      include: {
        match: {
          include: {
            listingA: { include: { user: true, asset: true, want: true } },
            listingB: { include: { user: true, asset: true, want: true } }
          }
        },
        createdBy: true
      }
    })

    return NextResponse.json(agreement)
    
  } catch (error) {
    console.error('Agreement creation error:', error)
    return NextResponse.json({ error: 'Failed to create agreement' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const matchId = searchParams.get('matchId')

    let whereClause: any = {
      match: {
        OR: [
          { listingA: { userId } },
          { listingB: { userId } }
        ]
      }
    }

    if (matchId) {
      whereClause.matchId = matchId
    }

    const agreements = await prisma.agreementDraft.findMany({
      where: whereClause,
      include: {
        match: {
          include: {
            listingA: { include: { user: true, asset: true, want: true } },
            listingB: { include: { user: true, asset: true, want: true } }
          }
        },
        createdBy: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(agreements)
    
  } catch (error) {
    console.error('Agreement fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch agreements' }, { status: 500 })
  }
}