// Explanation: Fixed font loading by using a system font stack instead of Google Fonts
// This eliminates the network dependency and makes the app more reliable
import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: 'Medium Platform',
  description: 'A modern publishing platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
