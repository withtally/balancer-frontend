import { HStack, VStack, Heading, Text, IconButton, Link, Stack } from '@chakra-ui/react'
import { GqlPoolLiquidityBootstrappingV3 } from '@repo/lib/shared/services/api/generated/graphql'
import { TokenIcon } from '@repo/lib/modules/tokens/TokenIcon'
import { IconType, SocialIcon } from '@repo/lib/shared/components/navs/SocialIcon'
import { NetworkIcon } from '@repo/lib/shared/components/icons/NetworkIcon'
import { usePool } from '../../PoolProvider'
import { LbpInfoModal } from '@repo/lib/modules/lbp/modal/LbpInfoModal'

export function LbpHeaderTitleDescription() {
  const { pool } = usePool()
  const lbpPool = pool as GqlPoolLiquidityBootstrappingV3

  const projectToken = pool.poolTokens[lbpPool.projectTokenIndex]

  const socialLinks = [
    {
      iconType: 'x',
      href: lbpPool.x ? `https://twitter.com/${lbpPool.x}` : undefined,
    },
    {
      iconType: 'discord',
      href: lbpPool.discord || undefined,
    },
    {
      iconType: 'tg',
      href: lbpPool.telegram ? `https://t.me/${lbpPool.telegram}` : undefined,
    },
  ] as { iconType: IconType; href: string | undefined }[]

  return (
    <VStack align="start" spacing="xl">
      <HStack spacing="sm">
        <TokenIcon
          address={pool.address}
          alt={projectToken.symbol || pool.address}
          chain={pool.chain}
          disablePopover
          logoURI={projectToken.logoURI}
          overflow="visible"
          size={64}
        />
        <VStack align="start" spacing="sm">
          <HStack spacing="md">
            <Heading color="white" fontSize="4xl" fontWeight="bold" lineHeight="36px">
              {`${projectToken.symbol} token launch`}
            </Heading>
            <NetworkIcon chain={pool.chain} size={8} />
          </HStack>
          <Text color="gray.400" fontSize="md">
            {lbpPool.lbpName}
          </Text>
        </VStack>
      </HStack>
      <Text color="gray.400" fontSize="md" lineHeight="24px">
        {lbpPool.description}
      </Text>
      <HStack mt="auto">
        <LbpInfoModal buttonLabel="What's an LBP?" />
        <Text opacity="0.25" px={{ base: '0', sm: 'ms' }} variant="secondary">
          |
        </Text>
        <HStack spacing="ms" w={{ base: 'full', lg: 'auto' }}>
          {socialLinks.map(({ href, iconType }) => (
            <Stack key={href + '-' + iconType}>
              {href && (
                <IconButton
                  aria-label={`Visit us on ${iconType}`}
                  as={Link}
                  bg="background.level2"
                  h="32px"
                  href={href}
                  isExternal
                  isRound
                  rounded="full"
                  size="sm"
                  variant="tertiary"
                >
                  <SocialIcon iconType={iconType} size={16} />
                </IconButton>
              )}
            </Stack>
          ))}
        </HStack>
      </HStack>
    </VStack>
  )
}
