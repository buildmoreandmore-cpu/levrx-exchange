'use client'

import { useState } from 'react'
import { 
  DealKind, 
  PackageType, 
  PropertyType, 
  SellerUrgency, 
  SellerReasons, 
  BenefitsSought, 
  BenefitsToNewOwner,
  Listing,
  PACKAGE_TYPE_OPTIONS,
  PROPERTY_TYPE_GROUPS,
  SELLER_URGENCY_OPTIONS,
  SELLER_REASONS_OPTIONS,
  BENEFITS_SOUGHT_OPTIONS,
  BENEFITS_TO_NEW_OWNER_OPTIONS
} from '@/types/exchange'

interface QuickAddModalProps {
  isOpen: boolean
  onClose: () => void
  kind: DealKind
  onSave: (listing: Omit<Listing, 'id' | 'createdAt'>) => void
}

export default function QuickAddModal({ isOpen, onClose, kind, onSave }: QuickAddModalProps) {
  const [formData, setFormData] = useState({
    packageType: '' as PackageType | '',
    propertyType: '' as PropertyType | '',
    city: '',
    state: '',
    price: '',
    noiAnnual: '',
    currentDebt: '',
    sellerUrgency: 'Medium' as SellerUrgency,
    sellerReasons: [] as SellerReasons[],
    benefitsSought: [] as BenefitsSought[],
    benefitsToNewOwner: [] as BenefitsToNewOwner[],
    notes: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    const newErrors: Record<string, string> = {}
    
    if (!formData.packageType) newErrors.packageType = 'Package Type is required'
    if (!formData.propertyType) newErrors.propertyType = 'Property Type is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (formData.benefitsSought.length === 0) newErrors.benefitsSought = 'At least one Benefit Sought is required'

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    // Create listing object
    const listing: Omit<Listing, 'id' | 'createdAt'> = {
      kind,
      packageType: formData.packageType as PackageType,
      propertyType: formData.propertyType as PropertyType,
      city: formData.city.trim(),
      state: formData.state.trim(),
      price: formData.price ? parseFloat(formData.price.replace(/[^0-9.-]+/g, '')) : undefined,
      noiAnnual: formData.noiAnnual ? parseFloat(formData.noiAnnual.replace(/[^0-9.-]+/g, '')) : undefined,
      currentDebt: formData.currentDebt ? parseFloat(formData.currentDebt.replace(/[^0-9.-]+/g, '')) : undefined,
      sellerUrgency: formData.sellerUrgency,
      sellerReasons: formData.sellerReasons,
      benefitsSought: formData.benefitsSought,
      benefitsToNewOwner: formData.benefitsToNewOwner,
      notes: formData.notes.trim() || undefined
    }

    onSave(listing)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      packageType: '',
      propertyType: '',
      city: '',
      state: '',
      price: '',
      noiAnnual: '',
      currentDebt: '',
      sellerUrgency: 'Medium',
      sellerReasons: [],
      benefitsSought: [],
      benefitsToNewOwner: [],
      notes: ''
    })
    setErrors({})
    onClose()
  }

  const handleCheckboxChange = (
    field: 'sellerReasons' | 'benefitsSought' | 'benefitsToNewOwner',
    value: string
  ) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[]
      return {
        ...prev,
        [field]: currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      }
    })
  }

  const formatCurrency = (value: string) => {
    const number = value.replace(/[^0-9.-]+/g, '')
    if (!number) return ''
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(number))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleClose} />
        
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleClose}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="w-full">
              <div className="flex items-center mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                  kind === 'HAVE' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                }`}>
                  <span className="text-sm font-semibold">{kind}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Add New {kind}
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
                {/* Package Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Package Type *
                  </label>
                  <select
                    value={formData.packageType}
                    onChange={(e) => setFormData(prev => ({ ...prev, packageType: e.target.value as PackageType }))}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.packageType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Package Type</option>
                    {PACKAGE_TYPE_OPTIONS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.packageType && <p className="text-red-500 text-sm mt-1">{errors.packageType}</p>}
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type *
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData(prev => ({ ...prev, propertyType: e.target.value as PropertyType }))}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.propertyType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Property Type</option>
                    {Object.entries(PROPERTY_TYPE_GROUPS).map(([group, types]) => (
                      <optgroup key={group} label={group}>
                        {types.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
                </div>

                {/* City & State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="City"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="State"
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                  </div>
                </div>

                {/* Financial Fields */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: formatCurrency(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="$0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NOI (Annual)
                    </label>
                    <input
                      type="text"
                      value={formData.noiAnnual}
                      onChange={(e) => setFormData(prev => ({ ...prev, noiAnnual: formatCurrency(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="$0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Debt
                    </label>
                    <input
                      type="text"
                      value={formData.currentDebt}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentDebt: formatCurrency(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="$0"
                    />
                  </div>
                </div>

                {/* Seller Urgency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seller Urgency
                  </label>
                  <div className="flex space-x-4">
                    {SELLER_URGENCY_OPTIONS.map(option => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="sellerUrgency"
                          value={option}
                          checked={formData.sellerUrgency === option}
                          onChange={(e) => setFormData(prev => ({ ...prev, sellerUrgency: e.target.value as SellerUrgency }))}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Seller Reasons */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seller Reasons
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {SELLER_REASONS_OPTIONS.map(reason => (
                      <label key={reason} className="flex items-start">
                        <input
                          type="checkbox"
                          checked={formData.sellerReasons.includes(reason)}
                          onChange={() => handleCheckboxChange('sellerReasons', reason)}
                          className="mr-2 mt-0.5"
                        />
                        <span className="text-sm text-gray-700">{reason}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Benefits Sought */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Benefits Sought *
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {BENEFITS_SOUGHT_OPTIONS.map(benefit => (
                      <label key={benefit} className="flex items-start">
                        <input
                          type="checkbox"
                          checked={formData.benefitsSought.includes(benefit)}
                          onChange={() => handleCheckboxChange('benefitsSought', benefit)}
                          className="mr-2 mt-0.5"
                        />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </label>
                    ))}
                  </div>
                  {errors.benefitsSought && <p className="text-red-500 text-sm mt-1">{errors.benefitsSought}</p>}
                </div>

                {/* Benefits to New Owner */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Benefits to New Owner
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {BENEFITS_TO_NEW_OWNER_OPTIONS.map(benefit => (
                      <label key={benefit} className="flex items-start">
                        <input
                          type="checkbox"
                          checked={formData.benefitsToNewOwner.includes(benefit)}
                          onChange={() => handleCheckboxChange('benefitsToNewOwner', benefit)}
                          className="mr-2 mt-0.5"
                        />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Additional notes or details..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      kind === 'HAVE' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    Save {kind}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}