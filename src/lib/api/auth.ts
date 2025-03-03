import api from '@/lib/axios'
import { AuthSNS } from '@/lib/constant'

export const loginWithAPI = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}
export const logout = async () => {
  const response = await api.post('/auth/logout')
  return response.data
}
export const loginWithApp = async (params: AuthSNS) => {
  const response = await api.post('auth/login/sns', params)
  return response.data
}
export const registerCode = async (email: string, password: string) => {
  const response = await api.post('/auth/register-code', { email, password })
  return response.data
}
