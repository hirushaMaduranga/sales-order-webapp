import { configureStore } from '@reduxjs/toolkit'
import customersReducer from '../features/customers/customersSlice'
import itemsReducer from '../features/items/itemsSlice'
import ordersReducer from '../features/orders/ordersSlice'
import type { SalesOrder } from '../types/sales'

const STORAGE_KEY = 'salesOrders'

const loadOrdersFromStorage = (): SalesOrder[] | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return null
    }
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as SalesOrder[]) : null
  } catch {
    return null
  }
}

const saveOrdersToStorage = (orders: SalesOrder[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  } catch {
    // Ignore storage failures (private mode, quota, etc.).
  }
}

const preloadedOrders = loadOrdersFromStorage()

export const store = configureStore({
  reducer: {
    customers: customersReducer,
    items: itemsReducer,
    orders: ordersReducer,
  },
  preloadedState: preloadedOrders
    ? {
        orders: {
          orders: preloadedOrders,
        },
      }
    : undefined,
})

store.subscribe(() => {
  saveOrdersToStorage(store.getState().orders.orders)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
