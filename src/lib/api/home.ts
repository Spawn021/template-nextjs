import api from '@/lib/axios'

export const getBanner = async () => {
  const response = await api.get('/site-customs/banner')
  return response.data.data.metadata
}
export const getSiteCustoms = async () => {
  const response = await api.get('/site-customs')
  return response.data.data
}
export const getProductNewRelease = async (id: string, limit: number) => {
  const response = await api.get(
    `contents/release?page=1&limit=${limit}${id ? `&userId=${id}` : ''}`,
  )
  return response.data.data
}
export const apiGetListNotifications = (params: any) => {
  return api.get(`notification`, params)
}
export const apiReadNotification = (id: number) => {
  return api.patch(`notification/${id}`)
}
export const apiReadAll = () => {
  return api.patch(`notification/read-all`)
}

export const apiDeleteNotification = (id: number) => {
  return api.delete(`notification/${id}`)
}
export const apiGetNotificationDetail = (id: number) => {
  return api.get(`notification/detail/${id}`)
}
