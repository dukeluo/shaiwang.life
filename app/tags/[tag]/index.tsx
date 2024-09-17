import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

import { BlogPostPreview } from '../../components/blog/BlogPostPreview'
import { PageLayout } from '../../components/PageLayout'
import { notionApi } from '../../lib/notionApi'
import { NotionPage } from '../../lib/types'

const seoTitle = 'Tags'
const seoDescription = 'All of my blog posts tagged with '

interface Props {
  tag: string
  relatedNotes: NotionPage[]
}

export default function Tag({ tag, relatedNotes }: Props) {
  return (
    <>
      <PageLayout title={`All the articles from #${tag}`}>
        <div className="mt-24 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {relatedNotes.map((note) => (
              <BlogPostPreview key={note.slug} post={note} />
            ))}
          </div>
        </div>
      </PageLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props, { tag: string }> = async (context) => {
  const tag = context.params?.tag
  if (!tag) {
    return {
      notFound: true,
    }
  }

  const relatedNotes = await notionApi.getBlogByTag(tag)

  return {
    props: {
      relatedNotes,
      tag,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await notionApi.getAllTags()

  return {
    paths: tags.map((tag) => ({
      params: { tag },
    })),
    fallback: 'blocking',
  }
}
