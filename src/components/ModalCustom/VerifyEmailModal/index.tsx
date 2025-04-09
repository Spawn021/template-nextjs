'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/redux/store'
import { Form, Input } from 'antd'
import type { GetProps } from 'antd'
import ReSendBtn from '@/components/ModalCustom/VerifyEmailModal/ReSendBtn'
import useProfile from '@/hooks/useProfile'
import useModal from '@/hooks/useModal'
import { setTypeModal } from '@/store/redux/slices/appSlice'
import { TYPE_MODAL } from '@/constants'
import { setAccessToken, setEmail } from '@/store/redux/slices/authSlice'
import { useQueryClient } from '@tanstack/react-query'
import { useShowMessage } from '@/components/Message'
type OTPProps = GetProps<typeof Input.OTP>

function VerifyEmailModal() {
  const showMessage = useShowMessage()
  const [form] = Form.useForm()
  const { onClose } = useModal()
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const email = useSelector((state: RootState) => state.auth.emailSending)
  const typeModal = useSelector((state: RootState) => state.app.typeModal)
  const { id } = useSelector((state: RootState) => state.auth.user)
  const { onVerifyOldEmail, onRequestVerifyCode, onVerifyNewEmail } = useProfile(id)
  const [otp, setOtp] = useState<string>()
  const [error, setError] = useState('')
  const onAction = (fn: any, params: any) => {
    fn(params, {
      onSuccess(data: any) {
        if (typeModal === TYPE_MODAL.VERIFY_EMAIL_OLD) {
          dispatch(setTypeModal(TYPE_MODAL.CHANGE_EMAIL))
          setError('')
        }
        if (typeModal === TYPE_MODAL.VERIFY_EMAIL_NEW) {
          console.log('data', data)
          if (data?.accessToken) {
            dispatch(setAccessToken(data?.accessToken))
            dispatch(setEmail(email))
            queryClient.invalidateQueries({ queryKey: ['userProfile'] })
            setError('')
            showMessage('success', 'Successfully changed email')
            onClose()
          }
        }
      },
      onError() {
        setOtp('')
        setError('Verification code is invalid')
        setTimeout(() => {
          const firstInput = document.querySelector('.otp-input input')
          if (firstInput) {
            ;(firstInput as HTMLInputElement).focus()
          }
        }, 50)
      },
    })
  }
  const onFinish = (values: any) => {
    if (typeModal === TYPE_MODAL.VERIFY_EMAIL_OLD) {
      onAction(onVerifyOldEmail, otp)
    } else if (typeModal === TYPE_MODAL.VERIFY_EMAIL_NEW) {
      onAction(onVerifyNewEmail, { code: otp, email })
    }
  }

  const onChange: OTPProps['onChange'] = (text) => {
    setOtp(text)
    if (text.length === 4) {
      form.submit()
      const activeElement = document.activeElement as HTMLInputElement
      if (activeElement) {
        activeElement.blur()
      }
    }
  }
  const sharedProps: OTPProps = {
    onChange,
  }
  const onResend = () => {
    onRequestVerifyCode()
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      const firstInput = document.querySelector('.otp-input input')
      if (firstInput) {
        ;(firstInput as HTMLInputElement).focus()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])
  return (
    <Form
      name="verifyEmailform"
      form={form}
      layout="inline"
      autoComplete="off"
      onFinish={onFinish}
    >
      <div className="text-base mb-4 ">
        Please enter the 4-digit verification code that was sent to
        <span className="text-[#00aaf2]"> {email}</span>. The code is valid for 30
        minutes.
      </div>
      <div className="w-full flex flex-col justify-center items-center otp-input">
        <Input.OTP
          length={4}
          value={otp}
          formatter={(str) => str.replace(/\D/g, '')}
          {...sharedProps}
        />
        {error ? (
          <span className="my-[10px] text-[#f04438] text-base">
            Verification code is invalid
          </span>
        ) : null}
        <div
          dangerouslySetInnerHTML={{
            __html:
              '     <ul>\n        <p>If you haven&apos;t received the email, do the following:</p>\n        <li>Make sure provided email address is correct.</li>\n        <li>Check spam or other folders.</li>\n        <li>Set email address whitelist.</li>\n        <li>Check the mail client works normally.</li>\n      </ul',
          }}
        />
        <div className="text-base mt-3 flex gap-1">
          Didn’t get the code?
          <ReSendBtn onResend={onResend} />
        </div>
      </div>
    </Form>
  )
}

export default VerifyEmailModal
