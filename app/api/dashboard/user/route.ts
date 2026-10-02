import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function PATCH(request: Request) {
  try {
    // La session est vérifiée avant toute validation : un appel anonyme doit
    // toujours répondre 401, jamais 400.
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Seuls id, email et role sont acceptés implicitement : le corps ne peut pas
    // changer l'identité ni le rôle, l'update cible toujours la session.
    const { name } = await request.json();

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: 'Nom invalide' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { name: name.trim() },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
      },
    });
  } catch (error) {
    console.error('Dashboard API Error (PATCH):', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
