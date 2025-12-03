// Version optimisée avec Prisma Accelerate pour des performances maximales
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

declare global {
  var prismaOptimized: PrismaClient | undefined
}

const createOptimizedPrismaClient = () => {
  const client = new PrismaClient({
    log: ['error'], // Seulement les erreurs
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })

  // Utiliser l'extension Accelerate pour des performances maximales
  return client.$extends(withAccelerate())
}

export const prismaOptimized = globalThis.prismaOptimized ?? createOptimizedPrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prismaOptimized = prismaOptimized

export default prismaOptimized
