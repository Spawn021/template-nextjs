import {
  apiGetPurchaseTransaction,
  apiPurchaseTransactionFree,
  getClientKeyForSetup,
  getClientSecret,
  handleDeleteCard,
  handleUpdateCardPayment,
} from '@/lib/api/payment'
import { RootState } from '@/store/redux/store'
import { InfoPayment } from '@/types/Home'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { on } from 'events'
import { useSelector } from 'react-redux'

function useCardPayment() {
  const { accessToken, id } = useSelector((state: RootState) => state.auth.user)
  const queryClient = useQueryClient()
  const getClientSecretKeyForSetup = async () => {
    const response = await getClientKeyForSetup()
    if (response) {
      return response.data
    } else {
      return null
    }
  }
  const updateCardPayment = async (params: { paymentMethodId: string }) => {
    const response = await handleUpdateCardPayment(id, params)
    if (response?.data.meta?.code === 0) {
      return response?.data.meta?.code
    } else {
      throw Error(response?.data.meta?.errorCode || 'Update card error')
    }
  }
  const deleteCardPayment = async () => {
    const response = await handleDeleteCard(id)
    if (response?.data.meta?.code === 0) {
      return response?.data.meta?.code
    } else {
      throw Error(response?.data.meta?.errorCode || 'Update card error')
    }
  }
  const getClientSecretConfirm = async (data: InfoPayment) => {
    const response = await getClientSecret(data)
    return response
  }
  const purchaseTransactionFree = async (
    data: InfoPayment,
    callbackSuccess: any,
    callbackFail: any,
  ) => {
    const response = await apiPurchaseTransactionFree(data)
    if (response?.data.meta?.code === 0) {
      callbackSuccess()
    } else {
      callbackFail()
    }
  }
  const checkTransactionPuchased = async (id: string) => {
    const response = await apiGetPurchaseTransaction(id)
    if (response?.data.meta?.code === 0) {
      return response?.data.data
    } else {
      throw response?.data.meta?.errorCode || 'Something wrong '
    }
  }
  const useFetchSecretKeyForSetup = useQuery({
    queryKey: ['card-setup'],
    queryFn: getClientSecretKeyForSetup,
    enabled: !!accessToken,
    select: (data) => {
      return data
    },
  })
  const updateCardMultation = useMutation({
    mutationFn: updateCardPayment,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
    },
  })
  const deleteCardMultation = useMutation({
    mutationFn: deleteCardPayment,
    onSuccess(data) {
      return data
    },
    onError(error: string) {},
  })

  return {
    useFetchSecretKeyForSetup,
    onUpdateCard: updateCardMultation?.mutate,
    getClientSecretConfirm,
    purchaseTransactionFree,
    checkTransactionPuchased,
    onDeleteCard: deleteCardMultation?.mutate,
  }
}

export default useCardPayment
