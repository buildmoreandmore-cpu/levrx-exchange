'use client'

interface ChipGroupProps {
  options: readonly string[]
  selectedOptions: string[]
  onChange: (selectedOptions: string[]) => void
  label?: string
  className?: string
  disabled?: boolean
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
        <div className="text-sm font-medium text-gray-700 mb-2">{label}</div>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option)
          return (
            <button
              key={option}
              type="button"
              disabled={disabled}
              onClick={() => handleToggle(option)}
              className={`
                inline-flex items-center px-3 py-2 rounded-full text-sm font-medium
                border transition-colors duration-200 cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isSelected
                  ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }
              `}
            >
              {option}
              {isSelected && (
                <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
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