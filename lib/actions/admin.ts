'use server';

import { revalidatePath } from 'next/cache';
import prismaApi from '@/lib/prisma-api';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const prisma = prismaApi;

async function checkAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || session.user.role !== 'admin') {
    throw new Error('Accès refusé - Administrateur requis');
  }
  return session;
}

export async function updateUserRole(userId: string, role: 'user' | 'admin') {
  try {
    await checkAdmin();

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidatePath('/admin/users');
    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function banUser(userId: string) {
  try {
    const session = await checkAdmin();

    if (session.user.id === userId) {
      return {
        success: false,
        error: 'Vous ne pouvez pas vous bannir vous-même',
      };
    }

    await prisma.session.deleteMany({
      where: { userId },
    });

    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateMessageStatus(
  messageId: string,
  status: 'new' | 'read' | 'archived'
) {
  try {
    await checkAdmin();

    const message = await prisma.contactMessage.update({
      where: { id: messageId },
      data: { status },
    });

    revalidatePath('/admin/messages');
    return { success: true, message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteMessage(messageId: string) {
  try {
    await checkAdmin();

    await prisma.contactMessage.delete({
      where: { id: messageId },
    });

    revalidatePath('/admin/messages');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteEventAdmin(eventId: string) {
  try {
    await checkAdmin();

    await prisma.event.delete({
      where: { id: eventId },
    });

    revalidatePath('/admin/evenements');
    revalidatePath('/evenements');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
