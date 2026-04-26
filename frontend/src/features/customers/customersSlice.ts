import { createSlice } from '@reduxjs/toolkit'
import type { Customer } from '../../types/sales'
import { customers as seedCustomers } from '../../services/mockData'

type CustomersState = {
  customers: Customer[]
}

const initialState: CustomersState = {
  customers: seedCustomers,
}

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
})

export default customersSlice.reducer
