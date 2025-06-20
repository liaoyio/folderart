import type { IconConstraints } from '@/types'
import { BaseConfig, Resolution, Size } from '@/lib/consts'

export function createConstraints(resolution: Resolution): IconConstraints {
  if (resolution === Resolution.Retina512) {
    return BaseConfig
  }

  const factor = Size[resolution] / Size[Resolution.Retina512]

  const resizedConfig = {} as IconConstraints

  Object.entries(BaseConfig).forEach(([key, value]) => {
    resizedConfig[key as keyof IconConstraints] = Number(value) * factor
  })

  return resizedConfig
}
