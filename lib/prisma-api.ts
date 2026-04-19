// Version spécifique de Prisma pour les routes API, optimisée avec Accelerate
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const createPrismaApiClient = () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set. Please check your .env file.');
  }

  // Configuration du client Prisma avec Accelerate
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error'] : ['error'],
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  }).$extends(withAccelerate());
};

// Infer the full extended type so model accessors (event, contactMessage, etc.) are typed
type ExtendedPrismaClient = ReturnType<typeof createPrismaApiClient>;

declare global {
  // eslint-disable-next-line no-var
  var prismaApi: ExtendedPrismaClient | undefined;
}

const prismaApi: ExtendedPrismaClient =
  globalThis.prismaApi ?? createPrismaApiClient();

if (process.env.NODE_ENV !== 'production') globalThis.prismaApi = prismaApi;

export default prismaApi;
