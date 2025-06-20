import type { Dimension } from './format-icon'
import type { Canvas, Config, Context } from '@/types'
import { Resolution, SHADOW_SIZE, ShadowColor } from '@/lib/consts'
import { createIcon } from './create-icon'
import { drawFolder, drawIcon, drawText } from './draw'
import { getIconDimension } from './format-icon'
import { loadIconImg } from './load-icon-img'

export async function generatePreview(canvas: Canvas, ctx: Context, config: Config) {
  /**
   * Preload Icon to avoid flickering
   */
  const resolution = Resolution.Retina512
  const iconImg: HTMLImageElement | null = await loadIconImg(config.icon)
  let icon: HTMLImageElement | null = null
  let dimension: Dimension | null = null

  if (iconImg) {
    dimension = getIconDimension(iconImg.width, iconImg.height, resolution)
    icon = await createIcon(iconImg, dimension.width, dimension.height, config)
  }

  /**
   * Draw Folder
   */
  await drawFolder(ctx, canvas, resolution, config.os, config.color)

  /**
   * Add Shadow
   */
  ctx.shadowColor = ShadowColor[config.color]
  ctx.shadowOffsetY = SHADOW_SIZE
  ctx.shadowBlur = SHADOW_SIZE
  ctx.globalCompositeOperation = 'source-over'

  /**
   * Draw Icon
   */
  if (icon && dimension) {
    drawIcon(ctx, icon, dimension, resolution)
  }

  /**
   * Draw Text
   */
  if (config.text) {
    drawText(ctx, config.text, config.color, resolution)
  }
}
