const Textarea: React.FC<{
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  error?: string
  errorMessage?: string
}> = ({ label, name, value, onChange, rows = 4, error, errorMessage }) => (
  <div className="mb-4 w-full">
    <label
      className={`block text-sm font-medium mb-1 ${
        error ? 'text-red-700' : 'text-gray-700'
      }`}
    >
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={`bg-dark-bg-soft-table border text-sm rounded-lg block w-full p-2.5 outline-none focus:ring-2 focus:shadow-xl ${
        error
          ? 'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
          : 'border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-none'
      }`}
      rows={rows}
    />
    {error && errorMessage && (
      <p className="mt-2 text-sm text-red-600">
        <span className="font-medium">{errorMessage}</span>
      </p>
    )}
  </div>
)
export default Textarea
