import type { NextConfig } from 'next';
import { SITE_CONFIG } from './lib/config';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: (SITE_CONFIG.images.formats || ['image/webp']) as any,
    minimumCacheTTL: SITE_CONFIG.images.minimumCacheTTL,
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
  typescript: {
    ignoreBuildErrors: false, // On garde les erreurs TS pour la sécurité, sauf si vraiment bloquant
  },

  // Packages externes pour les composants serveur
  serverExternalPackages: ['@prisma/client', 'ws', '@neondatabase/serverless'],
};

export default nextConfig;
