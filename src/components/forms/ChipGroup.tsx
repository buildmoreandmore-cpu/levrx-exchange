'use client'

interface ChipGroupProps {
  options: readonly string[]
  selectedOptions: string[]
  onChange: (selectedOptions: string[]) => void
  label?: string
  className?: string
  disabled?: boolean
}

// Icon mapping for different option types
const getOptionIcon = (option: string): string => {
  const lowerOption = option.toLowerCase()
  
  // Seller Reasons icons
  if (lowerOption.includes('1031') || lowerOption.includes('exchange')) return '🔄'
  if (lowerOption.includes('landlord') || lowerOption.includes('management')) return '🏠'
  if (lowerOption.includes('equity')) return '💰'
  if (lowerOption.includes('cashflow') || lowerOption.includes('negative')) return '📉'
  if (lowerOption.includes('vacancy') || lowerOption.includes('lease')) return '🏢'
  if (lowerOption.includes('estate') || lowerOption.includes('retirement') || lowerOption.includes('divorce')) return '👥'
  if (lowerOption.includes('partnership') || lowerOption.includes('dissolution')) return '🤝'
  if (lowerOption.includes('relocation')) return '📍'
  if (lowerOption.includes('capex') || lowerOption.includes('condition')) return '🔧'
  
  // Benefits Sought icons
  if (lowerOption.includes('cash out') || lowerOption.includes('full')) return '💵'
  if (lowerOption.includes('partial') || lowerOption.includes('partner')) return '🤝'
  if (lowerOption.includes('debt relief') || lowerOption.includes('assume')) return '📋'
  if (lowerOption.includes('tax') || lowerOption.includes('deferral')) return '🧾'
  if (lowerOption.includes('management relief')) return '🎯'
  if (lowerOption.includes('development') || lowerOption.includes('entitlement')) return '🏗️'
  if (lowerOption.includes('creative') || lowerOption.includes('finance')) return '💡'
  if (lowerOption.includes('carry') || lowerOption.includes('note')) return '📄'
  if (lowerOption.includes('trade') && lowerOption.includes('income')) return '🏘️'
  if (lowerOption.includes('trade') && (lowerOption.includes('land') || lowerOption.includes('services'))) return '🔀'
  
  // Benefits to New Owner icons
  if (lowerOption.includes('below-market') || lowerOption.includes('value-add')) return '📈'
  if (lowerOption.includes('stabilized') || lowerOption.includes('income')) return '💰'
  if (lowerOption.includes('assumable') || lowerOption.includes('financing')) return '🏦'
  if (lowerOption.includes('zoning') || lowerOption.includes('entitlement')) return '📋'
  if (lowerOption.includes('development') || lowerOption.includes('density')) return '🏗️'
  if (lowerOption.includes('tenant') || lowerOption.includes('lease')) return '📝'
  if (lowerOption.includes('location') || lowerOption.includes('corridor')) return '📍'
  
  // Deal Structure icons
  if (lowerOption.includes('sale')) return '💰'
  if (lowerOption.includes('rent') || lowerOption.includes('lease')) return '🏠'
  if (lowerOption.includes('1031')) return '🔄'
  if (lowerOption.includes('subject-to')) return '📋'
  if (lowerOption.includes('wrap')) return '🔀'
  if (lowerOption.includes('lease-option')) return '⚖️'
  if (lowerOption.includes('carry') || lowerOption.includes('vtb')) return '📄'
  if (lowerOption.includes('joint venture') || lowerOption.includes('equity')) return '🤝'
  
  // Default icon
  return '•'
}

export default function ChipGroup({
  options,
  selectedOptions,
  onChange,
  label,
  className = "",
  disabled = false,
}: ChipGroupProps) {
  const handleToggle = (option: string) => {
    if (disabled) return
    
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(item => item !== option)
      : [...selectedOptions, option]
    
    onChange(newSelectedOptions)
  }

  return (
    <div className={className}>
      {label && (
        <h3 className="text-lg font-bold text-gray-900 mb-4">{label}</h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option)
          const icon = getOptionIcon(option)
          
          return (
            <button
              key={option}
              type="button"
              disabled={disabled}
              onClick={() => handleToggle(option)}
              className={`
                flex items-center p-4 rounded-md border text-left transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md'
                }
              `}
            >
              <span className="text-xl mr-3 flex-shrink-0">{icon}</span>
              <div className="flex-1">
                <span className="text-sm font-medium leading-relaxed">{option}</span>
              </div>
              {isSelected && (
                <svg className="ml-2 h-5 w-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}