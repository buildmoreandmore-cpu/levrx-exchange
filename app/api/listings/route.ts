import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  let kind: string = '', category: string = '', title: string = '', description: string = ''
  
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    console.log('Received listing data:', body)

    // Extract common fields
    const { 
      kind: rawKind, // HAVE or WANT
      category: rawCategory, // Cash, Paper, Stuff, Property
      title: rawTitle,
      description: rawDescription,
      notes,
      // Cash fields
      cashSource, amount, targetReturn, minTerm, maxTerm, geography,
      // Paper fields  
      paperType, upb, interestRate, term, paymentType, collateralDescription, acceptableTerms,
      // Stuff fields
      itemType, estimatedValue, condition, exchangePreferences,
      // Property fields
      packageType, propertyType, city, state, price, noiAnnual, currentDebt,
      sellerUrgency, sellerReasons, benefitsSought, benefitsToNewOwner, dealStructure, timeline
    } = body

    // Assign to outer scope variables for error handling
    kind = rawKind
    category = rawCategory
    title = rawTitle
    description = rawDescription

    // Add input validation for required fields
    if (!kind || !title || !description) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate "kind" field
    if (kind !== 'HAVE' && kind !== 'WANT') {
      return NextResponse.json(
        { error: "Invalid 'kind'. Must be HAVE or WANT." },
        { status: 400 }
      )
    }

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

    // Map frontend categories to database enums
    const mapCategoryToAssetType = (category: string) => {
      switch (category) {
        case 'Cash': return 'CASHFLOW'
        case 'Paper': return 'CREDIT'
        case 'Property': return 'EQUITY'
        case 'Stuff': return 'EQUIPMENT'
        default: return 'OTHER'
      }
    }

    const mapCategoryToWantCategory = (category: string) => {
      switch (category) {
        case 'Cash': return 'CASH'
        case 'Paper': return 'OTHER'
        case 'Property': return 'BUYER'
        case 'Stuff': return 'EQUIPMENT'
        default: return 'OTHER'
      }
    }

    // Add request logging before saving
    console.log("Incoming listing data:", { kind, category, title, description });

    // Prepare structured data based on category
    const structuredData = {
      category,
      ...(category === 'Cash' && {
        cashSource, amount, targetReturn, minTerm, maxTerm, geography
      }),
      ...(category === 'Paper' && {
        paperType, upb, interestRate, term, paymentType, collateralDescription, acceptableTerms
      }),
      ...(category === 'Stuff' && {
        itemType, estimatedValue, condition, exchangePreferences  
      }),
      ...(category === 'Property' && {
        packageType, propertyType, city, state, price, noiAnnual, currentDebt,
        sellerUrgency, sellerReasons, benefitsSought, benefitsToNewOwner, dealStructure, timeline
      }),
      ...(notes && { notes })
    }

    // Wrap Prisma calls in try/catch for better error handling
    try {
      // Create asset or want based on kind
      if (kind === 'HAVE') {
        const asset = await prisma.asset.create({
          data: {
            userId: user.id,
            type: mapCategoryToAssetType(category),
            title,
            description,
            estValueNumeric: amount || estimatedValue || price || upb || null,
            terms: structuredData,
          },
        })
        assetId = asset.id
      } else {
        const want = await prisma.want.create({
          data: {
            userId: user.id,
            category: mapCategoryToWantCategory(category),
            title,
            description,
            targetValueNumeric: amount || estimatedValue || price || upb || null,
            constraints: structuredData,
          },
        })
        wantId = want.id
      }

      // Create listing
      const listing = await prisma.listing.create({
        data: {
          userId: user.id,
          mode: kind, // Use kind as mode (HAVE/WANT)
          assetId,
          wantId,
          status: 'ACTIVE',
          // vectorEmbedding would be set here if we had embeddings
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
      })

      console.log('Successfully created listing:', listing.id)
      return NextResponse.json({ success: true, listing })
    } catch (error: any) {
      console.error("❌ Error creating listing:", error);
      return NextResponse.json(
        { success: false, message: "Failed to create listing", error: error.message, stack: error.stack },
        { status: 500 }
      )
    }

  } catch (error) {
    // Enhanced logging for debugging
    console.error('❌ FULL ERROR DETAILS:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      requestBody: { kind, category, title, description },
      timestamp: new Date().toISOString(),
      errorType: error instanceof Error ? error.constructor.name : typeof error
    })
    
    // Test database connection in catch block
    try {
      await prisma.$queryRaw`SELECT 1`
      console.log('✅ Database connection is working in catch block')
    } catch (dbError) {
      console.error('❌ Database connection failed in catch:', {
        message: dbError instanceof Error ? dbError.message : 'Unknown DB error',
        stack: dbError instanceof Error ? dbError.stack : 'No DB stack trace'
      })
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
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