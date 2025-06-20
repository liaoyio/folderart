export const IMAGES_API = process.env.NEXT_PUBLIC_IMAGES_API as string

export async function canvasToIco(canvas: HTMLCanvasElement, filename: string) {
  return new Promise<void>((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        reject(new Error('Blob is null'))
        return
      }

      const formData = new FormData()
      formData.append('file', blob, 'icon.png')

      try {
        const response = await fetch(`/api/convert-icon`, {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          reject(new Error('Response is not ok'))
          return
        }

        const icoBlob = await response.blob()
        const url = URL.createObjectURL(icoBlob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${filename}.ico`
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
        resolve()
      }
      catch (error) {
        reject(error)
      }
    }, 'image/png')
  })
}

export function canvasToPng(canvas: HTMLCanvasElement, filename: string) {
  const png = canvas.toDataURL()
  const link = document.createElement('a')
  link.setAttribute('download', `${filename}.png`)
  link.setAttribute('href', png)
  link.click()
}

import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export async function downloadSvgAsPng(
  Component: React.FC<React.SVGProps<SVGSVGElement>>,
  filename = 'download',
) {
  const svgString = renderToStaticMarkup(React.createElement(Component))

  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const img = new Image()
  img.src = url

  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
  })

  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0)

  const png = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.download = `${filename}.png`
  link.href = png
  link.click()

  URL.revokeObjectURL(url)
}
