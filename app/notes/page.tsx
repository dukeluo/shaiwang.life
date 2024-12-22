import { Badge } from '../components/Badge'
import { NotePostPreview } from '../components/blog/NotePostPreview'
import { PageLayout } from '../components/PageLayout'
import { Search } from '../components/Search'
import { notionApi } from '../lib/notionApi'

export const revalidate = 3600

export default async function Notes() {
  const notes = await notionApi.getNotes('desc')
  const tags = Array.from(new Set(notes.map((note) => note.tags).flat()))

  return (
    <PageLayout title="Something I learned today.">
      <Search />
      <div className="flex flex-wrap gap-1 px-4 font-mono">
        {tags.map((tag) => (
          <Badge key={tag} href={`/tags/${tag}`}>
            #{tag}
          </Badge>
        ))}
      </div>
      <div className="mt-10 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-10">
          {notes.map((note) => (
            <NotePostPreview key={note.slug} post={note} />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
