'use client'

import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import { ReactNode, useEffect } from 'react'
import { theme } from './themes/cow/cow.theme'
import { useIsMounted } from '@repo/lib/shared/hooks/useIsMounted'
import { useTheme } from 'next-themes'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const isMounted = useIsMounted()

  // Force dark mode always
  function SetDarkTheme() {
    const { setTheme } = useTheme()
    const { setColorMode } = useColorMode()

    const theme = 'dark'

    useEffect(() => {
      setTheme(theme)
      setColorMode(theme)
    }, [])

    return null
  }

  // Avoid hydration error in turbopack mode
  if (!isMounted) return null

  return (
    <ChakraProvider
      cssVarsRoot="body"
      theme={theme}
      toastOptions={{ defaultOptions: { position: 'bottom-left' } }}
    >
      <SetDarkTheme />
      {children}
    </ChakraProvider>
  )
}
