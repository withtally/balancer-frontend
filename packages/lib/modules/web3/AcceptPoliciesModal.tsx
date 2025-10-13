'use client'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Checkbox,
  Button,
  VStack,
  ModalFooter,
  Box,
  Link,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useUserSettings } from '../user/settings/UserSettingsProvider'
import { useUserAccount } from './UserAccountProvider'
import { useDisconnect } from 'wagmi'
import NextLink from 'next/link'
import { PROJECT_CONFIG } from '@repo/lib/config/getProjectConfig'
import { shouldUseAnvilFork } from '@repo/lib/config/app.config'

export function AcceptPoliciesModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { acceptedPolicies, setAcceptedPolicies } = useUserSettings()
  const { isBlocked, isLoading, isConnected, userAddress } = useUserAccount()
  const [isChecked, setIsChecked] = useState(false)
  const { disconnect } = useDisconnect()

  const { projectName } = PROJECT_CONFIG

  const isAddressInAcceptedPolicies =
    acceptedPolicies.includes(userAddress.toLowerCase()) ||
    // Avoid accepting policies on Anvil fork
    shouldUseAnvilFork

  useEffect(() => {
    if (!isLoading && isConnected && !isAddressInAcceptedPolicies && !isBlocked) {
      onOpen()
    }
  }, [acceptedPolicies, isBlocked, isLoading, isConnected, userAddress])

  function handleOnClose(isProceeding = false) {
    const shouldDisconnect = !isChecked || !acceptedPolicies.includes(userAddress.toLowerCase())
    //disconnect wallet if modal is closed without accepting & clicking 'Proceed'
    if (!isProceeding && shouldDisconnect) {
      if (isConnected) disconnect()
    }
    setIsChecked(false)
    onClose()
  }
  function handleClick() {
    // just check we don't already have it
    if (!isAddressInAcceptedPolicies) {
      setAcceptedPolicies([...acceptedPolicies, userAddress.toLowerCase()])
    }

    handleOnClose(true)
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={handleOnClose} preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Accept ${projectName} policies`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="flex-start" gap="md">
            <Checkbox
              alignItems="start"
              isChecked={isChecked}
              onChange={e => setIsChecked(e.target.checked)}
              size="lg"
            >
              <Box aria-label="Accept policies" color="font.primary" fontSize="md" mt="-3px">
                By connecting my wallet, I agree to Hyperwave Labs&apos;s{' '}
                <Link as={NextLink} href="https://hyperwavefi.xyz/terms">
                  Terms of Use
                </Link>{' '}
                and{' '}
                <Link as={NextLink} href="https://hyperwavefi.xyz/privacy">
                  Privacy Policy
                </Link>
                .
              </Box>
            </Checkbox>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={!isChecked}
            onClick={handleClick}
            size="lg"
            variant="secondary"
            w="full"
          >
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
