type TableGridProps = {
  headers: string[]
  rows: number
}

export function TableGrid({ headers, rows }: TableGridProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-200 text-left">
            {headers.map((header) => (
              <th key={header} className="border border-slate-700 px-2 py-1 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              {headers.map((header) => (
                <td key={`${header}-${index}`} className="border border-slate-700 px-2 py-1">
                  &nbsp;
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
