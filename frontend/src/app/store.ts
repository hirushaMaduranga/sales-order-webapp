import { configureStore } from '@reduxjs/toolkit'
import customersReducer from '../features/customers/customersSlice'
import itemsReducer from '../features/items/itemsSlice'
import ordersReducer from '../features/orders/ordersSlice'

export const store = configureStore({
  reducer: {
    customers: customersReducer,
    items: itemsReducer,
    orders: ordersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
