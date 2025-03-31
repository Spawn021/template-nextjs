import api from '@/lib/axios'

export const getClientKeyForSetup = () => {
  return api.get('stripe/setup-intents')
}
export const handleUpdateCardPayment = (
  id: string,
  params: { paymentMethodId: string },
) => {
  return api.patch(`users/${id}/change-card`, params)
}
export const getClientSecret = (params: any) => {
  return api.post(`stripe/create-payment`, params)
}
export const apiPurchaseTransactionFree = (params: any) => {
  return api.post(`purchase-transactions/free`, params)
}
export const apiGetPurchaseTransaction = (id: string) => {
  return api.get(`purchase-transactions/payment/${id}`)
}
