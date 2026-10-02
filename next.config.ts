import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // AVIF d'abord : plus léger que le WebP, le navigateur retombe automatiquement.
    formats: ['image/avif', 'image/webp'],
    // Les chemins d'images ne sont pas content-hashés : une valeur d'un an sert
    // des transformations périmées après remplacement du fichier source.
    minimumCacheTTL: 86400,
  },

  experimental: {
    scrollRestoration: true,
  },

  // Packages externes pour les composants serveur (pilotes réseau non bundlables)
  serverExternalPackages: ['ws', '@neondatabase/serverless'],

  // sanitize-html et ses dépendances htmlparser2 sont publiés en ESM : sans
  // transpilation, Jest et les bundles serveur échouent à les charger.
  transpilePackages: [
    'sanitize-html',
    'htmlparser2',
    'domhandler',
    'domutils',
    'dom-serializer',
    'entities',
    'domelementtype',
  ],
};

export default nextConfig;
