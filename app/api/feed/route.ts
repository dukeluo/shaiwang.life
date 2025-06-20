import { NextResponse } from 'next/server'
import RSS from 'rss'

import { Route } from '../../components/Navigation'
import { notionApi } from '../../lib/notionApi'

export async function GET() {
  const feed = new RSS({
    title: process.env.NEXT_PUBLIC_SITE_NAME!,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION!,
    site_url: process.env.NEXT_PUBLIC_SITE_URL!,
    feed_url: `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    language: 'en',
    pubDate: new Date(),
  })

  const blogs = await notionApi.getBlogs('desc')

  blogs.forEach((blog) => {
    feed.item({
      title: blog.title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${Route.Blog}/${blog.slug}`,
      date: blog.createdAt,
      description: blog.description,
      author: process.env.NEXT_PUBLIC_SITE_AUTHOR!,
    })
  })

  // Add verification message as a new RSS item
  feed.item({
    title: 'Feed Ownership Verification',
    description:
      'This message is used to verify that this feed (feedId:149832439969172480) belongs to me (userId:149828291520870400). Join me in enjoying the next generation information browser https://follow.is.',
    url: process.env.NEXT_PUBLIC_SITE_URL || '',
    date: new Date('2025-06-20'),
  })

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
