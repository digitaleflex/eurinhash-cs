// Constantes de configuration du site
export const SITE_CONFIG = {
  seo: {
    // Vérification des moteurs de recherche
    // Documentation: https://developers.google.com/search/docs/fundamentals/verifying-with-google-search-console
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || '',
      bing: process.env.BING_VERIFICATION || '',
      yandex: process.env.YANDEX_VERIFICATION || '',
      baidu: process.env.BAIDU_VERIFICATION || '',
      norton: process.env.NORTON_VERIFICATION || '',
    },
    // Les balises author/robots/revisit-after sont gérées par createMetadata() dans lib/metadata.ts
    author: 'Eurin Hash',
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
