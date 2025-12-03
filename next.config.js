/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },

    // Optimisations de performance avancées
    experimental: {
        // optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'], // Désactivé car casse les imports
        webVitalsAttribution: ['CLS', 'LCP', 'FID', 'FCP', 'TTFB'],
        optimizeCss: true,
        // Prefetch intelligent
        scrollRestoration: true,
        // Optimisations supplémentaires
        optimizeServerReact: true,
        serverMinification: true,
    },

    // Packages externes pour les composants serveur
    serverExternalPackages: ['@prisma/client'],

    // Configuration Turbopack
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },

    // Compression et optimisations
    compress: true,
    poweredByHeader: false,
    
    // Optimisation du bundle
    webpack: (config, { dev, isServer }) => {
        if (!dev && !isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                    common: {
                        name: 'common',
                        minChunks: 2,
                        chunks: 'all',
                        enforce: true,
                    },
                },
            };
        }
        
        // Tree shaking pour lucide-react - désactivé car casse les imports
        // config.resolve.alias = {
        //     ...config.resolve.alias,
        //     'lucide-react': 'lucide-react/dist/esm/icons',
        // };
        
        return config;
    },

    // Optimisation des images pour LCP
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 31536000, // 1 an
        dangerouslyAllowSVG: true,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Preload des images critiques
        loader: 'default',
        unoptimized: false,
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