import { motion } from 'framer-motion'

import { ANIMATION_FROM_PROPS, ANIMATION_TO_PROPS } from '../../lib/animation'
import { formatDate } from '../../lib/date'
import { NotionPage } from '../../lib/types'
import { Card } from '../Card'
import { Route } from '../Navigation'

export const NotePostPreview = ({ post }: { post: NotionPage }) => {
  return (
    <motion.div initial={ANIMATION_FROM_PROPS} whileInView={ANIMATION_TO_PROPS} viewport={{ once: true }}>
      <article className="md:grid md:grid-cols-4 md:items-baseline">
        <Card className="md:col-span-4">
          <Card.Title href={`${Route.Blog}/${post.slug}`}>{post.title}</Card.Title>
          <Card.Description>{formatDate(post.createdAt)}</Card.Description>
        </Card>
      </article>
    </motion.div>
  )
}
