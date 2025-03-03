'use client'
import React from 'react'
import { useRouter, usePathname } from '@/i18n/routing'
import clsx from 'clsx'

export default function SwitchAuth() {
  const router = useRouter()
  const currentPath = usePathname()
  const goToLoginPage = () => {
    router.push('/login')
  }
  const goToSignUpPage = () => {
    router.push('/signup')
  }
  return (
    <div className="border-[1px] border-solid border-[#e4e7ec] rounded-lg bg-[#f9fafb] flex justify-center items-center mb-6">
      <button
        className={clsx(
          'w-1/2 text-[14px] font-semibold py-2 cursor-pointer leading-5 rounded-2',
          currentPath === '/signup'
            ? 'bg-[#fff] rounded-lg border-[1px] border-solid border-[#d0d5dd] text-[#344054]'
            : 'text-[#667085] py-2 ',
        )}
        type="button"
        onClick={goToSignUpPage}
      >
        Sign Up
      </button>
      <button
        className={clsx(
          'w-1/2 text-[14px] font-semibold py-2 cursor-pointer leading-5 rounded-2',
          currentPath === '/login'
            ? 'bg-[#fff] rounded-lg border-[1px] border-solid border-[#d0d5dd] text-[#344054]'
            : 'text-[#667085] py-2 ',
        )}
        type="button"
        onClick={goToLoginPage}
      >
        Login
      </button>
    </div>
  )
}
