import hljs from 'highlight.js'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import { useEffect } from 'react'

import { XIcon } from '../../components/icons/XIcon'
import { Route } from '../../components/Navigation'
import { BlogLayout } from '../../components/notes/BlogLayout'
import { NotionBlockRenderer } from '../../components/notion/NotionBlockRenderer'
import { notesApi } from '../../lib/notesApi'
import { NotionPage } from '../../lib/types'

interface BlogProps {
  note: NotionPage
  noteContent: any[]
}

export default function Blog({ note: { title, description, createdAt, slug }, noteContent }: BlogProps) {
  const url = `${process.env.SITE_URL}${Route.Blog}/${slug}`
  const openGraphImageUrl = `${process.env.SITE_URL}/api/og?title=${title}&description=${description}`

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
        authorName={process.env.SITE_AUTHOR}
        description={description}
      />
      <BlogLayout meta={{ title, description, date: createdAt }}>
        <div className="pb-32">
          {noteContent.map((block) => (
            <NotionBlockRenderer key={block.id} block={block} />
          ))}

          <hr />

          <a
            className="group block text-xl font-semibold no-underline md:text-3xl"
            href={`http://x.com/share?text=${title}&url=${url}`}
          >
            <h4 className="flex max-w-lg cursor-pointer flex-col text-wrap fill-white duration-200 ease-in-out group-hover:fill-primary group-hover:text-primary">
              <XIcon className="my-6 size-10 text-black transition-transform group-hover:-rotate-12 group-hover:text-primary dark:text-white" />
              Click here to share this article with your friends on X if you liked it.
            </h4>
          </a>
        </div>
      </BlogLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps<BlogProps, { slug: string }> = async (context) => {
  const slug = context.params?.slug
  const allNotes = await notesApi.getNotes()
  const note = allNotes.find((n) => n.slug === slug)

  if (!note) {
    return {
      notFound: true,
    }
  }

  const noteContent = await notesApi.getNote(note.id)

  return {
    props: {
      note,
      noteContent,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await notesApi.getNotes()

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: 'blocking',
  }
}
