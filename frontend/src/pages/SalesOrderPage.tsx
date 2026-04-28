import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { PageShell } from '../components/common/PageShell'
import { SelectInput } from '../components/common/SelectInput'
import { TextArea } from '../components/common/TextArea'
import { TextInput } from '../components/common/TextInput'
import { LineItemsTable } from '../components/order/LineItemsTable'
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks'
import { fetchCustomers } from '../features/customers/customersSlice'
import { fetchItems } from '../features/items/itemsSlice'
import { addOrder, updateOrder } from '../features/orders/ordersSlice'
import type { LineItem, SalesOrder } from '../types/sales'

const emptyLineItem = (id: string): LineItem => ({
  id,
  itemId: '',
  itemCode: '',
  description: '',
  note: '',
  quantity: 0,
  price: 0,
  taxRate: 0,
})

const createEmptyOrder = (): SalesOrder => ({
  id: '',
  customerId: '',
  customerName: '',
  address1: '',
  address2: '',
  address3: '',
  suburb: '',
  state: '',
  postCode: '',
  invoiceNo: '',
  invoiceDate: '',
  referenceNo: '',
  note: '',
  lineItems: [
    emptyLineItem('li-01'),
    emptyLineItem('li-02'),
    emptyLineItem('li-03'),
    emptyLineItem('li-04'),
    emptyLineItem('li-05'),
  ],
})

const getNextOrderId = (orders: SalesOrder[]): string => {
  const maxNumber = orders.reduce((max, order) => {
    const match = order.id.match(/SO-(\d+)/)
    if (!match) {
      return max
    }
    const value = Number(match[1])
    return Number.isNaN(value) ? max : Math.max(max, value)
  }, 0)

  return `SO-${String(maxNumber + 1).padStart(4, '0')}`
}

const padLineItems = (items: LineItem[], target: number): LineItem[] => {
  if (items.length >= target) {
    return items
  }

  const padded = [...items]
  for (let i = items.length; i < target; i += 1) {
    padded.push(emptyLineItem(`li-${String(i + 1).padStart(2, '0')}`))
  }
  return padded
}

const hasLineItemData = (item: LineItem) =>
  item.itemId !== '' ||
  item.description !== '' ||
  item.note !== '' ||
  item.quantity !== 0 ||
  item.price !== 0 ||
  item.taxRate !== 0

const trimLineItems = (items: LineItem[]) => items.filter(hasLineItemData)

