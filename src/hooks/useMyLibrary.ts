import { useState } from 'react'
import { getLiBraryDetail, onDownload, onDownloadMulti } from '@/lib/api/product'
import { FilterTransaction } from '@/types/Profile'
import { useQuery } from '@tanstack/react-query'
import { handleGetPurchaseTransactions } from '@/lib/api/profile'
import { useContentDetailStore } from '@/store/zustand/useContentDetailStore'

export default function useMyLibrabry(id: string, params: FilterTransaction) {
  const [loading, setLoading] = useState(false)
  const [reload, setReload] = useState(0)
  // const { contentDetail, setContentDetail } = useContentDetailStore()

  const getContentDetail = async (id: string) => {
    setLoading(true)
    // setContentDetail({})
    const response = await getLiBraryDetail(id)
    if (response.data.meta.code === 0) {
      setLoading(false)
      // setContentDetail(response.data.data)
      return response.data.data
    } else {
      setLoading(false)
      throw new Error('Failed to fetch content detail')
    }
  }
  const handleDownload = async (id: string, params: any) => {
    const { type, mediaId, fileId } = params
    const newParam = mediaId && fileId ? { type, mediaId, fileId } : { type }
    const response = await onDownload(id, newParam)
    if (response?.data.meta?.code === 0) {
      window.open(response.data.data?.presignUrl)
    } else {
      throw response?.data.meta?.errorCode || 'Something wrong '
    }
  }

  const handleDownloadMulti = async (id: string, params: any) => {
    const urls: string[] = []
    const response = await onDownloadMulti(id, params)
    console.log('response', response)
    if (response?.data.meta?.code === 0) {
      const { data } = response.data
      for (let i = 0; i < data?.length; i++) {
        urls.push(data[i]?.presignUrl)
      }
      if (urls?.length > 0) {
        for (let k = 0; k < urls.length; k++) {
          setTimeout(() => {
            const link = document.createElement('a')
            link.href = urls[k]
            link.setAttribute('download', `${k}`)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(urls[k])
          }, 1000 * k)
        }
      }
      setTimeout(() => {}, 1)
    } else {
      throw response?.data.meta?.errorCode || 'Something wrong '
    }
  }

  const fetchTransactionPurchased = async () => {
    setLoading(true)
    const response = await handleGetPurchaseTransactions(params)
    if (response.data.meta.code === 0) {
      setLoading(false)
      return response.data.data
    } else {
      setLoading(false)
      throw new Error('Failed to fetch transaction purchased')
    }
  }
  const { data: contentDetail } = useQuery({
    queryKey: ['contentDetailLibrary', id],
    queryFn: () => getContentDetail(id),
    enabled: !!id,
  })
  const { data: transactionPurchased } = useQuery({
    queryKey: ['transactionPurchased', params],
    queryFn: () => fetchTransactionPurchased(),
  })

  return {
    transactionPurchased,
    contentDetail,
    loading,
    handleDownload,
    handleDownloadMulti,
  }
}
