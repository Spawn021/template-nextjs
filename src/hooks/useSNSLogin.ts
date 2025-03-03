import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { loginWithApp } from '@/lib/api/auth'
import { loginSuccess } from '@/store/redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from '@/i18n/routing'
import { getTypeProvider } from '@/lib/utils'
import { useSession, signIn } from 'next-auth/react'
import { AuthSNS } from '@/lib/constant'
import { toast } from 'react-toastify'
export default function useSNSLogin() {
  const { data: session, update } = useSession()
  const dispatch = useDispatch()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const setProvider = (provider: string | null) => {
    if (provider) {
      localStorage.setItem('selectedProvider', provider)
    } else {
      localStorage.removeItem('selectedProvider')
    }
  }
  const getProvider = () => localStorage.getItem('selectedProvider')

  const mutation = useMutation({
    mutationFn: async (provider: string) => {
      if (!session?.accessToken) {
        setProvider(provider)
        await signIn(provider, { redirect: false })
        await update()
        return
      }
      const params: AuthSNS = {
        accessToken: session?.accessToken,
        tokenSecret: session?.tokenSecret || '',
        type: getTypeProvider(provider),
      }
      setIsLoading(true)
      return loginWithApp(params)
    },
    onSuccess: (response) => {
      if (response.meta.code === 0) {
        dispatch(loginSuccess({ user: response.data }))
        router.push('/')
        setIsLoading(false)
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    },
    onError: (error) => {
      setIsLoading(false)
    },
    onSettled: () => {
      setIsLoading(false)
    },
  })

  useEffect(() => {
    const provider = getProvider()
    if (provider && session?.accessToken && !isLoading) {
      mutation.mutate(provider)
      setProvider(null)
    }
  }, [session?.accessToken])

  return { ...mutation, isLoading }
}
