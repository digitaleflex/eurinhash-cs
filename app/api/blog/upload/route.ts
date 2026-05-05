import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(request: Request): Promise<NextResponse> {
  const session = (await auth.api.getSession({
    headers: await headers(),
  })) as any;

  // Sécurité : Seul l'admin peut uploader
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Nom de fichier manquant' }, { status: 400 });
  }

  try {
    const blob = await put(filename, request.body!, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Erreur Upload Blob:', error);
    return NextResponse.json({ error: 'Échec de l\'upload' }, { status: 500 });
  }
}
