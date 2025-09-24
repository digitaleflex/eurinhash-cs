/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },

    // Optimisations de performance
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion'],
        webVitalsAttribution: ['CLS', 'LCP'],
    },

    // Compression
    compress: true,
    poweredByHeader: false,

    // Optimisation des images
    images: {
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 3600, // 1 heure
        dangerouslyAllowSVG: true,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
    },

    // Headers de performance
    async headers() {
        return [{
                source: '/(.*)',
                headers: [{
                        key: 'Cache-Control',
                        value: 'public, max-age=3600',
                    },
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    }
                ]
            },
            {
                source: '/sw.js',
                headers: [{
                    key: 'Cache-Control',
                    value: 'public, max-age=0, must-revalidate',
                }, ]
            }
        ]
    }
}

module.exports = nextConfig