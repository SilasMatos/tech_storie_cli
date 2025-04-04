import React, { forwardRef } from 'react'

const Select = forwardRef<
  HTMLSelectElement,
  {
    label: string
    name?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: { value: string; label: string }[]
    required?: boolean
    error?: string
    onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void
  }
>(
  (
    { label, name, value, onChange, options, required = false, error, onBlur },
    ref
  ) => (
    <div className="mb-4 w-full">
      <label
        className={`block text-sm font-medium mb-1 ${
          error ? 'text-red-500' : 'text-dark-text'
        }`}
      >
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        className={`bg-dark-bg-soft-table border text-sm rounded-lg block w-full p-2.5 outline-none focus:ring-2 focus:shadow-xl ${
          error
            ? 'border-red-500 text-red-500 placeholder-red-400 focus:ring-red-500 focus:border-red-500'
            : 'border-border-dark text-dark-text2 focus:ring-purple-main focus:border-none'
        }`}
        required={required}
      >
        <option value="">Selecione</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-sm text-red-500">
          <span className="font-medium">{error}</span>
        </p>
      )}
    </div>
  )
)

export default Select
