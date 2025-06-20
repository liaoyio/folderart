import type { Config } from '@/types'
import { loadImage } from '@/lib/load-image'

export async function loadIconImg(icon: Config['icon']): Promise<HTMLImageElement | null> {
  const isDefaultIcon = typeof icon === 'string' && icon.length

  if (isDefaultIcon) {
    return await loadImage(`/icons/${icon}`)
  }
  else if (icon instanceof File) {
    return await loadImage(URL.createObjectURL(icon))
  }
  else {
    return null
  }
}
