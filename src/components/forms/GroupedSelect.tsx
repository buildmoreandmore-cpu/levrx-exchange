'use client'

interface GroupedSelectProps {
  value: string
  onChange: (value: string) => void
  groups: Record<string, readonly string[]>
  placeholder?: string
  required?: boolean
  className?: string
  disabled?: boolean
}

export default function GroupedSelect({
  value,
  onChange,
  groups,
  placeholder = "Select...",
  required = false,
  className = "",
  disabled = false,
}: GroupedSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <option value="">{placeholder}</option>
      {Object.entries(groups).map(([groupName, options]) => (
        <optgroup key={groupName} label={groupName}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}