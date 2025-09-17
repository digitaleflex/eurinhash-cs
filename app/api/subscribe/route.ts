import { NextRequest } from 'next/server';
import prisma from '../../lib/prisma';

// Configuration pour Next.js 15
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, consent, source } = body as { email?: string; consent?: boolean; source?: string };

    // Validation basique
    if (!email || consent !== true) {
      return Response.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email }
    });

    if (existingSubscriber) {
      return Response.json(
        { error: 'Cet email est déjà inscrit' },
        { status: 400 }
      );
    }

    // Créer un nouvel abonné
    const subscriber = await prisma.subscriber.create({
      data: {
        email,
        gdprConsent: Boolean(consent),
        marketingConsent: Boolean(consent),
        source: (source as any) ?? 'HOMEPAGE',
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      }
    });

    return Response.json(
      { message: 'Inscription réussie', subscriber },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return Response.json(
      { error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
} 