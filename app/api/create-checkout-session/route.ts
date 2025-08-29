import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { stripe, PRICING_PLANS, PricingPlan } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  let plan: string | undefined
  let userId: string | null | undefined
  
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    }
    
    const authResult = await auth()
    userId = authResult.userId
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    plan = body.plan
    
    if (!plan || !(plan in PRICING_PLANS)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const planDetails = PRICING_PLANS[plan as PricingPlan]
    
    // Enterprise plans should use contact sales flow
    if (plan === 'enterprise') {
      return NextResponse.json({ error: 'Enterprise plans require custom setup' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `LevrX ${planDetails.name} Plan`,
              description: `Monthly subscription to LevrX ${planDetails.name} plan`,
            },
            unit_amount: planDetails.price!,
            recurring: {
              interval: planDetails.interval as 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://localhost:3000'}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://localhost:3000'}/pricing?canceled=true`,
      metadata: {
        userId,
        plan,
      },
      client_reference_id: userId,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      plan,
      userId: userId || 'No user ID'
    })
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}