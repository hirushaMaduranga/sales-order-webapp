import type { ReactNode } from 'react'

type PageShellProps = {
  title: string
  action?: ReactNode
  children: ReactNode
}

export function PageShell({ title, action, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="mx-auto max-w-5xl border border-slate-700 bg-white">
        <div className="border-b border-slate-700 bg-slate-200 px-4 py-2 text-center text-sm font-semibold uppercase tracking-wide">
          {title}
        </div>
        <div className="border-b border-slate-700 px-4 py-2">{action}</div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
