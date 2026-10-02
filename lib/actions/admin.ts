'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { sendAdminReply } from '@/lib/mail';
import { ContactMessageStatus, Prisma } from '@prisma/client';
import { requireAdmin } from '@/lib/authorization';

// Les erreurs Prisma exposent des noms de tables et de contraintes : on ne
// renvoie jamais leur texte brut au navigateur.
function toErrorMessage(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return error.code === 'P2002' ? 'Cette ressource existe déjà' : 'Erreur de base de données';
  }
  return error instanceof Error ? error.message : 'Erreur inconnue';
}


async function checkAdmin() {
  try {
    return await requireAdmin();
  } catch {
    throw new Error('Accès refusé - Administrateur requis');
  }
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
  } catch (error) {
    return { success: false, error: toErrorMessage(error) };
  }
}

export async function banUser(userId: string, reason: string, expiresAt?: Date) {
  try {
    const session = await checkAdmin();

    if (session.user.id === userId) {
      return {
        success: false,
        error: 'Vous ne pouvez pas vous bannir vous-même',
      };
    }

    // Supprimer toutes les sessions de l'utilisateur pour le déconnecter
    await prisma.session.deleteMany({
      where: { userId },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { 
        banned: true,
        banReason: reason,
        banExpires: expiresAt || null
      },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    return { success: false, error: toErrorMessage(error) };
  }
}

export async function unbanUser(userId: string) {
  try {
    await checkAdmin();

    await prisma.user.update({
      where: { id: userId },
      data: { 
        banned: false,
        banReason: null,
        banExpires: null
      },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    return { success: false, error: toErrorMessage(error) };
  }
}

export async function updateMessageStatus(
  messageId: string,
  status: ContactMessageStatus
) {
  try {
    await checkAdmin();

    const message = await prisma.contactMessage.update({
      where: { id: messageId },
      data: { status },
    });

    revalidatePath('/admin/messages');
    return { success: true, message };
  } catch (error) {
    return { success: false, error: toErrorMessage(error) };
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
  } catch (error) {
    return { success: false, error: toErrorMessage(error) };
  }
}

export async function replyToMessage(
  messageId: string,
  replyContent: string
) {
  try {
    await checkAdmin();

    const message = await prisma.contactMessage.findUnique({
      where: { id: messageId },
    });

    if (!message) throw new Error('Message introuvable');

    const result = await sendAdminReply({
      to: message.email,
      userName: message.name,
      originalMessage: message.message,
      replyContent,
      subject: message.subject || 'Votre message',
    });

    if (!result.success) throw new Error('Erreur lors de l\'envoi de l\'email');

    // Update status to 'read' or 'replied' (we'll use 'replied' as a custom status)
    await prisma.contactMessage.update({
      where: { id: messageId },
      data: { status: 'replied' },
    });

    revalidatePath('/admin/messages');
    return { success: true };
  } catch (error) {
    return { success: false, error: toErrorMessage(error) };
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
  } catch (error) {
    return { success: false, error: toErrorMessage(error) };
  }
}
