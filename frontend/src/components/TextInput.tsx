import type { InputHTMLAttributes } from 'react'

const baseClassName = 'h-7 w-full border border-slate-700 bg-white px-2 text-sm'

type TextInputProps = InputHTMLAttributes<HTMLInputElement>

export function TextInput({ className = '', ...props }: TextInputProps) {
  return <input className={`${baseClassName} ${className}`.trim()} {...props} />
}
