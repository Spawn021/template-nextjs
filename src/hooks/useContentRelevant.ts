import { useQuery } from '@tanstack/react-query'
import { getContentRelevant } from '@/lib/api/product'

export default function useContentRelevant(
  name: string,
  ids?: string,
  id?: string,
  series?: string,
  userId?: string,
) {
  const finalId = id ? id + ',' + ids : ids
  const finalSeries = series
  const fetchContentRelevant = async () => {
    const response = await getContentRelevant({
      ...(finalSeries && { series: finalSeries }),
      withoutContentIds: finalId,
      userId,
      type: 'recomendation',
    })
    if (response?.data.meta?.code === 0) {
      return response.data?.data.items
    } else {
      throw new Error('Failed to fetch content relevant')
    }
  }
  const useFetchContentRelevant = useQuery({
    queryKey: ['contentRelevant', finalId, finalSeries, userId],
    queryFn: fetchContentRelevant,
    select: (data) => {
      return data
    },
  })

  return { useFetchContentRelevant }
}
