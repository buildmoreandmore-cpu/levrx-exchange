import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import Stripe from 'stripe'

export async function GET() {
  try {
    console.log('=== DEBUG CHECKOUT SESSION ===')
    
    // Step 1: Check environment variables
    const hasSecretKey = !!process.env.STRIPE_SECRET_KEY
    const hasPublicKey = !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    
    console.log('Environment check:', { hasSecretKey, hasPublicKey })
    
    if (!hasSecretKey) {
      return NextResponse.json({
        error: 'STRIPE_SECRET_KEY not found',
        debug: { hasSecretKey, hasPublicKey }
      })
    }
    
    // Step 2: Initialize Stripe
    let stripe: Stripe
    try {
      stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2025-08-27.basil',
        typescript: true,
      })
      console.log('✅ Stripe initialized successfully')
    } catch (error) {
      console.error('❌ Stripe initialization failed:', error)
      return NextResponse.json({
        error: 'Stripe initialization failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    }
    
    // Step 3: Test Stripe connectivity with a simple API call
    try {
      await stripe.products.list({ limit: 1 })
      console.log('✅ Stripe API connectivity verified')
    } catch (error) {
      console.error('❌ Stripe API connectivity failed:', error)
      return NextResponse.json({
        error: 'Stripe API connectivity failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    }
    
    // Step 4: Test checkout session creation with minimal parameters
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Test Product',
              },
              unit_amount: 2000, // $20.00
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: 'https://levrx-exchange.vercel.app/success',
        cancel_url: 'https://levrx-exchange.vercel.app/cancel',
      })
      
      console.log('✅ Test checkout session created:', session.id)
      
      return NextResponse.json({
        success: true,
        sessionId: session.id,
        sessionUrl: session.url,
        debug: {
          hasSecretKey,
          hasPublicKey,
          stripeInitialized: true,
          apiConnectivity: true,
          sessionCreated: true
        }
      })
      
    } catch (error) {
      console.error('❌ Checkout session creation failed:', error)
      
      // Detailed Stripe error handling
      if (error instanceof Stripe.errors.StripeError) {
        return NextResponse.json({
          error: 'Stripe checkout session creation failed',
          stripeError: {
            type: error.type,
            code: error.code,
            message: error.message,
            statusCode: error.statusCode,
          },
          debug: {
            hasSecretKey,
            hasPublicKey,
            stripeInitialized: true,
            apiConnectivity: true,
            sessionCreated: false
          }
        })
      }
      
      return NextResponse.json({
        error: 'Checkout session creation failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        debug: {
          hasSecretKey,
          hasPublicKey,
          stripeInitialized: true,
          apiConnectivity: true,
          sessionCreated: false
        }
      })
    }
    
  } catch (error) {
    console.error('❌ Debug endpoint error:', error)
    return NextResponse.json({
      error: 'Debug endpoint failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}