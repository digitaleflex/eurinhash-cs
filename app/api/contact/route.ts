import { NextRequest, NextResponse, after } from 'next/server';

// Edge Runtime disabled for Prisma compatibility
// export const runtime = 'edge';

import prisma from '@/lib/prisma';
import { sendMail, sendContactNotification, sendContactAcknowledgement } from '@/lib/mail';
import { ContactSchema } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Limite anti-flood keyée par IP (fenêtre glissante serveur)
    const ip = getClientIp(request.headers);
    const rate = checkRateLimit(`contact:${ip}`);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Réessayez plus tard.' },
        { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } }
      );
    }

    const body = await request.json();

    // Honeypot anti-bot : champ invisible côté utilisateur légitime.
    // Rempli → bot : on fait semblant de traiter, aucun effet de bord.
    if (typeof body?.website === 'string' && body.website.length > 0) {
      return NextResponse.json({ success: true, message: 'Message transmis avec succès.' });
    }

    // Validation avec Zod
    const result = ContactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Données invalides',
          details: result.error.issues.map((e: { message: string }) => e.message)
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // Sauvegarde en base de données via Prisma Accelerate
    const prismaClient = prisma;
    await prismaClient.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim() || 'Sans objet',
        message: message.trim(),
      },
    });

    // Envoi des emails en arrière-plan (non-bloquant pour la réponse)
    after(async () => {
      try {
        // ── NOTIFICATION ADMIN ──
        await sendContactNotification({
          name,
          email,
          subject: subject || 'Nouveau Message',
          message,
        });

        // ── ACCUSÉ DE RÉCEPTION CLIENT ──
        await sendContactAcknowledgement({
          to: email,
          name,
          subject: subject || 'votre demande',
        });
      } catch (err) {
        console.error("Erreur lors de l'envoi des emails de notification:", err);
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Message transmis avec succès.' 
    });

  } catch (error) {
    logger.error({ error, path: '/api/contact' }, 'Erreur API Contact');
    return NextResponse.json(
      { error: 'Échec de la transmission du message.' }, 
      { status: 500 }
    );
  }
}
