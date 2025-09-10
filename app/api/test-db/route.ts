import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Simple database connection test
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('Database connection test successful:', result)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected successfully',
      result 
    })
  } catch (error) {
    console.error('Database connection test failed:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}