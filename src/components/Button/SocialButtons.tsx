'use client'
import { Button, Space } from 'antd'
import Image from 'next/image'
import GoogleIcon from '@/resources/svg/google.svg'
import TwitterIcon from '@/resources/svg/twitter.svg'

interface SocialButtonsProps {
  googleLoginMutation: any
  twitterLoginMutation: any
}

export default function SocialButtons({
  googleLoginMutation,
  twitterLoginMutation,
}: SocialButtonsProps) {
  return (
    <Space direction="vertical" className="w-full">
      <Button
        type="default"
        block
        onClick={() => googleLoginMutation.mutate('google')}
        loading={googleLoginMutation.isPending}
        className="font-semibold p-5 text-base"
      >
        <Image src={GoogleIcon} alt="Google" className="w-6 h-6 mr-2" />
        Sign in with Google
      </Button>
      <Button
        type="default"
        block
        onClick={() => twitterLoginMutation.mutate('twitter')}
        loading={twitterLoginMutation.isPending}
        className="font-semibold p-5 text-base"
      >
        <Image src={TwitterIcon} alt="Twitter" className="w-6 h-6 mr-2" />
        Sign in with X
      </Button>
    </Space>
  )
}
