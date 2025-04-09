import { useQuery } from '@tanstack/react-query'
import { FilterTransaction } from '@/types/Profile'
import { handleGetTransactionHistory } from '@/lib/api/profile'
import { useState } from 'react'

export default function useTransactionHistory(params: FilterTransaction) {
  const [loading, setLoading] = useState(false)
  const fetchTransaction = async () => {
    setLoading(true)
    const response = await handleGetTransactionHistory(params)
    if (response?.data.meta?.code === 0) {
      setLoading(false)
      return response?.data.data
    } else {
      setLoading(false)
      throw response?.data.meta?.errorCode || 'Something wrong '
    }
  }

  const { data: transactions } = useQuery({
    queryKey: ['transaction-history', params],
    queryFn: fetchTransaction,
    refetchOnWindowFocus: false,
    enabled: !!params,
  })

  return {
    transactions,
    loading,
  }
}
