import { Listing } from '@/types/exchange'

interface DealCardProps {
  listing: Listing
  onView: (id: string) => void
  onStartDiscussion: (id: string) => void
}

export default function DealCard({ listing, onView, onStartDiscussion }: DealCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatLocation = (city: string, state: string) => {
    return `${city}, ${state}`
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            listing.kind === 'HAVE' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {listing.kind}
          </span>
          {listing.sellerUrgency && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              listing.sellerUrgency === 'High' 
                ? 'bg-red-100 text-red-700' 
                : listing.sellerUrgency === 'Medium'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {listing.sellerUrgency} Urgency
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500">
          {new Date(listing.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Property Details */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {listing.packageType}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          {listing.propertyType}
        </p>
        <p className="text-sm font-medium text-gray-700">
          📍 {formatLocation(listing.city, listing.state)}
        </p>
      </div>

      {/* Financial Info */}
      {(listing.price || listing.noiAnnual) && (
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-md">
          {listing.price && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(listing.price)}</p>
            </div>
          )}
          {listing.noiAnnual && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">NOI</p>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(listing.noiAnnual)}</p>
            </div>
          )}
        </div>
      )}

      {/* Benefits Sought Tags */}
      {listing.benefitsSought.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Benefits Sought</p>
          <div className="flex flex-wrap gap-1">
            {listing.benefitsSought.slice(0, 3).map((benefit, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-700"
              >
                {benefit}
              </span>
            ))}
            {listing.benefitsSought.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                +{listing.benefitsSought.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Notes Preview */}
      {listing.notes && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.notes}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-3 pt-4 border-t border-gray-100">
        <button
          onClick={() => onView(listing.id)}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View Details
        </button>
        <button
          onClick={() => onStartDiscussion(listing.id)}
          className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            listing.kind === 'HAVE'
              ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
          }`}
        >
          Start Discussion
        </button>
      </div>
    </div>
  )
}