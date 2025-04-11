import React from 'react'
import { apiGetLoginHistory } from '@/lib/api/profile'
import { useInfiniteQuery } from '@tanstack/react-query'

function useLoginHistory() {
  const getLoginHistory = async ({ page = 1 }) => {
    const response = await apiGetLoginHistory(page)
    if (response.data.meta.code === 0) {
      const total = response.data.data.meta.totalItems

      return {
        ...response.data.data,
        total,
        nextPage: total > page * 10 ? page + 1 : null,
      }
    } else {
      throw new Error('error')
    }
  }
  const useFetchInfiniteHistoryLogin = useInfiniteQuery({
    queryKey: ['login-history'],
    queryFn: ({ pageParam = 1 }) => getLoginHistory({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  })
  const total = useFetchInfiniteHistoryLogin.data?.pages.reduce(
    (total, el) => el?.items?.length + total,
    0,
  )
  return { useFetchInfiniteHistoryLogin, total }
}

export default useLoginHistory
