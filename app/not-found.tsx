import Link from 'next/link'

import { PageTitle } from './components/PageTitle'

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col pb-12 pt-16">
      <main className="mx-auto flex w-full max-w-7xl grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <PageTitle>Page not found.</PageTitle>
            <p className="mt-2 text-base text-gray-500">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
            <div className="mt-6">
              <Link href="/" className="text-base font-medium hover:text-primary">
                Go back home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
