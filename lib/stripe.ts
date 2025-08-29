import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
  typescript: true,
})

export const getStripeJs = async () => {
  const { loadStripe } = await import('@stripe/stripe-js')
  
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set')
  }
  
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
}

// Pricing configuration that matches your pricing page
export const PRICING_PLANS = {
  starter: {
    name: 'Starter',
    price: 2900, // $29.00 in cents
    interval: 'month',
    features: [
      'Up to 5 active listings',
      'Basic matching algorithm',
      'Email notifications',
      'Standard support',
      'Access to marketplace'
    ]
  },
  professional: {
    name: 'Professional',
    price: 7900, // $79.00 in cents
    interval: 'month',
    popular: true,
    features: [
      'Unlimited listings',
      'Advanced AI matching',
      'Priority notifications',
      'Deal structure suggestions',
      'Analytics dashboard',
      'Priority support',
      'API access'
    ]
  },
  enterprise: {
    name: 'Enterprise',
    price: null, // Custom pricing
    interval: null,
    features: [
      'Everything in Professional',
      'Custom integrations',
      'Dedicated account manager',
      'Advanced analytics',
      'White-label options',
      'Custom deal structures',
      '24/7 phone support'
    ]
  }
} as const

export type PricingPlan = keyof typeof PRICING_PLANS