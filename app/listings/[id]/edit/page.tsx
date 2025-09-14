'use client'

import { useState, useEffect, Suspense } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserButton, useAuth } from '@clerk/nextjs'
import GroupedSelect from '@/components/forms/GroupedSelect'
import ChipGroup from '@/components/forms/ChipGroup'
import AppHeader from '@/components/ui/AppHeader'
import {
  PACKAGE_TYPES,
  PROPERTY_TYPES,
  SELLER_URGENCY,
  SELLER_REASONS,
  BENEFITS_SOUGHT,
  BENEFITS_TO_NEW_OWNER,
  DEAL_STRUCTURES,
  CASH_SOURCES,
  PAPER_TYPES,
  PAYMENT_TYPES,
  ITEM_CONDITIONS,
  EXCHANGE_PREFERENCES,
  TIMELINES,
} from '@/lib/options'

export const dynamic = 'force-dynamic'

type Kind = 'HAVE' | 'WANT'
type Category = 'Cash' | 'Paper' | 'Stuff' | 'Property'

interface FormData {
  kind: Kind
  category: Category
  title: string
  description: string

  // Cash fields
  cashSource?: string
  amount?: number
  minTerm?: number
  maxTerm?: number
  targetReturn?: number
  geography?: string

  // Paper fields
  paperType?: string
  upb?: number
  interestRate?: number
  term?: number
  paymentType?: string
  collateralDescription?: string
  acceptableTerms?: string[]

  // Stuff fields
  itemType?: string
  estimatedValue?: number
  condition?: string
  exchangePreferences?: string[]

  // Property fields
  packageType?: string
  propertyType?: string
  city?: string
  state?: string
  price?: number
  noiAnnual?: number
  currentDebt?: number
  sellerUrgency?: string
  sellerReasons?: string[]
  benefitsSought?: string[]
  benefitsToNewOwner?: string[]
  dealStructure?: string[]
  timeline?: string

  notes?: string
}

