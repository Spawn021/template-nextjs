import { useState } from 'react'
import { useRouter } from '@/i18n/routing'
import { apiGetContentDetail } from '@/lib/api/product'
import { APP_URL } from '@/constants'
function useContentDetail() {
  const [contentDetail, setContentDetail] = useState({}) as any
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const getContentDetail = async (id: any, userId: string) => {
    setIsLoading(true)
    const response = await apiGetContentDetail(id, { userId })

    if (response?.data.meta?.code === 0) {
      setContentDetail(response.data.data)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      router.replace(APP_URL.NOT_FOUND)
    }
  }
  return { getContentDetail, contentDetail }
}

export default useContentDetail
