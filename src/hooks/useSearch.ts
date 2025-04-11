import { apiGetRecommendation } from '@/lib/api/product'
import { useQuery } from '@tanstack/react-query'

function useSearch({ keyword, id }: { keyword: string; id: string }) {
  const getRecommendation = async () => {
    const response = await apiGetRecommendation(keyword, id)
    if (response.data.meta.code === 0) {
      return response.data.data
    } else {
      throw new Error('error')
    }
  }
  const useFetchRecommendation = useQuery({
    queryKey: ['recommendation', keyword, id],
    queryFn: getRecommendation,
    select: (data) => {
      return data
    },
  })

  return { useFetchRecommendation }
}

export default useSearch
