import { Box, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface LbpStatProps {
  label: string
  value: ReactNode
}

export function LbpStat({ label, value }: LbpStatProps) {
  return (
    <Box
      backgroundColor="#0D1616"
      border="1px solid"
      borderColor="#21F1A6"
      flex="1"
      minW={{ base: '100px', sm: '132px', lg: '132px' }}
      rounded="md"
      shadow="sm"
      width={{ base: '100%', md: 'max-content' }}
    >
      <Box p="2">
        <Text
          color="gray.400"
          cursor="default"
          fontSize="xs"
          mb="1.5"
          position="relative"
          w="fit-content"
        >
          {label}
        </Text>
        <Text color="white" fontSize="md" fontWeight="bold" letterSpacing="-0.6px">
          {value}
        </Text>
      </Box>
    </Box>
  )
}
