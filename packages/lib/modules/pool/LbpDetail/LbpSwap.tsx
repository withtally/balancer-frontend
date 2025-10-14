import { usePool } from '@repo/lib/modules/pool/PoolProvider'
import { GlueXLbpWidget } from '@repo/lib/modules/lbp/GlueXLbpWidget'
import { isBefore, secondsToMilliseconds } from 'date-fns'
import { now } from '@repo/lib/shared/utils/time'
import { GqlPoolLiquidityBootstrappingV3 } from '@repo/lib/shared/services/api/generated/graphql'
import { ApiToken } from '@repo/lib/modules/tokens/token.types'

export function LbpSwap() {
  const { pool } = usePool()

  const lbpPool = pool as GqlPoolLiquidityBootstrappingV3
  const launchToken = lbpPool.poolTokens[lbpPool.projectTokenIndex] as ApiToken

  const isBeforeSaleStart = isBefore(now(), secondsToMilliseconds(lbpPool.startTime))

  return (
    <GlueXLbpWidget
      hasDisabledInputs={isBeforeSaleStart}
      launchToken={launchToken}
      pool={lbpPool}
    />
  )
}
