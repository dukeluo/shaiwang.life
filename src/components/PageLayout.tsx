import { HTMLAttributes, PropsWithChildren } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string
  intro: string
}

export const PageLayout = ({ title, intro, children, ...rest }: PropsWithChildren<Props>) => {
  return (
    <div className="mt-16 sm:mt-32" {...rest}>
      <header className="max-w-3xl">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">{title}</h1>
        <p className="mt-6 text-balance text-base">{intro}</p>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </div>
  )
}
