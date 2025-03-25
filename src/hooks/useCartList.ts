import { getListCartUser } from '@/lib/api/product'
import { useQuery } from '@tanstack/react-query'

const useCartList = (accessToken: string) => {
  const fetchCartList = async () => {
    const response = await getListCartUser()
    if (response?.data.meta?.code === 0) {
      return response.data.data.items
    } else {
      throw new Error('Failed to fetch cart list')
    }
  }
  return useQuery({
    queryKey: ['cartList', accessToken],
    queryFn: fetchCartList,
    enabled: accessToken ? true : false,
  })
}
export default useCartList
