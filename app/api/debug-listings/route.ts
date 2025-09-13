import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: "postgresql://postgres.utryyaxfodtpdlhssjlv:howyykAe9mU820op@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
        }
      }
    })

    // Get current user info
    const currentUserInfo = {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName
    }

    // Get all users in database
    const allUsersInDb = await prismaClient.user.findMany({
      select: { id: true, email: true, name: true }
    })

    // Get all listings in database
    const allListings = await prismaClient.listing.findMany({
      include: {
        user: { select: { id: true, email: true, name: true } },
        asset: { select: { id: true, title: true } },
        want: { select: { id: true, title: true } }
      }
    })

    // Get listings for current user
    const userListings = await prismaClient.listing.findMany({
      where: { userId: user.id },
      include: {
        user: { select: { id: true, email: true, name: true } },
        asset: { select: { id: true, title: true } },
        want: { select: { id: true, title: true } }
      }
    })

    // Get active listings count for current user
    const activeListingsCount = await prismaClient.listing.count({
      where: {
        userId: user.id,
        status: 'ACTIVE'
      }
    })

    await prismaClient.$disconnect()

    return NextResponse.json({
      success: true,
      debug: {
        currentUser: currentUserInfo,
        allUsersInDb: allUsersInDb,
        allListings: allListings,
        userListings: userListings,
        activeListingsCount: activeListingsCount,
        totalListingsInDb: allListings.length,
        totalUsersInDb: allUsersInDb.length
      }
    })

  } catch (error) {
    console.error('Debug API Error:', error)
    return NextResponse.json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}