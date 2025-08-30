import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET() {
  try {
    // Test basic Stripe connectivity
    if (!stripe) {
      return NextResponse.json({ 
        error: 'Stripe not initialized',
        env_check: {
          secret_key: !!process.env.STRIPE_SECRET_KEY,
          public_key: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        }
      }, { status: 500 })
    }

    // Test creating a checkout session with the same parameters
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Test Product',
              description: 'Test subscription',
            },
            unit_amount: 2900,
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
    })

    return NextResponse.json({ 
      success: true,
      message: 'Stripe checkout session created successfully',
      session_id: session.id,
      session_url: session.url
    })

  } catch (error) {
    console.error('Stripe test error:', error)
    return NextResponse.json({
      error: 'Stripe test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    }, { status: 500 })
  }
}