import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/authorization';
import { randomUUID } from 'node:crypto';

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const MIME_TO_EXTENSION = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
} as const;

export async function POST(request: Request): Promise<NextResponse> {
  let session;
  try {
    session = await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const contentType = request.headers.get('content-type')?.split(';', 1)[0]?.toLowerCase();
  const extension = contentType ? MIME_TO_EXTENSION[contentType as keyof typeof MIME_TO_EXTENSION] : undefined;
  const declaredLength = Number(request.headers.get('content-length') ?? 0);

  if (!extension) {
    return NextResponse.json({ error: 'Type de fichier non pris en charge' }, { status: 415 });
  }

  if (declaredLength > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: 'Fichier trop volumineux' }, { status: 413 });
  }

  if (!request.body) {
    return NextResponse.json({ error: 'Fichier manquant' }, { status: 400 });
  }

  let total = 0;
  const limitedStream = request.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        total += chunk.byteLength;
        if (total > MAX_UPLOAD_BYTES) {
          controller.error(new Error('UPLOAD_TOO_LARGE'));
          return;
        }
        controller.enqueue(chunk);
      },
    }),
  );

  try {
    const blob = await put(`blog/${randomUUID()}.${extension}`, limitedStream, {
      access: 'public',
      contentType,
    });

    return NextResponse.json(blob);
  } catch (error) {
    if (error instanceof Error && error.message === 'UPLOAD_TOO_LARGE') {
      return NextResponse.json({ error: 'Fichier trop volumineux' }, { status: 413 });
    }

    console.error('Erreur Upload Blob:', error);
    return NextResponse.json({ error: "Échec de l'upload" }, { status: 500 });
  }
}
