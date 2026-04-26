import type { SelectHTMLAttributes } from 'react'

const baseClassName = 'h-7 w-full border border-slate-700 bg-white px-2 text-sm'

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement>

export function SelectInput({ className = '', children, ...props }: SelectInputProps) {
  return (
    <select className={`${baseClassName} ${className}`.trim()} {...props}>
      {children}
    </select>
  )
}
