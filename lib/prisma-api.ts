// Version spécifique de Prisma pour les routes API, optimisée avec Accelerate
import { withAccelerate } from '@prisma/extension-accelerate';
import prisma from './prisma';

// On étend le singleton existant au lieu de créer une nouvelle instance
const prismaApi = prisma.$extends(withAccelerate());

export default prismaApi;

