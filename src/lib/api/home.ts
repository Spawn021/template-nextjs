import api from '@/lib/axios'

export const getBanner = async () => {
  const response = await api.get('/site-customs/banner')
  return response.data.data.metadata
}
