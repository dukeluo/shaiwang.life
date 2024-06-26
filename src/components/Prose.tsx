import { ReactNode } from 'react'

export const Prose = ({ children, className }: { children: ReactNode; className: string }) => {
  return <div className={`${className}  prose w-full md:prose-lg lg:prose-xl dark:prose-invert`}>{children}</div>
}
