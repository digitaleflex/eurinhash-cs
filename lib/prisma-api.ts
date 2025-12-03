// Version spécifique de Prisma pour les routes API sans Accelerate
import { PrismaClient } from '@prisma/client'

declare global {
  var prismaApi: PrismaClient | undefined
}

const createPrismaApiClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL || process.env.MONGODB_URI,
      },
    }
  })
}

export const prismaApi = globalThis.prismaApi ?? createPrismaApiClient()

if (process.env.NODE_ENV !== 'production') globalThis.prismaApi = prismaApi

export default prismaApi