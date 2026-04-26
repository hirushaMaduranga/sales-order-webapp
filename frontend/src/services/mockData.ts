import type { Customer, ItemCatalogEntry, SalesOrder } from '../types/sales'

export const customers: Customer[] = [
  {
    id: 'cust-1001',
    name: 'Acme Trading Co.',
    address1: '14 Market Street',
    address2: 'Suite 2',
    address3: '',
    suburb: 'Riverside',
    state: 'NSW',
    postCode: '2000',
  },
  {
    id: 'cust-1002',
    name: 'Northern Supplies',
    address1: '81 King Road',
    address2: '',
    address3: '',
    suburb: 'Hillcrest',
    state: 'VIC',
    postCode: '3000',
  },
  {
    id: 'cust-1003',
    name: 'Blue Horizon Retail',
    address1: '55 Ocean Avenue',
    address2: 'Unit 9',
    address3: '',
    suburb: 'Seaside',
    state: 'QLD',
    postCode: '4000',
  },
]

export const catalogItems: ItemCatalogEntry[] = [
  {
    id: 'item-101',
    code: 'ITM-101',
    description: 'Standard Widget',
    price: 45,
    defaultTaxRate: 10,
  },
  {
    id: 'item-102',
    code: 'ITM-102',
    description: 'Premium Widget',
    price: 75,
    defaultTaxRate: 10,
  },
  {
    id: 'item-103',
    code: 'ITM-103',
    description: 'Service Charge',
    price: 120,
    defaultTaxRate: 15,
  },
]

export const mockOrders: SalesOrder[] = []
