import { NextResponse } from 'next/server';
import { prismaApi as prisma } from '@/lib/prisma-api';
import { apiCache } from '@/lib/cache';

// Cache simple pour éviter les requêtes répétées
const rateLimitCache = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requêtes par minute par IP

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

export async function POST(request: Request) {
  const startTime = Date.now();
  
  try {
    // Rate limiting basique
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ 
        error: 'Trop de requêtes. Veuillez patienter.' 
      }, { status: 429 });
    }

    const { name, email, subject, message } = await request.json();

    // Validation rapide optimisée
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    const trimmedMessage = message?.trim();
    
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json({ 
        error: 'Tous les champs obligatoires doivent être remplis' 
      }, { status: 400 });
    }

    // Validation email optimisée avec cache
    const emailCacheKey = `email_valid_${trimmedEmail}`;
    let isEmailValid = apiCache.get(emailCacheKey);
    
    if (isEmailValid === undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isEmailValid = emailRegex.test(trimmedEmail);
      apiCache.set(emailCacheKey, isEmailValid, 5 * 60 * 1000); // 5 minutes
    }
    
    if (!isEmailValid) {
      return NextResponse.json({ 
        error: 'Format d\'email invalide' 
      }, { status: 400 });
    }

    // Sauvegarde optimisée avec timeout
    const contactMessage = await prisma.contactMessage.create({
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
      processingTime: `${processingTime}ms`
    });
    
  } catch (err: unknown) {
    const processingTime = Date.now() - startTime;
    console.error(`Erreur API contact (${processingTime}ms):`, err);
    
    const errorMessage = err instanceof Error ? err.message : 'Erreur serveur';
    return NextResponse.json({ 
      error: errorMessage,
      processingTime: `${processingTime}ms`
    }, { status: 500 });
  }
}