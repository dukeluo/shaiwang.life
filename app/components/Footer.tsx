import Link from 'next/link'

import { NavigationItems } from './Navigation'

export const Footer = () => {
  return (
    <footer className="mt-8 border-t border-zinc-100 py-6 dark:border-zinc-700/40">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
          {NavigationItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-primary">
              {item.name}
            </Link>
          ))}
        </div>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          &copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SITE_AUTHOR}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
