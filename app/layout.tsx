import './styles/index.css'

import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from 'next-themes'

import { Container } from './components/Container'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex h-full flex-col bg-zinc-50 text-zinc-700 dark:bg-black dark:text-zinc-300">
        <ThemeProvider attribute="class">
          <div className="fixed inset-0 flex justify-center sm:px-8">
            <div className="flex w-full max-w-7xl lg:px-8">
              <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
            </div>
          </div>
          <Container className="relative">
            <Header />
            <main>{children}</main>
            <Footer />
          </Container>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
