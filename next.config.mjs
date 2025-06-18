import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: { viewTransition: true },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
}

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts')
export default withNextIntl(config)
