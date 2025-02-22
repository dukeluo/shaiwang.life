'use client'

import { PageTitle } from './components/PageTitle'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-full flex-col pb-12 pt-16">
      <main className="mx-auto flex w-full max-w-7xl grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <PageTitle>Internal Server Error</PageTitle>
            <p className="mt-2 text-base text-gray-500">Sorry, my server is having some issues.</p>
            <div className="mt-6">
              <button onClick={reset} className="mr-4 text-base font-medium hover:text-primary">
                Try again
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
