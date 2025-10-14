'use client'

import { useMemo } from 'react'
import { GqlPoolLiquidityBootstrappingV3 } from '@repo/lib/shared/services/api/generated/graphql'
import { ApiToken } from '@repo/lib/modules/tokens/token.types'
import { glueXConfig } from '@repo/lib/config/app.config'
import { getChainId } from '@repo/lib/config/app.config'
import { GlueXWidget } from '@gluex/widget'
import { colors } from '@repo/lib/shared/services/chakra/themes/base/colors'

interface GlueXLbpWidgetProps {
  pool: GqlPoolLiquidityBootstrappingV3
  launchToken: ApiToken
  hasDisabledInputs?: boolean
}

export function GlueXLbpWidget({ pool, launchToken, hasDisabledInputs }: GlueXLbpWidgetProps) {
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
        // Allow all tokens for the "from" side, but lock the "to" token
        allow: undefined, // Let users select any token to swap from
      },
      wallet: {
        usePartialWalletManagement: true,
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
      hidden: ['poweredBy' as const, 'language' as const],
    }
  }, [pool, launchToken, hasDisabledInputs])

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
      <GlueXWidget config={widgetConfig} />
    </div>
  )
}
