// Constantes de configuration du site
export const SITE_CONFIG = {
  // URL publique de production. Ne pas utiliser NEXT_PUBLIC_SITE_URL :
  // la valeur locale vaut http://localhost:3000 et ne doit pas fuiter dans
  // les canonicals, le sitemap ni les données structurées.
  url: 'https://eurinhash.com',

  // Configuration des images
  images: {
    // Qualités configurées pour éviter les warnings Next.js 16
    qualities: [85],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 an
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Configuration SEO - Vérification des moteurs de recherche
  // Ces valeurs sont lues depuis les variables d'environnement
  // Documentation: https://developers.google.com/search/docs/fundamentals/verifying-with-google-search-console
  seo: {
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || '',
      bing: process.env.BING_VERIFICATION || '',
      yandex: process.env.YANDEX_VERIFICATION || '',
      baidu: process.env.BAIDU_VERIFICATION || '',
      norton: process.env.NORTON_VERIFICATION || '',
    },
    // Métadonnées supplémentaires
    author: 'Eurin Hash',
    robots: 'index, follow, all',
    revisitAfter: '7 days',
  },

  // Configuration du rate limiting
  rateLimit: {
    window: parseInt(process.env.RATE_LIMIT_WINDOW || '60000'), // 1 minute
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5'), // 5 requêtes par minute par IP
  },

  // Configuration du cache
  cache: {
    cleanupInterval: 60 * 1000, // 1 minute
  },

  // Configuration des formulaires
  forms: {
    contact: {
      validation: {
        name: { minLength: 2, maxLength: 100 },
        email: { maxLength: 254 },
        message: { minLength: 10, maxLength: 2000 },
      },
    },
  },
};
