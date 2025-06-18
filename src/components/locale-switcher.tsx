'use client'

import type { Locale } from '@/lib/i18n/config'
import { Globe } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/cn'
import { locales } from '@/lib/i18n/config'
import { setUserLocale } from '@/lib/i18n/locale'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const [isPending, startTransition] = useTransition()
  const locale = useLocale()

  function onSelectChange(locale: Locale) {
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  return (
    <Select
      defaultValue={locale}
      value={locale}
      onValueChange={onSelectChange}
    >
      <SelectTrigger className={cn('min-w-32', isPending && 'pointer-events-none opacity-60')}>
        <Globe className="size-4 mr-1" />
        <SelectValue placeholder={t('label')} />
      </SelectTrigger>
      <SelectContent>
        {locales.map(cur => (
          <SelectItem key={cur} value={cur}>{ t(cur)}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
