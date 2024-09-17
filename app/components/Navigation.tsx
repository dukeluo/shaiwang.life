import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel, Transition, TransitionChild } from '@headlessui/react'
import { RiCloseLine, RiMenuLine } from '@remixicon/react'
import clsx from 'clsx'
import Link from 'next/link'
// import { useRouter } from 'next/router'
import { Fragment, HTMLAttributes, PropsWithChildren } from 'react'

export enum Route {
  Home = '/',
  Blog = '/blog',
  Notes = '/notes',
  Creating = '/creating',
  Uses = '/uses',
}

export const NavigationItems = [
  {
    name: 'Home',
    href: Route.Home,
    type: 'internal',
  },
  {
    name: 'Blog',
    href: Route.Blog,
    type: 'internal',
  },
  {
    name: 'Notes',
    href: Route.Notes,
    type: 'internal',
  },
  {
    name: 'Creating',
    href: Route.Creating,
    type: 'internal',
  },
  {
    name: 'Uses',
    href: Route.Uses,
    type: 'internal',
  },
] as const

export const NavLink = ({ href, children }: PropsWithChildren<{ href: string }>) => {
  return (
    <Link href={href} className="transition hover:text-primary">
      {children}
    </Link>
  )
}

const NavItem = ({ href, children }: PropsWithChildren<{ href: string }>) => {
  // const isActive = useRouter().pathname === href
  const isActive = false

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

export const DesktopNavigation = (props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        {NavigationItems.map((item) => {
          if (item.type === 'internal') {
            return (
              <NavItem key={item.href} href={item.href}>
                {item.name}
              </NavItem>
            )
          }

          return (
            <a key={item.href} className="px-3 py-2 transition hover:text-primary" href={item.href} target="_blank">
              {item.name}
            </a>
          )
        })}
      </ul>
    </nav>
  )
}

const MobileNavItem = ({ href, children }: PropsWithChildren<{ href: string }>) => {
  return (
    <li>
      <PopoverButton as={Link} href={href} className="block py-2">
        {children}
      </PopoverButton>
    </li>
  )
}

export const MobileNavigation = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <Popover {...props}>
      <PopoverButton className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 outline-none ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
        <RiMenuLine />
      </PopoverButton>
      <Transition>
        <TransitionChild
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PopoverBackdrop className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
        </TransitionChild>
        <TransitionChild
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <PopoverPanel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <PopoverButton aria-label="Close menu" className="-m-1 p-1 outline-none">
                <RiCloseLine className="size-6 text-zinc-500 dark:text-zinc-400" />
              </PopoverButton>
              <h2 className="text-sm font-medium">Menu</h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                {NavigationItems.map((item) => (
                  <MobileNavItem key={item.href} href={item.href}>
                    {item.name}
                  </MobileNavItem>
                ))}
              </ul>
            </nav>
          </PopoverPanel>
        </TransitionChild>
      </Transition>
    </Popover>
  )
}
