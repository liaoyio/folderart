import type { Config, OnChangeConfig } from '@/types'
import { Download, ImageUp, Loader } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRef } from 'react'
import { useId } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/cn'

import { MACOS_COLORS, OS, WINDOWS_COLORS } from '@/lib/consts'
import { defaultIcons } from '@/lib/default-icons'
import { EmptyIcon } from '../icons/default'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export function Configuration({
  configuration,
  onChangeConfig,
  downloadFile,
  downloading,
}: {
  configuration: Config
  onChangeConfig: OnChangeConfig
  downloadFile: () => void
  downloading: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const t = useTranslations('Configuration')

  function openFileExporer() {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  let colors = []

  if (configuration.os === 'macos') {
    colors = MACOS_COLORS
  }
  else {
    colors = WINDOWS_COLORS
  }

  return (
    <aside
      className="relative lg:w-96 rounded-xl  border p-5 flex flex-col gap-5 shadow-sm
         size-full md:w-80"
    >
      <h1 className="font-medium">{t('title')}</h1>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            onChangeConfig('icon', file)
          }
        }}
      />

      <div>
        <fieldset className="mt-2">
          <legend className="text-sm font-medium flex items-center gap-2">{t('os')}</legend>
          <div className="flex gap-3 mt-2">
            {OS.map(os => (
              <label
                key={os.value}
                className={`cursor-pointer p-3 rounded-xl border border-input flex items-center gap-3 transition-all
            ${
              configuration.os === os.value
                ? 'border-zinc-400 ring-2 ring-border dark:border-input bg-zinc-100/80 dark:bg-input/60'
                : 'shadow-xs hover:bg-accent/20 hover:text-accent-foreground'
              }`}
              >
                <input
                  type="radio"
                  name="os"
                  value={os.value}
                  checked={configuration.os === os.value}
                  onChange={() => onChangeConfig('os', os.value as Config['os'])}
                  className="sr-only"
                />
                {os.icon({ className: 'size-6' })}
                <span className="text-sm font-medium">{os.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="text">
          {t('text')}
        </Label>
        <Input
          id="text"
          value={configuration.text}
          onChange={e => onChangeConfig('text', e.target.value)}
          maxLength={15}
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="color" className="text-sm font-medium flex items-center gap-2">
          {t('color')}
        </Label>

        <Select
          defaultValue={configuration.color}
          onValueChange={value => onChangeConfig('color', value as Config['color'])}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('color')} />
          </SelectTrigger>
          <SelectContent>
            {
              colors.map(color => (
                <SelectItem value={color.value} key={color.value}>
                  {color.label}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>

        <p className="text-sm text-muted-foreground  mt-1 ml-1">
          {t('selectOption')}
          <span className="font-medium">{t('clickOnFolder')}</span>
          {t('toChange')}
        </p>
      </div>

      <div className="grid gap-3">

        <Label htmlFor="adjustColor">
          {t('iconColor')}
        </Label>

        <Select
          defaultValue={String(configuration.adjustColor)}
          onValueChange={(e) => { onChangeConfig('adjustColor', Number(e)) }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('iconColor')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">{t('adapt')}</SelectItem>
            <SelectItem value="0">{t('original')}</SelectItem>
          </SelectContent>
        </Select>

      </div>

      <IconsList onChangeConfig={onChangeConfig} />

      <Button variant="outline" className="w-full md:mt-auto" onClick={() => openFileExporer()}>
        <ImageUp className="h-5 w-5 stroke-2" />
        <span>{t('customIcon')}</span>
      </Button>

      <Button
        className={`w-full ${downloading ? 'opacity-50' : ''}`}
        disabled={downloading}
        onClick={() => downloadFile()}
      >
        {downloading
          ? (
              <Loader className="h-5 w-5 animate-spin" />
            )
          : (
              <Download className="h-5 w-5 stroke-2" />
            )}

        <span>{t('download')}</span>
      </Button>
    </aside>
  )
}

function IconsList({ onChangeConfig }: { onChangeConfig: OnChangeConfig }) {
  const id = useId()
  const t = useTranslations('Configuration')
  return (
    <fieldset className="">
      <legend className="sr-only">{t('icons')}</legend>
      <RadioGroup
        className="grid md:grid-cols-6 lg:grid-cols-7 gap-y-3 gap-x-1.5"
        defaultValue="empty"
        onValueChange={(value) => {
          // eslint-disable-next-line no-console
          console.log('===>', value)
          onChangeConfig('icon', value)
        }}
      >
        {defaultIcons.map(icon => (
          <label
            key={`${id}-${icon.name}`}
            className={cn(
              `relative flex
            w-full p-2 aspect-square cursor-pointer border rounded-md
            flex-col items-center justify-center
            border-input text-center
            text-xl shadow-sm shadow-black/5
            outline-offset-2 transition-colors
            has-[[data-disabled]]:cursor-not-allowed
            has-[[data-state=checked]]:border-ring
            has-[[data-state=checked]]:bg-accent
            has-[[data-disabled]]:opacity-50
            has-[:focus-visible]:outline-2
            has-[:focus-visible]:outline-ring/70 dark:bg-input`,

            )}
          >
            <RadioGroupItem
              id={`${id}-${icon.name}`}
              value={icon.filename}
              className="sr-only after:absolute after:inset-0"
            />

            { icon.name === 'Empty'
              ? <EmptyIcon />
              : (
                  <Image
                    draggable={false}
                    priority
                    alt={`${icon.name} icon`}
                    src={icon.src}
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                )}
          </label>
        ))}

      </RadioGroup>
    </fieldset>
  )
}
