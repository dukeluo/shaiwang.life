'use client'

import { RiArrowLeftLine } from '@remixicon/react'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import { formatDate } from '../../lib/date'
import { Prose } from '../Prose'

interface BlogLayoutProps {
  children: ReactNode
  meta: {
    title: string
    description: string
    date: string
  }
}

export const BlogLayout = ({ children, meta }: BlogLayoutProps) => {
  const router = useRouter()

  return (
    <div className="mt-16 lg:mt-32 xl:relative">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="group mb-8 flex size-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
        >
          <RiArrowLeftLine className="size-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-primary" />
        </button>
        <article>
          <header className="flex flex-col">
            <h1 className="mt-6 text-4xl font-bold text-zinc-800 dark:text-zinc-100">{meta.title}</h1>
            <time
              dateTime={meta.date}
              className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
            >
              <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
              <span className="ml-3">{formatDate(meta.date)}</span>
            </time>
          </header>
          <Prose className="mt-8">{children}</Prose>
        </article>
      </div>
    </div>
  )
}
