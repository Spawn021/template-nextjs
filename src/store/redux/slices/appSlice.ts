import { createSlice } from '@reduxjs/toolkit'
import { set } from 'react-hook-form'
export interface AppSlice {
  openDrawerCart: boolean
  typeModal: number
  open: boolean
}
const initialState: AppSlice = {
  openDrawerCart: false,
  typeModal: 0,
  open: false,
}
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDrawerCart: (state: AppSlice, action) => {
      return { ...state, openDrawerCart: action.payload }
    },
    openModal: (state: AppSlice, action) => {
      return { ...state, open: action.payload }
    },
    setTypeModal: (state: AppSlice, action) => {
      return { ...state, typeModal: action.payload }
    },
  },
})
export const { toggleDrawerCart, setTypeModal, openModal } = appSlice.actions
export default appSlice.reducer
