import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import languageReducer from './slices/languageSlice'
import contentReducer from './slices/contentSlice'
import appReducer from './slices/appSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
  content: contentReducer,
  app: appReducer,
})

export default rootReducer
