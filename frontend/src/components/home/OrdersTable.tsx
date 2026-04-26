import type { SalesOrder } from '../../types/sales'

const columns = [
  'Order No',
  'Customer Name',
  'Invoice No',
  'Invoice Date',
  'Reference No',
  'State',
  'Post Code',
]

type OrdersTableProps = {
  orders: SalesOrder[]
  rows: number
  onRowDoubleClick: (orderId: string) => void
  showData?: boolean
}

export function OrdersTable({ orders, rows, onRowDoubleClick, showData = true }: OrdersTableProps) {
  const displayRows = Array.from({ length: rows }).map((_, index) => orders[index] ?? null)

  return (
    <table className="w-full table-fixed border-collapse border border-slate-600 text-[12px]">
      <colgroup>
        {columns.map((column) => (
          <col key={column} className="w-[14.285%]" />
        ))}
      </colgroup>
      <thead>
        <tr className="bg-slate-200 text-left">
          {columns.map((column) => (
            <th key={column} className="h-11 border border-slate-600 px-2 py-1 font-semibold">
              <span className="mr-1 inline-flex h-3 w-3 items-center justify-center">
                <span className="h-0 w-0 border-l-[5px] border-r-[5px] border-t-[7px] border-l-transparent border-r-transparent border-t-slate-700" />
              </span>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {displayRows.map((order, index) => (
          <tr
            key={order?.id ?? `empty-${index}`}
            className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
            onDoubleClick={() => {
              if (order) {
                onRowDoubleClick(order.id)
              }
            }}
          >
            <td className="h-11 border border-slate-600 px-2">{showData ? order?.id ?? '' : ''}</td>
            <td className="h-11 border border-slate-600 px-2">{showData ? order?.customerName ?? '' : ''}</td>
            <td className="h-11 border border-slate-600 px-2">{showData ? order?.invoiceNo ?? '' : ''}</td>
            <td className="h-11 border border-slate-600 px-2">{showData ? order?.invoiceDate ?? '' : ''}</td>
            <td className="h-11 border border-slate-600 px-2">{showData ? order?.referenceNo ?? '' : ''}</td>
            <td className="h-11 border border-slate-600 px-2">{showData ? order?.state ?? '' : ''}</td>
            <td className="h-11 border border-slate-600 px-2">{showData ? order?.postCode ?? '' : ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
