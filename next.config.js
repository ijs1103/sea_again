/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  swcMinify: true,
  images: {
    domains: ['seaagainuploads.s3.ap-northeast-2.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: 'https://apis.data.go.kr/',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/seed',
        destination: '/',
        permanent: false,
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
