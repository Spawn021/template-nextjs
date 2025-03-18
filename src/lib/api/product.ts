import { filterVoice } from '@/lib/constant'
import api from '@/lib/axios'
export const getProducts = async (id: string, params: filterVoice) => {
  const response = await api.get(`contents`, {
    params: {
      ...params,
      ...(id ? { userId: id } : {}),
    },
  })
  return response.data.data
}
export const getCategories = async () => {
  const response = await api.get('categories/admin?limit=999999&onSale=true')
  return response.data.data
}
export const getTags = async () => {
  const response = await api.get('tags?limit=1000&onSale=true')
  return response.data.data
}
export const apiGetContentDetail = (id: any, params: any) => {
  return api.get(`contents/${id}`, params)
}
