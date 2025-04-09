'use client'
import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/redux/store'
import useProfile from '@/hooks/useProfile'
import ShowPassword from '@/resources/svg/ShowPassword'
import HidePasswordIcon from '@/resources/svg/HidePassword'
import { regexStrongPassword } from '@/constants'
import { useShowMessage } from '@/components/Message'
import useModal from '@/hooks/useModal'
import { useQueryClient } from '@tanstack/react-query'

function ChangePasswordProfileModal() {
  const [form] = Form.useForm()
  const { id } = useSelector((state: RootState) => state.auth.user)
  const { onClose } = useModal()
  const showMessage = useShowMessage()
  const { fetchUserProfile, onUpdatePassword } = useProfile(id)
  const { data } = fetchUserProfile
  const [error, setError] = useState('')
  const [formHasErrorFromClient, setFormHasErrorFromClient] = useState(false)
  const queryClient = useQueryClient()

  const [isDirty, setIsDirty] = useState(false)
  const onValuesChange = (changedValues: any) => {
    setIsDirty(true)
  }
  const handleInputBlur = (field: string) => {
    form.validateFields([field])
  }
  const onFinish = (values: any) => {
    setFormHasErrorFromClient(false)

    const { currentPassword, newPassword } = values
    let params
    if (data && data?.isHasPassword) {
      params = { currentPassword, newPassword }
    } else {
      params = { newPassword }
    }
    onUpdatePassword(params, {
      onSuccess(data) {
        setTimeout(() => {
          showMessage('success', 'Change password successfully')
          queryClient.invalidateQueries({ queryKey: ['userProfile'] })
          onClose()
        }, 1000)
      },
      onError(error: string) {
        setError('Wrong password')
      },
    })
  }
  const handleKeyDown = (e: any) => {
    if (e.code === 'Space') {
      e.preventDefault()
    }
  }
  return (
    <Form
      name="change-password-form"
      initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
      layout="vertical"
      onValuesChange={onValuesChange}
      onFinish={onFinish}
      onFinishFailed={(errorInfo) => {
        setFormHasErrorFromClient(true)
      }}
      requiredMark={false}
      className="change-password-form"
    >
      {data && data.isHasPassword && (
        <>
          <Form.Item
            name="currentPassword"
            label={
              <span className="font-semibold">
                Current Password <span className="text-red-500">*</span>
              </span>
            }
            className="mb-4"
            rules={[{ required: true, message: 'Current password is required' }]}
            {...(!formHasErrorFromClient &&
              error && {
                help: !error ? '' : error,
                validateStatus: !error ? 'success' : 'error',
              })}
          >
            <Input.Password
              size="large"
              placeholder="Enter current password"
              maxLength={20}
              className="placeholder:text-xs"
              iconRender={(visible) => (
                <span>{visible ? <ShowPassword /> : <HidePasswordIcon />}</span>
              )}
              onBlur={() => handleInputBlur('currentPassword')}
              onKeyDown={handleKeyDown}
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label={
              <span className="font-semibold">
                New Password <span className="text-red-500">*</span>
              </span>
            }
            className="mb-4"
            rules={[
              { required: true, message: 'New password is required' },
              {
                pattern: new RegExp(regexStrongPassword),
                message:
                  'Password must have 8-20 characters including at least 1 uppercase letter, 1 lowercase letter, 1 number',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('currentPassword') !== value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('New password can not be the same as Current password'),
                  )
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Enter new password"
              maxLength={20}
              iconRender={(visible) => (
                <span>{visible ? <ShowPassword /> : <HidePasswordIcon />}</span>
              )}
              onBlur={() => {
                handleInputBlur('newPassword')
                form.validateFields(['confirmPassword'])
              }}
              onKeyDown={handleKeyDown}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label={
              <span className="font-semibold">
                Confirm Password <span className="text-red-500">*</span>
              </span>
            }
            dependencies={['newPassword']}
            className="mb-4"
            rules={[
              { required: true, message: 'Confirm password is required' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('Confirm password does not match new password')
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm new password"
              size="large"
              maxLength={20}
              iconRender={(visible) => (
                <span>{visible ? <ShowPassword /> : <HidePasswordIcon />}</span>
              )}
              onBlur={() => handleInputBlur('confirmPassword')}
              onKeyDown={handleKeyDown}
            />
          </Form.Item>
          <div>
            <Button
              disabled={!isDirty}
              type="primary"
              htmlType="submit"
              className="w-full h-[46px] px-3 py-1 bg-[#00aaf2] rounded-lg text-white font-semibold text-base mt-[10px]"
            >
              Save change
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}

export default ChangePasswordProfileModal
