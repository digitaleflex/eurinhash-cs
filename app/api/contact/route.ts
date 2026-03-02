import { NextResponse } from 'next/server';
import { prismaApi as prisma } from '@/lib/prisma-api';
import { sendMail } from '@/lib/mail';

// Rate limit simple (1 contact par minute par IP)
const rateLimit = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const lastRequest = rateLimit.get(ip);

    if (lastRequest && now - lastRequest < 60000) {
      return NextResponse.json({ error: 'Veuillez patienter entre deux messages.' }, { status: 429 });
    }
    rateLimit.set(ip, now);

    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }

    const prismaClient = prisma as any;
    const contactMessage = await prismaClient.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim() || 'Sans objet',
        message: message.trim(),
      },
    });

    // ── EMAIL ADMIN ──
    await sendMail({
      to: process.env.RESEND_FROM_EMAIL || 'contact@eurinhash.com',
      subject: `[CONTACT] ${name} : ${subject || 'Nouveau Message'}`,
      html: `
        <div style="font-family: monospace; border: 1px solid #eee; padding: 20px;">
          <h2 style="text-transform: uppercase;">Nouveau Contact Entrant</h2>
          <p><strong>De:</strong> ${name} (${email})</p>
          <p><strong>Sujet:</strong> ${subject || 'Nouveau Message'}</p>
          <hr/>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    // ── EMAIL UTILISATEUR (ACCUSÉ PROTOCOLAIRE) ──
    await sendMail({
      to: email,
      subject: `[EHAF] Votre message a été reçu`,
      html: `
        <div style="max-width: 600px; font-family: sans-serif; line-height: 1.6;">
          <h3 style="text-transform: uppercase;">Transmission Reçue.</h3>
          <p>Bonjour ${name},</p>
          <p>Votre message a été transmis à notre service d&apos;architecture. Une réponse vous sera adressée sous un délai de 24 heures ouvrées.</p>
          
          <div style="margin-top: 40px; border-top: 1px solid #eee; pt-10px; font-size: 11px; color: #999;">
            EHAF — Architecture & Souveraineté
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, message: 'Message transmis.' });

  } catch (error) {
    console.error('Erreur Contact:', error);
    return NextResponse.json({ error: 'Échec de la transmission.' }, { status: 500 });
  }
}
