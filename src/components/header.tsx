import Image from 'next/image'
import Link from 'next/link'
import LocaleSwitcher from './locale-switcher'
import { ThemeToggle } from './next-theme/toggle'

export default function Header() {
  return (
    <header className="flex items-center justify-between container mx-auto py-6 px-6 ">
      <div>
        <Link href="/">
          <Image src="/icon.svg" alt="logo" width={24} height={24} />
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <ThemeToggle className="max-lg:hidden" />
        <LocaleSwitcher />
      </div>
    </header>
  )
}
