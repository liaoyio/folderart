'use client'
import type { RefObject } from 'react'
import Image from 'next/image'
import fallbackFolder from '~/public/fallback-folder.png'

interface Props {
  loading: boolean
  canvasRef: RefObject<HTMLCanvasElement | null>
  onChangeColor: () => void
}

export function Folder({ loading, canvasRef, onChangeColor }: Props) {
  return (
    <>
      <button
        type="button"
        className={loading ? 'hidden' : 'w-[512px] flex-1 h-auto max-w-[90vw] cursor-pointer outline-none'}
        onClick={() => onChangeColor()}
      >
        <canvas className="w-[512px] max-w-[90vw] h-auto" ref={canvasRef} />
      </button>

      {loading && (
        <Image
          src={fallbackFolder}
          alt="macOS folder icon "
          width={512}
          height={512}
          className="max-w-[90vw]"
          priority
        />
      )}
    </>
  )
}
