export type OS = 'win' | 'macos'

export type Color
    = | 'win-default'
      | 'win-pink'
      | 'win-blue'
      | 'win-green'
      | 'win-lime'
      | 'win-orange'
      | 'win-purple'
      | 'win-red'
      | 'win-violet'
      | 'macos-default-dark'
      | 'macos-default-light'
      | 'macos-green'
      | 'macos-lime'
      | 'macos-yellow'
      | 'macos-orange'
      | 'macos-red'
      | 'macos-purple'
      | 'macos-gray'
      | 'macos-black'
      | 'macos-gradient-blue'
      | 'macos-gradient-purple-dark'
      | 'macos-gradient-purple-light'
      | 'macos-gradient-red'
      | 'macos-gradient-yellow'

export interface Config {
  adjustColor: number
  os: OS
  icon?: File | string
  text: string
  color: Color
}

export type OnChangeConfig = <T extends keyof Config>(key: T, value: Config[T]) => void

export interface IconConstraints {
  maxWidth: number
  maxHeight: number
  preferredSize: number
  startY: number
  folderAreaHeight: number
}

export interface Canvas {
  width: number
  height: number
  toDataURL: (type?: string | undefined, quality?: any) => string
}

export type Context = CanvasRenderingContext2D

export interface ColorWithLabel { value: Color, label: string, src: string }

export interface RGB { red: number, green: number, blue: number }
