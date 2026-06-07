/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lain.bgm.tv',
      },
      {
        protocol: 'https',
        hostname: 'api.bgm.tv',
      },
      {
        protocol: 'https',
        hostname: '*.bgm.tv',
      },
      {
        protocol: 'https',
        hostname: '*.doubanio.com',
      },
      {
        protocol: 'https',
        hostname: '*.z-lib.org',
      },
      {
        protocol: 'https',
        hostname: '*.zlibcdn.com',
      },
      {
        protocol: 'https',
        hostname: '*.booklib.pro',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
}

module.exports = nextConfig
