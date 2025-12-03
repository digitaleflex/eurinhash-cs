import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

// Type pour gérer à la fois le client Prisma standard et le client étendu avec Accelerate
type ExtendedPrismaClient = PrismaClient | ReturnType<PrismaClient['$extends']>

declare global {
  var prisma: ExtendedPrismaClient | undefined
}

const createPrismaClient = () => {
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL || process.env.MONGODB_URI,
      },
    }
  })
  
  // Utiliser Prisma Accelerate en production pour de meilleures performances
  if (process.env.NODE_ENV === 'production' && process.env.PRISMA_ACCELERATE_URL) {
    return client.$extends(withAccelerate())
  }
  
  return client
}

export const prisma = globalThis.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma as ExtendedPrismaClient

export default prisma
