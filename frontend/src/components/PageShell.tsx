import type { ReactNode } from 'react'

type PageShellProps = {
  title: string
  action?: ReactNode
  children: ReactNode
}

export function PageShell({ title, action, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-slate-200 p-6 text-slate-900">
      <div className="mx-auto max-w-5xl border-2 border-slate-700 bg-slate-50">
        <div className="border-b-2 border-slate-700 bg-slate-200 px-4 py-1 text-center text-sm font-semibold uppercase tracking-wide">
          {title}
        </div>
        <div className="border-b-2 border-slate-700 px-4 py-1.5">{action}</div>
        <div className="bg-white p-4">{children}</div>
      </div>
    </div>
  )
}
