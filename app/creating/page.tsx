import * as motion from 'framer-motion/client'

import { PageLayout } from '../components/PageLayout'
import { ProjectCard } from '../components/ProjectCard'
import { ANIMATION_FROM_PROPS, ANIMATION_TO_PROPS } from '../lib/animation'
import { MyCurrentProjects, MyPastProjects } from '../lib/lifeApi'

const seoTitle = 'Creating'
const seoDescription = "Things I've made trying to put my dent in the universe."

export default function Creating() {
  return (
    <>
      <PageLayout title="Things I've made trying to put my dent in the universe.">
        <h2 className="text-2xl font-bold tracking-tight">Now</h2>
        <p className="mt-2 text-base">Projects I currently work on.</p>
        <ul role="list" className="mt-12 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {MyCurrentProjects.map((project) => (
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

        <h2 className="mt-24 text-2xl font-bold tracking-tight">Past</h2>
        <p className="mt-2 text-base">
          Projects I worked on. Due to nature of internet businesses not all of them are still online.
        </p>
        <ul role="list" className="mt-12 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {MyPastProjects.map((project) => (
            <motion.li
              key={project.title}
              initial={ANIMATION_FROM_PROPS}
              whileInView={ANIMATION_TO_PROPS}
              viewport={{ once: true }}
            >
              <ProjectCard key={project.title} project={project} />
            </motion.li>
          ))}
        </ul>
      </PageLayout>
    </>
  )
}
