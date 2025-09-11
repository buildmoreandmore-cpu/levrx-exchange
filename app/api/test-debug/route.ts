import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 TEST Step 1: Starting test request')
    
    // Test Clerk authentication
    const user = await currentUser()
    console.log('🔍 TEST Step 2: Clerk user:', user ? `Found user ${user.id}` : 'No user')
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'No user authenticated',
        step: 'authentication'
      })
    }

    // Test database connection with direct URL (no newlines)
    console.log('🔍 TEST Step 3: Testing database connection with clean URL')
    const cleanDatabaseUrl = "postgresql://postgres:howyykAe9mU820op@db.utryyaxfodtpdlhssjlv.supabase.co:5432/postgres"
    
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: cleanDatabaseUrl
        }
      }
    })

    console.log('🔍 TEST Step 4: Created Prisma client with clean URL')
    const dbTest = await prisma.$queryRaw`SELECT 1 as test`
    console.log('🔍 TEST Step 5: Database test result:', dbTest)

    // Test user table access
    console.log('🔍 TEST Step 6: Testing user table access')
    const userCount = await prisma.user.count()
    console.log('🔍 TEST Step 7: User count:', userCount)

    // Test if user exists in database
    const existingUser = await prisma.user.findUnique({
      where: { email: user.emailAddresses[0].emailAddress }
    })
    console.log('🔍 TEST Step 8: Existing user:', existingUser ? 'Found' : 'Not found')
    
    await prisma.$disconnect()

    return NextResponse.json({
      success: true,
      data: {
        userId: user.id,
        userEmail: user.emailAddresses[0].emailAddress,
        userName: `${user.firstName} ${user.lastName}`.trim(),
        databaseConnected: true,
        userTableAccessible: true,
        userCount,
        existingUser: !!existingUser
      }
    })

  } catch (error: any) {
    console.error('🔍 TEST ERROR:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
      step: 'unknown'
    }, { status: 500 })
  }
}