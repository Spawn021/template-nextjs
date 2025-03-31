import api from '@/lib/axios'

export const getProfile = () => {
  return api.get('users/profile')
}
