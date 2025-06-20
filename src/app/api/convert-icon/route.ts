/* eslint-disable node/prefer-global/buffer */
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import sharp from 'sharp'

function buildIcoFile(pngData: Buffer, width: number, height: number): Buffer {
  const ICONDIR = Buffer.alloc(6)
  ICONDIR.writeUInt16LE(0, 0) // Reserved
  ICONDIR.writeUInt16LE(1, 2) // Type: 1 = icon
  ICONDIR.writeUInt16LE(1, 4) // Count: 1 image

  const ICONDIRENTRY = Buffer.alloc(16)
  ICONDIRENTRY.writeUInt8(width === 256 ? 0 : width, 0) // Width
  ICONDIRENTRY.writeUInt8(height === 256 ? 0 : height, 1) // Height
  ICONDIRENTRY.writeUInt8(0, 2) // Color palette
  ICONDIRENTRY.writeUInt8(0, 3) // Reserved
  ICONDIRENTRY.writeUInt16LE(1, 4) // Planes
  ICONDIRENTRY.writeUInt16LE(32, 6) // Bit count
  ICONDIRENTRY.writeUInt32LE(pngData.length, 8) // Size
  ICONDIRENTRY.writeUInt32LE(6 + 16, 12) // Offset

  return Buffer.concat([ICONDIR, ICONDIRENTRY, pngData])
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as Blob | null

  if (!file || file.type !== 'image/png') {
    return NextResponse.json({ error: '请上传 PNG 格式的图片' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    const resizedPng = await sharp(buffer)
      .resize(256, 256)
      .png()
      .toBuffer()

    const icoBuffer = buildIcoFile(resizedPng, 256, 256)

    return new NextResponse(icoBuffer, {
      headers: {
        'Content-Type': 'image/x-icon',
        'Content-Disposition': 'attachment; filename="icon.ico"',
      },
    })
  }
  catch (err) {
    console.error(err)
    return NextResponse.json({ error: '图片处理失败' }, { status: 500 })
  }
}
