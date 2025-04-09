import React from 'react'
import googleIcon from '@/resources/svg/google-icon.svg'
import twitterIcon from '@/resources/svg/x-icon.svg'
import Image from 'next/image'
import { APP_PROVIDER } from '@/constants'
import { capitalizeValue } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  title: string
  description: string
  provider?: string
  isMethod?: boolean
}
function RenderContent({ children, title, description, provider, isMethod }: Props) {
  return (
    <div className="flex py-4 gap-8 border-b border-[#dcdcdc]">
      <div className="max-w-[320px] flex-1">
        <div className="font-semibold text-base mb-1">{title}</div>
        {provider && isMethod ? (
          <div className="flex items-center gap-3 border bg-[#f9fafb] font-semibold text-[#9ca3af] px-4 py-2 rounded-lg">
            <Image
              src={provider === APP_PROVIDER.GOOGLE ? googleIcon : twitterIcon}
              alt="provider"
            />
            <div>{`Registered with ${capitalizeValue(provider)}`}</div>
          </div>
        ) : (
          <div className="text-[#6b7280]">{description}</div>
        )}
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  )
}

export default RenderContent
