import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
})

export async function GET() {
  try {
    // Check user authentication
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Find customer by client_reference_id (userId)
    const customers = await stripe.customers.list({
      limit: 1,
      // Note: Stripe doesn't allow searching by metadata directly in the list API
      // We'll need to search through recent customers or store the customer ID
    })

    let customer = null
    let subscription = null
    let paymentMethods: Stripe.PaymentMethod[] = []
    let invoices: Stripe.Invoice[] = []
    let charges: Stripe.Charge[] = []
    let upcomingInvoice: Stripe.Invoice | null = null

    // Try to find customer by searching through recent customers
    const allCustomers = await stripe.customers.list({ limit: 100 })
    
    for (const cust of allCustomers.data) {
      // Check if this customer has our user ID in metadata or client_reference_id
      if (cust.metadata?.userId === userId) {
        customer = cust
        break
      }
    }

    if (customer) {
      // Get active subscriptions
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'active',
        limit: 1,
      })

      if (subscriptions.data.length > 0) {
        subscription = subscriptions.data[0]
      }

      // Get payment methods
      const paymentMethodsList = await stripe.paymentMethods.list({
        customer: customer.id,
        type: 'card',
      })
      paymentMethods = paymentMethodsList.data

      // Get recent invoices
      const invoicesList = await stripe.invoices.list({
        customer: customer.id,
        limit: 10,
      })
      invoices = invoicesList.data

      // Get recent charges (payment history)
      const chargesList = await stripe.charges.list({
        customer: customer.id,
        limit: 10,
      })
      charges = chargesList.data

      // Note: Upcoming invoice retrieval temporarily disabled due to API method changes
      // if (subscription && subscription.status === 'active') {
      //   try {
      //     upcomingInvoice = await stripe.invoices.upcoming({
      //       customer: customer.id,
      //     })
      //   } catch (e) {
      //     console.log('No upcoming invoice found')
      //   }
      // }
    }

    return NextResponse.json({
      customer: customer ? {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
      } : null,
      subscription: subscription ? {
        id: subscription.id,
        status: subscription.status,
        current_period_start: (subscription as any).current_period_start,
        current_period_end: (subscription as any).current_period_end,
        cancel_at_period_end: (subscription as any).cancel_at_period_end,
        canceled_at: (subscription as any).canceled_at,
        created: subscription.created,
        trial_start: (subscription as any).trial_start,
        trial_end: (subscription as any).trial_end,
        latest_invoice: (subscription as any).latest_invoice,
        collection_method: (subscription as any).collection_method,
        plan: {
          id: subscription.items.data[0]?.price.id,
          amount: subscription.items.data[0]?.price.unit_amount,
          currency: subscription.items.data[0]?.price.currency,
          interval: subscription.items.data[0]?.price.recurring?.interval,
          interval_count: subscription.items.data[0]?.price.recurring?.interval_count,
          product: subscription.items.data[0]?.price.product,
        },
      } : null,
      paymentMethods: paymentMethods.map(pm => ({
        id: pm.id,
        type: pm.type,
        created: pm.created,
        card: pm.card ? {
          brand: pm.card.brand,
          last4: pm.card.last4,
          exp_month: pm.card.exp_month,
          exp_year: pm.card.exp_year,
          funding: pm.card.funding,
          country: pm.card.country,
          fingerprint: pm.card.fingerprint,
        } : null,
      })),
      invoices: invoices.map(invoice => ({
        id: invoice.id,
        amount_paid: invoice.amount_paid,
        amount_due: invoice.amount_due,
        amount_total: invoice.amount_due, // Using amount_due as fallback
        currency: invoice.currency,
        status: invoice.status,
        created: invoice.created,
        period_start: invoice.period_start,
        period_end: invoice.period_end,
        invoice_pdf: invoice.invoice_pdf,
        hosted_invoice_url: invoice.hosted_invoice_url,
        number: invoice.number,
        description: invoice.description,
        subtotal: invoice.subtotal,
        tax: null, // Tax info not available in basic invoice
        total: invoice.total,
      })),
      charges: charges.map(charge => ({
        id: charge.id,
        amount: charge.amount,
        currency: charge.currency,
        status: charge.status,
        created: charge.created,
        description: charge.description,
        receipt_url: charge.receipt_url,
        payment_method_details: charge.payment_method_details ? {
          type: charge.payment_method_details.type,
          card: charge.payment_method_details.card ? {
            brand: charge.payment_method_details.card.brand,
            last4: charge.payment_method_details.card.last4,
            funding: charge.payment_method_details.card.funding,
          } : null,
        } : null,
        outcome: charge.outcome ? {
          network_status: charge.outcome.network_status,
          reason: charge.outcome.reason,
          risk_level: charge.outcome.risk_level,
          seller_message: charge.outcome.seller_message,
          type: charge.outcome.type,
        } : null,
      })),
      upcomingInvoice: null, // Temporarily disabled
    })

  } catch (error) {
    console.error('Account info fetch error:', error)
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Stripe error: ${error.message}` },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to fetch account information' },
      { status: 500 }
    )
  }
}