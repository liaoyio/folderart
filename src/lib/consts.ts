import type { Color, ColorWithLabel, IconConstraints, RGB } from '@/types'
import { LogosApple, LogosWindow } from '@/components/icons'

export const OS = [
  { value: 'macos', label: 'macOS', icon: LogosApple },
  { value: 'win', label: 'Windows 11', icon: LogosWindow },
]

export const MACOS_COLORS: ColorWithLabel[] = [
  {
    value: 'macos-default-dark',
    label: 'Default Dark',
    src: '/folders/macos/macos-default-dark.png',
  },
  {
    value: 'macos-default-light',
    label: 'Default Light',
    src: '/folders/macos/macos-default-light.png',
  },
  {
    value: 'macos-green',
    label: 'Green',
    src: '/folders/macos/macos-green.png',
  },
  {
    value: 'macos-lime',
    label: 'Lime',
    src: '/folders/macos/macos-lime.png',
  },
  {
    value: 'macos-yellow',
    label: 'Yellow',
    src: '/folders/macos/macos-yellow.png',
  },
  {
    value: 'macos-orange',
    label: 'Orange',
    src: '/folders/macos/macos-orange.png',
  },
  {
    value: 'macos-red',
    label: 'Red',
    src: '/folders/macos/macos-red.png',
  },
  {
    value: 'macos-purple',
    label: 'Purple',
    src: '/folders/macos/macos-purple.png',
  },
  {
    value: 'macos-gray',
    label: 'Gray',
    src: '/folders/macos/macos-gray.png',
  },
  {
    value: 'macos-black',
    label: 'Black',
    src: '/folders/macos/macos-black.png',
  },
  {
    value: 'macos-gradient-blue',
    label: 'Gradient Blue',
    src: '/folders/macos/macos-gradient-blue.png',
  },
  {
    value: 'macos-gradient-purple-dark',
    label: 'Gradient Purple Dark',
    src: '/folders/macos/macos-gradient-purple-dark.png',
  },
  {
    value: 'macos-gradient-purple-light',
    label: 'Gradient Purple Light',
    src: '/folders/macos/macos-gradient-purple-light.png',
  },
  {
    value: 'macos-gradient-red',
    label: 'Gradient Red',
    src: '/folders/macos/macos-gradient-red.png',
  },
  {
    value: 'macos-gradient-yellow',
    label: 'Gradient Yellow',
    src: '/folders/macos/macos-gradient-yellow.png',
  },
]

export const WINDOWS_COLORS: ColorWithLabel[] = [
  {
    value: 'win-default',
    label: 'Default',
    src: '/folders/windows-11/win-default.png',
  },
  {
    value: 'win-pink',
    label: 'Pink',
    src: '/folders/windows-11/win-pink.png',
  },
  {
    value: 'win-blue',
    label: 'Blue',
    src: '/folders/windows-11/win-blue.png',
  },
  {
    value: 'win-green',
    label: 'Green',
    src: '/folders/windows-11/win-green.png',
  },
  {
    value: 'win-lime',
    label: 'Lime',
    src: '/folders/windows-11/win-lime.png',
  },
  {
    value: 'win-orange',
    label: 'Orange',
    src: '/folders/windows-11/win-orange.png',
  },
  {
    value: 'win-purple',
    label: 'Purple',
    src: '/folders/windows-11/win-purple.png',
  },
  {
    value: 'win-red',
    label: 'Red',
    src: '/folders/windows-11/win-red.png',
  },
  {
    value: 'win-violet',
    label: 'Violet',
    src: '/folders/windows-11/win-violet.png',
  },
]

export enum Resolution {
  NonRetina16 = 0,
  Retina16 = 1,
  NonRetina32 = 2,
  Retina32 = 3,
  NonRetina128 = 4,
  Retina128 = 5,
  NonRetina256 = 6,
  Retina256 = 7,
  NonRetina512 = 8,
  Retina512 = 9,
}

export const resolutions: Resolution[] = [
  Resolution.NonRetina16,
  Resolution.Retina16,
  Resolution.NonRetina32,
  Resolution.Retina32,
  Resolution.NonRetina128,
  Resolution.Retina128,
  Resolution.NonRetina256,
  Resolution.Retina256,
  Resolution.NonRetina512,
  Resolution.Retina512,
]

