import { getRequestConfig } from 'next-intl/server'
import { defaultLocale } from './config'
import { getUserLocale } from './locale'

export default getRequestConfig(async () => {
  const locale = await getUserLocale()
  // eslint-disable-next-line no-console
  console.log('locale', locale)
  return {
    locale,
    defaultLocale,
    messages: (await import(`../../../messages/${locale}.json`)).default,
  }
})
