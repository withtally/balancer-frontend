import { Box } from '@chakra-ui/react'
import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: `HWAVE LBP - Hyperwave`,
  description: `The native token of Hyperwave DAO — connecting users to Hyperwave's growth and revenue`,
  openGraph: {
    title: `HWAVE LBP - Hyperwave`,
    description: `The native token of Hyperwave DAO — connecting users to Hyperwave's growth and revenue.`,
    siteName: 'Hyperwave',
  },
}

export default function MarketingLayout({ children }: PropsWithChildren) {
  return <Box>{children}</Box>
}
