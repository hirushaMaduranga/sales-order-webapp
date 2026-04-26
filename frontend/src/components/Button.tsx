import type { ButtonHTMLAttributes, ReactNode } from 'react'

const baseClassName =
  'inline-flex items-center justify-center gap-2 rounded border border-slate-700 bg-slate-100 px-3 py-1 text-sm font-medium text-slate-900 hover:bg-slate-200'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button className={`${baseClassName} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}
