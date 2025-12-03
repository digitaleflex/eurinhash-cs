// Configuration Prisma appropriée
// Note : Il n'est généralement pas nécessaire d'utiliser defineConfig depuis '@prisma/client/runtime/library'
// car ce module n'expose pas cette fonction. La configuration se fait habituellement via schema.prisma.

export default {
  // Configuration des datasources
  datasources: {
    db: {
      url: process.env.DATABASE_URL || process.env.MONGODB_URI,
    },
  },
  
  // Configuration du client
  generator: {
    provider: 'prisma-client-js',
    previewFeatures: ['mongoDb'],
  },
}