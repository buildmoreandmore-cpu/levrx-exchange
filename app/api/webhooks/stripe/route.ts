import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'

// Validate environment variables at module load time
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

if (!STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required')
}

if (!STRIPE_WEBHOOK_SECRET) {
  throw new Error('STRIPE_WEBHOOK_SECRET environment variable is required')
}

// Initialize Stripe instance with correct API version
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil', // Use a stable, well-supported API version
  typescript: true,
})

export async function POST(req: NextRequest) {
  try {
    // Get raw body text for signature verification
    const body = await req.text()
    
    // Get Stripe signature from headers
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      console.error('❌ Missing stripe-signature header')
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    // Verify webhook signature and construct event
    let event: Stripe.Event
    try {
      // stripe is guaranteed to be non-null here due to early validation
      event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET!)
      console.log('✅ Webhook signature verified:', event.type)
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log('💰 Payment completed for session:', session.id)
        
        // Update customer metadata with userId for easier lookup
        if (session.customer && session.client_reference_id) {
          try {
            await stripe.customers.update(session.customer as string, {
              metadata: {
                userId: session.client_reference_id,
                source: 'levrx_checkout'
              }
            })
            console.log('✅ Customer metadata updated for user:', session.client_reference_id)
          } catch (error) {
            console.error('❌ Failed to update customer metadata:', error)
          }
        }
        
        break
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        console.log('🆕 New subscription created:', subscription.id)
        
        // Ensure customer has userId metadata
        if (subscription.customer && subscription.metadata?.userId) {
          try {
            await stripe.customers.update(subscription.customer as string, {
              metadata: {
                userId: subscription.metadata.userId,
                source: 'levrx_subscription'
              }
            })
            console.log('✅ Customer metadata updated from subscription for user:', subscription.metadata.userId)
          } catch (error) {
            console.error('❌ Failed to update customer metadata from subscription:', error)
          }
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        console.log('🔄 Subscription updated:', subscription.id)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        console.log('❌ Subscription cancelled:', subscription.id)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        console.log('💳 Payment succeeded for invoice:', invoice.id)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        console.log('❌ Payment failed for invoice:', invoice.id)
        break
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('❌ Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}