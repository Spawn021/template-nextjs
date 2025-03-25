import { getProductNewRelease } from '@/lib/api/home'
import { useQuery } from '@tanstack/react-query'

export default function useGetProductRelease(id: string, limit: number) {
  return useQuery({
    queryKey: ['productNewRelease', id, limit],
    queryFn: () => getProductNewRelease(id, limit),
  })
}
