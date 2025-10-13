'use client'

import { Button, VStack, Text, Icon } from '@chakra-ui/react'
import { Calendar } from 'react-feather'
import { openIcalEvent } from '@repo/lib/shared/utils/calendar'
import { getHwaveLbpUrl } from './utils'

interface CalendarCTAProps {
  launchTime: number // Unix timestamp in seconds
}

export function CalendarCTA({ launchTime }: CalendarCTAProps) {
  const handleAddToCalendar = () => {
    const launchDate = new Date(launchTime * 1000) // Convert to milliseconds
    const poolUrl = getHwaveLbpUrl()

    const event = {
      title: 'HWAVE Launch - LBP Swap Opening',
      start: launchDate,
      end: new Date(launchDate.getTime() + 60 * 60 * 1000), // 1 hour duration
      description: 'The HWAVE token launch and LBP swap will open. Join the Hyperwave ecosystem!',
      url: `${window.location.origin}${poolUrl}`,
    }

    openIcalEvent({ event, makeItWeekly: false })
  }

  const formatLaunchTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    })
  }

  return (
    <VStack align="center" spacing="md">
      <Text color="white" fontSize="lg" maxW="md" textAlign="center">
        The LBP Swap will open at{' '}
        <Text as="span" color="#21F1A6" fontWeight="600">
          {formatLaunchTime(launchTime)}
        </Text>
      </Text>

      <Button
        _active={{
          transform: 'translateY(0px)',
        }}
        _hover={{
          bg: 'linear-gradient(135deg, #1DD1A1 0%, #21F1A6 100%)',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(33, 241, 166, 0.3)',
        }}
        bg="linear-gradient(135deg, #21F1A6 0%, #1DD1A1 100%)" // AI Green gradient
        borderRadius="lg"
        color="#051212" // Hyper Dark text
        fontSize="md"
        fontWeight="600"
        leftIcon={<Icon as={Calendar} />}
        onClick={handleAddToCalendar}
        px="xl"
        py="md"
        size="lg"
        transition="all 0.2s ease"
      >
        Add to Calendar
      </Button>
    </VStack>
  )
}
