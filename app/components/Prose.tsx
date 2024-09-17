import { ReactNode } from 'react'

export const Prose = ({ children, className }: { children: ReactNode; className: string }) => {
  return <div className={`${className}  prose w-full dark:prose-invert md:prose-lg lg:prose-xl`}>{children}</div>
}
