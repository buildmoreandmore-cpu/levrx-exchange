import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

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

    // Test database connection
    console.log('🔍 TEST Step 3: Testing database connection')
    const dbTest = await prisma.$queryRaw`SELECT 1 as test`
    console.log('🔍 TEST Step 4: Database test result:', dbTest)

    // Test user table access
    console.log('🔍 TEST Step 5: Testing user table access')
    const userCount = await prisma.user.count()
    console.log('🔍 TEST Step 6: User count:', userCount)

    // Test if user exists in database
    const existingUser = await prisma.user.findUnique({
      where: { email: user.emailAddresses[0].emailAddress }
    })
    console.log('🔍 TEST Step 7: Existing user:', existingUser ? 'Found' : 'Not found')

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