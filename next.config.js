/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'dellorto.cl'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dellorto.cl',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig