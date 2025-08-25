'use client'

import { useState, useMemo } from 'react'
import { Listing, DealKind, PackageType, PropertyType, SellerUrgency, PACKAGE_TYPE_OPTIONS, PROPERTY_TYPE_GROUPS, SELLER_URGENCY_OPTIONS } from '@/types/exchange'
import DealCard from './DealCard'

interface DealPanelProps {
  kind: DealKind
  items: Listing[]
  onAddNew: () => void
  onView: (id: string) => void
  onStartDiscussion: (id: string) => void
}

interface Filters {
  packageTypes: PackageType[]
  propertyTypes: PropertyType[]
  location: string
  priceRange: { min: string; max: string }
  urgency: SellerUrgency[]
}

export default function DealPanel({ kind, items, onAddNew, onView, onStartDiscussion }: DealPanelProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<Filters>({
    packageTypes: [],
    propertyTypes: [],
    location: '',
    priceRange: { min: '', max: '' },
    urgency: []
  })

  const ITEMS_PER_PAGE = 6

  // Get all property types as flat array
  const allPropertyTypes = Object.values(PROPERTY_TYPE_GROUPS).flat()

  // Filter items based on current filters
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Package type filter
      if (filters.packageTypes.length > 0 && !filters.packageTypes.includes(item.packageType)) {
        return false
      }

      // Property type filter
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(item.propertyType)) {
        return false
      }

      // Location filter
      if (filters.location) {
        const locationQuery = filters.location.toLowerCase()
        const itemLocation = `${item.city} ${item.state}`.toLowerCase()
        if (!itemLocation.includes(locationQuery)) {
          return false
        }
      }

      // Price range filter
      if (item.price) {
        if (filters.priceRange.min) {
          const minPrice = parseFloat(filters.priceRange.min.replace(/[^0-9.-]+/g, ''))
          if (item.price < minPrice) return false
        }
        if (filters.priceRange.max) {
          const maxPrice = parseFloat(filters.priceRange.max.replace(/[^0-9.-]+/g, ''))
          if (item.price > maxPrice) return false
        }
      }

      // Urgency filter
      if (filters.urgency.length > 0) {
        if (!item.sellerUrgency || !filters.urgency.includes(item.sellerUrgency)) {
          return false
        }
      }

      return true
    })
  }, [items, filters])

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedItems = filteredItems.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [filters])

  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleMultiSelectFilter = (key: 'packageTypes' | 'propertyTypes' | 'urgency', value: string) => {
    setFilters(prev => {
      const currentArray = prev[key] as string[]
      return {
        ...prev,
        [key]: currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      }
    })
  }

  const clearFilters = () => {
    setFilters({
      packageTypes: [],
      propertyTypes: [],
      location: '',
      priceRange: { min: '', max: '' },
      urgency: []
    })
  }

  const hasActiveFilters = 
    filters.packageTypes.length > 0 ||
    filters.propertyTypes.length > 0 ||
    filters.location !== '' ||
    filters.priceRange.min !== '' ||
    filters.priceRange.max !== '' ||
    filters.urgency.length > 0

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

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              kind === 'HAVE' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
            }`}>
              <span className="text-sm font-semibold">{kind}S</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {kind === 'HAVE' ? 'What I Have' : 'What I Want'} ({filteredItems.length}{filteredItems.length !== items.length ? ` of ${items.length}` : ''})
            </h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                hasActiveFilters || showFilters
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
              Filters {hasActiveFilters && `(${
                filters.packageTypes.length + filters.propertyTypes.length + 
                (filters.location ? 1 : 0) + 
                (filters.priceRange.min || filters.priceRange.max ? 1 : 0) + 
                filters.urgency.length
              })`}
            </button>
            <button
              onClick={onAddNew}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                kind === 'HAVE'
                  ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
              }`}
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add {kind}
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Package Types */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Package Type</label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {PACKAGE_TYPE_OPTIONS.map(type => (
                    <label key={type} className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={filters.packageTypes.includes(type)}
                        onChange={() => handleMultiSelectFilter('packageTypes', type)}
                        className="mr-2 rounded"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Property Types */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {allPropertyTypes.map(type => (
                    <label key={type} className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={filters.propertyTypes.includes(type)}
                        onChange={() => handleMultiSelectFilter('propertyTypes', type)}
                        className="mr-2 rounded"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City, State"
                />
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={filters.priceRange.min}
                    onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, min: formatCurrency(e.target.value) })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Min"
                  />
                  <input
                    type="text"
                    value={filters.priceRange.max}
                    onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, max: formatCurrency(e.target.value) })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Seller Urgency</label>
                <div className="space-y-1">
                  {SELLER_URGENCY_OPTIONS.map(urgency => (
                    <label key={urgency} className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={filters.urgency.includes(urgency)}
                        onChange={() => handleMultiSelectFilter('urgency', urgency)}
                        className="mr-2 rounded"
                      />
                      {urgency}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {filteredItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedItems.map(item => (
                <DealCard
                  key={item.id}
                  listing={item}
                  onView={onView}
                  onStartDiscussion={onStartDiscussion}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredItems.length)} of {filteredItems.length} results
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          page === currentPage
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              kind === 'HAVE' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
            }`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {hasActiveFilters ? `No ${kind.toLowerCase()}s match your filters` : `No ${kind.toLowerCase()}s yet`}
            </h3>
            <p className="text-gray-600 mb-6">
              {hasActiveFilters 
                ? `Try adjusting your filters or clear them to see all ${kind.toLowerCase()}s.`
                : `Get started by adding your first ${kind.toLowerCase()}.`
              }
            </p>
            {hasActiveFilters ? (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            ) : (
              <button
                onClick={onAddNew}
                className={`px-6 py-3 text-sm font-medium text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  kind === 'HAVE'
                    ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                    : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                }`}
              >
                Add Your First {kind}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}