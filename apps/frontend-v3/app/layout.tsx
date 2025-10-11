import { Metadata } from 'next'
import { satoshiFont } from '@repo/lib/assets/fonts/satoshi/satoshi'
import NextTopLoader from 'nextjs-toploader'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@repo/lib/assets/css/global.css'
import { Fathom } from '@repo/lib/shared/services/fathom/Fathom'
import Script from 'next/script'
import { PropsWithChildren } from 'react'
import { Providers } from '@repo/lib/shared/components/site/providers'
import { DEFAULT_THEME_COLOR_MODE } from '@repo/lib/shared/services/chakra/themes/base/foundations'
import { ThemeProvider as ColorThemeProvider } from 'next-themes'
import { ThemeProvider } from '@bal/lib/services/chakra/ThemeProvider'

export const metadata: Metadata = {
  title: `HWAVE Token Launch - Hyperwave`,
  description: `The first ever liquid token (hwHLP) that accrues yield from the Hyperliquidity Provider vaults (HLP) on HyperEVM and beyond.`,
  icons: [
    { rel: 'icon', type: 'image/x-icon', url: '/favicon.ico' },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon-light.png',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon-dark.png',
      media: '(prefers-color-scheme: dark)',
    },
  ],
  openGraph: {
    title: `HWAVE Token Launch - Hyperwave`,
    description: `The first ever liquid token (hwHLP) that accrues yield from the Hyperliquidity Provider vaults (HLP) on HyperEVM and beyond.`,
    siteName: 'Hyperwave',
    type: 'website',
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={satoshiFont.className}
        style={{ marginRight: '0px !important' }} // Required to prevent layout shift introduced by Rainbowkit
        suppressHydrationWarning
      >
        <Fathom />
        <NextTopLoader color="#7f6ae8" showSpinner={false} />
        <ColorThemeProvider defaultTheme={DEFAULT_THEME_COLOR_MODE}>
          <ThemeProvider>
            <Providers>
              {children}
              <SpeedInsights />
              <Script async src="https://w.appzi.io/w.js?token=8TY8k" />
            </Providers>
          </ThemeProvider>
        </ColorThemeProvider>
      </body>
    </html>
  )
}
