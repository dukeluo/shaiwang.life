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

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
