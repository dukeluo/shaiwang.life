import * as motion from 'framer-motion/client'

import { PageLayout } from '../components/PageLayout'
import { IProject, ProjectCard } from '../components/ProjectCard'
import { ANIMATION_FROM_PROPS, ANIMATION_TO_PROPS } from '../lib/animation'

const Projects: IProject[] = [
  {
    title: 'eslint-plugin-check-file',
    description:
      'ESLint rules for consistent filename and folder. Allows you to enforce a consistent naming pattern for the filename and folder. ',
    techStack: ['Node.js', 'JavaScript', 'ESLint'],
    logo: 'https://cdn.worldvectorlogo.com/logos/npm-2.svg',
    link: {
      label: 'npm',
      href: 'https://www.npmjs.com/package/eslint-plugin-check-file',
    },
  },
  {
    title: 'wai',
    description:
      'A new tab page extension for cervical spondylosis prevention, supports Chrome, Firefox and web pages.',
    techStack: ['TypeScript', 'Python', 'Vue'],
    logo: 'https://i.ibb.co/pKTRv5k/logo128.png',
    link: {
      label: 'GitHub',
      href: 'https://github.com/dukeluo/wai',
    },
  },
]

export default function Creating() {
  return (
    <PageLayout title="Creations aimed at making my mark on the world.">
      <ul role="list" className="mt-12 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {Projects.map((project) => (
          <motion.li
            key={project.title}
            initial={ANIMATION_FROM_PROPS}
            whileInView={ANIMATION_TO_PROPS}
            viewport={{ once: true }}
          >
            <ProjectCard project={project} />
          </motion.li>
        ))}
      </ul>
    </PageLayout>
  )
}
