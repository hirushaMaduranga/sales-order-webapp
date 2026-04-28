import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { ItemCatalogEntry } from '../../types/sales'
import { catalogItems as seedItems } from '../../services/mockData'
import { getItems } from '../../services/api'

type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type ItemsState = {
  items: ItemCatalogEntry[]
  status: LoadStatus
  error: string | null
}

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  return await getItems()
})

const initialState: ItemsState = {
  items: seedItems,
  status: 'idle',
  error: null,
}

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unable to load items.'
      })
  },
})

export default itemsSlice.reducer
