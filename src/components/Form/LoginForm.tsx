'use client'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input, Button } from 'antd'
import { z } from 'zod'
import { loginSchema } from '@/schemas/auth'

type LoginForm = z.infer<typeof loginSchema>

interface LoginFormProps {
  loginMutation: any
}

export default function LoginForm({ loginMutation }: LoginFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data)
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
              className="placeholder:text-sm"
              placeholder="Email"
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
            <Input.Password
              {...field}
              size="large"
              className="placeholder:text-red-500"
              placeholder="Password"
            />
          )}
        />
      </Form.Item>
      <Form.Item className="mb-4">
        <span className="text-sm text-[#00aaf2] cursor-pointer font-semibold">
          Forgot password?
        </span>
      </Form.Item>
      <Form.Item className="mb-4">
        <Button
          className="p-5 bg-[#00AAF2] text-white text-sm font-semibold hover:bg-[#fff] hover:text-[#00AAF2] py-6"
          htmlType="submit"
          block
          loading={loginMutation.isPending}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}
