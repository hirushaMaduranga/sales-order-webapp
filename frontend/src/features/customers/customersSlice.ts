import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Customer } from '../../types/sales'
import { customers as seedCustomers } from '../../services/mockData'
import { getClients } from '../../services/api'

type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type CustomersState = {
  customers: Customer[]
  status: LoadStatus
  error: string | null
}

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
  return await getClients()
})

const initialState: CustomersState = {
  customers: seedCustomers,
  status: 'idle',
  error: null,
}

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.customers = action.payload
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unable to load customers.'
      })
  },
})

export default customersSlice.reducer
