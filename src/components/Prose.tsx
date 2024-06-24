import clsx from 'clsx'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>

export const Prose = ({ children, className }: Props) => {
  return (
    <div className={clsx(className, 'md:prose-md prose prose-zinc w-full dark:prose-dark xl:prose-lg')}>{children}</div>
  )
}
