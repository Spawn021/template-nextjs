import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/lib/api/product'
import { filterVoice } from '@/lib/constant'

export default function useVoice(id: string, params: filterVoice) {
  return useQuery({
    queryKey: ['voice', id, params],
    queryFn: () => getProducts(id, params),
  })
}
