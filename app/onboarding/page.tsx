'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

type UserType = 'INVESTOR' | 'LENDER' | 'WHOLESALER' | 'REALTOR' | 'SELLER' | 'OTHER'

interface FormData {
  userType: UserType | ''
  businessDescription: string
  yearsExperience: string
  monthlyDealsVolume: string
  investmentRange: string
  focusAreas: string[]
  linkedInProfile: string
  companyWebsite: string
  phoneNumber: string
  referralSource: string
}

const USER_TYPE_OPTIONS = [
  { value: 'INVESTOR', label: 'Real Estate Investor', icon: '🏢' },
  { value: 'LENDER', label: 'Private Money Lender', icon: '💰' },
  { value: 'WHOLESALER', label: 'Wholesaler', icon: '🤝' },
  { value: 'REALTOR', label: 'Realtor', icon: '🏡' },
  { value: 'SELLER', label: 'Property Seller', icon: '📋' },
  { value: 'OTHER', label: 'Other', icon: '👤' }
]

const EXPERIENCE_OPTIONS = [
  { value: '0-1', label: 'Just Getting Started (0-1 years)' },
  { value: '2-5', label: 'Building My Business (2-5 years)' },
  { value: '5-10', label: 'Experienced Professional (5-10 years)' },
  { value: '10+', label: 'Industry Veteran (10+ years)' }
]

const VOLUME_OPTIONS = [
  { value: '0', label: 'Just starting out' },
  { value: '1-3', label: '1-3 deals per month' },
  { value: '4-10', label: '4-10 deals per month' },
  { value: '10+', label: '10+ deals per month' }
]

const INVESTMENT_RANGE_OPTIONS = {
  INVESTOR: [
    { value: '<100k', label: 'Under $100K' },
    { value: '100k-500k', label: '$100K - $500K' },
    { value: '500k-1m', label: '$500K - $1M' },
    { value: '1m+', label: '$1M+' }
  ],
  LENDER: [
    { value: '<250k', label: 'Under $250K' },
    { value: '250k-1m', label: '$250K - $1M' },
    { value: '1m-5m', label: '$1M - $5M' },
    { value: '5m+', label: '$5M+' }
  ],
  DEFAULT: [
    { value: '<100k', label: 'Under $100K' },
    { value: '100k-500k', label: '$100K - $500K' },
    { value: '500k+', label: '$500K+' }
  ]
}

const FOCUS_AREAS = {
  INVESTOR: [
    'Single Family Homes',
    'Multi-Family Properties',
    'Commercial Real Estate',
    'Fix & Flip',
    'Buy & Hold',
    'Wholesale Deals',
    'Land Development',
    'REITs'
  ],
  LENDER: [
    'Residential Loans',
    'Commercial Loans',
    'Bridge Loans',
    'Hard Money Lending',
    'Fix & Flip Financing',
    'Construction Loans',
    'Land Loans',
    'JV Partnerships'
  ],
  WHOLESALER: [
    'Single Family Homes',
    'Multi-Family Properties',
    'Distressed Properties',
    'Off-Market Deals',
    'Probate Properties',
    'Foreclosures',
    'Commercial Properties',
    'Land Deals'
  ],
  REALTOR: [
    'Residential Sales',
    'Commercial Sales',
    'Luxury Properties',
    'Investment Properties',
    'First-Time Buyers',
    'Relocation Services',
    'Property Management',
    'REO Properties'
  ],
  SELLER: [
    'Single Family Home',
    'Multi-Family Property',
    'Commercial Property',
    'Land/Lots',
    'Investment Portfolio',
    'Distressed Property'
  ],
  OTHER: [
    'Property Management',
    'Real Estate Education',
    'Title/Escrow Services',
    'Construction/Renovation',
    'Real Estate Technology',
    'Legal Services',
    'Other Services'
  ]
}

