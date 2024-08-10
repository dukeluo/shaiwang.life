import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'

import { Badge } from '../../components/Badge'
import { BlogPostPreview } from '../../components/blog/BlogPostPreview'
import { PageLayout } from '../../components/PageLayout'
import { notionApi } from '../../lib/notionApi'
import { NotionPage } from '../../lib/types'

const seoTitle = 'Blog'
const seoDescription = 'All of my thoughts on programming, building products, works and more. Not structured.'

interface Props {
  blogPosts: NotionPage[]
  tags: Array<string>
}

export default function Blog({ blogPosts, tags }: Props) {
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/blog`}
        openGraph={{
          images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=${seoTitle}` }],
        }}
      />
      <PageLayout
        title="Notes on software, building products, and other stuff."
        intro="All of my thoughts on programming, building products, leadership, travelling, whisky, and other random stuff. Not structured."
      >
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
            {blogPosts.map((note) => (
              <BlogPostPreview key={note.slug} post={note} />
            ))}
          </div>
        </div>
      </PageLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const blogPosts = await notionApi.getBlog('desc')

  return {
    props: {
      blogPosts,
      tags: Array.from(new Set(blogPosts.map((post) => post.tags).flat())),
    },
    revalidate: 10,
  }
}
