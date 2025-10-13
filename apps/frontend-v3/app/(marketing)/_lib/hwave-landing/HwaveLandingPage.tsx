'use client'

import { Box, VStack, Heading, Text, Center, Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { HwaveBrandedBackground } from './HwaveBrandedBackground'
import { HwaveCountdown } from './HwaveCountdown'
import { CalendarCTA } from './CalendarCTA'

interface HwaveLandingPageProps {
  launchTime: number // Unix timestamp in seconds
}

const MotionBox = motion(Box)
const MotionVStack = motion(VStack)
const MotionHeading = motion(Heading)
const MotionText = motion(Text)

export function HwaveLandingPage({ launchTime }: HwaveLandingPageProps) {
  const launchDate = new Date(launchTime * 1000)

  return (
    <HwaveBrandedBackground>
      <Center minH="100vh" p="xl">
        <MotionVStack
          align="center"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          maxW="4xl"
          spacing="xl"
          textAlign="center"
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Hyperwave Logo */}
          <MotionBox
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              alt="Hyperwave"
              filter="brightness(0) invert(1)" // Make logo white to stand out on dark background
              height="60px"
              maxW="300px"
              src="/images/hyperwave/Hyperwave_logo_horizontal.svg"
              width="auto"
            />
          </MotionBox>

          {/* Main Heading */}
          <MotionHeading
            animate={{ opacity: 1, y: 0 }}
            as="h1"
            color="white"
            fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
            fontWeight="900"
            initial={{ opacity: 0, y: 30 }}
            letterSpacing="-0.02em"
            lineHeight={0.9}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            HWAVE LAUNCH
            <br />
            <Text
              as="span"
              bg="linear-gradient(135deg, #21F1A6 0%, #6300B9 100%)"
              bgClip="text"
              color="transparent"
            >
              COMING SOON
            </Text>
          </MotionHeading>

          {/* Subtitle */}
          <MotionText
            animate={{ opacity: 1 }}
            color="gray.300"
            fontSize={{ base: 'lg', md: 'xl' }}
            initial={{ opacity: 0 }}
            maxW="2xl"
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            The native utility token for the Hyperwave Ecosystem
            <br />
            Used for staking and incentive alignment
          </MotionText>

          {/* Countdown Timer */}
          <MotionBox
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <HwaveCountdown until={launchDate} />
          </MotionBox>

          {/* Calendar CTA */}
          <MotionBox
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <CalendarCTA launchTime={launchTime} />
          </MotionBox>

          {/* Additional Info */}
          <MotionVStack
            align="center"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            spacing="sm"
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Text color="gray.400" fontSize="sm">
              Join the Hyperwave ecosystem and be part of the future of DeFi
            </Text>
            <Box
              bg="linear-gradient(90deg, transparent 0%, #21F1A6 50%, transparent 100%)"
              h="1px"
              w="100px"
            />
          </MotionVStack>
        </MotionVStack>
      </Center>
    </HwaveBrandedBackground>
  )
}
