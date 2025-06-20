import type { Color, OS } from '@/types'

export function getFolderPath(os: OS, color: Color) {
  return `folders/${os}/${color}.png`
}
