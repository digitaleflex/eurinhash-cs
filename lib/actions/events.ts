'use server';

import { after } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { sendMail, sendEventConfirmation } from '@/lib/mail';
import { requireAdmin } from '@/lib/authorization';
import { z } from 'zod';


const EventInputSchema = z.object({
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(20_000),
  date: z.coerce.date(),
  type: z.string().trim().min(1).max(80),
  platform: z.string().trim().min(1).max(80),
  eventUrl: z.string().url().max(2048),
  registrationLink: z.string().url().max(2048).optional().or(z.literal('')),
  thumbnail: z.string().url().max(2048).optional().or(z.literal('')),
  isFeatured: z.boolean().optional(),
});

const EventUpdateSchema = EventInputSchema.partial();

export async function createEvent(input: z.input<typeof EventInputSchema>) {
  await requireAdmin();
  const data = EventInputSchema.parse(input);
  const slug = data.title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const event = await prisma.event.create({
    data: {
      ...data,
      registrationLink: data.registrationLink || null,
      thumbnail: data.thumbnail || null,
      slug,
    },
  });

  after(() => {
    revalidatePath('/evenements');
    revalidatePath('/admin/evenements');
  });

  return event;
}

export async function updateEvent(
  id: string,
  input: z.input<typeof EventUpdateSchema>,
) {
  await requireAdmin();
  const safeId = z.string().min(1).max(128).parse(id);
  const data = EventUpdateSchema.parse(input);

  const event = await prisma.event.update({
    where: { id: safeId },
    data: {
      ...data,
      registrationLink:
        data.registrationLink === '' ? null : data.registrationLink,
      thumbnail: data.thumbnail === '' ? null : data.thumbnail,
    },
  });

  after(() => {
    revalidatePath('/evenements');
    revalidatePath('/admin/evenements');
  });

  return event;
}

export async function registerForEvent(eventId: string) {
  const { requireUser } = await import('@/lib/authorization');
  const user = await requireUser().catch(() => {
    throw new Error('Vous devez être connecté pour vous inscrire.');
  });

  const userId = user.id;
  const safeEventId = z.string().min(1).max(128).parse(eventId);

  const existing = await prisma.eventRegistration.findUnique({
    where: { userId_eventId: { userId, eventId: safeEventId } },
  });

  if (existing) {
    return { success: false, message: 'Déjà inscrit' };
  }

  const registration = await prisma.eventRegistration
    .create({
      data: { userId, eventId: safeEventId },
      include: { event: true, user: true },
    })
    .catch((error: { code?: string }) => {
      // Unique constraint race: another request registered first.
      if (error?.code === 'P2002') return null;
      throw error;
    });

  if (!registration) {
    return { success: false, message: 'Déjà inscrit' };
  }

  after(async () => {
    try {
      await sendEventConfirmation({
        to: user.email,
        userName: user.name || 'Invité',
        eventTitle: registration.event.title,
        eventDate: new Date(registration.event.date).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        eventUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/evenements`,
      });

      revalidatePath('/evenements');
      revalidatePath('/dashboard');
    } catch (error) {
      console.error('Error in background tasks:', error);
    }
  });

  return { success: true, registration };
}

export async function sendEventReminders(eventId: string) {
  await requireAdmin();
  const safeEventId = z.string().min(1).max(128).parse(eventId);

  const event = await prisma.event.findUnique({
    where: { id: safeEventId },
    include: { registrations: { include: { user: true } } },
  });

  if (!event) throw new Error('Événement introuvable');

  after(async () => {
    await Promise.all(
      event.registrations.map(async (reg) => {
        // Idempotency: only send to registrations not yet reminded (atomic claim).
        const claimed = await prisma.eventRegistration.updateMany({
          where: { id: reg.id, reminderSentAt: null },
          data: { reminderSentAt: new Date() },
        });
        if (claimed.count === 0) return;

        await sendMail({
          to: reg.user.email,
          subject: `Rappel : ${event.title} approche !`,
          html: `<p>Bonjour ${reg.user.name},</p><p>Rappel pour l'événement <strong>${event.title}</strong>.</p>`,
        });
      }),
    );
  });

  return { success: true, message: "Les rappels sont en cours d'envoi." };
}
