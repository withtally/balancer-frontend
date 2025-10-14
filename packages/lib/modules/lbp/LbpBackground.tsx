'use client'

import { Box, BoxProps } from '@chakra-ui/react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState, PropsWithChildren } from 'react'

export function LbpBackground({ children, ...props }: PropsWithChildren & BoxProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      setShouldAnimate(true)
    }
  }, [isInView])

  return (
    <Box
      bg="#051212" // LBP dark background
      minH="100vh"
      overflow="hidden"
      position="relative"
      ref={ref}
      {...props}
    >
      {/* Animated teal gradient overlay */}
      <AnimatePresence>
        <motion.div
          animate={
            shouldAnimate
              ? {
                  opacity: 0.4,
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }
              : {}
          }
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `
              radial-gradient(circle at 20% 20%, rgba(33, 241, 166, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(99, 0, 185, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(33, 241, 166, 0.1) 0%, transparent 50%)
            `,
            zIndex: 1,
          }}
          transition={{
            duration: 8,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </AnimatePresence>

      {/* Secondary gradient layer */}
      <AnimatePresence>
        <motion.div
          animate={
            shouldAnimate
              ? {
                  opacity: 0.2,
                  scale: [1.1, 1, 1.1],
                  rotate: [0, -3, 0],
                }
              : {}
          }
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          style={{
            position: 'absolute',
            top: '-30%',
            right: '-30%',
            width: '160%',
            height: '160%',
            background: `
              linear-gradient(45deg, rgba(99, 0, 185, 0.1) 0%, transparent 50%),
              linear-gradient(-45deg, rgba(33, 241, 166, 0.08) 0%, transparent 50%)
            `,
            zIndex: 1,
          }}
          transition={{
            duration: 12,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 2,
          }}
        />
      </AnimatePresence>

      {/* Noise texture overlay */}
      <Box
        backgroundImage="url(/images/background-noise.png)"
        backgroundSize="200px 200px"
        bottom={0}
        left={0}
        opacity={0.03}
        pointerEvents="none"
        position="absolute"
        right={0}
        top={0}
        zIndex={2}
      />

      {/* Content */}
      <Box position="relative" zIndex={3}>
        {children}
      </Box>
    </Box>
  )
}
