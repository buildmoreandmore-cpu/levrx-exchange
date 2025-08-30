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

    // Test creating a simple product to verify API connectivity
    const product = await stripe.products.create({
      name: 'Test Product',
      description: 'Test product for API connectivity',
    })

    // Clean up - delete the test product
    await stripe.products.del(product.id)

    return NextResponse.json({ 
      success: true,
      message: 'Stripe API working correctly',
      product_test: 'Created and deleted test product successfully'
    })

  } catch (error) {
    console.error('Stripe test error:', error)
    return NextResponse.json({
      error: 'Stripe test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}