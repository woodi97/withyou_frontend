/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const compressionPlugin = require('compression-webpack-plugin')

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles')],
  },
  env: {
    APP_NAME: process.env.APP_NAME,
    BASE_API_URL: process.env.BASE_API_URL,
  },
  images: {
    domains: ['unsplash.com'],
    deviceSizes: [640, 768, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [],
  },
  webpack(config) {
    const prod = process.env.NODE_ENV === 'production'
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    const plugins = [...config.plugins]
    if (prod) {
      plugins.push(new compressionPlugin())
    }
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      plugins: plugins,
    }
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