const REFERRAL_SOURCES = [
  'Google Search',
  'Social Media',
  'Friend/Colleague Referral',
  'Real Estate Forum',
  'Podcast',
  'Newsletter',
  'Other'
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState<FormData>({
    userType: '',
    businessDescription: '',
    yearsExperience: '',
    monthlyDealsVolume: '',
    investmentRange: '',
    focusAreas: [],
    linkedInProfile: '',
    companyWebsite: '',
    phoneNumber: '',
    referralSource: ''
  })

  const [errors, setErrors] = useState<Record<string, string | string[]>>({})

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string | string[]> = {}

    if (step === 1) {
      if (!formData.userType) {
        newErrors.userType = 'Please select your user type'
      }
    }

    if (step === 2) {
      if (!formData.businessDescription || formData.businessDescription.length < 50) {
        newErrors.businessDescription = 'Please provide at least 50 characters describing your business'
      }
      if (!formData.yearsExperience) {
        newErrors.yearsExperience = 'Please select your experience level'
      }
      if (!formData.monthlyDealsVolume) {
        newErrors.monthlyDealsVolume = 'Please select your monthly deal volume'
      }
      if (!formData.investmentRange) {
        newErrors.investmentRange = 'Please select your investment range'
      }
    }

    if (step === 3) {
      if (formData.focusAreas.length === 0) {
        newErrors.focusAreas = ['Please select at least one focus area']
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(3)) return

    if (!formData.referralSource) {
      setErrors({ referralSource: 'Please tell us how you heard about us' })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to save onboarding data')
      }

      router.push('/dashboard')
    } catch (error) {
      console.error('Error submitting onboarding:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInvestmentRangeOptions = () => {
    if (formData.userType === 'INVESTOR') return INVESTMENT_RANGE_OPTIONS.INVESTOR
    if (formData.userType === 'LENDER') return INVESTMENT_RANGE_OPTIONS.LENDER
    return INVESTMENT_RANGE_OPTIONS.DEFAULT
  }

  const getFocusAreaOptions = () => {
    return FOCUS_AREAS[formData.userType as keyof typeof FOCUS_AREAS] || FOCUS_AREAS.OTHER
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please sign in to continue</p>
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Go to Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to LVRXchange!</h1>
          <p className="text-lg text-gray-600">Let's get to know you better to provide the best experience</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg p-4 mb-8 shadow-sm">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of 4</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: User Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">What best describes you?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {USER_TYPE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, userType: option.value as UserType })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.userType === option.value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                    </button>
                  ))}
                </div>
                {errors.userType && (
                  <p className="mt-2 text-sm text-red-600">{String(errors.userType)}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Business Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tell us about your business</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your business or investment focus <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.businessDescription}
                  onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about what you do, what types of deals you're interested in, and what makes you unique..."
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.businessDescription.length}/50 characters minimum
                </p>
                {errors.businessDescription && (
                  <p className="mt-1 text-sm text-red-600">{String(errors.businessDescription)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select experience level</option>
                  {EXPERIENCE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.yearsExperience && (
                  <p className="mt-1 text-sm text-red-600">{String(errors.yearsExperience)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Deal Volume <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.monthlyDealsVolume}
                  onChange={(e) => setFormData({ ...formData, monthlyDealsVolume: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select deal volume</option>
                  {VOLUME_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.monthlyDealsVolume && (
                  <p className="mt-1 text-sm text-red-600">{String(errors.monthlyDealsVolume)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.userType === 'LENDER' ? 'Lending Capacity' : 'Investment Range'} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.investmentRange}
                  onChange={(e) => setFormData({ ...formData, investmentRange: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select range</option>
                  {getInvestmentRangeOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.investmentRange && (
                  <p className="mt-1 text-sm text-red-600">{String(errors.investmentRange)}</p>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Focus Areas */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What are your focus areas?</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select all that apply <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getFocusAreaOptions().map((area) => (
                    <label
                      key={area}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.focusAreas.includes(area)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, focusAreas: [...formData.focusAreas, area] })
                          } else {
                            setFormData({
                              ...formData,
                              focusAreas: formData.focusAreas.filter(a => a !== area)
                            })
                          }
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-gray-700">{area}</span>
                    </label>
                  ))}
                </div>
                {errors.focusAreas && (
                  <p className="mt-2 text-sm text-red-600">{Array.isArray(errors.focusAreas) ? errors.focusAreas[0] : String(errors.focusAreas)}</p>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Contact & Verification */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Almost done!</h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Optional but recommended:</strong> Adding your professional profiles helps build trust in the community
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={formData.linkedInProfile}
                    onChange={(e) => setFormData({ ...formData, linkedInProfile: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Website
                  </label>
                  <input
                    type="url"
                    value={formData.companyWebsite}
                    onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How did you hear about us? <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.referralSource}
                    onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select source</option>
                    {REFERRAL_SOURCES.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                  {errors.referralSource && (
                    <p className="mt-1 text-sm text-red-600">{String(errors.referralSource)}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Completing...' : 'Complete Setup'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}