function EditListingContent() {
  const params = useParams()
  const router = useRouter()
  const { isSignedIn, userId, getToken } = useAuth()
  const [listing, setListing] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState<FormData>({
    kind: 'HAVE',
    category: 'Property',
    title: '',
    description: '',
    sellerReasons: [],
    benefitsSought: [],
    benefitsToNewOwner: [],
    dealStructure: [],
    acceptableTerms: [],
    exchangePreferences: [],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch existing listing data
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const token = await getToken()
        const response = await fetch(`/api/listings/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          setListing(data)

          // Convert listing data to form format
          const item = data.mode === 'HAVE' ? data.asset : data.want
          const terms = data.mode === 'HAVE' ? data.asset?.terms : data.want?.constraints

          setFormData({
            kind: data.mode,
            category: terms?.category || 'Property',
            title: item?.title || '',
            description: item?.description || '',

            // Property fields (most common case)
            packageType: terms?.packageType,
            propertyType: terms?.propertyType,
            city: terms?.city,
            state: terms?.state,
            price: data.mode === 'HAVE' ? data.asset?.estValueNumeric : data.want?.targetValueNumeric,
            noiAnnual: terms?.noiAnnual,
            currentDebt: terms?.currentDebt,
            sellerUrgency: terms?.sellerUrgency,
            sellerReasons: terms?.sellerReasons || [],
            benefitsSought: terms?.benefitsSought || [],
            benefitsToNewOwner: terms?.benefitsToNewOwner || [],
            dealStructure: terms?.dealStructure || [],
            timeline: terms?.timeline,

            // Cash fields
            cashSource: terms?.cashSource,
            amount: terms?.amount,
            minTerm: terms?.minTerm,
            maxTerm: terms?.maxTerm,
            targetReturn: terms?.targetReturn,
            geography: terms?.geography,

            // Paper fields
            paperType: terms?.paperType,
            upb: terms?.upb,
            interestRate: terms?.interestRate,
            term: terms?.term,
            paymentType: terms?.paymentType,
            collateralDescription: terms?.collateralDescription,
            acceptableTerms: terms?.acceptableTerms || [],

            // Stuff fields
            itemType: terms?.itemType,
            estimatedValue: terms?.estimatedValue,
            condition: terms?.condition,
            exchangePreferences: terms?.exchangePreferences || [],

            notes: terms?.notes || '',
          })
        }
      } catch (error) {
        console.error('Error fetching listing:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id && isSignedIn) {
      fetchListing()
    }
  }, [params.id, isSignedIn, getToken])

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
    // Clear related errors
    const newErrors = { ...errors }
    Object.keys(updates).forEach(key => {
      delete newErrors[key]
    })
    setErrors(newErrors)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Required for all
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'

    // Category-specific validation
    switch (formData.category) {
      case 'Cash':
        if (!formData.amount) newErrors.amount = 'Amount is required'
        break

      case 'Paper':
        if (!formData.paperType) newErrors.paperType = 'Paper type is required'
        if (!formData.upb) newErrors.upb = 'UPB/Purchase price is required'
        break

      case 'Stuff':
        if (!formData.itemType?.trim()) newErrors.itemType = 'Item type is required'
        if (!formData.estimatedValue) newErrors.estimatedValue = 'Estimated value is required'
        break

      case 'Property':
        if (!formData.packageType) newErrors.packageType = 'Package type is required'
        if (!formData.propertyType) newErrors.propertyType = 'Property type is required'
        if (!formData.city?.trim()) newErrors.city = 'City is required'
        if (!formData.state?.trim()) newErrors.state = 'State is required'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const token = await getToken()
      const response = await fetch(`/api/listings/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/listings/${params.id}`)
      } else {
        const errorData = await response.json().catch(() => ({
          error: 'Failed to parse error response'
        }))
        throw new Error(errorData.error || 'Failed to update listing')
      }
    } catch (error) {
      console.error('Error updating listing:', error)
      alert(`Error updating listing: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderKindTabs = () => (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-4">
        What are you doing? *
      </label>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => updateFormData({ kind: 'HAVE' })}
          className={`p-4 border-2 rounded-lg text-left transition-colors ${
            formData.kind === 'HAVE'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="font-semibold">I Have Something</div>
          <div className="text-sm text-gray-500">Share your assets, equity, skills, or resources</div>
        </button>
        <button
          type="button"
          onClick={() => updateFormData({ kind: 'WANT' })}
          className={`p-4 border-2 rounded-lg text-left transition-colors ${
            formData.kind === 'WANT'
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="font-semibold">I Want Something</div>
          <div className="text-sm text-gray-500">Describe what you&apos;re looking for</div>
        </button>
      </div>
    </div>
  )

  const renderCategoryTabs = () => (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-4">
        Category *
      </label>
      <div className="flex bg-gray-100 rounded-lg p-1">
        {(['Cash', 'Paper', 'Stuff', 'Property'] as Category[]).map(category => (
          <button
            key={category}
            type="button"
            onClick={() => updateFormData({ category })}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              formData.category === category
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {category === 'Stuff' ? 'Personal Property' : category}
          </button>
        ))}
      </div>
    </div>
  )

  const renderBasicFields = () => (
    <>
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.title ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder={`Brief title for your ${formData.kind.toLowerCase()}`}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          id="description"
          rows={4}
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Provide detailed information..."
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>
    </>
  )

  const renderPropertyFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="packageType" className="block text-sm font-medium text-gray-700 mb-2">
            Package Type *
          </label>
          <select
            id="packageType"
            value={formData.packageType || ''}
            onChange={(e) => updateFormData({ packageType: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.packageType ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select package type...</option>
            {PACKAGE_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.packageType && <p className="mt-1 text-sm text-red-600">{errors.packageType}</p>}
        </div>

        <div>
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
            Property Type *
          </label>
          <GroupedSelect
            value={formData.propertyType || ''}
            onChange={(propertyType) => updateFormData({ propertyType })}
            groups={PROPERTY_TYPES}
            placeholder="Select property type..."
            required
            className={errors.propertyType ? 'border-red-300' : ''}
          />
          {errors.propertyType && <p className="mt-1 text-sm text-red-600">{errors.propertyType}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            id="city"
            value={formData.city || ''}
            onChange={(e) => updateFormData({ city: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.city ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <input
            type="text"
            id="state"
            value={formData.state || ''}
            onChange={(e) => updateFormData({ state: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.state ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="e.g., GA"
          />
          {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Price / Target Price ($)
          </label>
          <input
            type="number"
            id="price"
            min="0"
            step="1000"
            value={formData.price || ''}
            onChange={(e) => updateFormData({ price: e.target.value ? parseFloat(e.target.value) : undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="noiAnnual" className="block text-sm font-medium text-gray-700 mb-2">
            NOI Annual ($)
          </label>
          <input
            type="number"
            id="noiAnnual"
            min="0"
            step="1000"
            value={formData.noiAnnual || ''}
            onChange={(e) => updateFormData({ noiAnnual: e.target.value ? parseFloat(e.target.value) : undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="currentDebt" className="block text-sm font-medium text-gray-700 mb-2">
            Current Debt ($)
          </label>
          <input
            type="number"
            id="currentDebt"
            min="0"
            step="1000"
            value={formData.currentDebt || ''}
            onChange={(e) => updateFormData({ currentDebt: e.target.value ? parseFloat(e.target.value) : undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Seller Urgency
        </label>
        <div className="flex space-x-4">
          {SELLER_URGENCY.map(urgency => (
            <label key={urgency} className="flex items-center">
              <input
                type="radio"
                name="sellerUrgency"
                value={urgency}
                checked={formData.sellerUrgency === urgency}
                onChange={(e) => updateFormData({ sellerUrgency: e.target.value })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">{urgency}</span>
            </label>
          ))}
        </div>
      </div>

      <ChipGroup
        options={SELLER_REASONS}
        selectedOptions={formData.sellerReasons || []}
        onChange={(sellerReasons) => updateFormData({ sellerReasons })}
        label="Seller Reasons"
        className="mb-6"
      />

      <ChipGroup
        options={BENEFITS_SOUGHT}
        selectedOptions={formData.benefitsSought || []}
        onChange={(benefitsSought) => updateFormData({ benefitsSought })}
        label="Benefits Sought"
        className="mb-6"
      />

      <ChipGroup
        options={BENEFITS_TO_NEW_OWNER}
        selectedOptions={formData.benefitsToNewOwner || []}
        onChange={(benefitsToNewOwner) => updateFormData({ benefitsToNewOwner })}
        label="Benefits to New Owner"
        className="mb-6"
      />

      <ChipGroup
        options={DEAL_STRUCTURES}
        selectedOptions={formData.dealStructure || []}
        onChange={(dealStructure) => updateFormData({ dealStructure })}
        label="Deal Structure"
        className="mb-6"
      />

      <div className="mb-6">
        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
          Timeline
        </label>
        <select
          id="timeline"
          value={formData.timeline || ''}
          onChange={(e) => updateFormData({ timeline: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select timeline...</option>
          {TIMELINES.map(timeline => (
            <option key={timeline} value={timeline}>{timeline}</option>
          ))}
        </select>
      </div>
    </>
  )

  // For now, just render property fields since that seems to be the main use case
  // You can add other category fields similar to the new listing page
  const renderCategoryFields = () => {
    switch (formData.category) {
      case 'Property': return renderPropertyFields()
      // Add other categories as needed
      default: return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading listing...</p>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Listing not found</h1>
          <p className="text-gray-600 mb-8">The listing you're trying to edit doesn't exist or you don't have permission to edit it.</p>
          <Link
            href="/listings"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader>
        <UserButton />
      </AppHeader>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Listing</h1>
          <p className="text-gray-600">Update your listing details</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
          {renderKindTabs()}
          {renderCategoryTabs()}
          {renderBasicFields()}
          {renderCategoryFields()}

          {/* Notes */}
          <div className="mb-8">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              id="notes"
              rows={3}
              value={formData.notes || ''}
              onChange={(e) => updateFormData({ notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional information, preferences, or requirements..."
            />
          </div>

          {/* Submit */}
          <div className="flex justify-between">
            <Link
              href={`/listings/${params.id}`}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || !isSignedIn}
              className={`px-6 py-2 rounded-lg font-medium ${
                !isSignedIn
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default function EditListing() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <EditListingContent />
    </Suspense>
  )
}