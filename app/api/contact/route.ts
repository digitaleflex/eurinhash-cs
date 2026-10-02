import { NextRequest, NextResponse, after } from 'next/server';

// Edge Runtime disabled for Prisma compatibility
// export const runtime = 'edge';

import prisma from '@/lib/prisma';
import { sendMail, sendContactNotification, sendContactAcknowledgement } from '@/lib/mail';
import { ContactSchema } from '@/lib/validation';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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
    const prismaClient = prismaApi as any;
    await prismaClient.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim() || 'Sans objet',
        message: message.trim(),
      },
      cacheStrategy: { swr: 60, ttl: 60 },
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
