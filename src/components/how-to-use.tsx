import type { OS } from '@/types'
import { useMessages, useTranslations } from 'next-intl'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import HowToUseMacOSGif from '~/public/how-to-use-macos.gif'

export function HowToUse({ os }: { os: OS }) {
  const t = useTranslations('HowToUse')
  const title = t('title', { os: os === 'macos' ? 'macOS' : 'Windows' })
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
          >
            <svg className="size-6 stroke-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
                <path strokeLinejoin="round" d="M12 11.338a.66.66 0 1 0 0-1.321a.66.66 0 0 0 0 1.321m4.625 0a.66.66 0 1 0 0-1.321a.66.66 0 0 0 0 1.321m-9.25 0a.66.66 0 1 0 0-1.321a.66.66 0 0 0 0 1.321" />
                <path strokeLinejoin="round" d="M21.25 10.94v3.17a4 4 0 0 1-1.16 2.81a4.2 4.2 0 0 1-1.29.86a4.1 4.1 0 0 1-1.51.3h-2.65l-2.18 2.18a.8.8 0 0 1-.21.15a.65.65 0 0 1-.5 0a.8.8 0 0 1-.21-.15l-2.18-2.18H6.71a4 4 0 0 1-2.8-1.16a4 4 0 0 1-1.16-2.81v-6.6a4 4 0 0 1 4-4H13" />
                <path strokeMiterlimit="10" d="M17.614 3.45a1.2 1.2 0 0 1 1.306-.68a1.16 1.16 0 0 1 .853.607a1.01 1.01 0 0 1-.588 1.389a.745.745 0 0 0-.48.673v.277" />
                <path strokeLinejoin="round" d="M18.74 7.896h.002" />
              </g>
            </svg>
          </Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>
              {title}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {os === 'macos' ? t('macosDescription') : t('windowsDescription')}
            </DialogDescription>
          </DialogHeader>

          <div className="py-3 px-4">
            {os === 'macos' ? <MacOS /> : <Windows />}
          </div>
        </DialogContent>
      </Dialog>

    </>
  )
}

function MacOS() {
  const t = useTranslations('HowToUse.macos')
  const messages = useMessages()
  const keys = Object.keys(messages.HowToUse.macos)
  return (
    <ol className="text-sm text-foreground space-y-2 list-decimal">
      {
        keys.map(key => (
          <li key={key}>
            {
              t.rich(key, {
                strong: chunks => <strong className="font-medium">{chunks}</strong>,
              })
            }
          </li>
        ))
      }

      <Image
        src={HowToUseMacOSGif}
        className="mt-6"
        alt="Video of how to set a custom folder icon in macOS"
        unoptimized
      />
    </ol>
  )
}

function Windows() {
  const t = useTranslations('HowToUse.windows')
  const messages = useMessages()
  const keys = Object.keys(messages.HowToUse.windows)

  return (
    <ol className="text-sm text-foreground space-y-2 list-decimal">
      {
        keys.map(key => (
          <li key={key}>
            {
              t.rich(key, {
                strong: chunks => <span className="font-medium">{chunks}</span>,
              })
            }
          </li>
        ))
      }
      <video autoPlay controls className="mt-6">
        <source src="/how-to-use-windows.mp4" />
      </video>
    </ol>
  )
}
