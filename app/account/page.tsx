'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Subscription {
  id: string
  status: string
  current_period_start: number
  current_period_end: number
  cancel_at_period_end: boolean
  canceled_at: number | null
  plan: {
    amount: number
    currency: string
    interval: string
  }
}

interface PaymentMethod {
  id: string
  type: string
  card: {
    brand: string
    last4: string
    exp_month: number
    exp_year: number
  } | null
}

interface Invoice {
  id: string
  amount_paid: number
  currency: string
  status: string
  created: number
  invoice_pdf: string | null
  number: string | null
}

interface AccountData {
  customer: {
    id: string
    email: string
    name: string
    phone: string
    address: any
  } | null
  subscription: Subscription | null
  paymentMethods: PaymentMethod[]
  invoices: Invoice[]
}

export default function AccountPage() {
  const { user, isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const [accountData, setAccountData] = useState<AccountData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
      return
    }

    if (isLoaded && isSignedIn) {
      fetchAccountData()
    }
  }, [isLoaded, isSignedIn, router])

  const fetchAccountData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/account')
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch account data`)
      }

      const data = await response.json()
      setAccountData(data)
    } catch (err) {
      console.error('Error fetching account data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load account data')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getCardBrandIcon = (brand: string) => {
    const icons: { [key: string]: string } = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳',
      unknown: '💳'
    }
    return icons[brand] || icons.unknown
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      paid: 'text-green-600 bg-green-50',
      open: 'text-blue-600 bg-blue-50',
      draft: 'text-gray-600 bg-gray-50',
      void: 'text-red-600 bg-red-50',
      uncollectible: 'text-red-600 bg-red-50',
    }
    return colors[status] || 'text-gray-600 bg-gray-50'
  }

  const filteredInvoices = accountData?.invoices.filter(invoice =>
    invoice.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatDate(invoice.created).toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-6">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">❌ Error loading account</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchAccountData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              LevrX
            </div>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium">
              Dashboard
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-gray-900 font-medium">
              Pricing
            </Link>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
              Account
            </div>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Account</h1>
        <p className="text-gray-600 mb-8">Manage your account info.</p>

        {/* Current Subscription */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Subscription</h2>
          {accountData?.subscription ? (
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Subscription:</span>{' '}
                {accountData.subscription.plan.amount 
                  ? `${formatCurrency(accountData.subscription.plan.amount, accountData.subscription.plan.currency)} per ${accountData.subscription.plan.interval}`
                  : 'Plan details unavailable'
                }
              </p>
              {accountData.subscription.cancel_at_period_end && (
                <p className="text-gray-700">
                  <span className="font-medium">Cancellation date:</span>{' '}
                  {formatDate(accountData.subscription.current_period_end)}
                </p>
              )}
              <p className="text-gray-700">
                <span className="font-medium">Status:</span>{' '}
                <span className={`px-2 py-1 rounded-full text-sm ${
                  accountData.subscription.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {accountData.subscription.status}
                </span>
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Next billing date:</span>{' '}
                {formatDate(accountData.subscription.current_period_end)}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No active subscription found.</p>
          )}
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
          {accountData?.paymentMethods && accountData.paymentMethods.length > 0 ? (
            <div className="space-y-3">
              {accountData.paymentMethods.map((pm, index) => (
                <div key={pm.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCardBrandIcon(pm.card?.brand || 'unknown')}</span>
                    <div>
                      <p className="text-gray-700">
                        <span className="font-medium">Card:</span>{' '}
                        {pm.card?.brand.toUpperCase()} •••• {pm.card?.last4}
                        {index === 0 && <span className="ml-2 text-sm text-blue-600">(Default)</span>}
                      </p>
                      <p className="text-sm text-gray-500">
                        Expires {pm.card?.exp_month.toString().padStart(2, '0')}/{pm.card?.exp_year}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No payment methods found.</p>
          )}
        </div>

        {/* Billing Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing Information</h2>
          {accountData?.customer ? (
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Name:</span> {accountData.customer.name || 'Not provided'}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {accountData.customer.email || 'Not provided'}
              </p>
              {accountData.customer.address && (
                <p className="text-gray-700">
                  <span className="font-medium">Billing address:</span>{' '}
                  {[
                    accountData.customer.address.line1,
                    accountData.customer.address.line2,
                    accountData.customer.address.city,
                    accountData.customer.address.state,
                    accountData.customer.address.postal_code,
                    accountData.customer.address.country,
                  ].filter(Boolean).join(', ')}
                </p>
              )}
              {accountData.customer.phone && (
                <p className="text-gray-700">
                  <span className="font-medium">Phone number:</span> {accountData.customer.phone}
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No billing information found.</p>
          )}
        </div>

        {/* Invoice History */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Invoice History</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {filteredInvoices.length > 0 ? (
            <div className="space-y-3">
              {filteredInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <p className="text-gray-900 font-medium">
                        {formatDate(invoice.created)}
                      </p>
                      <p className="text-gray-900 font-medium">
                        {formatCurrency(invoice.amount_paid, invoice.currency)}
                      </p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </div>
                    {invoice.number && (
                      <p className="text-sm text-gray-500 mt-1">Invoice #{invoice.number}</p>
                    )}
                  </div>
                  {invoice.invoice_pdf && (
                    <a
                      href={invoice.invoice_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Download PDF
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : accountData?.invoices && accountData.invoices.length > 0 ? (
            <p className="text-gray-500">No invoices match your search.</p>
          ) : (
            <p className="text-gray-500">No invoices found.</p>
          )}
        </div>
      </div>
    </div>
  )
}