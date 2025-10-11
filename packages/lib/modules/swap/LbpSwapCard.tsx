import { HStack, Text } from '@chakra-ui/react'
import { NetworkIcon } from '@repo/lib/shared/components/icons/NetworkIcon'
import { usePool } from '../pool/PoolProvider'
import { getChainName } from '@repo/lib/config/app.config'

export function LbpSwapCard() {
  const { pool } = usePool()
  return (
    <HStack
      align="center"
      border="1px solid"
      borderColor="green.500"
      borderRadius="md"
      justify="flex-start"
      p="sm"
      w="full"
      bg="rgba(0, 0, 0, 0.3)"
    >
      <NetworkIcon chain={pool.chain} size={6} />
      <Text color="white" fontWeight="medium">{getChainName(pool.chain)}</Text>
    </HStack>
  )
}
