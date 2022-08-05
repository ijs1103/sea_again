/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: 'https://apis.data.go.kr/',
      },
    ]
  },
}

module.exports = nextConfig
