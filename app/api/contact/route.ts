import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Utiliser Prisma avec l'extension Accelerate
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject ?? null,
        message,
        status: 'new',
      },
    });

    return NextResponse.json({ 
      ok: true, 
      id: contactMessage.id,
      message: 'Message envoyé avec succès' 
    });
  } catch (err: unknown) {
    console.error('Erreur Prisma:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unexpected error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}