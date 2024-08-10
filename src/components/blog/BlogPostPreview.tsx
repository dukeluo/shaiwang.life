import clsx from 'clsx'
import { motion } from 'framer-motion'

import { ANIMATION_FROM_PROPS, ANIMATION_TO_PROPS } from '../../lib/animation'
import { formatDate } from '../../lib/date'
import { NotionPage } from '../../lib/types'
import { Card } from '../Card'
import { Route } from '../Navigation'

interface Props {
  post: NotionPage
  dense?: boolean
}

export const BlogPostPreview = ({ post, dense }: Props) => {
  return (
    <motion.div initial={ANIMATION_FROM_PROPS} whileInView={ANIMATION_TO_PROPS} viewport={{ once: true }}>
      <article className="md:grid md:grid-cols-4 md:items-baseline">
        <Card className="md:col-span-3">
          <Card.Title href={`${Route.Blog}/${post.slug}`}>{post.title}</Card.Title>
          <Card.Eyebrow as="time" dateTime={post.createdAt} className={clsx(!dense && 'md:hidden')} decorate>
            {formatDate(post.createdAt)}
          </Card.Eyebrow>
          <Card.Description>{post.description}</Card.Description>
          <Card.Cta>Read more</Card.Cta>
        </Card>
        {!dense && (
          <Card.Eyebrow as="time" dateTime={post.createdAt} className="mt-1 hidden md:block">
            {formatDate(post.createdAt)}
          </Card.Eyebrow>
        )}
      </article>
    </motion.div>
  )
}
