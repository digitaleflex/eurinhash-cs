// Version spécifique de Prisma pour les routes API, optimisée avec Accelerate
import { withAccelerate } from '@prisma/extension-accelerate';
import prisma from './prisma';

// On n'utilise Accelerate qu'en production pour éviter la latence en local
const isDev = process.env.NODE_ENV === 'development';
const prismaApi = (isDev ? prisma : prisma.$extends(withAccelerate())) as typeof prisma;

export default prismaApi;

