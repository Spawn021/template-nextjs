import { useShowMessage } from '@/components/Message'
import { messageError } from '@/constants'
import {
  handleRequestVerifyCode,
  handleSendCodeToNewEmail,
  handleUpdatePassword,
  handleUpdateProfile,
  handleVerifyNewEmail,
  handleVerifyOldEmail,
} from '@/lib/api/profile'
import { getProfile } from '@/lib/api/user'
import { useMutation, useQuery } from '@tanstack/react-query'
import { on } from 'events'

function useProfile(id: string) {
  const showMessage = useShowMessage()
  const getUserProfile = async () => {
    const response = await getProfile()
    if (response.data.meta.code === 0) {
      return response.data.data
    }
  }
  const updateUserProfile = async (params: any) => {
    const response = await handleUpdateProfile(id, params)
    if (response.data.meta.code === 0) {
      return response.data.data
    } else {
      const code = response.data.meta.code as keyof typeof messageError
      const message = messageError[code]
      showMessage('error', message)
    }
  }
  const updatePassword = async (params: any) => {
    const response = await handleUpdatePassword(id, params)
    if (response?.data?.meta?.code === 0) {
      return response.data.data
    } else {
      throw response?.data.meta?.errorCode || 'Something wrong '
    }
  }
  const requestVerifyCode = async () => {
    const response = await handleRequestVerifyCode(id)
    if (response?.data.meta.code === 0) {
      return response?.data.meta?.code
    } else {
      throw response?.data.meta?.errorCode || 'Something call in profile wrong'
    }
  }
  const verifyOldEmail = async (params: any) => {
    const response = await handleVerifyOldEmail(id, { code: params })
    if (response?.data.meta.code === 0) {
      return response?.data.meta?.code
    } else {
      throw response?.data.meta?.errorCode || 'Something call in profile wrong'
    }
  }
  const sendingEmailNew = async (params: any) => {
    const response = await handleSendCodeToNewEmail(id, params)
    if (response?.data.meta.code === 0) {
      return response?.data.meta?.code
    } else {
      throw response?.data.meta?.errorCode || 'Something call in profile wrong'
    }
  }
  const verifyNewEmail = async (params: any) => {
    const response = await handleVerifyNewEmail(id, params)
    if (response?.data.meta.code === 0) {
      return response?.data.data
    } else {
      throw response?.data.meta?.errorCode || 'Something call in profile wrong'
    }
  }
  const fetchUserProfile = useQuery({
    queryKey: ['userProfile', id],
    queryFn: getUserProfile,
    enabled: !!id,
    select: (data) => {
      return data
    },
  })
  const updateProfile = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      return data
    },
  })
  const updatePasswordMultation = useMutation({
    mutationFn: updatePassword,
    onSuccess(data) {
      return data
    },
    onError(error: string) {},
  })
  const requestVerifyCodeMultation = useMutation({
    mutationFn: requestVerifyCode,
    onSuccess(data) {
      return data
    },
    onError(error: string) {},
  })
  const verifyOldEmailMultation = useMutation({
    mutationFn: verifyOldEmail,
    onSuccess(data) {
      return data
    },
    onError(error: string) {},
  })
  const sendingEmailNewMutation = useMutation({
    mutationFn: sendingEmailNew,
    onSuccess(data) {
      return data
    },
    onError(error: string) {},
  })
  const verifyNewEmailMultation = useMutation({
    mutationFn: verifyNewEmail,
    onSuccess(data) {
      return data
    },
    onError(error: string) {},
  })
  return {
    fetchUserProfile,
    onUpdateProfile: updateProfile.mutate,
    onUpdatePassword: updatePasswordMultation.mutate,
    onRequestVerifyCode: requestVerifyCodeMultation.mutate,
    onSendingEmailNew: sendingEmailNewMutation?.mutate,
    onVerifyOldEmail: verifyOldEmailMultation?.mutate,
    onVerifyNewEmail: verifyNewEmailMultation?.mutate,
  }
}

export default useProfile
