import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Valid email address required' },
        { status: 400 }
      )
    }

    // Log the email (in production, this would save to database)
    console.log('Early access signup:', {
      email,
      timestamp: new Date().toISOString(),
      source: 'landing_page_modal'
    })

    // TODO: In production, implement one of these:
    // 1. Save to Supabase:
    // const { data, error } = await supabase
    //   .from('early_access_signups')
    //   .insert([{ email, created_at: new Date() }])
    
    // 2. Send to email service (ConvertKit, Mailchimp, etc.)
    // await emailService.addSubscriber(email, 'early-access')

    // 3. Send to analytics/tracking
    // await analytics.track('Early Access Signup', { email })

    // Simulate brief processing time
    await new Promise(resolve => setTimeout(resolve, 300))

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully added to early access list' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Early access signup error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}