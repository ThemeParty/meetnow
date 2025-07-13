import type { Viewport } from 'next'

import { Geist } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import { MeetingCreationProvider } from '@/lib/context/MeetingCreationContext'
import { VoteProvider } from '@/context/VoteContext'

import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'MeetNOW',
  description: '모임 만들어요. 문구 생각해봐요',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  minimumScale: 1,
}

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MeetingCreationProvider>
            <VoteProvider>
              <main className="flex flex-1 justify-center">
                <div className="min-h-full w-full max-w-screen-sm md:max-w-screen-md">
                  {children}
                </div>
              </main>
            </VoteProvider>
          </MeetingCreationProvider>
          <Toaster className="!bottom-14" />
        </ThemeProvider>
      </body>
    </html>
  )
}
