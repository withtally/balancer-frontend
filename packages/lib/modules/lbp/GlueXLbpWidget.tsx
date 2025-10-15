'use client'

import { useMemo } from 'react'
import { GqlPoolLiquidityBootstrappingV3 } from '@repo/lib/shared/services/api/generated/graphql'
import { ApiToken } from '@repo/lib/modules/tokens/token.types'
import { glueXConfig } from '@repo/lib/config/app.config'
import { getChainId } from '@repo/lib/config/app.config'
import { GlueXWidget } from '@gluex/widget'
import { colors } from '@repo/lib/shared/services/chakra/themes/base/colors'
import { useWagmiConfig } from '@repo/lib/modules/web3/WagmiConfigProvider'
import { useUserAccount } from '@repo/lib/modules/web3/UserAccountProvider'
import { useConnectModal } from '@rainbow-me/rainbowkit'

interface GlueXLbpWidgetProps {
  pool: GqlPoolLiquidityBootstrappingV3
  launchToken: ApiToken
  hasDisabledInputs?: boolean
}

export function GlueXLbpWidget({ pool, launchToken, hasDisabledInputs }: GlueXLbpWidgetProps) {
  const { wagmiConfig } = useWagmiConfig()
  const { openConnectModal } = useConnectModal()

  const { isConnected } = useUserAccount()
  // Widget configuration
  const widgetConfig = useMemo(() => {
    return {
      integrator: glueXConfig.integratorId,
      apiKey: glueXConfig.apiKey,
      toToken: pool.projectToken,
      // Lock the destination chain to the pool's chain
      chains: {
        allow: [getChainId(pool.chain)],
      },
      // Disable token selection for the destination token
      tokens: {
        to: {
          allow: [
            {
              address: pool.projectToken as `0x${string}`,
              symbol: launchToken.symbol,
              decimals: 18,
              chainId: getChainId(pool.chain),
            },
          ],
        },
        from: {
          allow: [
            {
              address: '0x5555555555555555555555555555555555555555' as `0x${string}`,
              symbol: 'WHYPE',
              decimals: 18,
              chainId: 999,
              name: 'Wrapped HYPE',
              logoURI:
                'https://assets.coingecko.com/coins/images/54469/standard/_UP3jBsi_400x400.jpg?1739905920',
            },
            {
              address: '0x4d2d5b537d5a4e9bbe1bcaf08baa56449caf89a6​' as `0x${string}`,
              symbol: 'hwHYPE',
              decimals: 18,
              chainId: 999,
              name: 'Hyperwave HYPE',
              logoURI: 'https://assets.coingecko.com/coins/images/2518/thumb/weth.png',
            },
            {
              address: '0x9fd7466f987fd4c45a5bbde22ed8aba5bc8d72d1​' as `0x${string}`,
              symbol: 'hwHLP',
              decimals: 18,
              chainId: 999,
              name: 'Hyperwave HLP',
              logoURI: 'https://assets.coingecko.com/coins/images/2518/thumb/weth.png',
            },
            {
              address: '0xb88339CB7199b77E23DB6E890353E22632Ba630f' as `0x${string}`,
              symbol: 'USDC',
              decimals: 6,
              chainId: 999,
              name: 'USD Coin',
              logoURI: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png',
            },
          ],
        },
      },
      theme: {
        palette: {
          primary: {
            main: colors.lbp.teal.primary, // Bright teal accent
            review: colors.lbp.teal.primary, // Teal for review/confirm actions
          },
          background: {
            paper: colors.lbp.dark.bgCard, // LBP card background
            default: colors.lbp.dark.bg, // LBP dark background
            selected: `${colors.lbp.teal.primary}26`, // LBP teal with opacity (15%)
          },
          text: {
            primary: colors.lbp.teal.primary, // Bright teal for primary text
            secondary: colors.gray[400], // Light gray for secondary text
          },
          divider: colors.lbp.teal.primary, // Bright teal for dividers
        },
      },
      variant: 'compact' as const,
      subvariant: 'router' as const,
      appearance: 'dark' as const,
      hidden: ['poweredBy' as const, 'language' as const, 'tokenCategories' as const],
      // Explicitly configure to use RainbowKit wallet management
      wallet: {
        usePartialWalletManagement: false,
        onConnect: () => {
          if (!isConnected) {
            openConnectModal?.()
          }
        },
      },
      // Pass the wagmi config to ensure proper integration
      wagmiConfig,
    }
  }, [pool, launchToken, hasDisabledInputs, wagmiConfig])

  if (!widgetConfig) {
    return (
      <div
        style={{
          padding: '20px',
          textAlign: 'center',
          color: colors.gray[400], // LBP secondary text color
          background: colors.lbp.dark.bgCard, // LBP card background
          borderRadius: '12px',
          border: `1px solid ${colors.lbp.dark.border}`, // LBP border
        }}
      >
        <p>GlueX widget is not configured. Please check your environment variables.</p>
      </div>
    )
  }

  return (
    <div
      style={{
        background: colors.lbp.dark.bgCard,
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${colors.lbp.dark.border}`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        padding: '20px',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h2
        style={{
          color: colors.lbp.teal.primary,
          fontSize: '24px',
          fontWeight: '600',
          margin: '0 0 20px 0',
          textAlign: 'center',
        }}
      >
        Buy {launchToken.symbol}
      </h2>
      {/* <WagmiProvider config={wagmiConfig} reconnectOnMount={false}> */}
      <GlueXWidget config={widgetConfig} />
      {/* </WagmiProvider> */}
    </div>
  )
}
