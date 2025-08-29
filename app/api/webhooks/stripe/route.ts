import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'

// Initialize Stripe with proper error handling - never allow null
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
  typescript: true,
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  // Verify webhook secret is configured
  if (!endpointSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  try {
    // Get the raw body as text (required for signature verification)
    const body = await req.text()
    
    // Get the Stripe signature from headers
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      console.error('Missing stripe-signature header')
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    // Verify the webhook signature and construct the event
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
      console.log('✅ Webhook signature verified:', event.type)
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log('💰 Payment successful:', session.id)
        
        // TODO: Handle successful payment
        // - Update user subscription status
        // - Send confirmation email
        // - Log the transaction
        
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        console.log('🔄 Subscription updated:', subscription.id)
        
        // TODO: Handle subscription changes
        // - Update user subscription status in database
        // - Handle plan changes, cancellations, etc.
        
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        console.log('❌ Subscription cancelled:', subscription.id)
        
        // TODO: Handle subscription cancellation
        // - Update user access level
        // - Send cancellation email
        
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        console.log('💳 Invoice payment succeeded:', invoice.id)
        
        // TODO: Handle successful recurring payment
        // - Extend subscription period
        // - Send receipt
        
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        console.log('❌ Invoice payment failed:', invoice.id)
        
        // TODO: Handle failed payment
        // - Notify user of failed payment
        // - Implement retry logic
        
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    // Return success response
    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('❌ Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}