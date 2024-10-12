'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

export const NavItem = ({ href, children }: PropsWithChildren<{ href: string }>) => {
  const pathname = usePathname()
  const isActive = href === '/' ? pathname === href : pathname.startsWith(href)

  return (
    <li>
      <Link
        href={href}
        className={clsx('relative block px-3 py-2 transition', isActive ? 'text-primary' : 'hover:text-primary')}
      >
        {children}
      </Link>
    </li>
  )
}
