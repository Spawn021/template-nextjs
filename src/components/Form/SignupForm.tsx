'use client'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input, Button } from 'antd'
import { z } from 'zod'
import { signupSchema } from '@/schemas/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@/i18n/routing'
import { toast } from 'react-toastify'
import { registerCode } from '@/lib/api/auth'

type SignupForm = z.infer<typeof signupSchema>
type SignUpData = Omit<SignupForm, 'confirmPassword'>
export default function SignupForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  })
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: ({ email, password }: SignUpData) => {
      return registerCode(email, password)
    },
    onSuccess: (response) => {
      if (response.meta.code === 0) {
        toast.success('Verification mail has been sent. Please check your email.')
        router.push('/login')
      } else {
        toast.error(response.meta.msg)
      }
    },
    onError: (error) => {
      toast.error('Something went wrong. Please try again.')
    },
  })

  const onSubmit = (data: SignupForm) => {
    const { email, password } = data
    mutation.mutate({ email, password })
  }

  return (
    <Form className="form-auth" layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label={
          <span className="font-semibold">
            Email <span className="text-red-500">*</span>
          </span>
        }
        className="mb-4"
        validateStatus={errors.email ? 'error' : ''}
        help={errors.email?.message}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              size="large"
              className="placeholder:text-sm rounded-[8px] border-[#d9d9d9]"
              placeholder="Enter your email"
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={
          <span className="font-semibold">
            Password <span className="text-red-500">*</span>
          </span>
        }
        className="mb-4"
        validateStatus={errors.password ? 'error' : ''}
        help={errors.password?.message}
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password {...field} size="large" placeholder="Enter your password" />
          )}
        />
      </Form.Item>
      <Form.Item
        label={
          <span className="font-semibold">
            Confirm Password <span className="text-red-500">*</span>
          </span>
        }
        className="mb-4"
        validateStatus={errors.confirmPassword ? 'error' : ''}
        help={errors.confirmPassword?.message}
      >
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input.Password
              {...field}
              size="large"
              className="placeholder:text-sm"
              placeholder="Re - enter your password"
            />
          )}
        />
      </Form.Item>
      <Form.Item className="mb-4">
        <Button
          className="p-5 bg-[#00AAF2] text-white text-sm font-semibold hover:bg-[#fff] hover:text-[#00AAF2] py-6"
          htmlType="submit"
          block
        >
          Send verification mail
        </Button>
      </Form.Item>
    </Form>
  )
}
