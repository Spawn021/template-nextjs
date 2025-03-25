import { useRouter } from '@/i18n/routing'
import { apiAddToCart, apiGetContentDetail } from '@/lib/api/product'
import { RootState } from '@/store/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setAddToCart } from '@/store/redux/slices/contentSlice'
import { useShowMessage } from '@/components/Message'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

function useContentDetail(contentId?: any) {
  const showMessage = useShowMessage()
  const dispatch = useDispatch()
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.auth)
  const { cart } = useSelector((state: RootState) => state.content)
  const queryClient = useQueryClient()

  const { data: contentDetail } = useQuery({
    queryKey: ['contentDetail', contentId, user?.id],
    queryFn: () => apiGetContentDetail(contentId, user?.id),
    enabled: !!contentId,
    select: (response) => {
      return response?.data?.data
    },
  })

  const addToCartMutation = useMutation({
    mutationFn: (content: any) => apiAddToCart({ contentIds: content.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contentDetail'] })
      queryClient.invalidateQueries({ queryKey: ['cartList'] })
    },
    onError: (error) => {
      console.error('Add to cart error:', error)
      showMessage('error', 'Failed to add to cart')
    },
  })

  const addToCart = async (contentDetail: any) => {
    const { title, actor, images, unitPrice, id, series, category } = contentDetail
    const data = {
      content: {
        images,
        title,
        unitPrice,
        actor,
        id,
        series,
        status: 'on-sale',
        category,
      },
      unitPrice: +unitPrice,
      checked: true,
    }
    const newListCart = [...cart]
    const isExist = newListCart?.find((el: any) => el?.content?.id === id)
    if (!isExist) {
      newListCart.unshift(data)
    }
    if (user.accessToken) {
      addToCartMutation.mutate(contentDetail)
    }
    dispatch(setAddToCart(newListCart))
    showMessage('success', 'Add to cart successfully')
  }
  const addToCartAfterLogin = async () => {
    const listContentIds = cart.map((item: any) => item.content.id)
    const response = await apiAddToCart({ contentIds: listContentIds.join(',') })
    if (response?.data.meta?.code === 0) {
      dispatch(setAddToCart([]))
    }
  }
  return { contentDetail, addToCart, addToCartAfterLogin }
}

export default useContentDetail
