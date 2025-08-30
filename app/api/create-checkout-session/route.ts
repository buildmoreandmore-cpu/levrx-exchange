import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import Stripe from 'stripe'

// Initialize Stripe with proper configuration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
})

// Pricing plans configuration
const PRICING_PLANS = {
  starter: {
    name: 'Starter',
    price: 2900, // $29.00 in cents
  },
  professional: {
    name: 'Professional', 
    price: 7900, // $79.00 in cents
  }
} as const

type PricingPlan = keyof typeof PRICING_PLANS

// Handle non-POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  )
}

export async function POST(req: NextRequest) {
  try {
    // Validate Stripe configuration
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Missing STRIPE_SECRET_KEY environment variable')
      return NextResponse.json(
        { error: 'Payment system not configured' },
        { status: 500 }
      )
    }
    
    // Check user authentication
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Parse and validate request body
    let body
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    const { plan } = body
    if (!plan || typeof plan !== 'string') {
      return NextResponse.json(
        { error: 'Plan is required and must be a string' },
        { status: 400 }
      )
    }

    if (!(plan in PRICING_PLANS)) {
      return NextResponse.json(
        { error: `Invalid plan. Must be one of: ${Object.keys(PRICING_PLANS).join(', ')}` },
        { status: 400 }
      )
    }

    const planDetails = PRICING_PLANS[plan as PricingPlan]

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `LevrX ${planDetails.name} Plan`,
              description: `Monthly subscription to LevrX ${planDetails.name}`,
            },
            unit_amount: planDetails.price,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `https://levrx-exchange.vercel.app/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://levrx-exchange.vercel.app/pricing?canceled=true`,
      client_reference_id: userId,
      customer_creation: 'always',
      metadata: {
        userId,
        plan,
      },
      subscription_data: {
        metadata: {
          userId,
          plan,
        },
      },
    })

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    })

  } catch (error) {
    console.error('Stripe checkout session creation failed:', error)
    
    // Handle specific Stripe errors
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Payment system error: ${error.message}` },
        { status: 400 }
      )
    }

    // Handle general errors
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}