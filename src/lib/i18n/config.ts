export type Locale = (typeof locales)[number]
export const locales = ['zh', 'en'] as const
export const defaultLocale: Locale = 'zh'

export const localeNames: Record<string, string> = {
  en: 'English',
  zh: '中文',
}
