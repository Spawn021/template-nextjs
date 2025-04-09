import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Locale } from '@/i18n/request'
import ClientProvider from '@/components/Providers/ClientProvider'
import LanguageSwitcher from '@/components/Language/LanguageSwitcher'
import BackTop from '@/components/Button/BackTop'
import Player from '@/components/ListTrack/Player'
import ModalCustom from '@/components/ModalCustom'
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClientProvider>
        <div className="relative">
          <div className="fixed top-2 right-0 p-4 z-50">
            <LanguageSwitcher />
          </div>
          {children}
          <Player />
          <ModalCustom />
        </div>
        <BackTop />
      </ClientProvider>
    </NextIntlClientProvider>
  )
}
