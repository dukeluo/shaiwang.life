import clsx from 'clsx'
import { HTMLAttributes, PropsWithChildren } from 'react'

export const PageTitle = ({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) => {
  return (
    <h1
      className={clsx(className, 'text-balance text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100')}
      {...props}
    >
      {children}
    </h1>
  )
}
