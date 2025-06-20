import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export function Vercel() {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </>
  )
}
