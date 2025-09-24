// Version alternative avec Prisma Accelerate (à utiliser si nécessaire)
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Configuration standard Prisma (recommandée pour Next.js 15)
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// Configuration avec Accelerate (décommentez si vous voulez l'utiliser)
// export const prisma = globalForPrisma.prisma ?? new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
