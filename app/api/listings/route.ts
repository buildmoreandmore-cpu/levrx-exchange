import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { anthropic } from '@/lib/anthropic'

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { mode, title, description, type, category, estValue, targetValue, terms, constraints } = body

    // Create user if doesn't exist
    await prisma.user.upsert({
      where: { email: user.emailAddresses[0].emailAddress },
      update: { name: `${user.firstName} ${user.lastName}`.trim() || null },
      create: {
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`.trim() || null,
      },
    })

    let assetId = null
    let wantId = null

    // Create asset or want based on mode
    if (mode === 'HAVE') {
      const asset = await prisma.asset.create({
        data: {
          userId: user.id,
          type,
          title,
          description,
          estValueNumeric: estValue,
          terms: terms ? { text: terms } : null,
        },
      })
      assetId = asset.id
    } else {
      const want = await prisma.want.create({
        data: {
          userId: user.id,
          category,
          title,
          description,
          targetValueNumeric: targetValue,
          constraints: constraints ? { text: constraints } : null,
        },
      })
      wantId = want.id
    }

    // Generate embedding for the listing
    const embeddingText = `${title} ${description} ${terms || constraints || ''}`
    
    let vectorEmbedding = null
    try {
      // Note: For MVP, we'll skip embeddings since they require a different API
      // In production, you'd use a service like OpenAI embeddings or similar
      console.log('Skipping embedding generation for MVP')
    } catch (error) {
      console.error('Error generating embedding:', error)
    }

    // Create listing
    const listing = await prisma.listing.create({
      data: {
        userId: user.id,
        mode,
        assetId,
        wantId,
        status: 'ACTIVE',
        // vectorEmbedding would be set here if we had embeddings
      },
      include: {
        asset: true,
        want: true,
        user: true,
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.error('Error creating listing:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode')
    const search = searchParams.get('search')

    const where: any = {
      status: 'ACTIVE',
    }

    if (mode) {
      where.mode = mode
    }

    if (search) {
      where.OR = [
        { asset: { title: { contains: search, mode: 'insensitive' } } },
        { asset: { description: { contains: search, mode: 'insensitive' } } },
        { want: { title: { contains: search, mode: 'insensitive' } } },
        { want: { description: { contains: search, mode: 'insensitive' } } },
      ]
    }

    const listings = await prisma.listing.findMany({
      where,
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
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    })

    return NextResponse.json(listings)
  } catch (error) {
    console.error('Error fetching listings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}