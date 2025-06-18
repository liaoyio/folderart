import type { ReactNode } from 'react'
import { ThemeProvider } from '@/components/next-theme/provider'
import { geistMono, geistSans } from '@/fonts'
import { cn } from '@/lib/cn'
import { baseUrl } from '@/lib/utils'
import '../css/style.css'

export const metadata = {
  title: 'FolderArt',
  metadataBase: baseUrl,
  icon: 'icon.svg',
}

import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
import Header from '@/components/header'

export default async function Layout({ children }: { children: ReactNode }) {
  const locale = await getLocale()
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className={cn('relative flex min-h-svh flex-col overflow-x-hidden')}>
        <ThemeProvider attribute="class">
          <NextIntlClientProvider locale={locale}>
            <Header />
            <main className="container mx-auto py-6 px-6 flex-1">{children}</main>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
