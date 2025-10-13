'use client'

import { ChakraProvider, ThemeTypings, useColorMode } from '@chakra-ui/react'
import { ReactNode, useMemo, useEffect } from 'react'
import { theme as balTheme } from './themes/bal/bal.theme'
import { theme as cowTheme } from './themes/cow/cow.theme'
import { useCow } from '@repo/lib/modules/cow/useCow'
import { useIsMounted } from '@repo/lib/shared/hooks/useIsMounted'
import { useTheme } from 'next-themes'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { isCowPath, isCowVariant } = useCow()
  const isMounted = useIsMounted()

  function getTheme(): ThemeTypings {
    if (isCowPath || isCowVariant) return cowTheme

    return balTheme
  }

  const theme = useMemo(() => getTheme(), [isCowPath, isCowVariant])

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
