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

interface NoteProps {
  note: NotionPage
  noteContent: any[]
}

export default function Note({ note: { title, description, createdAt, slug }, noteContent }: NoteProps) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${Route.Notes}/${slug}`
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
        <div className="mb-4">
          {noteContent.map((block) => (
            <NotionBlockRenderer key={block.id} block={block} />
          ))}
        </div>
      </BlogLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps<NoteProps, { slug: string }> = async (context) => {
  const slug = context.params?.slug
  const notes = await notionApi.getNotes()
  const note = notes.find((n) => n.slug === slug)

  if (!note) {
    return {
      notFound: true,
    }
  }

  const noteContent = await notionApi.getNoteContent(note.id)

  return {
    props: {
      note,
      noteContent,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const notes = await notionApi.getNotes()

  return {
    paths: notes.map((note) => ({ params: { slug: note.slug } })),
    fallback: 'blocking',
  }
}
