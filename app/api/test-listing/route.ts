import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function GET() {
  return NextResponse.json({
    message: 'Test listing endpoint is working. Use POST method to run the full test.',
    endpoint: '/api/test-listing',
    method: 'POST'
  })
}

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 TEST LISTING: Starting test listing creation')
    
    // Test authentication
    const user = await currentUser()
    console.log('🧪 TEST LISTING: User check:', user ? `Found user ${user.id}` : 'No user')
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'No user authenticated',
        step: 'authentication'
      })
    }

    // Test request parsing
    const body = await request.json()
    console.log('🧪 TEST LISTING: Request body:', body)

    // Test database connection with Transaction Pooler
    const poolerDatabaseUrl = "postgresql://postgres.utryyaxfodtpdlhssjlv:howyykAe9mU820op@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
    
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: poolerDatabaseUrl
        }
      }
    })

    console.log('🧪 TEST LISTING: Created Prisma client')

    // Test user upsert (this is often where issues occur)
    console.log('🧪 TEST LISTING: Testing user upsert...')
    const testUser = await prisma.user.upsert({
      where: { email: user.emailAddresses[0].emailAddress },
      update: { name: `${user.firstName} ${user.lastName}`.trim() || null },
      create: {
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`.trim() || null,
      },
    })
    console.log('🧪 TEST LISTING: User upsert successful:', testUser.id)

    // Test simple asset creation
    console.log('🧪 TEST LISTING: Testing asset creation...')
    const testAsset = await prisma.asset.create({
      data: {
        userId: user.id,
        type: 'CASHFLOW',
        title: 'Test Asset',
        description: 'Test Description',
        estValueNumeric: 10000,
        terms: { category: 'Cash' },
      },
    })
    console.log('🧪 TEST LISTING: Asset creation successful:', testAsset.id)

    // Test listing creation
    console.log('🧪 TEST LISTING: Testing listing creation...')
    const testListing = await prisma.listing.create({
      data: {
        userId: user.id,
        mode: 'HAVE',
        assetId: testAsset.id,
        status: 'ACTIVE',
      },
      include: {
        asset: true,
        user: true,
      },
    })
    console.log('🧪 TEST LISTING: Listing creation successful:', testListing.id)

    await prisma.$disconnect()

    return NextResponse.json({
      success: true,
      message: 'Test listing creation completed successfully!',
      data: {
        userId: user.id,
        assetId: testAsset.id,
        listingId: testListing.id
      }
    })

  } catch (error: any) {
    console.error('🧪 TEST LISTING ERROR:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
      step: 'unknown'
    }, { status: 500 })
  }
}