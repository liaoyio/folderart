import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import { Vercel } from '@/components/analytics'

import Header from '@/components/header'
import { ThemeProvider } from '@/components/next-theme/provider'
import { geistMono, geistSans } from '@/fonts'
import { cn } from '@/lib/cn'
import { baseUrl } from '@/lib/utils'
import '../css/style.css'

export default async function Layout({ children }: { children: ReactNode }) {
  const locale = await getLocale()
  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className={cn('relative flex h-svh flex-col overflo-hidden')}>
        <ThemeProvider attribute="class">
          <NextIntlClientProvider locale={locale}>
            <Header />
            <main className="p-6 flex-1 container mx-auto">{children}</main>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Vercel />
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metaData')
  return {
    title: t('title'),
    metadataBase: baseUrl,
    description: t('description'),
    keywords: t('keywords'),
    icons: { icon: '/icon.png' },
    openGraph: {
      title: t('title'),
      url: '/',
      description: t('description'),
      images: [
        {
          url: '/cover.png',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/cover.png'],
    },
    alternates: {
      canonical: '/',
      languages: {
        en: '/en',
        zh: '/zh',
      },
    },
  }
}
