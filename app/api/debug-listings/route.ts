import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🔍 Debug: Checking all listings for user:', user.id)

    // Get ALL listings for this user (ignore status filter)
    const allListings = await prisma.listing.findMany({
      where: { userId: user.id },
      include: {
        asset: true,
        want: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    console.log('🔍 Debug: Found listings:', allListings.length)

    // Also check user exists
    const userRecord = await prisma.user.findUnique({
      where: { id: user.id }
    })

    return NextResponse.json({
      debug: true,
      user: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        dbRecord: userRecord
      },
      listings: allListings,
      count: allListings.length,
      statuses: allListings.map(l => ({ id: l.id, status: l.status, mode: l.mode }))
    })

  } catch (error) {
    console.error('🔍 Debug error:', error)
    return NextResponse.json({
      error: 'Debug failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}