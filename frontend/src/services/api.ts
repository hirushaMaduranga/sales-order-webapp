import type {
  ApiClientDto,
  ApiItemDto,
  ApiSalesOrderLineResponseDto,
  ApiSalesOrderResponseDto,
  Customer,
  ItemCatalogEntry,
  LineItem,
  SalesOrder,
} from '../types/sales'

const API_BASE_URL = 'http://localhost:5036'

const request = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`)
  }
  return (await response.json()) as T
}

const mapClient = (client: ApiClientDto): Customer => ({
  id: String(client.clientId),
  name: client.customerName,
  address1: client.address1,
  address2: client.address2 ?? '',
  address3: client.address3 ?? '',
  suburb: client.suburb,
  state: client.state,
  postCode: client.postCode,
})

const mapItem = (item: ApiItemDto): ItemCatalogEntry => ({
  id: String(item.itemId),
  code: item.itemCode,
  description: item.description,
  price: item.unitPrice,
  defaultTaxRate: 0,
})

const formatDate = (value: string): string => {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return ''
  }
  return parsed.toISOString().slice(0, 10)
}

const mapLineItem = (line: ApiSalesOrderLineResponseDto): LineItem => ({
  id: String(line.salesOrderLineId),
  itemId: String(line.itemId),
  itemCode: line.itemCode,
  description: line.description,
  note: line.lineNote ?? '',
  quantity: line.quantity,
  price: line.price,
  taxRate: line.taxRate,
})

const mapSalesOrder = (order: ApiSalesOrderResponseDto): SalesOrder => ({
  id: order.orderNo,
  customerId: String(order.clientId),
  customerName: order.customerName,
  address1: '',
  address2: '',
  address3: '',
  suburb: '',
  state: order.state,
  postCode: order.postCode,
  invoiceNo: order.invoiceNo,
  invoiceDate: formatDate(order.invoiceDate),
  referenceNo: order.referenceNo ?? '',
  note: order.note ?? '',
  lineItems: order.lines.map(mapLineItem),
})

export const getClients = async (): Promise<Customer[]> => {
  const data = await request<ApiClientDto[]>('/api/clients')
  return data.map(mapClient)
}

export const getItems = async (): Promise<ItemCatalogEntry[]> => {
  const data = await request<ApiItemDto[]>('/api/items')
  return data.map(mapItem)
}

export const getSalesOrders = async (): Promise<SalesOrder[]> => {
  const data = await request<ApiSalesOrderResponseDto[]>('/api/salesorders')
  return data.map(mapSalesOrder)
}
