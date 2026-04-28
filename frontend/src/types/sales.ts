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

export type ApiClientDto = {
  clientId: number
  customerName: string
  address1: string
  address2: string | null
  address3: string | null
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

export type ApiItemDto = {
  itemId: number
  itemCode: string
  description: string
  unitPrice: number
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

export type ApiSalesOrderLineResponseDto = {
  salesOrderLineId: number
  itemId: number
  itemCode: string
  description: string
  lineNote: string | null
  quantity: number
  price: number
  taxRate: number
  exclAmount: number
  taxAmount: number
  inclAmount: number
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

export type ApiSalesOrderResponseDto = {
  salesOrderId: number
  orderNo: string
  clientId: number
  customerName: string
  invoiceNo: string
  invoiceDate: string
  referenceNo: string | null
  note: string | null
  state: string
  postCode: string
  totalExcl: number
  totalTax: number
  totalIncl: number
  lines: ApiSalesOrderLineResponseDto[]
}
