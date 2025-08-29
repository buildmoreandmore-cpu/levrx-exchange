import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  // Handle case where Stripe is not initialized
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  // Handle case where webhook secret is not set (development mode)
  if (!endpointSecret) {
    console.warn('STRIPE_WEBHOOK_SECRET is not set. Skipping signature verification.')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 400 })
  }

  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get('stripe-signature')

  let event: Stripe.Event

  try {
    if (!sig) {
      throw new Error('No signature found')
    }
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    console.log('✅ Webhook signature verified successfully')
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err)
    return NextResponse.json({ 
      error: 'Invalid signature',
      message: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 400 })
  }

  try {
    console.log(`🎣 Processing webhook event: ${event.type}`)
    
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        console.log('💳 Checkout session completed:', session.id)
        await handleSuccessfulPayment(session)
        break

      case 'customer.subscription.created':
        const newSubscription = event.data.object as Stripe.Subscription
        console.log('🆕 New subscription created:', newSubscription.id)
        await handleSubscriptionCreated(newSubscription)
        break

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object as Stripe.Subscription
        console.log('🔄 Subscription updated:', updatedSubscription.id)
        await handleSubscriptionUpdate(updatedSubscription)
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription
        console.log('❌ Subscription cancelled:', deletedSubscription.id)
        await handleSubscriptionCancellation(deletedSubscription)
        break

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice
        console.log('✅ Payment succeeded for invoice:', invoice.id)
        await handleSuccessfulPayment(invoice)
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice
        console.log('❌ Payment failed for invoice:', failedInvoice.id)
        await handleFailedPayment(failedInvoice)
        break

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`)
    }

    console.log('✅ Webhook processed successfully')
    return NextResponse.json({ received: true, eventType: event.type })
  } catch (error) {
    console.error('❌ Error processing webhook:', error)
    return NextResponse.json(
      { 
        error: 'Webhook processing failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session | Stripe.Invoice) {
  try {
    const userId = session.client_reference_id || session.metadata?.userId
    const planType = session.metadata?.plan
    const subscriptionId = session.subscription

    if (!userId) {
      console.error('❌ No user ID found in session metadata')
      return
    }

    console.log(`✅ Processing successful payment:`, {
      userId,
      planType,
      subscriptionId,
      amount: 'amount_total' in session ? session.amount_total : 'amount_paid' in session ? session.amount_paid : 'unknown'
    })

    // TODO: Update user subscription status in your database
    // This is where you'd typically:
    // 1. Update the user's subscription status in your database
    // 2. Set their plan type (starter, professional, etc.)
    // 3. Update any feature flags or permissions
    // 4. Send confirmation email
    
    // Example database update (replace with your actual database logic):
    // await db.user.update({
    //   where: { clerkId: userId },
    //   data: {
    //     subscriptionStatus: 'active',
    //     planType: planType,
    //     subscriptionId: subscriptionId,
    //     updatedAt: new Date(),
    //   },
    // })

    console.log('✅ Payment processing completed for user:', userId)

  } catch (error) {
    console.error('❌ Error handling successful payment:', error)
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.client_reference_id || subscription.metadata?.userId
    const customerId = subscription.customer

    if (!userId) {
      console.error('❌ No user ID found in subscription metadata')
      return
    }

    console.log(`🆕 Processing new subscription:`, {
      userId,
      subscriptionId: subscription.id,
      customerId,
      status: subscription.status,
      planName: subscription.items.data[0]?.price.nickname || 'Unknown'
    })

    // TODO: Update user subscription in database
    // await db.user.update({
    //   where: { clerkId: userId },
    //   data: {
    //     subscriptionId: subscription.id,
    //     customerId: customerId as string,
    //     subscriptionStatus: subscription.status,
    //     updatedAt: new Date(),
    //   },
    // })

  } catch (error) {
    console.error('❌ Error handling subscription creation:', error)
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.client_reference_id || subscription.metadata?.userId

    if (!userId) {
      console.error('No user ID found in subscription metadata')
      return
    }

    // TODO: Update subscription status in database
    console.log('Subscription updated for user:', userId)
    
  } catch (error) {
    console.error('Error handling subscription update:', error)
  }
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.client_reference_id || subscription.metadata?.userId

    if (!userId) {
      console.error('No user ID found in subscription metadata')
      return
    }

    // TODO: Update user subscription status to cancelled/inactive
    console.log('Subscription cancelled for user:', userId)
    
  } catch (error) {
    console.error('Error handling subscription cancellation:', error)
  }
}

async function handleFailedPayment(invoice: Stripe.Invoice) {
  try {
    const userId = invoice.client_reference_id || invoice.metadata?.userId

    if (!userId) {
      console.error('No user ID found in invoice metadata')
      return
    }

    // TODO: Handle failed payment
    // This might involve:
    // 1. Notifying the user
    // 2. Temporarily downgrading their account
    // 3. Setting up retry logic
    
    console.log('Payment failed for user:', userId)
    
  } catch (error) {
    console.error('Error handling failed payment:', error)
  }
}