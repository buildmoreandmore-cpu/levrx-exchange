'use client'

import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import CheckoutButton from '@/components/pricing/CheckoutButton'
import AppHeader from '@/components/ui/AppHeader'

interface Plan {
  name: string
  price: string
  trialText?: string
  originalPrice?: string
  period: string
  description: string
  features: string[]
  popular: boolean
  cta: string
}

export default function PricingPage() {
  const { user, isSignedIn } = useUser()

  const plans: Plan[] = [
    {
      name: 'Starter',
      price: 'Free',
      trialText: 'for 7 days',
      originalPrice: '$29',
      period: '/month',
      description: 'Perfect for individual investors getting started',
      features: [
        'Up to 5 active listings',
        'Basic matching algorithm',
        'Email notifications',
        'Standard support',
        'Access to marketplace'
      ],
      popular: false,
      cta: 'Get Started'
    },
    {
      name: 'Professional',
      price: 'Free',
      trialText: 'for 7 days', 
      originalPrice: '$79',
      period: '/month',
      description: 'Ideal for active investors and small teams',
      features: [
        'Unlimited listings',
        'Advanced AI matching',
        'Priority notifications',
        'Deal structure suggestions',
        'Analytics dashboard',
        'Priority support',
        'API access'
      ],
      popular: true,
      cta: 'Get Started'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations and investment firms',
      features: [
        'Everything in Professional',
        'Custom integrations',
        'Dedicated account manager',
        'Advanced analytics',
        'White-label options',
        'Custom deal structures',
        '24/7 phone support'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader>
        <Link href="/listings" className="text-gray-700 hover:text-gray-900 font-medium">
          Browse Listings
        </Link>
        {isSignedIn ? (
          <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
            Dashboard
          </Link>
        ) : (
          <Link href="/sign-up" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
            Get Started
          </Link>
        )}
      </AppHeader>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Start Free, Scale Smart
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Try any plan free for 7 days. Choose the plan that fits your investment strategy and get full access to our AI-powered matching platform.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-sm border-2 p-8 ${
                plan.popular
                  ? 'border-blue-600 shadow-lg scale-105'
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                {plan.trialText ? (
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-3">
                      <span className="text-2xl font-bold text-white">{plan.price}</span>
                      {plan.trialText && (
                        <span className="text-sm text-green-100 ml-2 font-medium">{plan.trialText}</span>
                      )}
                    </div>
                    <div className="flex items-baseline justify-center">
                      <span className="text-sm text-gray-500 mr-1">then</span>
                      <span className="text-4xl font-bold text-gray-900">{plan.originalPrice}</span>
                      {plan.period && (
                        <span className="text-xl text-gray-500 ml-1">{plan.period}</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && (
                      <span className="text-xl text-gray-500 ml-1">{plan.period}</span>
                    )}
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.name === 'Enterprise' ? (
                <Link
                  href="/contact"
                  className="block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors bg-gray-100 text-gray-900 hover:bg-gray-200"
                >
                  {plan.cta}
                </Link>
              ) : (
                <CheckoutButton
                  plan={plan.name.toLowerCase() as 'starter' | 'professional'}
                  className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </CheckoutButton>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How do I get started?
              </h3>
              <p className="text-gray-600">
                Simply sign up for any plan and start using the platform immediately. Payment is processed monthly.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How does the AI matching work?
              </h3>
              <p className="text-gray-600">
                Our AI analyzes listing details, investment criteria, and market conditions to identify high-compatibility matches and suggest optimal deal structures.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I change plans anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any charges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}