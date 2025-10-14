import { HStack, Icon, Text, VStack } from '@chakra-ui/react'
import { usePool } from '@repo/lib/modules/pool/PoolProvider'
import { useDateCountdown } from '@repo/lib/shared/hooks/date.hooks'
import { GqlPoolLiquidityBootstrappingV3 } from '@repo/lib/shared/services/api/generated/graphql'
import { format, isAfter, isBefore, secondsToMilliseconds } from 'date-fns'
import { AlertTriangle, Clock } from 'react-feather'
import { PropsWithChildren } from 'react'
import { now } from '@repo/lib/shared/utils/time'

function TimeElement({ title, value }: { title: string; value: string }) {
  return (
    <VStack>
      <Text color="white" fontSize="10px" fontWeight="500" lineHeight="12px" textAlign="center">
        {title}
      </Text>
      <Text
        color="white"
        fontFamily="monospace"
        fontSize="18px"
        fontWeight="500"
        letterSpacing="0.1em"
        lineHeight="20px"
        pl="2px"
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
      backgroundColor="#0D1616"
      border="1px solid"
      borderColor="#21F1A6"
      justifyContent="center"
      minH="100%"
      px="sm"
      rounded="lg"
      spacing="none"
    >
      {children}
    </VStack>
  )
}

export function LbpHeaderTimeInfo() {
  const { pool } = usePool()

  // this will only be rendered for LBPs so we can be sure it is a liquidity bootstrapping pool
  const lbpPool = pool as GqlPoolLiquidityBootstrappingV3
  const startTimeFormatted = format(secondsToMilliseconds(lbpPool.startTime), 'haaa, MM/dd/yy')
  const endTimeFormatted = format(secondsToMilliseconds(lbpPool.endTime), 'haaa, MM/dd/yy')
  const currentTime = now()

  return (
    <>
      {isBefore(currentTime, secondsToMilliseconds(lbpPool.startTime)) ? (
        <HStack spacing="4" w="full">
          <HStack
            alignItems="center"
            backgroundColor="special"
            borderColor="special"
            borderRadius="sm"
            borderStyle="dashed"
            borderWidth="1px"
            color="special"
            flex="1"
            h="full"
            justifyContent="start"
            px="2"
          >
            <Icon as={Clock} fontVariant="special" />
            <Text variant="special">{`LBP starts ${startTimeFormatted}`}</Text>
          </HStack>

          <Countdown until={new Date(secondsToMilliseconds(lbpPool.startTime))} />
        </HStack>
      ) : isAfter(currentTime, secondsToMilliseconds(lbpPool.endTime)) ? (
        <HStack
          alignItems="center"
          bg="red.400"
          borderRadius="sm"
          color="black"
          flex="1"
          h="full"
          justifyContent="start"
          px="2"
          w="full"
        >
          <Icon as={AlertTriangle} />
          <Text color="black">{`LBP ended ${endTimeFormatted}`}</Text>
        </HStack>
      ) : (
        <HStack spacing="4" w="full">
          <HStack
            alignItems="center"
            backgroundColor="#21F1A6"
            borderRadius="sm"
            color="#051212"
            flex="1"
            h="full"
            justifyContent="start"
            px="3"
          >
            <Icon as={Clock} color="#051212" />
            <Text
              color="#051212"
              fontWeight="semibold"
            >{`LBP is live! Ends ${endTimeFormatted}`}</Text>
          </HStack>

          <Countdown until={new Date(secondsToMilliseconds(lbpPool.endTime))} />
        </HStack>
      )}
    </>
  )
}

function Countdown({ until }: { until: Date }) {
  const info = useDateCountdown(until)

  return (
    <HStack flexShrink="0" h="48px" spacing="xs">
      <Tile>
        <TimeElement title="D" value={String(info.daysDiff)} />
      </Tile>
      <Tile>
        <TimeElement title="H" value={String(info.hoursDiff).padStart(2, '0')} />
      </Tile>
      <Tile>
        <TimeElement title="M" value={String(info.minutesDiff).padStart(2, '0')} />
      </Tile>
      <Tile>
        <TimeElement title="S" value={String(info.secondsDiff).padStart(2, '0')} />
      </Tile>
    </HStack>
  )
}
