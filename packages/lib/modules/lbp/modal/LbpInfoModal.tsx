'use client'

import { SuccessOverlay } from '@repo/lib/shared/components/modals/SuccessOverlay'
import {
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  VStack,
  Text,
  Button,
  useDisclosure,
  Link,
} from '@chakra-ui/react'
import { ArrowUpRight } from 'react-feather'

type LbpInfoModalProps = {
  buttonLabel: string
}

export function LbpInfoModal({ buttonLabel }: LbpInfoModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        _hover={{ color: 'font.linkHover' }}
        color="font.link"
        onClick={onOpen}
        variant="tertiary"
      >
        {buttonLabel}
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
        <SuccessOverlay />
        <ModalContent>
          <ModalHeader>What's an LBP?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="lg">
            <VStack align="start" gap="lg">
              <Text color="font.primary" lineHeight="24px">
                An LBP, or Liquidity Bootstrapping Pool, uses a Dutch auction model, the price will
                decrease if there are no bids.
              </Text>
              <Text color="font.primary" lineHeight="24px">
                This means you don't need to hurry to make a purchase right away. If you think the
                price is too high, wait until the price drops into a range you consider fair before
                buying.
              </Text>
              <Button
                as={Link}
                display="flex"
                gap="1"
                href="https://www.youtube.com/watch?v=rjr2Y9nRUVk"
                isExternal
                minWidth="184px"
                size="md"
                variant="secondary"
              >
                Watch a video
                <ArrowUpRight size={14} />
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
