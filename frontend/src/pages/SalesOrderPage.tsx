import { Button } from '../components/Button'
import { PageShell } from '../components/PageShell'
import { SelectInput } from '../components/SelectInput'
import { TableGrid } from '../components/TableGrid'
import { TextArea } from '../components/TextArea'
import { TextInput } from '../components/TextInput'

const itemHeaders = [
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

export function SalesOrderPage() {
  return (
    <PageShell title="Sales Order" action={<Button type="button">Save Order</Button>}>
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-2">
          <div className="grid grid-cols-[140px_1fr] items-center gap-3">
            <label className="text-sm font-medium">Customer Name</label>
            <SelectInput>
              <option value="">Select customer</option>
            </SelectInput>
          </div>
          <div className="grid grid-cols-[140px_1fr] items-center gap-3">
            <label className="text-sm font-medium">Address 1</label>
            <TextInput />
          </div>
          <div className="grid grid-cols-[140px_1fr] items-center gap-3">
            <label className="text-sm font-medium">Address 2</label>
            <TextInput />
          </div>
          <div className="grid grid-cols-[140px_1fr] items-center gap-3">
            <label className="text-sm font-medium">Address 3</label>
            <TextInput />
          </div>
          <div className="grid grid-cols-[140px_1fr] items-center gap-3">
            <label className="text-sm font-medium">Suburb</label>
            <TextInput />
          </div>
          <div className="grid grid-cols-[140px_1fr] items-center gap-3">
            <label className="text-sm font-medium">State</label>
            <TextInput />
          </div>
          <div className="grid grid-cols-[140px_1fr] items-center gap-3">
            <label className="text-sm font-medium">Post Code</label>
            <TextInput />
          </div>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-[120px_1fr] items-center gap-3">
            <label className="text-sm font-medium">Invoice No.</label>
            <TextInput />
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center gap-3">
            <label className="text-sm font-medium">Invoice Date</label>
            <TextInput type="date" className="py-0" />
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center gap-3">
            <label className="text-sm font-medium">Reference No</label>
            <TextInput />
          </div>
          <div className="grid grid-cols-[120px_1fr] items-start gap-3">
            <label className="pt-1 text-sm font-medium">Note</label>
            <TextArea className="min-h-[128px]" />
          </div>
        </div>
      </div>

      <div className="mt-6 border border-slate-700">
        <TableGrid headers={itemHeaders} rows={5} />
      </div>

      <div className="mt-6 flex justify-end">
        <div className="space-y-2">
          <div className="grid grid-cols-[120px_190px] items-center gap-3">
            <span className="text-sm font-medium">Total Excl</span>
            <TextInput />
          </div>
          <div className="grid grid-cols-[120px_190px] items-center gap-3">
            <span className="text-sm font-medium">Total Tax</span>
            <TextInput />
          </div>
          <div className="grid grid-cols-[120px_190px] items-center gap-3">
            <span className="text-sm font-medium">Total Incl</span>
            <TextInput />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
