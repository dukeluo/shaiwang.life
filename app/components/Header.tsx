import Image from 'next/image'
import Link from 'next/link'

import AvatarImage from '../icon.svg'
import { Navigation } from './Navigation'
import { ThemeToggle } from './ThemeToggle'

const Avatar = () => (
  <div className="size-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
    <Link href="/" aria-label="Home" className="pointer-events-auto">
      <Image
        src={AvatarImage}
        sizes="2.25rem"
        className="size-9 rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
        priority
        alt="avatar"
      />
    </Link>
  </div>
)

export const Header = () => {
  return (
    <header className="pointer-events-none relative top-0 flex h-16 gap-4 pt-6">
      <div className="flex flex-1">
        <Avatar />
      </div>
      <div className="flex flex-1 justify-end md:justify-center">
        <Navigation />
      </div>
      <div className="pointer-events-auto flex justify-end md:flex-1">
        <ThemeToggle />
      </div>
    </header>
  )
}
