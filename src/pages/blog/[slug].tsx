import { RiArrowRightSLine } from '@remixicon/react'
import hljs from 'highlight.js'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import { useEffect } from 'react'

import { BlogLayout } from '../../components/blog/BlogLayout'
import { Route } from '../../components/Navigation'
import { NotionBlockRenderer } from '../../components/notion/NotionBlockRenderer'
import { notionApi } from '../../lib/notionApi'
import { NotionPage } from '../../lib/types'

interface BlogProps {
  note: NotionPage
  noteContent: any[]
}

export default function Blog({ note: { title, description, createdAt, slug }, noteContent }: BlogProps) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${Route.Blog}/${slug}`
  const openGraphImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=${title}&description=${description}`

  useEffect(() => {
    hljs.highlightAll()
  }, [])

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          images: [{ url: openGraphImageUrl }],
        }}
      />
      <ArticleJsonLd
        url={url}
        images={[openGraphImageUrl]}
        title={title}
        datePublished={createdAt}
        authorName={process.env.NEXT_PUBLIC_SITE_AUTHOR}
        description={description}
      />
      <BlogLayout meta={{ title, description, date: createdAt }}>
        <div className="mb-4 border-b border-zinc-100 dark:border-zinc-700/40">
          {noteContent.map((block) => (
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
    </>
  )
}

export const getStaticProps: GetStaticProps<BlogProps, { slug: string }> = async (context) => {
  const slug = context.params?.slug
  const allNotes = await notionApi.getBlog()
  const note = allNotes.find((n) => n.slug === slug)

  if (!note) {
    return {
      notFound: true,
    }
  }

  const noteContent = await notionApi.getBlogContent(note.id)

  return {
    props: {
      note,
      noteContent,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await notionApi.getBlog()

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: 'blocking',
  }
}
