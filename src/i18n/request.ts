import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export type Locale = (typeof routing.locales)[number]

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale
  }
  const validatedLocale = locale as Locale
  return {
    locale: validatedLocale,
    messages: (await import(`../messages/${validatedLocale}/default.json`)).default,
  }
})
