'use client'

import { Combobox, ComboboxInput } from '@headlessui/react'
import { RiSearchLine } from '@remixicon/react'
import { lazy, useState } from 'react'
import { createPortal, preconnect } from 'react-dom'

const LazyDocSearchModal = lazy(() =>
  import('@docsearch/react').then(({ DocSearchModal }) => ({
    default: DocSearchModal,
  }))
)

export const Search = () => {
  const [openSearch, setOpenSearch] = useState(false)

  const openModal = () => setOpenSearch(true)
  const closeModal = () => setOpenSearch(false)

  preconnect(`https://${process.env.NEXT_PUBLIC_DOC_SEARCH_APP_ID}-dsn.algolia.net`, { crossOrigin: 'anonymous' })

  return (
    <>
      <Combobox>
        <div className="relative mb-4">
          <RiSearchLine className="absolute left-4 top-4 text-gray-400" />
          <ComboboxInput
            className="w-full rounded-full border p-3 pl-12 text-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 md:border-zinc-100 md:dark:border-zinc-700/40"
            placeholder="Quick search notes..."
            onClick={openModal}
          />
        </div>
      </Combobox>
      {openSearch &&
        createPortal(
          <LazyDocSearchModal
            appId={process.env.NEXT_PUBLIC_DOC_SEARCH_APP_ID!}
            apiKey={process.env.NEXT_PUBLIC_DOC_SEARCH_API_KEY!}
            indexName={process.env.NEXT_PUBLIC_DOC_SEARCH_INDEX_NAME!}
            insights={true}
            initialScrollY={window.scrollY}
            placeholder="Quick search notes..."
            onClose={closeModal}
          />,
          document.body
        )}
    </>
  )
}
