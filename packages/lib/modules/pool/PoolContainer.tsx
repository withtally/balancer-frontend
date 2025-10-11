'use client'

import { PoolDetail } from './PoolDetail/PoolDetail'
import { usePool } from './PoolProvider'
import { isV3LBP } from './pool.helpers'
import { LbpDetail } from './LbpDetail/LbpDetail'
import { isDev, isStaging } from '@repo/lib/config/app.config'

export function PoolContainer() {
  const { pool } = usePool()

  // Show LBP detail for all LBP pools
  if (isV3LBP(pool)) {
    return <LbpDetail />
  }

  return <PoolDetail />
}
