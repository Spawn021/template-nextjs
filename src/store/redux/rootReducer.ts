import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import languageReducer from './slices/languageSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
})

export default rootReducer
