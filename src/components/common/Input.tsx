import React, { forwardRef } from 'react'

const Input = forwardRef<
  HTMLInputElement,
  {
    type?: string
    label: string
    name?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    required?: boolean
    error?: string
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    step?: string
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
      step
    },
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
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        step={step}
        ref={ref}
        className={`bg-dark-bg-soft-table border text-sm rounded-lg block w-full p-2.5 outline-none focus:ring-2 focus:shadow-xl ${
          error
            ? 'border-red-500 text-red-500 placeholder-red-400 focus:ring-red-500 focus:border-red-500'
            : 'border-border-dark text-dark-text2 focus:ring-purple-main focus:border-none'
        }`}
        required={required}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500">
          <span className="font-medium">{error}</span>
        </p>
      )}
    </div>
  )
)

export default Input
