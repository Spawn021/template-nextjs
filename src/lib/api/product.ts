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
export const apiGetContentDetail = (id: string, userId: string) => {
  return api.get(`contents/${id}${userId && `?userId=${userId}`}`)
}
export const getContentRelevant = (params: any) => {
  return api.get(`contents`, { params })
}
export const apiAddToCart = (params: any) => {
  return api.post(`carts`, params)
}
export const getListCartUser = () => {
  return api.get(`carts`)
}
export const deleteCartUser = (params: any) => {
  return api.delete(`carts`, { data: params })
}
export const getLiBraryDetail = (id: any) => {
  return api.get(`contents/${id}/library`)
}
export const onDownload = (id: string, params: any) => {
  return api.get(`contents/${id}/download`, { params })
}

export const onDownloadMulti = (id: string, data: any) => {
  return api.post(`contents/${id}/downloads`, data)
}
export const apiGetRecommendation = (keyword: string, id: string) => {
  return api.get(`contents/recommendation?keyword=${keyword}${id ? `&userId=${id}` : ''}`)
}
