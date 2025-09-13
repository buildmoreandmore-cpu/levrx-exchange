import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let prismaClient: PrismaClient | null = null
  
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Create fresh Prisma client
    prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: "postgresql://postgres.utryyaxfodtpdlhssjlv:howyykAe9mU820op@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
        }
      }
    })

    const listing = await prismaClient.listing.findUnique({
      where: { id: params.id },
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
    })

    if (!listing) {
      await prismaClient.$disconnect()
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    await prismaClient.$disconnect()
    return NextResponse.json(listing)
  } catch (error) {
    console.error('Error fetching listing:', error)
    if (prismaClient) await prismaClient.$disconnect()
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  let prismaClient: PrismaClient | null = null
  
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const listingId = params.id
    
    if (!listingId) {
      return NextResponse.json({ error: 'Listing ID is required' }, { status: 400 })
    }

    // Create fresh Prisma client
    prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: "postgresql://postgres.utryyaxfodtpdlhssjlv:howyykAe9mU820op@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
        }
      }
    })

    // First verify the listing exists and belongs to the user
    const listing = await prismaClient.listing.findUnique({
      where: { id: listingId },
      include: { user: true }
    })

    if (!listing) {
      await prismaClient.$disconnect()
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    if (listing.userId !== user.id) {
      await prismaClient.$disconnect()
      return NextResponse.json({ error: 'You can only delete your own listings' }, { status: 403 })
    }

    // Delete the listing and associated asset/want
    if (listing.assetId) {
      await prismaClient.asset.delete({ where: { id: listing.assetId } })
    }
    if (listing.wantId) {
      await prismaClient.want.delete({ where: { id: listing.wantId } })
    }
    
    await prismaClient.listing.delete({ where: { id: listingId } })
    
    await prismaClient.$disconnect()
    return NextResponse.json({ success: true, message: 'Listing deleted successfully' })
    
  } catch (error) {
    console.error('Error deleting listing:', error)
    if (prismaClient) await prismaClient.$disconnect()
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}