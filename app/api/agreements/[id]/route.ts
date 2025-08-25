import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const agreement = await prisma.agreementDraft.findFirst({
      where: {
        id: params.id,
        match: {
          OR: [
            { listingA: { userId } },
            { listingB: { userId } }
          ]
        }
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

    if (!agreement) {
      return NextResponse.json({ error: 'Agreement not found' }, { status: 404 })
    }

    return NextResponse.json(agreement)
    
  } catch (error) {
    console.error('Agreement fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch agreement' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, content, status } = await req.json()

    // Verify the agreement exists and the user can edit it
    const existingAgreement = await prisma.agreementDraft.findFirst({
      where: {
        id: params.id,
        createdById: userId
      }
    })

    if (!existingAgreement) {
      return NextResponse.json({ error: 'Agreement not found or not authorized' }, { status: 404 })
    }

    const updatedAgreement = await prisma.agreementDraft.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(status && { status })
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

    return NextResponse.json(updatedAgreement)
    
  } catch (error) {
    console.error('Agreement update error:', error)
    return NextResponse.json({ error: 'Failed to update agreement' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify the agreement exists and the user can delete it
    const existingAgreement = await prisma.agreementDraft.findFirst({
      where: {
        id: params.id,
        createdById: userId
      }
    })

    if (!existingAgreement) {
      return NextResponse.json({ error: 'Agreement not found or not authorized' }, { status: 404 })
    }

    await prisma.agreementDraft.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Agreement deleted successfully' })
    
  } catch (error) {
    console.error('Agreement delete error:', error)
    return NextResponse.json({ error: 'Failed to delete agreement' }, { status: 500 })
  }
}