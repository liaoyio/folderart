import { Analytics } from '@vercel/analytics/next'

export function Vercel() {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Analytics />
        </>
      )}
    </>
  )
}
