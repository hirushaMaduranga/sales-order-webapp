export type Customer = {
  id: string
  name: string
  address1: string
  address2: string
  address3: string
  suburb: string
  state: string
  postCode: string
}

export type ItemCatalogEntry = {
  id: string
  code: string
  description: string
  price: number
  defaultTaxRate: number
}

export type LineItem = {
  id: string
  itemId: string
  itemCode: string
  description: string
  note: string
  quantity: number
  price: number
  taxRate: number
}

export type SalesOrder = {
  id: string
  customerId: string
  customerName: string
  address1: string
  address2: string
  address3: string
  suburb: string
  state: string
  postCode: string
  invoiceNo: string
  invoiceDate: string
  referenceNo: string
  note: string
  lineItems: LineItem[]
}
