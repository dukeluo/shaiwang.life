'use client'

import { RiMoonFill, RiSunLine } from '@remixicon/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <button
          type="button"
          aria-label="Toggle dark mode"
          className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <RiSunLine className="size-6 transition dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-primary [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-primary-dark" />
          <RiMoonFill className="hidden size-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-primary" />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
