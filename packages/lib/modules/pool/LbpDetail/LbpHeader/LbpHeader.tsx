import { Box, Grid, GridItem, VStack, HStack, Image } from '@chakra-ui/react'
import { DefaultPageContainer } from '@repo/lib/shared/components/containers/DefaultPageContainer'
import FadeInOnView from '@repo/lib/shared/components/containers/FadeInOnView'
import Noise from '@repo/lib/shared/components/layout/Noise'
import { RadialPattern } from '@repo/lib/shared/components/zen/RadialPattern'
import { LbpHeaderTitleDescription } from './LbpHeaderTitleDescription'
import { LbpHeaderTimeInfo } from './LbpHeaderTimeInfo'
import { LbpHeaderStats } from './LbpHeaderStats'
import { ConnectWallet } from '@repo/lib/modules/web3/ConnectWallet'
import { useUserAccount } from '@repo/lib/modules/web3/UserAccountProvider'
import RecentTransactions from '@repo/lib/shared/components/other/RecentTransactions'
import { UserSettings } from '@repo/lib/modules/user/settings/UserSettings'
import { PROJECT_CONFIG } from '@repo/lib/config/getProjectConfig'

export function LbpHeader() {
  const { isConnected } = useUserAccount()
  const {
    options: { allowCreateWallet },
  } = PROJECT_CONFIG

  return (
    <Box pt="0">
      {/* Top Navigation Bar */}
      <Box bg="#051212" position="sticky" pt="0" top="0" zIndex="sticky">
        <DefaultPageContainer py="0">
          <HStack justify="space-between">
            {/* Logo */}
            <Box>
              <Image
                alt="Hyperwave"
                height="32px"
                src="/images/hyperwave/Hyperwave_logo_horizontal.svg"
                width="136px"
              />
            </Box>

            {/* Network and Wallet */}
            <HStack spacing="sm">
              {isConnected && (
                <Box display={{ base: 'none', lg: 'block' }}>
                  <RecentTransactions />
                </Box>
              )}
              <Box display={{ base: 'none', lg: 'block' }}>
                <UserSettings />
              </Box>
              <ConnectWallet
                connectLabel={allowCreateWallet ? 'Connect' : 'Connect wallet'}
                showCreateWalletButton={allowCreateWallet}
              />
            </HStack>
          </HStack>
        </DefaultPageContainer>
      </Box>

      {/* Header Content */}
      <Noise
        backgroundColor="#051212"
        overflow="hidden"
        position="relative"
        pt="0"
        shadow="innerBase"
      >
        <DefaultPageContainer
          pb={['md', 'md', 'lg']}
          pr={{ base: '0 !important', md: 'md !important' }}
          pt="0"
        >
          <Box display={{ base: 'none', md: 'block' }} pt="0">
            <RadialPattern
              circleCount={8}
              height={600}
              innerHeight={150}
              innerWidth={500}
              padding="15px"
              position="absolute"
              right={{ base: -800, lg: -700, xl: -600, '2xl': -400 }}
              top="40px"
              width={1000}
            />
            <RadialPattern
              circleCount={8}
              height={600}
              innerHeight={150}
              innerWidth={500}
              left={{ base: -800, lg: -700, xl: -600, '2xl': -400 }}
              padding="15px"
              position="absolute"
              top="40px"
              width={1000}
            />
          </Box>
          <RadialPattern
            circleCount={8}
            height={600}
            innerHeight={150}
            innerWidth={150}
            left="calc(50% - 300px)"
            position="absolute"
            top="-300px"
            width={600}
          />
          <RadialPattern
            circleCount={8}
            height={600}
            innerHeight={150}
            innerWidth={150}
            left="calc(50% - 300px)"
            position="absolute"
            top="300px"
            width={600}
          />
          <FadeInOnView animateOnce={false}>
            <VStack align="start" pt="0" w="full">
              <Grid gap="4" templateColumns={{ base: '1fr', md: '2fr 1fr' }} w="full">
                <GridItem pr="2">
                  <LbpHeaderTitleDescription />
                </GridItem>
                <GridItem>
                  <VStack align="start" h="full">
                    <LbpHeaderTimeInfo />
                    <Box mt="auto">
                      <LbpHeaderStats />
                    </Box>
                  </VStack>
                </GridItem>
              </Grid>
            </VStack>
          </FadeInOnView>
        </DefaultPageContainer>
      </Noise>
    </Box>
  )
}
