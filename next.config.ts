import type { NextConfig } from 'next';
import { SITE_CONFIG } from './lib/config';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: SITE_CONFIG.images.formats as any,
    minimumCacheTTL: SITE_CONFIG.images.minimumCacheTTL,
    dangerouslyAllowSVG: true,
    deviceSizes: SITE_CONFIG.images.deviceSizes,
    imageSizes: SITE_CONFIG.images.imageSizes,
    qualities: SITE_CONFIG.images.qualities,
    loader: 'default',
    unoptimized: false,
  },

  // Optimisations de performance avancées
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP', 'FID', 'FCP', 'TTFB'],
    optimizeCss: false,
    // Prefetch intelligent
    scrollRestoration: true,
    // Optimisations supplémentaires
    optimizeServerReact: true,
    serverMinification: true,
  },

  // Packages externes pour les composants serveur
  serverExternalPackages: ['@prisma/client'],
};

export default nextConfig;
