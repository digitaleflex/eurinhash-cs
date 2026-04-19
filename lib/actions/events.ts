'use server';

import { revalidatePath } from 'next/cache';
import prismaApi from '@/lib/prisma-api';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { sendMail } from '@/lib/mail';

const prisma = prismaApi;

export async function createEvent(data: {
  title: string;
  description: string;
  date: Date;
  type: string;
  platform: string;
  eventUrl: string;
  registrationLink?: string;
  thumbnail?: string;
  isFeatured?: boolean;
}) {
  const slug = data.title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  const event = await prisma.event.create({
    data: {
      ...data,
      slug,
    },
  });

  revalidatePath('/evenements');
  revalidatePath('/admin/evenements');
  return event;
}

export async function updateEvent(id: string, data: any) {
  const event = await prisma.event.update({
    where: { id },
    data,
  });

  revalidatePath('/evenements');
  revalidatePath('/admin/evenements');
  return event;
}

export async function registerForEvent(eventId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Vous devez être connecté pour vous inscrire.');
  }

  const userId = session.user.id;

  // Check if already registered
  const existing = await prisma.eventRegistration.findUnique({
    where: {
      userId_eventId: { userId, eventId }
    }
  });

  if (existing) {
    return { success: false, message: 'Déjà inscrit' };
  }

  const registration = await prisma.eventRegistration.create({
    data: { userId, eventId },
    include: {
      event: true,
      user: true,
    }
  });

  // Send confirmation email
  await sendMail({
    to: session.user.email,
    subject: `Inscription confirmée : ${registration.event.title}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #000; font-weight: 900; text-transform: uppercase; letter-spacing: -0.05em;">Confirmation d'Inscription</h2>
        <p>Bonjour ${session.user.name},</p>
        <p>Votre inscription pour l'événement <strong>${registration.event.title}</strong> a été confirmée !</p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px;">📅 <strong>Date :</strong> ${new Date(registration.event.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
          <p style="margin: 5px 0 0 0; font-size: 14px;">🔗 <strong>Lien :</strong> <a href="${registration.event.eventUrl}">${registration.event.platform}</a></p>
        </div>
        <p>Un rappel vous sera envoyé peu de temps avant le début de la session.</p>
        <p style="margin-top: 30px; border-top: 1px solid #eee; pt: 20px; font-size: 12px; color: #666;">
          Eurin Hash - Portfolio & Architecture Moderne
        </p>
      </div>
    `,
  });

  revalidatePath('/evenements');
  revalidatePath('/dashboard');
  return { success: true, registration };
}



export async function sendEventReminders(eventId: string) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      registrations: {
        include: { user: true }
      }
    }
  });

  if (!event) throw new Error('Événement introuvable');

  const results = await Promise.all(
    event.registrations.map((reg: any) =>
      sendMail({
        to: reg.user.email,
        subject: `Rappel : ${event.title} approche !`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #000; font-weight: 900; text-transform: uppercase;">Prêt pour le Live ?</h2>
            <p>Bonjour ${reg.user.name},</p>
            <p>Ceci est un rappel pour l'événement <strong>${event.title}</strong> qui aura lieu prochainement.</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">📅 <strong>Date :</strong> ${new Date(event.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
              <p style="margin: 5px 0 0 0; font-size: 14px;">🔗 <strong>Lien Direct :</strong> <a href="${event.eventUrl}">${event.platform}</a></p>
            </div>
            <p>Nous avons hâte de vous y retrouver !</p>
            <p style="margin-top: 30px; border-top: 1px solid #eee; pt: 20px; font-size: 11px; color: #888;">
              Vous recevez ce mail car vous vous êtes inscrit à cet événement sur Eurin Hash.
            </p>
          </div>
        `,
      })
    )
  );

  return {
    success: true,
    sentCount: results.filter((r: any) => r.success).length
  };
}
