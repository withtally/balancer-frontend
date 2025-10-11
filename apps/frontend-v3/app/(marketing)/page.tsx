import { redirect } from 'next/navigation'
import { hwaveConfig } from '@repo/lib/config/app.config'

export default async function Home() {
  // Redirect to the configured HWAVE LBP pool
  redirect(`/pools/${hwaveConfig.chain.toLowerCase()}/${hwaveConfig.variant}/${hwaveConfig.poolId}`)
}
