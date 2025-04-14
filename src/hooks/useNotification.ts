import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  apiDeleteNotification,
  apiGetListNotifications,
  apiGetNotificationDetail,
  apiReadAll,
  apiReadNotification,
} from '@/lib/api/home'

function useNotification(id: any) {
  const queryClient = useQueryClient()
  const getListNotification = async ({ page = 1 }) => {
    const response = await apiGetListNotifications(page)

    if (response?.data.meta.code === 0) {
      const total = response.data.data.meta.totalItems
      return {
        ...response.data.data,
        total,
        nextPage: total > page * 10 ? page + 1 : null,
      }
    } else throw new Error('error')
  }
  const readNotifications = async (id: number) => {
    const response = await apiReadNotification(id)
    if (response?.data.meta.code === 0) {
      return response.data.data
    } else throw new Error('error')
  }
  const readAllNotifications = async () => {
    const response = await apiReadAll()
    if (response?.data.meta.code === 0) {
      return response.data.data
    } else throw new Error('error')
  }
  const deleteNotification = async (id: number) => {
    const response = await apiDeleteNotification(id)
    if (response?.data.meta.code === 0) {
      return response.data.data
    } else throw new Error('error')
  }
  const getNotificationDetail = async () => {
    const response = await apiGetNotificationDetail(id)
    if (response?.data.meta.code === 0) {
      return response.data.data
    } else throw new Error('error')
  }

  const useFetchInfiniteNotification = useInfiniteQuery({
    queryKey: ['notification'],
    queryFn: ({ pageParam = 1 }) => getListNotification({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  })

  const onReadNotification = useMutation({
    mutationFn: (id: number) => readNotifications(id),
    onSuccess: (data) => {
      return data
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] })
    },
  })
  const onDeleteNotification = useMutation({
    mutationFn: (id: any) => deleteNotification(id),
    onSuccess: (data) => {
      return data
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] })
    },
  })
  const onReadAllNotification = useMutation({
    mutationFn: () => readAllNotifications(),
    onSuccess: (data) => {
      return data
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] })
    },
  })
  const fetchNotificationDetail = useQuery({
    queryKey: ['notificationDetail', id],
    queryFn: getNotificationDetail,
    enabled: !!id,
  })
  const total = useFetchInfiniteNotification.data?.pages.reduce(
    (total, el) => el?.items?.length + total,
    0,
  )
  const unReadItems = useFetchInfiniteNotification.data?.pages.reduce((total, el) => {
    return total + el.items.filter((item: any) => item.isRead === false).length
  }, 0)
  return {
    useFetchInfiniteNotification,
    fetchNotificationDetail,
    total,
    unReadItems,
    onReadNotification: onReadNotification.mutate,
    onReadAllNotification: onReadAllNotification.mutate,
    onDeleteNotification: onDeleteNotification.mutate,
  }
}

export default useNotification
