import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { SalesOrder } from '../../types/sales'
import { mockOrders } from '../../services/mockData'
import { getSalesOrders } from '../../services/api'

type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type OrdersState = {
  orders: SalesOrder[]
  status: LoadStatus
  error: string | null
}

export const fetchSalesOrders = createAsyncThunk('orders/fetchSalesOrders', async () => {
  return await getSalesOrders()
})

const initialState: OrdersState = {
  orders: mockOrders,
  status: 'idle',
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesOrders.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchSalesOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.orders = action.payload
      })
      .addCase(fetchSalesOrders.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unable to load sales orders.'
      })
  },
})

export const { addOrder, updateOrder } = ordersSlice.actions
export default ordersSlice.reducer
