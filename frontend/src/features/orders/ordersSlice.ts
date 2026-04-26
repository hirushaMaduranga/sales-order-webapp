import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { SalesOrder } from '../../types/sales'
import { mockOrders } from '../../services/mockData'

type OrdersState = {
  orders: SalesOrder[]
}

const initialState: OrdersState = {
  orders: mockOrders,
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<SalesOrder>) {
      state.orders.unshift(action.payload)
    },
    updateOrder(state, action: PayloadAction<SalesOrder>) {
      const index = state.orders.findIndex((order) => order.id === action.payload.id)
      if (index >= 0) {
        state.orders[index] = action.payload
      }
    },
  },
})

export const { addOrder, updateOrder } = ordersSlice.actions
export default ordersSlice.reducer
