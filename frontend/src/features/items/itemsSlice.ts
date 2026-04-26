import { createSlice } from '@reduxjs/toolkit'
import type { ItemCatalogEntry } from '../../types/sales'
import { catalogItems as seedItems } from '../../services/mockData'

type ItemsState = {
  items: ItemCatalogEntry[]
}

const initialState: ItemsState = {
  items: seedItems,
}

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
})

export default itemsSlice.reducer
