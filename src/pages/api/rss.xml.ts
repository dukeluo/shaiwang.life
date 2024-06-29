import { NextApiHandler } from 'next'
import RSS from 'rss'

import { notionApi } from '../../lib/notionApi'

const rss: NextApiHandler = async (req, res) => {
  const feed = new RSS({
    title: process.env.SITE_NAME!,
    site_url: process.env.SITE_URL!,
    feed_url: `${process.env.SITE_URL}/rss.xml`,
  })

  const allPosts = await notionApi.getBlog()
  allPosts.map((post) => {
    feed.item({
      title: post.title,
      url: `${process.env.SITE_URL}/${post.slug}`,
      date: post.createdAt,
      description: post.description,
    })
  })

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')
  res.write(feed.xml({ indent: true }))
  res.end()
}

export default rss
