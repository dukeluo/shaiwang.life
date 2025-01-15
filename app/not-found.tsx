'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { PageTitle } from './components/PageTitle'

export default function NotFound() {
  const pathname = usePathname()
  const isLegacyPost = /^\/\d{4}\/\d{2}\/\d{2}\/.*$/.test(pathname)

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
              {isLegacyPost ? (
                <Link
                  href={`${process.env.NEXT_PUBLIC_LEGACY_SITE_URL}${pathname}`}
                  className="text-base font-medium hover:text-primary"
                  target="_blank"
                >
                  Go to legacy site to read this post
                </Link>
              ) : (
                <Link href="/" className="text-base font-medium hover:text-primary">
                  Go back home
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
