import { createSlice } from '@reduxjs/toolkit'

export interface Content {
  cart: any
  listCheckout: string[]
  contentRelevant: {
    series: string[]
    withoutContentIds: string[]
  }
  listItemUnavailable: string[]
}
const initialState: Content = {
  cart: [],
  listCheckout: [],
  contentRelevant: {
    series: [],
    withoutContentIds: [],
  },
  listItemUnavailable: [],
}
const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setAddToCart: (state: Content, action) => {
      state.cart = action.payload
    },
    setListCheckout: (state: Content, action) => {
      state.listCheckout = action.payload
    },
    setContentRelevant: (state: Content, action) => {
      return {
        ...state,
        contentRelevant: {
          series: action.payload.series,
          withoutContentIds: action.payload.withoutContentIds,
        },
      }
    },
    setListItemUnavailable: (state: Content, action) => {
      state.listItemUnavailable = action.payload
    },
  },
})
export const {
  setAddToCart,
  setListCheckout,
  setContentRelevant,
  setListItemUnavailable,
} = contentSlice.actions
export default contentSlice.reducer