export const Size: Record<Resolution, number> = {
  [Resolution.NonRetina16]: 16,
  [Resolution.Retina16]: 32,
  [Resolution.NonRetina32]: 32,
  [Resolution.Retina32]: 64,
  [Resolution.NonRetina128]: 128,
  [Resolution.Retina128]: 256,
  [Resolution.NonRetina256]: 256,
  [Resolution.Retina256]: 512,
  [Resolution.NonRetina512]: 512,
  [Resolution.Retina512]: 1024,
}

export const BaseConfig: IconConstraints = {
  maxWidth: 768,
  maxHeight: 384,
  preferredSize: 384,
  folderAreaHeight: 604,
  startY: 258,
}

export const IconColor: Record<Color, RGB> = {
  'macos-default-dark': {
    red: 51,
    green: 157,
    blue: 224,
  },
  'macos-default-light': {
    red: 63,
    green: 170,
    blue: 230,
  },
  'macos-green': {
    red: 24,
    green: 171,
    blue: 104,
  },
  'macos-lime': {
    red: 58,
    green: 173,
    blue: 75,
  },
  'macos-yellow': {
    red: 202,
    green: 164,
    blue: 27,
  },
  'macos-orange': {
    red: 205,
    green: 111,
    blue: 4,
  },
  'macos-red': {
    red: 206,
    green: 45,
    blue: 36,
  },
  'macos-purple': {
    red: 131,
    green: 63,
    blue: 157,
  },
  'macos-gray': {
    red: 102,
    green: 102,
    blue: 102,
  },
  'macos-black': {
    red: 17,
    green: 17,
    blue: 17,
  },
  'macos-gradient-blue': {
    red: 51,
    green: 157,
    blue: 224,
  },
  'macos-gradient-purple-dark': {
    red: 131,
    green: 63,
    blue: 157,
  },
  'macos-gradient-purple-light': {
    red: 131,
    green: 63,
    blue: 157,
  },
  'macos-gradient-red': {
    red: 206,
    green: 45,
    blue: 36,
  },
  'macos-gradient-yellow': {
    red: 202,
    green: 164,
    blue: 27,
  },
  'win-default': {
    red: 180,
    green: 126,
    blue: 1,
  },
  'win-pink': {
    red: 201,
    green: 84,
    blue: 122,
  },
  'win-blue': {
    red: 151,
    green: 216,
    blue: 252,
  },
  'win-green': {
    red: 145,
    green: 226,
    blue: 188,
  },
  'win-lime': {
    red: 153,
    green: 234,
    blue: 164,
  },
  'win-orange': {
    red: 241,
    green: 194,
    blue: 135,
  },
  'win-purple': {
    red: 207,
    green: 155,
    blue: 227,
  },
  'win-red': {
    red: 248,
    green: 155,
    blue: 151,
  },
  'win-violet': {
    red: 207,
    green: 155,
    blue: 227,
  },
}

export const ShadowColor: Record<Color, string> = {
  'macos-default-dark': '#97D8FC',
  'macos-default-light': '#97D8FC',
  'macos-green': '#91E2BC',
  'macos-lime': '#99EAA4',
  'macos-yellow': '#F4DA86',
  'macos-orange': '#F1C287',
  'macos-red': '#F89B97',
  'macos-purple': '#CF9BE3',
  'macos-gray': '#C2C2C2',
  'macos-black': '#5F5F5F',
  'macos-gradient-blue': '#ABABFF',
  'macos-gradient-purple-dark': '#E8A8FF',
  'macos-gradient-purple-light': '#CF9BE3',
  'macos-gradient-red': '#F89B97',
  'macos-gradient-yellow': '#B5854E',
  'win-default': '#ffdd7b',
  'win-pink': '#f8a5c2',
  'win-blue': '#97D8FC',
  'win-green': '#91E2BC',
  'win-lime': '#99EAA4',
  'win-orange': '#F1C287',
  'win-purple': '#CF9BE3',
  'win-red': '#F89B97',
  'win-violet': '#CF9BE3',
}

export const SHADOW_SIZE = 3
