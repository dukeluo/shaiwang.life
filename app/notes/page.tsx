import { Combobox, ComboboxInput } from '@headlessui/react'
import { RiSearchLine } from '@remixicon/react'
import { useState } from 'react'

import { Badge } from '../components/Badge'
import { NotePostPreview } from '../components/blog/NotePostPreview'
import { PageLayout } from '../components/PageLayout'
import { notionApi } from '../lib/notionApi'

export default async function Notes() {
  const notes = await notionApi.getNotes('desc')
  const tags = Array.from(new Set(notes.map((note) => note.tags).flat()))
  // const [searchQuery, setSearchQuery] = useState<string | null>(null)
  // const [selectedTag, setSelectedTag] = useState<string | null>(null)

  return (
    <PageLayout title="Something I learned today.">
      <Combobox>
        <div className="relative mb-4">
          <RiSearchLine className="absolute left-4 top-4 text-gray-400" />
          <ComboboxInput
            className="w-full rounded-full border p-3 pl-12 text-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 md:border-zinc-100 md:dark:border-zinc-700/40"
            placeholder="Quick search notes..."
            // onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </Combobox>
      <div className="mt-6 flex max-w-xl flex-wrap gap-1 font-mono">
        {tags.map((tag) => (
          <Badge key={tag} href={`/tags/${tag}`}>
            #{tag}
          </Badge>
        ))}
      </div>
      <div className="mt-12 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {notes.map((note) => (
            <NotePostPreview key={note.slug} post={note} />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
