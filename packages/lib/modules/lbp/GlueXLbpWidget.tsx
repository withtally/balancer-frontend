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
              logoURI: '/images/hyperwave/Hyperwave_icon.png',
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
              address: '0xb88339cb7199b77e23db6e890353e22632ba630f' as `0x${string}`,
              symbol: 'USDC',
              decimals: 6,
              chainId: 999,
              name: 'USDC',
              logoURI: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png',
            },
            {
              address: '0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb' as `0x${string}`,
              symbol: 'USDT0',
              decimals: 6,
              chainId: 999,
              name: 'USDT0',
              logoURI:
                'https://assets.coingecko.com/coins/images/53705/standard/usdt0.jpg?1737086183',
            },
            {
              address: '0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34' as `0x${string}`,
              symbol: 'USDE',
              decimals: 18,
              chainId: 999,
              name: 'Ethena USDe',
              logoURI:
                'https://assets.coingecko.com/coins/images/33613/standard/usde.png?1733810059',
            },
            {
              address: '0x111111a1a0667d36bd57c0a9f569b98057111111' as `0x${string}`,
              symbol: 'USDH',
              decimals: 6,
              chainId: 999,
              name: 'USDH',
              logoURI:
                'https://assets.coingecko.com/coins/images/69484/standard/usdh.png?1758728903',
            },
            {
              address: '0xb50a96253abdf803d85efcdce07ad8becbc52bd5' as `0x${string}`,
              symbol: 'USDHL',
              decimals: 6,
              chainId: 999,
              name: 'Hyper USD',
              logoURI:
                'https://assets.coingecko.com/coins/images/66679/standard/usdhl.jpg?1750242294',
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
