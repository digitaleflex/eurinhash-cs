import { NextResponse } from 'next/server';
import prismaApi from '@/lib/prisma-api';
import { auth } from '@/lib/auth';

const prisma = prismaApi;

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const user = session.user;

    const accounts = await prisma.account.findMany({
      where: { userId: user.id },
    });

    const sessionsCount = await prisma.session.count({
      where: { userId: user.id },
    });

    // Real data counts
    const messagesCount = await prisma.contactMessage.count({
      where: { email: user.email },
    });

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
      accounts: accounts.map((acc: { providerId: string }) => ({
        provider: acc.providerId,
      })),
      sessionsCount,
      messagesCount,
    });
  } catch (error) {
    console.error('Dashboard API Error (GET):', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { name } = await request.json();

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: 'Nom invalide' }, { status: 400 });
    }

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
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
