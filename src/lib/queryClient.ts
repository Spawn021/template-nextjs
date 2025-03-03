import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Thời gian dữ liệu được coi là "tươi" (fresh) trước khi cần refetch
      staleTime: 5 * 60 * 1000, // 5 phút
      // Thời gian dữ liệu được giữ trong cache trước khi bị xóa
      gcTime: 10 * 60 * 1000, // 30 phút
      // Số lần thử lại khi query thất bại
      retry: 1,
      // Tự động refetch khi window focus (tùy chọn)
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Số lần thử lại khi mutation thất bại
      retry: 0,
    },
  },
})
