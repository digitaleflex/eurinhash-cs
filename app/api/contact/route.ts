import { NextResponse } from 'next/server';
import { prismaApi as prisma } from '@/lib/prisma-api';
import { apiCache } from '@/lib/cache';
import { SITE_CONFIG } from '@/lib/config';

// Cache simple pour éviter les requêtes répétées
const rateLimitCache = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = SITE_CONFIG.rateLimit.window; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = SITE_CONFIG.rateLimit.maxRequests; // 5 requêtes par minute par IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitCache.get(ip);

  if (!userLimit || now - userLimit.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitCache.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  userLimit.count++;
  return true;
}

// Fonction de validation des données
function validateContactData(data: any): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const { name, email, message } = data;

  // Validation du nom
  if (!name || typeof name !== 'string') {
    errors.push('Le nom est requis');
  } else if (
    name.trim().length < SITE_CONFIG.forms.contact.validation.name.minLength
  ) {
    errors.push(
      `Le nom doit contenir au moins ${SITE_CONFIG.forms.contact.validation.name.minLength} caractères`
    );
  } else if (
    name.trim().length > SITE_CONFIG.forms.contact.validation.name.maxLength
  ) {
    errors.push(
      `Le nom ne doit pas dépasser ${SITE_CONFIG.forms.contact.validation.name.maxLength} caractères`
    );
  }

  // Validation de l'email
  if (!email || typeof email !== 'string') {
    errors.push("L'email est requis");
  } else {
    const trimmedEmail = email.trim();
    if (
      trimmedEmail.length > SITE_CONFIG.forms.contact.validation.email.maxLength
    ) {
      errors.push(
        `L'email ne doit pas dépasser ${SITE_CONFIG.forms.contact.validation.email.maxLength} caractères`
      );
    } else {
      // Validation email optimisée avec cache
      const emailCacheKey = `email_valid_${trimmedEmail}`;
      let isEmailValid = apiCache.get(emailCacheKey);

      if (isEmailValid === undefined) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isEmailValid = emailRegex.test(trimmedEmail);
        apiCache.set(emailCacheKey, isEmailValid, 5 * 60 * 1000); // 5 minutes
      }

      if (!isEmailValid) {
        errors.push("Format d'email invalide");
      }
    }
  }

  // Validation du message
  if (!message || typeof message !== 'string') {
    errors.push('Le message est requis');
  } else if (
    message.trim().length <
    SITE_CONFIG.forms.contact.validation.message.minLength
  ) {
    errors.push(
      `Le message doit contenir au moins ${SITE_CONFIG.forms.contact.validation.message.minLength} caractères`
    );
  } else if (
    message.trim().length >
    SITE_CONFIG.forms.contact.validation.message.maxLength
  ) {
    errors.push(
      `Le message ne doit pas dépasser ${SITE_CONFIG.forms.contact.validation.message.maxLength} caractères`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export async function POST(request: Request) {
  const startTime = Date.now();

  try {
    // Rate limiting basique
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: 'Trop de requêtes. Veuillez patienter.',
        },
        { status: 429 }
      );
    }

    // Vérifier que la requête est bien du JSON
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        {
          error: 'Content-Type doit être application/json',
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation des données
    const validation = validateContactData({ name, email, message });
    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: 'Données invalides',
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    // Sauvegarde optimisée avec timeout
    // Cast pour éviter les problèmes de typage avec Prisma Accelerate
    const prismaClient = prisma as any;
    const contactMessage = await prismaClient.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim() || null,
        message: message.trim(),
        status: 'new',
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    const processingTime = Date.now() - startTime;

    return NextResponse.json({
      ok: true,
      id: contactMessage.id,
      message: 'Message envoyé avec succès',
      processingTime: `${processingTime}ms`,
    });
  } catch (err: unknown) {
    const processingTime = Date.now() - startTime;
    console.error(`Erreur API contact (${processingTime}ms):`, err);

    // Gestion spécifique des erreurs de parsing JSON
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: 'JSON invalide dans la requête',
        },
        { status: 400 }
      );
    }

    const errorMessage = err instanceof Error ? err.message : 'Erreur serveur';
    return NextResponse.json(
      {
        error: errorMessage,
        processingTime: `${processingTime}ms`,
      },
      { status: 500 }
    );
  }
}

// Gérer les méthodes non autorisées
export function GET() {
  return NextResponse.json({ error: 'Méthode non autorisée' }, { status: 405 });
}

export function PUT() {
  return NextResponse.json({ error: 'Méthode non autorisée' }, { status: 405 });
}

export function DELETE() {
  return NextResponse.json({ error: 'Méthode non autorisée' }, { status: 405 });
}
