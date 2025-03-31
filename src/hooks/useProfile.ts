import { getProfile } from '@/lib/api/user'
import { useQuery } from '@tanstack/react-query'

function useProfile(id: string) {
  const getUserProfile = async () => {
    const response = await getProfile()
    if (response.data.meta.code === 0) {
      return response.data.data
    }
  }
  const fetchUserProfile = useQuery({
    queryKey: ['userProfile', id],
    queryFn: getUserProfile,
    enabled: !!id,
    select: (data) => {
      return data
    },
  })
  return { fetchUserProfile }
}

export default useProfile
