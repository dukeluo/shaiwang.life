import { Badge } from '../components/Badge'
import { BlogPostPreview } from '../components/blog/BlogPostPreview'
import { PageLayout } from '../components/PageLayout'
import { notionApi } from '../lib/notionApi'

export const revalidate = 3600

export default async function Blogs() {
  const blogs = await notionApi.getBlogs('desc')
  const tags = Array.from(new Set(blogs.map((blog) => blog.tags).flat()))

  return (
    <PageLayout title="All thoughts I want to share with others.">
      <h3 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">Tags</h3>
      <div className="mt-4 flex max-w-xl flex-wrap gap-1 font-mono">
        {tags.map((tag) => (
          <Badge key={tag} href={`/tags/${tag}`}>
            #{tag}
          </Badge>
        ))}
      </div>
      <div className="mt-24 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {blogs.map((blog) => (
            <BlogPostPreview key={blog.slug} post={blog} />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
