import type { ReactNode } from 'react'

type PageShellProps = {
  title: string
  action?: ReactNode
  children: ReactNode
}

export function PageShell({ title, action, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-slate-200 p-6 text-slate-900">
      <div className="mx-auto w-full max-w-6xl border border-slate-600 bg-slate-50">
        <div className="border-b border-slate-600 bg-slate-200 px-3 py-1">
          <div className="grid grid-cols-[80px_1fr_80px] items-center">
            <div className="flex items-center gap-1">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-700 bg-slate-100 text-[9px] font-bold leading-none">
                +
              </span>
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-700 bg-slate-100 text-[10px] font-bold leading-none">
                -
              </span>
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-700 bg-slate-100 text-[9px] font-bold leading-none">
                x
              </span>
            </div>
            <div className="text-center text-[12px] font-semibold">{title}</div>
            <div />
          </div>
        </div>
        <div className="border-b border-slate-600 px-3 py-1">
          <div className="flex items-center">{action}</div>
        </div>
        <div className="bg-white p-4 min-h-[620px]">{children}</div>
      </div>
    </div>
  )
}
