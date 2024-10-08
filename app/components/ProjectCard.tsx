import { RiLinksLine } from '@remixicon/react'
import Image from 'next/image'

import { Project } from '../lib/lifeApi'
import { Badge } from './Badge'
import { Card } from './Card'

interface Props {
  project: Project
}

export const ProjectCard = ({ project }: Props) => {
  return (
    <Card className="h-full" key={project.title}>
      <div className="relative z-10 flex size-16 items-center justify-center rounded-full bg-white p-2 shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={project.logo} alt={`Logo of ${project.title}`} className="size-10 object-contain p-1" unoptimized />
      </div>
      <div className="mt-6">
        {project.link ? (
          <Card.Title href={project.link.href}>{project.title}</Card.Title>
        ) : (
          <Card.Title>{project.title}</Card.Title>
        )}
      </div>
      <Card.Description>{project.description}</Card.Description>
      <p className="z-10 my-6 flex flex-wrap gap-1 font-mono">
        {project.techStack.map((techStackItem) => (
          <Badge key={techStackItem}>{techStackItem}</Badge>
        ))}
      </p>
      <div className="relative z-10 mt-auto flex text-sm font-medium text-zinc-400 transition group-hover:text-primary dark:text-zinc-200">
        {project.link ? (
          <p className="flex items-center">
            <RiLinksLine className="size-6 flex-none" />
            <span className="ml-2">{project.link.label}</span>
            <span className="ml-2 size-1 rounded-full bg-green-700" />
          </p>
        ) : (
          <p className="flex items-center gap-x-2 text-zinc-400">
            Shut down <span className="size-1 rounded-full bg-red-700" />
          </p>
        )}
      </div>
    </Card>
  )
}
