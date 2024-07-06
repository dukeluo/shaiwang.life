import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Container } from './Container'
import { DesktopNavigation, MobileNavigation } from './Navigation'
import { ThemeToggle } from './ThemeToggle'

const AvatarContainer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        className,
        'size-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10'
      )}
      {...props}
    />
  )
}

const Avatar = () => {
  return (
    <Link href="/" aria-label="Home" className="pointer-events-auto">
      <Image
        src=""
        alt=""
        sizes="2.25rem"
        className="size-9 rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
        priority
      />
    </Link>
  )
}

export const Header = () => {
  return (
    <header className="pointer-events-none relative z-50 flex flex-col">
      <div className="top-0 z-10 h-16 pt-6">
        <Container className="w-full">
          <div className="relative flex gap-4">
            <div className="flex flex-1">
              <AvatarContainer>
                <Avatar />
              </AvatarContainer>
            </div>
            <div className="flex flex-1 justify-end md:justify-center">
              <MobileNavigation className="pointer-events-auto md:hidden" />
              <DesktopNavigation className="pointer-events-auto hidden md:block" />
            </div>
            <div className="flex justify-end md:flex-1">
              <div className="pointer-events-auto">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}
