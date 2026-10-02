import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

// Configuration pour l'utilisation des WebSockets (plus rapide pour les connexions persistantes)
neonConfig.webSocketConstructor = ws;

const prismaClientSingleton = () => {
  const isDev = process.env.NODE_ENV === 'development';
  const connectionString = (isDev 
    ? (process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL) 
    : (process.env.DATABASE_URL || process.env.DATABASE_URL_UNPOOLED))?.trim();
  
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set in environment variables');
  }

  // En développement local ou hors de Neon (self-hosted, CI), on utilise le pilote natif de Prisma.
  if (isDev || !/neon\.tech|neon\.build/i.test(connectionString)) {
    return new PrismaClient({
      datasourceUrl: connectionString,
      log: ['error', 'warn'],
    });
  }

  // En production (Vercel Edge/Serverless), on utilise l'adaptateur Neon Serverless via WebSockets.
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);

  return new PrismaClient({
    adapter,
    log: ['error'],
  });
};

declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

