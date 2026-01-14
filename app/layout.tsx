import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'CV Profile | Matrix × 8-Bit Portfolio',
  description: 'A personal portfolio landing page combining Matrix movie aesthetics with 8-bit gaming style',
  keywords: ['portfolio', 'developer', 'matrix', '8-bit', 'retro'],
  authors: [{ name: 'Vladimir Yakovenko' }],
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
  const goatCounterCode = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}

        {/* GoatCounter Analytics - only loads if configured */}
        {goatCounterCode && (
          <Script
            data-goatcounter={`https://${goatCounterCode}.goatcounter.com/count`}
            src="//gc.zgo.at/count.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
