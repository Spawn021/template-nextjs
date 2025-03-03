'use client'
import SocialButtons from '@/components/Button/SocialButtons'
import SwitchAuth from '@/components/Button/SwitchAuth'
import { Link, usePathname } from '@/i18n/routing'
import ArrowLeft from '@/resources/svg/ArrowLeft'
import useSNSLogin from '@/hooks/useSNSLogin'
import Footer from '@/components/common/Footer'
import { Spin } from 'antd'
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentPath = usePathname()
  const googleLoginMutation = useSNSLogin()
  const twitterLoginMutation = useSNSLogin()
  return (
    <>
      {googleLoginMutation.isLoading || twitterLoginMutation.isLoading ? (
        <Spin fullscreen />
      ) : (
        <>
          <div className="flex justify-center bg-gradient-to-t from-[#fff] via-[#eff2ff] via-[61.5%] to-[#dfe5ff]">
            <div className="rounded-lg max-w-[400px] w-full mt-[150px]">
              <h1 className="text-center text-[32px] font-semibold mb-2 ">
                {currentPath === '/login'
                  ? 'Hello from Clepseadra'
                  : 'Welcome to Clepseadra'}
              </h1>
              <div className="font-normal text-base pt-2 pb-6 text-center text-gray-600">
                {currentPath === '/login'
                  ? 'Please login your account!'
                  : 'Create your account NOW!'}
              </div>
              <SwitchAuth />
              {children}
              <SocialButtons
                googleLoginMutation={googleLoginMutation}
                twitterLoginMutation={twitterLoginMutation}
              />
              <div className="pt-6 text-center">
                <div className="text-xs font-normal text-[#101828]">
                  By continuing, I agree with EC&apos;s
                </div>
                <div className="text-xs font-normal text-[#101828]">
                  <span className="text-[#00aaf2] cursor-pointer font-semibold">
                    Terms of Service
                  </span>

                  <span> & </span>
                  <span className="text-[#00aaf2] cursor-pointer font-semibold">
                    Privacy Policy
                  </span>
                </div>
              </div>
              <div className="text-center mt-4 pb-[50px]">
                <Link href="/">
                  <span className="flex justify-center items-center">
                    <ArrowLeft />
                    <span>Return to Homepage</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  )
}
