import React, { forwardRef } from 'react'

const Input = forwardRef<
  HTMLInputElement,
  {
    type?: string
    label: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    required?: boolean
    error?: string
    errorMessage?: string
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  }
>(
  (
    {
      type = 'text',
      label,
      name,
      value,
      onChange,
      onFocus,
      onBlur,
      required = false,
      error,
      errorMessage
    },
    ref
  ) => (
    <div className="mb-4 w-full">
      <label
        className={`block text-sm font-medium mb-1 ${
          error ? 'text-red-700' : 'text-dark-text'
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
        className={`bg-dark-bg-soft-table border text-sm rounded-lg block w-full p-2.5 outline-none focus:ring-2 focus:shadow-xl ${
          error
            ? 'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
            : 'border-border-dark text-dark-text2 focus:ring-purple-main focus:border-none'
        }`}
        required={required}
      />
      {error && errorMessage && (
        <p className="mt-2 text-sm text-red-600">
          <span className="font-medium">{errorMessage}</span>
        </p>
      )}
    </div>
  )
)

export default Input
