'use client'
import { TYPE_MODAL } from '@/constants'
import useProfile from '@/hooks/useProfile'
import { setTypeModal } from '@/store/redux/slices/appSlice'
import { setEmailSending } from '@/store/redux/slices/authSlice'
import { RootState } from '@/store/redux/store'
import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function ChangeEmailModal() {
  const [form] = Form.useForm()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const { id } = useSelector((state: RootState) => state.auth.user)
  const { onSendingEmailNew } = useProfile(id)
  const [formHasErrorFromClient, setFormHasErrorFromClient] = useState(false)
  const onFinish = (values: any) => {
    setFormHasErrorFromClient(false)
    const { email } = values
    onSendingEmailNew(
      { email },
      {
        onSuccess() {
          dispatch(setTypeModal(TYPE_MODAL.VERIFY_EMAIL_NEW))
          dispatch(setEmailSending(email))
          setError('')
        },
        onError() {
          setError('Email address has been linked to another account')
        },
      },
    )
  }
  const handleInputBlur = (field: string) => {
    form.validateFields([field])
  }
  const handleKeyDown = (e: any) => {
    if (e.code === 'Space') {
      e.preventDefault()
    }
  }
  return (
    <Form
      name="change-email"
      form={form}
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={(errorInfo) => {
        setFormHasErrorFromClient(true)
      }}
      requiredMark={false}
    >
      <div className="text-base mb-4 ">
        Please enter new email address and submit within 10 minutes. Otherwise, you need
        to redo the changing process from the beginning
      </div>
      <Form.Item
        name="email"
        className="form-group"
        label={
          <span className="font-semibold">
            Email <span className="text-red-500">*</span>
          </span>
        }
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Email is wrong format' },
        ]}
        {...(!formHasErrorFromClient && {
          help: !error ? '' : error,
          validateStatus: !error ? 'success' : 'error',
        })}
        normalize={(value) => value.trim()}
      >
        <Input
          placeholder="Enter email address"
          onKeyDown={handleKeyDown}
          onBlur={() => handleInputBlur('email')}
        />
      </Form.Item>
      <div>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full h-[46px] px-3 py-1 bg-[#00aaf2] rounded-lg text-white font-semibold text-base mt-[10px]"
        >
          Submit
        </Button>
      </div>
    </Form>
  )
}

export default ChangeEmailModal
