// Constantes de configuration du site
export const SITE_CONFIG = {
  // Configuration des images
  images: {
    // Qualités configurées pour éviter les warnings Next.js 16
    qualities: [85],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 an
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Configuration du rate limiting
  rateLimit: {
    window: parseInt(process.env.RATE_LIMIT_WINDOW || '60000'), // 1 minute
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5'), // 5 requêtes par minute par IP
  },

  // Configuration du cache
  cache: {
    defaultTtl: parseInt(process.env.CACHE_TTL_DEFAULT || '300000'), // 5 minutes
    statsTtl: parseInt(process.env.CACHE_TTL_STATS || '600000'), // 10 minutes
    apiTtl: parseInt(process.env.CACHE_TTL_API || '120000'), // 2 minutes
    cleanupInterval: 60 * 1000, // 1 minute
  },

  // Constantes de temps
  time: {
    oneMinute: 60 * 1000, // 1 minute en millisecondes
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
    projectRequest: {
      validation: {
        name: { minLength: 2, maxLength: 100 },
        email: { maxLength: 254 },
        phone: { maxLength: 30 },
        company: { maxLength: 150 },
        position: { maxLength: 100 },
        projectName: { minLength: 3, maxLength: 150 },
        description: { minLength: 20, maxLength: 5000 },
        objectives: { maxLength: 3000 },
        requirements: { maxLength: 3000 },
        constraints: { maxLength: 3000 },

        projectType: {
          allowedValues: ['web', 'cloud', 'consulting', 'training', 'other'],
        },
        budget: {
          allowedValues: [
            'under-100k',
            '100k-300k',
            '300k-500k',
            '500k-1m',
            '1m-plus',
            'discuss',
          ],
        },
        timeline: {
          allowedValues: [
            'asap',
            '1-month',
            '3-months',
            '6-months',
            'flexible',
          ],
        },
      },
    },
  },
};
