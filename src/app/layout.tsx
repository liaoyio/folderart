import type { ReactNode } from 'react'
import { geistMono, geistSans } from '@/fonts'
import { cn } from '@/lib/cn'
import { baseUrl } from '@/lib/utils'
import '../css/style.css'

export const metadata = {
  title: 'FolderArt',
  metadataBase: baseUrl,
  icon: 'icon.svg',
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className={cn('relative flex min-h-svh flex-col overflow-x-hidden')}>
        {children}
      </body>
    </html>
  )
}
