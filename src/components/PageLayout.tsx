import { HTMLAttributes, PropsWithChildren } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string
}

export const PageLayout = ({ title, children, ...rest }: PropsWithChildren<Props>) => {
  return (
    <div className="mt-16 sm:mt-32" {...rest}>
      <header className="max-w-xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">{title}</h1>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </div>
  )
}
