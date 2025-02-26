import { notFound } from 'next/navigation'

import { BlogLayout } from '../../components/blog/BlogLayout'
import { NotionBlockRenderer } from '../../components/notion/NotionBlockRenderer'
import { notionApi } from '../../lib/notionApi'

export const revalidate = 3000

export default async function Note({ params }: { params: { slug: string } }) {
  const notes = await notionApi.getNotes()
  const note = notes.find((note) => note.slug === params.slug)

  if (!note) {
    return notFound()
  }

  const noteContent = (await notionApi.getNoteContent(note.id)) as any[]

  return (
    <BlogLayout meta={{ title: note.title, description: note.description, date: note.createdAt }}>
      <div className="mb-4">
        {noteContent.map((block) => (
          <NotionBlockRenderer key={block.id} block={block} />
        ))}
      </div>
    </BlogLayout>
  )
}

export async function generateStaticParams() {
  const notes = await notionApi.getNotes()
  return notes.map((note) => ({ slug: note.slug }))
}
