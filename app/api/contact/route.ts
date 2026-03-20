import { NextRequest, NextResponse, after } from 'next/server';

// Edge Runtime disabled for Prisma compatibility
// export const runtime = 'edge';

import { prismaApi } from '@/lib/prisma-api';
import { sendMail } from '@/lib/mail';
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
        // ── EMAIL ADMIN ──
        await sendMail({
          to: process.env.RESEND_FROM_EMAIL || 'contact@eurinhash.com',
          subject: `[CONTACT] ${name} : ${subject || 'Nouveau Message'}`,
          text: `Nom: ${name}\nEmail: ${email}\nSujet: ${subject || 'Sans objet'}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: sans-serif; border: 1px solid #eee; padding: 20px; max-width: 600px;">
              <h2 style="color: #333; text-transform: uppercase; font-size: 18px;">Nouveau Contact Entrant</h2>
              <p><strong>De :</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
              <p><strong>Sujet :</strong> ${subject || 'Sans objet'}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="white-space: pre-wrap; color: #555;">${message}</p>
            </div>
          `,
        });

        // ── EMAIL ACCUSÉ DE RÉCEPTION ──
        await sendMail({
          to: email,
          subject: `[EHAF] Votre message a été reçu`,
          html: `
            <div style="max-width: 600px; font-family: sans-serif; line-height: 1.6; color: #333;">
              <h3 style="text-transform: uppercase; color: #2563eb;">Transmission Reçue.</h3>
              <p>Bonjour <strong>${name}</strong>,</p>
              <p>Nous avons bien reçu votre message concernant : <em>${subject || 'votre demande'}</em>.</p>
              <p>Un expert en architecture logicielle examinera votre requête et vous répondra sous un délai de 24 heures ouvrées.</p>
              <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 10px; font-size: 11px; color: #999; font-style: italic;">
                EHAF — Architecture, Souveraineté & Expertise Cloud
              </div>
            </div>
          `,
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
