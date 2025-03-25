import { deleteCartUser } from '@/lib/api/product'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteCart = () => {
  const queryClient = useQueryClient()
  const deleteItemCart = async (params: { ids: string[] }) => {
    const response = await deleteCartUser(params)
    if (response?.data.meta?.code === 0) {
      return response.data.code
    } else {
      throw new Error('Failed to delete cart item')
    }
  }
  return useMutation({
    mutationFn: deleteItemCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contentDetail'] })
      queryClient.invalidateQueries({ queryKey: ['cartList'] })
    },
  })
}
