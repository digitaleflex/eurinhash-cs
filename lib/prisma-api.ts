// Version spécifique de Prisma pour les routes API, optimisée avec Accelerate
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Type pour gérer à la fois le client Prisma standard et le client étendu avec Accelerate
type ExtendedPrismaClient = PrismaClient | ReturnType<PrismaClient['$extends']>;

declare global {
  var prismaApi: ExtendedPrismaClient | undefined;
}

const createPrismaApiClient = () => {
  const databaseUrl = process.env.MONGODB_URI || process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('MONGODB_URI is not set. Please check your .env file.');
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error'] : ['error'],
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  }).$extends(withAccelerate());
};

export const prismaApi = globalThis.prismaApi ?? createPrismaApiClient();

if (process.env.NODE_ENV !== 'production') globalThis.prismaApi = prismaApi;

export default prismaApi;
