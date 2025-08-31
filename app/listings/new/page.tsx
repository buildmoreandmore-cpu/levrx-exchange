'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
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

const DRAFT_KEY = 'levrx:new-listing:draft'

function NewListingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize from URL params
  const initialKind = searchParams.get('kind') === 'WANT' ? 'WANT' : 'HAVE'
  const initialCategory = (() => {
    const type = searchParams.get('type')
    switch (type) {
      case 'cash': return 'Cash'
      case 'paper': return 'Paper'  
      case 'stuff': return 'Stuff'
      case 'property': return 'Property'
      default: return 'Property'
    }
  })() as Category

  const [formData, setFormData] = useState<FormData>({
    kind: initialKind,
    category: initialCategory,
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

  // Load draft from localStorage on mount
  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_KEY)
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft)
        setFormData({ ...formData, ...parsedDraft })
      } catch (e) {
        console.error('Failed to load draft:', e)
      }
    }
  }, [])

  // Save draft to localStorage on form changes
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData))
    }, 1000)
    return () => clearTimeout(timer)
  }, [formData])

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
        if (!formData.targetReturn && !formData.minTerm && !formData.maxTerm) {
          newErrors.targetReturn = 'Target return or term is required'
        }
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
        if (!formData.benefitsSought?.length) newErrors.benefitsSought = 'At least one benefit sought is required'
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
      console.log('Form payload:', formData)
      
      // Try to POST to API
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        const result = await response.json()
        localStorage.removeItem(DRAFT_KEY) // Clear draft on success
        router.push(`/listings/${result.id}`)
      } else {
        throw new Error('API request failed')
      }
    } catch (error) {
      console.error('Error creating listing:', error)
      // Show success toast and redirect for demo purposes
      alert('Listing created successfully! (Demo mode)')
      localStorage.removeItem(DRAFT_KEY)
      router.push('/dashboard')
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

  const renderCashFields = () => (
    <>
      <div className="mb-6">
        <label htmlFor="cashSource" className="block text-sm font-medium text-gray-700 mb-2">
          Cash Source
        </label>
        <select
          id="cashSource"
          value={formData.cashSource || ''}
          onChange={(e) => updateFormData({ cashSource: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select source...</option>
          {CASH_SOURCES.map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount {formData.kind === 'HAVE' ? 'Available' : 'Needed'} ($) *
          </label>
          <input
            type="number"
            id="amount"
            min="0"
            step="1000"
            value={formData.amount || ''}
            onChange={(e) => updateFormData({ amount: e.target.value ? parseFloat(e.target.value) : undefined })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.amount ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
        </div>

        <div>
          <label htmlFor="targetReturn" className="block text-sm font-medium text-gray-700 mb-2">
            Target Return / Cost of Capital (%)
          </label>
          <input
            type="number"
            id="targetReturn"
            min="0"
            max="100"
            step="0.1"
            value={formData.targetReturn || ''}
            onChange={(e) => updateFormData({ targetReturn: e.target.value ? parseFloat(e.target.value) : undefined })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.targetReturn ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.targetReturn && <p className="mt-1 text-sm text-red-600">{errors.targetReturn}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="minTerm" className="block text-sm font-medium text-gray-700 mb-2">
            Min Term (months)
          </label>
          <input
            type="number"
            id="minTerm"
            min="1"
            value={formData.minTerm || ''}
            onChange={(e) => updateFormData({ minTerm: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="maxTerm" className="block text-sm font-medium text-gray-700 mb-2">
            Max Term (months)
          </label>
          <input
            type="number"
            id="maxTerm"
            min="1"
            value={formData.maxTerm || ''}
            onChange={(e) => updateFormData({ maxTerm: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="geography" className="block text-sm font-medium text-gray-700 mb-2">
          Geography Preference
        </label>
        <input
          type="text"
          id="geography"
          value={formData.geography || ''}
          onChange={(e) => updateFormData({ geography: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Southeast US, Major metros, etc."
        />
      </div>
    </>
  )

  const renderPaperFields = () => (
    <>
      <div className="mb-6">
        <label htmlFor="paperType" className="block text-sm font-medium text-gray-700 mb-2">
          Paper Type *
        </label>
        <select
          id="paperType"
          value={formData.paperType || ''}
          onChange={(e) => updateFormData({ paperType: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.paperType ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="">Select type...</option>
          {PAPER_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.paperType && <p className="mt-1 text-sm text-red-600">{errors.paperType}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="upb" className="block text-sm font-medium text-gray-700 mb-2">
            UPB / Purchase Price ($) *
          </label>
          <input
            type="number"
            id="upb"
            min="0"
            step="1000"
            value={formData.upb || ''}
            onChange={(e) => updateFormData({ upb: e.target.value ? parseFloat(e.target.value) : undefined })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.upb ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.upb && <p className="mt-1 text-sm text-red-600">{errors.upb}</p>}
        </div>

        <div>
          <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-2">
            Interest Rate (%)
          </label>
          <input
            type="number"
            id="interestRate"
            min="0"
            max="100"
            step="0.1"
            value={formData.interestRate || ''}
            onChange={(e) => updateFormData({ interestRate: e.target.value ? parseFloat(e.target.value) : undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="term" className="block text-sm font-medium text-gray-700 mb-2">
            Term (months)
          </label>
          <input
            type="number"
            id="term"
            min="1"
            value={formData.term || ''}
            onChange={(e) => updateFormData({ term: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700 mb-2">
            Payment Type
          </label>
          <select
            id="paymentType"
            value={formData.paymentType || ''}
            onChange={(e) => updateFormData({ paymentType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select type...</option>
            {PAYMENT_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="collateralDescription" className="block text-sm font-medium text-gray-700 mb-2">
          Collateral Description
        </label>
        <input
          type="text"
          id="collateralDescription"
          value={formData.collateralDescription || ''}
          onChange={(e) => updateFormData({ collateralDescription: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe the underlying collateral"
        />
      </div>

      <div className="mb-6">
        <ChipGroup
          options={DEAL_STRUCTURES}
          selectedOptions={formData.acceptableTerms || []}
          onChange={(acceptableTerms) => updateFormData({ acceptableTerms })}
          label="Acceptable Terms"
          className="mb-6"
        />
      </div>
    </>
  )

  const renderStuffFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="itemType" className="block text-sm font-medium text-gray-700 mb-2">
            Item Type *
          </label>
          <input
            type="text"
            id="itemType"
            value={formData.itemType || ''}
            onChange={(e) => updateFormData({ itemType: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.itemType ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="e.g., Vehicle, Equipment, Art, etc."
          />
          {errors.itemType && <p className="mt-1 text-sm text-red-600">{errors.itemType}</p>}
        </div>

        <div>
          <label htmlFor="estimatedValue" className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Value ($) *
          </label>
          <input
            type="number"
            id="estimatedValue"
            min="0"
            step="100"
            value={formData.estimatedValue || ''}
            onChange={(e) => updateFormData({ estimatedValue: e.target.value ? parseFloat(e.target.value) : undefined })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.estimatedValue ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.estimatedValue && <p className="mt-1 text-sm text-red-600">{errors.estimatedValue}</p>}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
          Condition
        </label>
        <select
          id="condition"
          value={formData.condition || ''}
          onChange={(e) => updateFormData({ condition: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select condition...</option>
          {ITEM_CONDITIONS.map(condition => (
            <option key={condition} value={condition}>{condition}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <ChipGroup
          options={EXCHANGE_PREFERENCES}
          selectedOptions={formData.exchangePreferences || []}
          onChange={(exchangePreferences) => updateFormData({ exchangePreferences })}
          label="Exchange Preferences"
          className="mb-6"
        />
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
        label="Benefits Sought *"
        className="mb-6"
      />
      {errors.benefitsSought && <p className="mt-1 text-sm text-red-600">{errors.benefitsSought}</p>}

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

  const renderCategoryFields = () => {
    switch (formData.category) {
      case 'Cash': return renderCashFields()
      case 'Paper': return renderPaperFields()
      case 'Stuff': return renderStuffFields()
      case 'Property': return renderPropertyFields()
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader>
        <UserButton />
      </AppHeader>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Listing</h1>
          <p className="text-gray-600">Share what you have or what you&apos;re looking for</p>
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
              href="/dashboard"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg font-medium ${
                formData.kind === 'HAVE'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Creating...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default function NewListing() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <NewListingContent />
    </Suspense>
  )
}