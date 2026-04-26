import type { ButtonHTMLAttributes, ReactNode } from 'react'

const baseClassName =
  'inline-flex items-center justify-center border border-slate-700 bg-slate-100 px-3 py-0.5 text-[12px] font-semibold text-slate-900 hover:bg-slate-200'

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
