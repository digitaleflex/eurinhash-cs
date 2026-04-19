import type { NextConfig } from 'next';
import { SITE_CONFIG } from './lib/config';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: (SITE_CONFIG.images.formats || ['image/webp']) as any,
    minimumCacheTTL: SITE_CONFIG.images.minimumCacheTTL,
    dangerouslyAllowSVG: true,
    deviceSizes: SITE_CONFIG.images.deviceSizes,
    imageSizes: SITE_CONFIG.images.imageSizes,
    qualities: SITE_CONFIG.images.qualities,
    loader: 'default',
    unoptimized: false,
  },

  // Simplification pour éviter les erreurs de worker sur Windows
  experimental: {
    scrollRestoration: true,
  },

  // Packages externes pour les composants serveur
  serverExternalPackages: ['@prisma/client'],
};

export default nextConfig;