export function SalesOrderPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { orderId } = useParams()
  const orders = useAppSelector((state) => state.orders.orders)
  const customers = useAppSelector((state) => state.customers.customers)
  const catalogItems = useAppSelector((state) => state.items.items)
  const customersStatus = useAppSelector((state) => state.customers.status)
  const itemsStatus = useAppSelector((state) => state.items.status)
  const isEditMode = Boolean(orderId)
  const existingOrder = isEditMode ? orders.find((order) => order.id === orderId) : undefined

  const [formState, setFormState] = useState<SalesOrder>(() => {
    if (existingOrder) {
      return { ...existingOrder, lineItems: padLineItems(existingOrder.lineItems, 5) }
    }
    return createEmptyOrder()
  })
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    if (!isEditMode) {
      setFormState(createEmptyOrder())
      return
    }
    if (existingOrder) {
      setFormState({ ...existingOrder, lineItems: padLineItems(existingOrder.lineItems, 5) })
      return
    }
    navigate('/')
  }, [existingOrder, isEditMode, navigate])

  useEffect(() => {
    if (customersStatus === 'idle') {
      dispatch(fetchCustomers())
    }
    if (itemsStatus === 'idle') {
      dispatch(fetchItems())
    }
  }, [customersStatus, dispatch, itemsStatus])

  const totals = useMemo(() => {
    return formState.lineItems.reduce(
      (acc, item) => {
        const excl = item.quantity * item.price
        const tax = (excl * item.taxRate) / 100
        return {
          excl: acc.excl + excl,
          tax: acc.tax + tax,
          incl: acc.incl + excl + tax,
        }
      },
      { excl: 0, tax: 0, incl: 0 },
    )
  }, [formState.lineItems])

  const hasAnyEntry = useMemo(() => {
    return formState.lineItems.some(
      (item) =>
        item.itemId !== '' ||
        item.description !== '' ||
        item.note !== '' ||
        item.quantity !== 0 ||
        item.price !== 0 ||
        item.taxRate !== 0,
    )
  }, [formState.lineItems])

  const updateField = (field: keyof SalesOrder, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find((entry) => entry.id === customerId)
    if (!customer) {
      setFormState((prev) => ({
        ...prev,
        customerId: '',
        customerName: '',
        address1: '',
        address2: '',
        address3: '',
        suburb: '',
        state: '',
        postCode: '',
      }))
      return
    }

    setFormState((prev) => ({
      ...prev,
      customerId: customer.id,
      customerName: customer.name,
      address1: customer.address1,
      address2: customer.address2,
      address3: customer.address3,
      suburb: customer.suburb,
      state: customer.state,
      postCode: customer.postCode,
    }))
  }

  const updateLineItem = (index: number, updatedItem: LineItem) => {
    setFormState((prev) => {
      const updated = [...prev.lineItems]
      updated[index] = updatedItem
      return { ...prev, lineItems: updated }
    })
  }

  const handleItemSelection = (index: number, itemId: string) => {
    const item = catalogItems.find((entry) => entry.id === itemId)
    if (!item) {
      updateLineItem(index, {
        ...formState.lineItems[index],
        itemId: '',
        itemCode: '',
        description: '',
        price: 0,
        taxRate: 0,
      })
      return
    }

    updateLineItem(index, {
      ...formState.lineItems[index],
      itemId: item.id,
      itemCode: item.code,
      description: item.description,
      price: item.price,
      taxRate: item.defaultTaxRate,
    })
  }

  const handleDescriptionSelection = (index: number, description: string) => {
    const item = catalogItems.find((entry) => entry.description === description)
    if (!item) {
      updateLineItem(index, {
        ...formState.lineItems[index],
        itemId: '',
        itemCode: '',
        description: '',
        price: 0,
        taxRate: 0,
      })
      return
    }

    updateLineItem(index, {
      ...formState.lineItems[index],
      itemId: item.id,
      itemCode: item.code,
      description: item.description,
      price: item.price,
      taxRate: item.defaultTaxRate,
    })
  }

  const validateForm = () => {
    const messages: string[] = []

    if (!formState.customerId) {
      messages.push('Customer Name is required.')
    }
    if (!formState.invoiceNo.trim()) {
      messages.push('Invoice No is required.')
    }
    if (!formState.invoiceDate.trim()) {
      messages.push('Invoice Date is required.')
    }

    const usableRows = formState.lineItems.filter(hasLineItemData)
    if (usableRows.length === 0) {
      messages.push('At least one valid line item is required.')
    }

    formState.lineItems.forEach((item, index) => {
      if (!hasLineItemData(item)) {
        return
      }
      if (!item.itemId && !item.description) {
        messages.push(`Line ${index + 1}: select an item.`)
      }
      if (item.quantity <= 0) {
        messages.push(`Line ${index + 1}: quantity must be greater than 0.`)
      }
      if (item.price <= 0) {
        messages.push(`Line ${index + 1}: price must be greater than 0.`)
      }
    })

    return messages
  }

  const handleSave = () => {
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors([])
    const normalizedLineItems = trimLineItems(formState.lineItems)

    if (isEditMode) {
      if (!existingOrder) {
        navigate('/')
        return
      }
      dispatch(updateOrder({ ...formState, lineItems: normalizedLineItems }))
    } else {
      const nextId = formState.id.trim() !== '' ? formState.id : getNextOrderId(orders)
      dispatch(addOrder({ ...formState, id: nextId, lineItems: normalizedLineItems }))
    }
    navigate('/')
  }

  return (
    <PageShell title="Sales Order" action={<Button type="button" onClick={handleSave}>Save Order</Button>}>
      {errors.length > 0 && (
        <div className="mb-4 border border-slate-600 bg-slate-100 px-3 py-2 text-[12px] text-red-700">
          <div className="font-semibold">Please fix the following before saving:</div>
          <ul className="list-disc pl-4">
            {errors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-2">
          <div className="grid grid-cols-[140px_1fr] items-center gap-3">
            <label className="text-[12px] font-semibold">Customer Name</label>
            <SelectInput value={formState.customerId} onChange={(event) => handleCustomerChange(event.target.value)}>
              <option value="">Select customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </SelectInput>
          </div>
          <div className="grid grid-cols-[140px_1fr] items-center gap-3">
            <label className="text-[12px] font-semibold">Address 1</label>
            <TextInput value={formState.address1} onChange={(e) => updateField('address1', e.target.value)} />
          </div>
          <div className="grid grid-cols-[140px_1fr] items-center gap-3">
            <label className="text-[12px] font-semibold">Address 2</label>
            <TextInput value={formState.address2} onChange={(e) => updateField('address2', e.target.value)} />
          </div>
          <div className="grid grid-cols-[140px_1fr] items-center gap-3">
            <label className="text-[12px] font-semibold">Address 3</label>
            <TextInput value={formState.address3} onChange={(e) => updateField('address3', e.target.value)} />
          </div>
          <div className="grid grid-cols-[140px_1fr] items-center gap-3">
            <label className="text-[12px] font-semibold">Suburb</label>
            <TextInput value={formState.suburb} onChange={(e) => updateField('suburb', e.target.value)} />
          </div>
          <div className="grid grid-cols-[140px_1fr] items-center gap-3">
            <label className="text-[12px] font-semibold">State</label>
            <TextInput value={formState.state} onChange={(e) => updateField('state', e.target.value)} />
          </div>
          <div className="grid grid-cols-[140px_1fr] items-center gap-3">
            <label className="text-[12px] font-semibold">Post Code</label>
            <TextInput value={formState.postCode} onChange={(e) => updateField('postCode', e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-[120px_1fr] items-center gap-3">
            <label className="text-[12px] font-semibold">Invoice No.</label>
            <TextInput value={formState.invoiceNo} onChange={(e) => updateField('invoiceNo', e.target.value)} />
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center gap-3">
            <label className="text-[12px] font-semibold">Invoice Date</label>
            <TextInput type="date" className="py-0" value={formState.invoiceDate} onChange={(e) => updateField('invoiceDate', e.target.value)} />
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center gap-3">
            <label className="text-[12px] font-semibold">Reference No</label>
            <TextInput value={formState.referenceNo} onChange={(e) => updateField('referenceNo', e.target.value)} />
          </div>
          <div className="grid grid-cols-[120px_1fr] items-start gap-3">
            <label className="pt-1 text-[12px] font-semibold">Note</label>
            <TextArea className="min-h-[140px]" value={formState.note} onChange={(e) => updateField('note', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="mt-4 border border-slate-600">
        <LineItemsTable
          items={formState.lineItems}
          catalog={catalogItems}
          onItemSelect={handleItemSelection}
          onDescriptionSelect={handleDescriptionSelection}
          onItemChange={updateLineItem}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <div className="space-y-2">
          <div className="grid grid-cols-[120px_190px] items-center gap-3">
            <span className="text-[12px] font-semibold">Total Excl</span>
            <TextInput value={hasAnyEntry ? totals.excl.toFixed(2) : ''} readOnly />
          </div>
          <div className="grid grid-cols-[120px_190px] items-center gap-3">
            <span className="text-[12px] font-semibold">Total Tax</span>
            <TextInput value={hasAnyEntry ? totals.tax.toFixed(2) : ''} readOnly />
          </div>
          <div className="grid grid-cols-[120px_190px] items-center gap-3">
            <span className="text-[12px] font-semibold">Total Incl</span>
            <TextInput value={hasAnyEntry ? totals.incl.toFixed(2) : ''} readOnly />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
