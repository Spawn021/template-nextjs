import type { Metadata } from 'next'
import { ConfigProvider } from 'antd'
import MessageProvider from '@/components/Message'
import './globals.css'
import '../styles/_app.scss'

import * as React from 'react'
import { HeroUIProvider } from '@heroui/system'
import { Noto_Sans } from 'next/font/google'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  params: { locale: string }
  children: React.ReactNode
}>) {
  return (
    <html lang={locale} className={notoSans.className}>
      <body>
        <MessageProvider>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: 'Noto Sans, sans-serif',
              },
            }}
          >
            <HeroUIProvider>{children}</HeroUIProvider>
          </ConfigProvider>
        </MessageProvider>
      </body>
    </html>
  )
}
