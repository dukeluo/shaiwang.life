const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.worldvectorlogo.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/feed.xml',
        destination: '/api/feed',
      },
    ]
  },
}

export default config
