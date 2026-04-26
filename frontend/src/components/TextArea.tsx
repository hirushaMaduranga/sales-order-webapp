import type { TextareaHTMLAttributes } from 'react'

const baseClassName =
  'min-h-[96px] w-full resize-none border border-slate-700 bg-white px-2 py-1 text-sm'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextArea({ className = '', ...props }: TextAreaProps) {
  return <textarea className={`${baseClassName} ${className}`.trim()} {...props} />
}
