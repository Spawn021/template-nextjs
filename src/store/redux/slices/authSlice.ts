import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: {
    id: string
    email: string
    name: string
    accessToken: string
    refreshToken: string
    isVerified: boolean
  }
}

const initialState: AuthState = {
  user: {
    id: '',
    email: '',
    name: '',
    accessToken: '',
    refreshToken: '',
    isVerified: false,
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user
    },
    logout: (state) => {
      state.user = initialState.user
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
