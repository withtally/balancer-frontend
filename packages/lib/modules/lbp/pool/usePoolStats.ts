import { GqlPoolLiquidityBootstrappingV3 } from '@repo/lib/shared/services/api/generated/graphql'
import { Address } from 'viem'
import { usePriceInfo, getCurrentSnapshot } from './usePriceInfo'
import { useTokenMetadata } from '../../tokens/useTokenMetadata'

const emptyStats = {
  isLoading: true,
  fundsRaised: 0,
  marketCap: 0,
  fdv: 0,
  tvl: 0,
  totalVolume: 0,
  totalFees: 0,
}

export function usePoolStats(pool: GqlPoolLiquidityBootstrappingV3) {
  const { isLoading: metadataIsLoading, totalSupply } = useTokenMetadata(
    pool.projectToken,
    pool.chain
  )

  const { isLoading: snapshotsAreLoading, snapshots } = usePriceInfo(pool.chain, pool.id as Address)
  if (snapshotsAreLoading || metadataIsLoading || snapshots.length === 0) return emptyStats
  const firstSnapshot = snapshots[0]
  const lastSnapshot = snapshots[snapshots.length - 1]
  const currentSnapshot = getCurrentSnapshot(snapshots)

  return {
    isLoading: snapshotsAreLoading || metadataIsLoading,
    fundsRaised:
      (currentSnapshot.reserveTokenBalance - firstSnapshot.reserveTokenBalance) *
      currentSnapshot.reserveTokenPrice,
    marketCap: currentSnapshot.projectTokenPrice * (totalSupply || 0),
    fdv: currentSnapshot.projectTokenPrice * (totalSupply || 0),
    tvl: currentSnapshot.tvl || 0,
    totalVolume: lastSnapshot?.cumulativeVolume || 0,
    totalFees: lastSnapshot?.cumulativeFees || 0,
  }
}
