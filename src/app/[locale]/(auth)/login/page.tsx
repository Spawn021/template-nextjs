'use client'
import useLogin from '@/hooks/useLogin'
import LoginForm from '@/components/Form/LoginForm'
import useContentDetail from '@/hooks/useContentDetail'

export default function LoginPage() {
  const { addToCartAfterLogin } = useContentDetail()
  const loginMutation = useLogin(() => {
    addToCartAfterLogin()
  })
  return (
    <>
      <LoginForm loginMutation={loginMutation} />
    </>
  )
}
