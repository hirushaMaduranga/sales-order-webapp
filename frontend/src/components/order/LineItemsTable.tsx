import type { LineItem, ItemCatalogEntry } from '../../types/sales'
import { SelectInput } from '../common/SelectInput'
import { TextInput } from '../common/TextInput'

const headers = [
  'Item Code',
  'Description',
  'Note',
  'Quantity',
  'Price',
  'Tax',
  'Excl Amount',
  'Tax Amount',
  'Incl Amount',
]

type LineItemsTableProps = {
  items: LineItem[]
  catalog: ItemCatalogEntry[]
  onItemSelect: (index: number, itemId: string) => void
  onDescriptionSelect: (index: number, description: string) => void
  onItemChange: (index: number, item: LineItem) => void
}

export function LineItemsTable({
  items,
  catalog,
  onItemSelect,
  onDescriptionSelect,
  onItemChange,
}: LineItemsTableProps) {
  return (
    <table className="w-full table-fixed border-collapse border border-slate-600 text-[12px]">
      <colgroup>
        <col className="w-[12%]" />
        <col className="w-[18%]" />
        <col className="w-[12%]" />
        <col className="w-[9%]" />
        <col className="w-[9%]" />
        <col className="w-[7%]" />
        <col className="w-[11%]" />
        <col className="w-[11%]" />
        <col className="w-[11%]" />
      </colgroup>
      <thead>
        <tr className="bg-slate-200 text-left">
          {headers.map((header) => (
            <th key={header} className="h-10 border border-slate-600 px-2 py-1 font-semibold">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => {
          const excl = item.quantity * item.price
          const taxAmount = (excl * item.taxRate) / 100
          const incl = excl + taxAmount
          const hasItemData =
            item.itemId !== '' ||
            item.description !== '' ||
            item.note !== '' ||
            item.quantity !== 0 ||
            item.price !== 0 ||
            item.taxRate !== 0
          const quantityValue = hasItemData ? item.quantity : ''
          const priceValue = hasItemData ? item.price : ''
          const taxValue = hasItemData ? item.taxRate : ''

          return (
            <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="h-10 border border-slate-600 px-1">
                <SelectInput
                  className="h-6 text-[12px]"
                  value={item.itemId}
                  onChange={(event) => onItemSelect(index, event.target.value)}
                >
                  <option value="">Select</option>
                  {catalog.map((entry) => (
                    <option key={entry.id} value={entry.id}>
                      {entry.code}
                    </option>
                  ))}
                </SelectInput>
              </td>
              <td className="h-10 border border-slate-600 px-1">
                <SelectInput
                  className="h-6 text-[12px]"
                  value={item.description}
                  onChange={(event) => onDescriptionSelect(index, event.target.value)}
                >
                  <option value="">Select</option>
                  {catalog.map((entry) => (
                    <option key={entry.id} value={entry.description}>
                      {entry.description}
                    </option>
                  ))}
                </SelectInput>
              </td>
              <td className="h-10 border border-slate-600 px-1">
                <TextInput
                  className="h-6 text-[12px]"
                  value={item.note}
                  onChange={(event) => onItemChange(index, { ...item, note: event.target.value })}
                />
              </td>
              <td className="h-10 border border-slate-600 px-1">
                <TextInput
                  className="h-6 text-[12px]"
                  type="number"
                  min={0}
                  value={quantityValue}
                  onChange={(event) =>
                    onItemChange(index, { ...item, quantity: Number(event.target.value) })
                  }
                />
              </td>
              <td className="h-10 border border-slate-600 px-1">
                <TextInput
                  className="h-6 text-[12px]"
                  type="number"
                  min={0}
                  value={priceValue}
                  onChange={(event) =>
                    onItemChange(index, { ...item, price: Number(event.target.value) })
                  }
                />
              </td>
              <td className="h-10 border border-slate-600 px-1">
                <TextInput
                  className="h-6 text-[12px]"
                  type="number"
                  min={0}
                  value={taxValue}
                  onChange={(event) =>
                    onItemChange(index, { ...item, taxRate: Number(event.target.value) })
                  }
                />
              </td>
              <td className="h-10 border border-slate-600 px-2 text-right">
                {hasItemData ? excl.toFixed(2) : ''}
              </td>
              <td className="h-10 border border-slate-600 px-2 text-right">
                {hasItemData ? taxAmount.toFixed(2) : ''}
              </td>
              <td className="h-10 border border-slate-600 px-2 text-right">
                {hasItemData ? incl.toFixed(2) : ''}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
