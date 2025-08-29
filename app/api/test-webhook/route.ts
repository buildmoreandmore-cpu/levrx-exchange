import { NextRequest, NextResponse } from 'next/server'

// Test endpoint to simulate webhook events (for development testing)
export async function POST(req: NextRequest) {
  try {
    const { eventType = 'checkout.session.completed' } = await req.json()

    // Simulate webhook payload
    const testEvent = {
      type: eventType,
      data: {
        object: {
          id: 'cs_test_123',
          client_reference_id: 'user_test_123',
          metadata: {
            plan: 'starter',
            userId: 'user_test_123'
          },
          subscription: 'sub_test_123',
          amount_total: 2900 // $29.00
        }
      }
    }

    console.log('🧪 Testing webhook event:', testEvent)

    // Forward to actual webhook handler
    const webhookResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/stripe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': 'test_signature' // This will fail signature verification, but shows the flow
      },
      body: JSON.stringify(testEvent)
    })

    const result = await webhookResponse.text()

    return NextResponse.json({
      message: 'Test webhook sent',
      eventType,
      webhookResponse: {
        status: webhookResponse.status,
        body: result
      }
    })

  } catch (error) {
    console.error('❌ Error testing webhook:', error)
    return NextResponse.json(
      { error: 'Test webhook failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Webhook test endpoint',
    usage: 'POST to this endpoint with { "eventType": "checkout.session.completed" }',
    availableEvents: [
      'checkout.session.completed',
      'customer.subscription.created',
      'customer.subscription.updated',
      'customer.subscription.deleted',
      'invoice.payment_succeeded',
      'invoice.payment_failed'
    ]
  })
}