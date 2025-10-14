'use client'

import { Stack, VStack } from '@chakra-ui/react'
import { LbpForm } from '@repo/lib/modules/lbp/LbpForm'
import { LbpPreview } from '@repo/lib/modules/lbp/LbpPreview'
import { HeaderBanner } from '@repo/lib/modules/lbp/header/HeaderBanner'
import { LbpBackground } from '@repo/lib/modules/lbp/LbpBackground'

export default function LBPCreatePage() {
  return (
    <LbpBackground>
      <VStack spacing="lg">
        <HeaderBanner />
        <Stack
          direction={{ base: 'column', xl: 'row' }}
          justifyContent="stretch"
          spacing="xl"
          w="full"
        >
          <LbpForm />
          <LbpPreview />
        </Stack>
      </VStack>
    </LbpBackground>
  )
}
