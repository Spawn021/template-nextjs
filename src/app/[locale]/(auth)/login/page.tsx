'use client'
import useLogin from '@/hooks/useLogin'
import LoginForm from '@/components/Form/LoginForm'

export default function LoginPage() {
  const loginMutation = useLogin()
  return (
    <>
      <LoginForm loginMutation={loginMutation} />
    </>
  )
}
