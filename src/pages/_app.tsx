import '../styles/index.css'

import { Analytics } from '@vercel/analytics/react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { useEffect, useRef } from 'react'

import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

function usePrevious(value: string) {
  const ref = useRef<string>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function App({ Component, pageProps, router }: AppProps) {
  const previousPathname = usePrevious(router.pathname)

  return (
    <>
      <ThemeProvider attribute="class">
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>
        <Container className="relative">
          <Header />
          <main>
            <Component previousPathname={previousPathname} {...pageProps} />
          </main>
          <Footer />
        </Container>
        <Analytics />
      </ThemeProvider>
    </>
  )
}
