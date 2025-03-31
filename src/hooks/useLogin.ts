import { useMutation } from '@tanstack/react-query'
import { loginWithAPI } from '@/lib/api/auth'
import { loginSuccess } from '@/store/redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from '@/i18n/routing'
import { toast } from 'react-toastify'
import { useSearchParams } from 'next/navigation'

export default function useLogin(onLoginSuccess?: () => void) {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginWithAPI(email, password),
    onSuccess: async (response) => {
      if (response.meta.code === 0) {
        dispatch(loginSuccess({ user: response.data }))
        await new Promise((resolve) => setTimeout(resolve, 200))
        onLoginSuccess?.()
        const redirect = searchParams.get('redirect') || '/'
        router.push(redirect)
      } else {
        toast.error('Password or email is incorrect. Please try again.')
      }
    },
    onError: (error) => {
      toast.error('Something went wrong. Please try again.')
    },
  })
}
