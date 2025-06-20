import fs from 'node:fs'
import path from 'node:path'

function formatName(input: string): string {
  return input
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

const ICONS_DIR = path.resolve(process.cwd(), 'public/icons')
const OUTPUT_FILE = path.resolve(process.cwd(), 'src/lib/default-icons.ts')

// 支持的图片扩展名
const VALID_EXTENSIONS = ['.svg', '.png', '.jpg', '.jpeg', '.webp']

// 1. 读取所有有效图标文件
const files = fs.readdirSync(ICONS_DIR).filter((file) => {
  const ext = path.extname(file).toLowerCase()
  return VALID_EXTENSIONS.includes(ext)
})

const icons = files
  .sort((a, b) => (a === 'empty.svg' ? -1 : b === 'empty.svg' ? 1 : 0)) // 👈 让 empty.svg 排到最前
  .map((file) => {
    const name = path.basename(file, path.extname(file))
    return {
      name: formatName(name),
      filename: file,
      src: `/icons/${file}`,
    }
  })

// 生成 TypeScript 文件内容
const content = `// ⚠️ This file is auto-generated. Do not edit manually.
export const defaultIcons = ${JSON.stringify(icons, null, 2)} as const
`

fs.writeFileSync(OUTPUT_FILE, content, 'utf8')
console.log(`✅ Generated ${icons.length} icons to lib/defaultIcons.ts`)
