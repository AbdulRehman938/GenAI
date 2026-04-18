import { ErrorMessage, Field } from 'formik'
import { useState } from 'react'

type PasswordFieldProps = {
  id: string
  name: string
  label: string
  placeholder: string
  focusClassName: string
}

export default function PasswordField({ id, name, label, placeholder, focusClassName }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <Field
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          className={`w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 text-slate-900 outline-none transition ${focusClassName}`}
          placeholder={placeholder}
        />
        <button
          type="button"
          aria-label={showPassword ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </div>
      <ErrorMessage name={name} component="p" className="mt-1 text-sm text-rose-600" />
    </div>
  )
}
