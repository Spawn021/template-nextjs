import api from '@/lib/axios'
import { parseQueryParams } from '@/lib/utils'
import { FilterTransaction } from '@/types/Profile'

export const handleGetPurchaseTransactions = (params: FilterTransaction) => {
  const queryParams = parseQueryParams(params)
  return api.get(`purchase-transactions/library?${queryParams ? `${queryParams}` : ''}`)
}
export const getFileStreamingAudio = (id: string, params: any) => {
  return api.get(`contents/${id}/listen?mediaId=${params.mediaId}`)
}
export const handleGetTransactionHistory = (params: FilterTransaction) => {
  const queryParams = parseQueryParams(params)
  return api.get(`purchase-transactions?${queryParams ? `${queryParams}` : ''}`)
}
export const handleUpdateProfile = (id: string, params: any) => {
  return api.patch(`users/${id}`, params)
}
export const handleUpdatePassword = (id: string, params: any) => {
  return api.patch(`users/${id}/change-password`, params)
}
export const handleRequestVerifyCode = (id: string) => {
  return api.post(`users/${id}/code/current-email`)
}
export const handleVerifyOldEmail = (id: string, params: any) => {
  return api.post(`users/${id}/code/verify-current-email`, params)
}
export const handleSendCodeToNewEmail = (id: string, params: any) => {
  return api.post(`users/${id}/code/new-email`, params)
}
export const handleVerifyNewEmail = (id: string, params: any) => {
  return api.post(`users/${id}/code/verify-new-email`, params)
}
