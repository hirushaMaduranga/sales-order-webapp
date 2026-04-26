type TableGridProps = {
  headers: string[]
  rows: number
}

export function TableGrid({ headers, rows }: TableGridProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-collapse border border-slate-700 text-sm">
        <thead>
          <tr className="bg-slate-200 text-left">
            {headers.map((header) => (
              <th
                key={header}
                className="h-10 border border-slate-700 px-2 py-1 text-xs font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              {headers.map((header) => (
                <td key={`${header}-${index}`} className="h-10 border border-slate-700 px-2">
                  <span aria-hidden="true">&nbsp;</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
