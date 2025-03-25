import { createSlice } from '@reduxjs/toolkit'
export interface AppSlice {
  openDrawerCart: boolean
}
const initialState: AppSlice = {
  openDrawerCart: false,
}
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDrawerCart: (state: AppSlice, action) => {
      return { ...state, openDrawerCart: action.payload }
    },
  },
})
export const { toggleDrawerCart } = appSlice.actions
export default appSlice.reducer
