'use server'

import type { Locale } from './config'
import { cookies } from 'next/headers'
import { defaultLocale } from './config'

const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale)
}
