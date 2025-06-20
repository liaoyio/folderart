import LocaleSwitcher from './locale-switcher'
import { ThemeToggle } from './next-theme/toggle'

export default function Header() {
  return (
    <header className="flex items-center justify-between container mx-auto py-6 px-6 h-16  z-10">
      <div>
        <h3>Folder Art</h3>
      </div>
      <div className="flex items-center gap-6">
        <ThemeToggle className="max-lg:hidden" />
        <LocaleSwitcher />
      </div>
    </header>
  )
}
