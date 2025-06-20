'use client'

import type { Config } from '@/types'
import { type DragEvent, useEffect, useState } from 'react'
import { Configuration } from '@/components/configuration/configuration'
import { Folder } from '@/components/folder'
import { useDragNDrop, useUpdatePreview } from '@/hooks'
import { canvasToIco, canvasToPng } from '@/lib/canvas'
import { MACOS_COLORS, WINDOWS_COLORS } from '../../lib/consts'
import { HowToUse } from '../how-to-use'

const defaultMacOs = {
  os: 'macos',
  color: 'macos-default-dark',
} as const

const defaultWindows = {
  os: 'win',
  color: 'win-default',
} as const

export type OnChangeConfig = <T extends keyof Config>(key: T, value: Config[T]) => void

export function FolderEditor() {
  const [downloading, setDownloading] = useState(false)
  const [filename] = useState('icon')

  const [configuration, setConfiguration] = useState<Config>({
    ...defaultMacOs,
    adjustColor: 0,
    icon: '',
    text: '',
  })
  const [canvasRef, loading] = useUpdatePreview(configuration)

  const onChangeConfig: OnChangeConfig = async (key, value) => {
    if (key === 'os') {
      const color = value === 'macos' ? defaultMacOs.color : defaultWindows.color

      setConfiguration(prev => ({
        ...prev,
        [key]: value,
        color,
      }))

      return
    }

    setConfiguration(prev => ({
      ...prev,
      [key]: value === 'empty.svg' ? '' : value,
    }))
  }

  function onChangeColor() {
    const COLORS = configuration.os === 'macos' ? MACOS_COLORS : WINDOWS_COLORS
    const currentIdx = COLORS.findIndex(color => color.value === configuration.color)
    const nextIdx = (currentIdx + 1) % COLORS.length
    onChangeConfig('color', COLORS[nextIdx].value)
  }

  function proccessImageFile(file: File) {
    if (file.type.includes('image')) {
      onChangeConfig('icon', file)
    }
  }

  function onDropHandler(e: DragEvent<HTMLElement>) {
    const files = e.dataTransfer?.files
    const file = files[0]
    proccessImageFile(file)
  }

  async function onDownload() {
    if (!canvasRef.current)
      return

    try {
      if (configuration.os === 'macos') {
        canvasToPng(canvasRef.current, filename)
      }
      else {
        setDownloading(true)
        await canvasToIco(canvasRef.current, filename)
      }
    }
    finally {
      setDownloading(false)
    }
  }

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const clipboardData = e.clipboardData
      const file = clipboardData?.files[0]

      if (file) {
        e.preventDefault()
        proccessImageFile(file)
      }
    }

    window.addEventListener('paste', onPaste)
    return () => window.removeEventListener('paste', onPaste)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dragNDrop = useDragNDrop(onDropHandler)

  return (
    <div className="flex h-full flex-col-reverse md:flex-row items-center px-5 md:px-0" {...dragNDrop}>
      <Configuration
        configuration={configuration}
        onChangeConfig={onChangeConfig}
        downloadFile={onDownload}
        downloading={downloading}
      />

      <div className="flex flex-col-reverse md:flex-col justify-between items-center relative md:flex-1 md:h-full pt-5 md:pt-0 w-full">
        <p className="hidden md:block text-sm">
          <span className="text-zinc-500"> FolderArt / </span>
          {' '}
          {filename}
          .
          {configuration.os === 'macos' ? 'png' : 'ico'}
        </p>

        <Folder loading={loading} canvasRef={canvasRef} onChangeColor={onChangeColor} />

        <HowToUse os={configuration.os} />

      </div>
    </div>
  )
}
