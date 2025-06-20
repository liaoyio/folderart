import type { Config } from '@/types'
import { useEffect, useRef, useState } from 'react'
import { generatePreview } from '@/lib/icons/generate-preview'

export function useUpdatePreview(config: Config) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas)
      return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx)
      return

    generatePreview(canvas, ctx, config).then(() => setLoading(false))
  }, [config])

  return [canvasRef, loading] as const
}
