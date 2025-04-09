import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  user: {
    id: string
    email: string
    name: string
    accessToken: string
    refreshToken: string
    isVerified: boolean
    provider?: string
  }
  emailSending: string
}

const initialState: AuthState = {
  user: {
    id: '',
    email: '',
    name: '',
    accessToken: '',
    refreshToken: '',
    isVerified: false,
    provider: '',
  },
  emailSending: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state: AuthState, action) => {
      state.user = action.payload.user
    },
    logout: (state) => {
      state.user = initialState.user
    },
    setEmailSending: (state: AuthState, action) => {
      return {
        ...state,
        emailSending: action.payload,
      }
    },
    setAccessToken: (state: AuthState, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          accessToken: action.payload,
        },
      }
    },
    setEmail: (state: AuthState, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload,
        },
      }
    },
  },
})

export const { loginSuccess, logout, setEmailSending, setAccessToken, setEmail } =
  authSlice.actions
export default authSlice.reducer
