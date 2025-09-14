import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }


    const listing = await prisma.listing.findUnique({
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
            return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

        return NextResponse.json(listing)
  } catch (error) {
    console.error('Error fetching listing:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.json()
    const listingId = params.id

    if (!listingId) {
      return NextResponse.json({ error: 'Listing ID is required' }, { status: 400 })
    }


    // First verify the listing exists and belongs to the user
    const existingListing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { asset: true, want: true, user: true }
    })

    if (!existingListing) {
            return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    if (existingListing.userId !== user.id) {
            return NextResponse.json({ error: 'You can only edit your own listings' }, { status: 403 })
    }

    // Prepare update data based on listing mode
    const isHave = formData.kind === 'HAVE'
    const item = isHave ? existingListing.asset : existingListing.want

    if (isHave && existingListing.asset) {
      // Update asset
      await prisma.asset.update({
        where: { id: existingListing.asset.id },
        data: {
          title: formData.title,
          description: formData.description,
          type: formData.category,
          estValueNumeric: formData.price,
          terms: {
            packageType: formData.packageType,
            propertyType: formData.propertyType,
            city: formData.city,
            state: formData.state,
            noiAnnual: formData.noiAnnual,
            currentDebt: formData.currentDebt,
            sellerUrgency: formData.sellerUrgency,
            sellerReasons: formData.sellerReasons,
            benefitsSought: formData.benefitsSought,
            benefitsToNewOwner: formData.benefitsToNewOwner,
            dealStructure: formData.dealStructure,
            timeline: formData.timeline,
            notes: formData.notes,
          }
        }
      })
    } else if (!isHave && existingListing.want) {
      // Update want
      await prisma.want.update({
        where: { id: existingListing.want.id },
        data: {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          targetValueNumeric: formData.price,
          constraints: {
            packageType: formData.packageType,
            propertyType: formData.propertyType,
            city: formData.city,
            state: formData.state,
            noiAnnual: formData.noiAnnual,
            currentDebt: formData.currentDebt,
            sellerUrgency: formData.sellerUrgency,
            sellerReasons: formData.sellerReasons,
            benefitsSought: formData.benefitsSought,
            benefitsToNewOwner: formData.benefitsToNewOwner,
            dealStructure: formData.dealStructure,
            timeline: formData.timeline,
            notes: formData.notes,
          }
        }
      })
    }

    // Update listing mode if changed
    if (existingListing.mode !== formData.kind) {
      await prisma.listing.update({
        where: { id: listingId },
        data: { mode: formData.kind }
      })
    }

    // Fetch and return updated listing
    const updatedListing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: {
        asset: true,
        want: true,
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    })

        return NextResponse.json({ success: true, listing: updatedListing })

  } catch (error) {
    console.error('Error updating listing:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const listingId = params.id
    
    if (!listingId) {
      return NextResponse.json({ error: 'Listing ID is required' }, { status: 400 })
    }


    // First verify the listing exists and belongs to the user
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true }
    })

    if (!listing) {
            return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    if (listing.userId !== user.id) {
            return NextResponse.json({ error: 'You can only delete your own listings' }, { status: 403 })
    }

    console.log(`🗑️ DELETE: Starting deletion process for listing ${listingId}`)
    console.log(`🗑️ DELETE: Listing has assetId: ${listing.assetId}, wantId: ${listing.wantId}`)

    // Delete the listing first, then associated asset/want (in case of foreign key constraints)
    try {
      await prisma.listing.delete({ where: { id: listingId } })
      console.log(`🗑️ DELETE: Successfully deleted listing ${listingId}`)
      
      // Then delete associated records
      if (listing.assetId) {
        await prisma.asset.delete({ where: { id: listing.assetId } })
        console.log(`🗑️ DELETE: Successfully deleted asset ${listing.assetId}`)
      }
      if (listing.wantId) {
        await prisma.want.delete({ where: { id: listing.wantId } })
        console.log(`🗑️ DELETE: Successfully deleted want ${listing.wantId}`)
      }
    } catch (deleteError) {
      console.error(`🗑️ DELETE ERROR: Failed to delete records:`, deleteError)
      throw deleteError
    }
    
        return NextResponse.json({ success: true, message: 'Listing deleted successfully' })
    
  } catch (error) {
    console.error('Error deleting listing:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}