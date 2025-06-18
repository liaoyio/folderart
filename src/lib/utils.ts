export const baseUrl
  = process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_SITE_URL
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.NEXT_PUBLIC_SITE_URL}`)
