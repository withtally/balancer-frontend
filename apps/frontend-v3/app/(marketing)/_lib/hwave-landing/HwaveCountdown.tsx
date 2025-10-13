'use client'

import { HStack, Text, VStack } from '@chakra-ui/react'
import { useDateCountdown } from '@repo/lib/shared/hooks/date.hooks'
import { PropsWithChildren } from 'react'

function TimeElement({ title, value }: { title: string; value: string }) {
  return (
    <VStack spacing="xs">
      <Text color="gray.400" fontSize="10px" fontWeight="500" lineHeight="12px" textAlign="center">
        {title}
      </Text>
      <Text
        color="#21F1A6" // AI Green from Hyperwave brand kit
        fontFamily="monospace"
        fontSize="24px"
        fontWeight="600"
        letterSpacing="0.1em"
        lineHeight="28px"
        textAlign="center"
      >
        {value}
      </Text>
    </VStack>
  )
}

function Tile({ children }: PropsWithChildren) {
  return (
    <VStack
      alignItems="center"
      backdropFilter="blur(10px)"
      bg="rgba(0, 0, 0, 0.3)"
      border="1px solid"
      borderColor="rgba(33, 241, 166, 0.2)" // AI Green with opacity
      justifyContent="center"
      minH="80px"
      minW="60px"
      position="relative"
      px="md"
      rounded="lg"
      spacing="none"
    >
      {children}
    </VStack>
  )
}

interface HwaveCountdownProps {
  until: Date
}

export function HwaveCountdown({ until }: HwaveCountdownProps) {
  const { daysDiff, hoursDiff, minutesDiff, secondsDiff } = useDateCountdown(until)

  return (
    <HStack flexWrap="wrap" justify="center" spacing="lg">
      <Tile>
        <TimeElement title="DAYS" value={String(daysDiff)} />
      </Tile>
      <Tile>
        <TimeElement title="HOURS" value={String(hoursDiff).padStart(2, '0')} />
      </Tile>
      <Tile>
        <TimeElement title="MINUTES" value={String(minutesDiff).padStart(2, '0')} />
      </Tile>
      <Tile>
        <TimeElement title="SECONDS" value={String(secondsDiff).padStart(2, '0')} />
      </Tile>
    </HStack>
  )
}
