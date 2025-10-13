import { hwaveConfig } from '@repo/lib/config/app.config'

export function getHwaveLbpUrl() {
  return `/pools/${hwaveConfig.chain.toLowerCase()}/${hwaveConfig.variant}/${hwaveConfig.poolId}`
}
