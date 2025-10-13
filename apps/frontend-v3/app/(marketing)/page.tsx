import { redirect } from 'next/navigation'
import { hwaveConfig } from '@repo/lib/config/app.config'
import { HwaveLandingPage } from './_lib/hwave-landing/HwaveLandingPage'

export default async function Home() {
  // Check if launch time has passed
  const launchTime = Number(hwaveConfig.launchTime || 0)
  const hasLaunched = Date.now() / 1000 > launchTime

  if (hasLaunched) {
    // Existing redirect to pool
    redirect(
      `/pools/${hwaveConfig.chain.toLowerCase()}/${hwaveConfig.variant}/${hwaveConfig.poolId}`
    )
  } else {
    // Render HwaveLandingPage component
    return <HwaveLandingPage launchTime={launchTime} />
  }
}
