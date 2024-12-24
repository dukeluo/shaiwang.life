import { RiArrowRightSLine } from '@remixicon/react'
import { notFound } from 'next/navigation'

import { BlogLayout } from '../../components/blog/BlogLayout'
import { Route } from '../../components/Navigation'
import { NotionBlockRenderer } from '../../components/notion/NotionBlockRenderer'
import { notionApi } from '../../lib/notionApi'

export const revalidate = 3600

export default async function Blog({ params }: { params: { slug: string } }) {
  const blogs = await notionApi.getBlogs()
  const blog = blogs.find((blog) => blog.slug === params.slug)

  if (!blog) {
    return notFound()
  }

  const blogContent = (await notionApi.getBlogContent(blog.id)) as any[]
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${Route.Blog}/${blog.slug}`

  return (
    <BlogLayout meta={{ title: blog.title, description: blog.description, date: blog.createdAt }}>
      <div className="mb-4">
        {blogContent.map((block) => (
          <NotionBlockRenderer key={block.id} block={block} />
        ))}
      </div>
      <div className="flex items-center opacity-50">
        <RiArrowRightSLine />
        <a
          href={`https://x.com/share?text=${encodeURIComponent(`Reading @ihuanluo\'s ${url}\n\nI think...`)}&url=${url}`}
          className="no-underline"
          target="_blank"
        >
          <span className="font-mono">/comment-on-x</span>
        </a>
      </div>
    </BlogLayout>
  )
}

export async function generateStaticParams() {
  const blogs = await notionApi.getBlogs()
  return blogs.map((blog) => ({ slug: blog.slug }))
}
