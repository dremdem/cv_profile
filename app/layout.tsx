import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CV Profile | Matrix × 8-Bit Portfolio',
  description: 'A personal portfolio landing page combining Matrix movie aesthetics with 8-bit gaming style',
  keywords: ['portfolio', 'developer', 'matrix', '8-bit', 'retro'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'CV Profile | Matrix × 8-Bit Portfolio',
    description: 'A personal portfolio landing page combining Matrix movie aesthetics with 8-bit gaming style',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
