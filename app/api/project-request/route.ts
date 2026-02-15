import { NextRequest, NextResponse } from 'next/server';
import { prismaApi as prisma } from '@/lib/prisma-api';
import { SITE_CONFIG } from '@/lib/config';
import { validatePhoneNumber } from '@/lib/countries';

// Rate limiting (simple, pourrait être externalisé)
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = SITE_CONFIG.rateLimit.window * 15; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = SITE_CONFIG.rateLimit.maxRequests; // 5 demandes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = RATE_LIMIT_WINDOW;
  const maxRequests = RATE_LIMIT_MAX_REQUESTS;
  const userLimit = rateLimit.get(ip);
  if (!userLimit || now > userLimit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (userLimit.count >= maxRequests) return false;
  userLimit.count++;
  return true;
}

// Fonction de validation complète pour les données de la demande de projet
function validateProjectRequestData(data: any): {
  isValid: boolean;
  errors: { field: string; message: string }[];
} {
  const errors: { field: string; message: string }[] = [];
  const { validation } = SITE_CONFIG.forms.projectRequest;
  const requiredFields = [
    'name',
    'email',
    'projectType',
    'projectName',
    'description',
    'budget',
    'timeline',
  ];

  // 1. Vérification des champs requis
  for (const field of requiredFields) {
    if (
      !data[field] ||
      typeof data[field] !== 'string' ||
      !data[field].trim()
    ) {
      errors.push({ field, message: `Le champ ${field} est requis.` });
    }
  }

  // Si des champs requis sont manquants, on arrête ici pour éviter des erreurs sur des valeurs nulles
  if (errors.length > 0) {
    const missingFields = errors.map(e => e.field);
    return {
      isValid: false,
      errors: [
        {
          field: 'general',
          message: `Champs requis manquants : ${missingFields.join(', ')}`,
        },
      ],
    };
  }

  // 2. Validation des longueurs et formats
  const fieldsToValidate: (keyof typeof validation)[] = [
    'name',
    'email',
    'phone',
    'company',
    'position',
    'projectName',
    'description',
    'objectives',
    'requirements',
    'constraints',
  ];

  for (const field of fieldsToValidate) {
    const config = validation[field as keyof typeof validation] as {
      minLength?: number;
      maxLength?: number;
    };
    const value = data[field] as string | undefined;

    if (value) {
      const trimmedValue = value.trim();
      if (config.minLength && trimmedValue.length < config.minLength) {
        errors.push({
          field,
          message: `${field} doit contenir au moins ${config.minLength} caractères.`,
        });
      }
      if (config.maxLength && trimmedValue.length > config.maxLength) {
        errors.push({
          field,
          message: `${field} ne doit pas dépasser ${config.maxLength} caractères.`,
        });
      }
    }
  }

  // Validation spécifique de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email.trim())) {
    errors.push({ field: 'email', message: "Format d'email invalide." });
  }

  // Validation spécifique du téléphone
  if (data.phone) {
    const phoneValidation = validatePhoneNumber(data.phone, data.country);
    if (!phoneValidation.isValid) {
      errors.push({
        field: 'phone',
        message: phoneValidation.message || 'Numéro de téléphone invalide.',
      });
    }
  }

  // 3. Validation des valeurs de listes déroulantes (enums)
  if (
    data.projectType &&
    !validation.projectType.allowedValues.includes(data.projectType)
  ) {
    errors.push({ field: 'projectType', message: 'Type de projet invalide.' });
  }
  if (data.budget && !validation.budget.allowedValues.includes(data.budget)) {
    errors.push({ field: 'budget', message: 'Budget invalide.' });
  }
  if (
    data.timeline &&
    !validation.timeline.allowedValues.includes(data.timeline)
  ) {
    errors.push({ field: 'timeline', message: 'Timeline invalide.' });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Trop de demandes. Veuillez réessayer dans 15 minutes.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Utilisation de la nouvelle fonction de validation
    const validation = validateProjectRequestData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: 'Données invalides.',
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    // Préparation des données sécurisée
    const projectData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      country: body.country || 'BJ',
      company: body.company?.trim() || null,
      position: body.position?.trim() || null,
      projectType: body.projectType,
      projectName: body.projectName.trim(),
      description: body.description.trim(),
      objectives: body.objectives?.trim() || null,
      budget: body.budget,
      timeline: body.timeline,
      startDate: body.startDate ? new Date(body.startDate) : null,
      technologies: Array.isArray(body.technologies)
        ? body.technologies.slice(0, 20)
        : [],
      requirements: body.requirements?.trim() || null,
      constraints: body.constraints?.trim() || null,
      ipAddress: ip,
      userAgent: request.headers.get('user-agent') || null,
    };

    // Cast pour éviter les problèmes de typage avec Prisma Accelerate
    const prismaClient = prisma as any;
    const result = await prismaClient.projectRequest.create({ data: projectData });

    console.log(
      `Nouvelle demande de projet: ${projectData.projectName} (${projectData.email})`
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Demande de projet envoyée avec succès',
        id: result.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      'Erreur lors de la sauvegarde de la demande de projet:',
      error
    );
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'JSON invalide dans la requête.' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Erreur serveur lors de l'enregistrement de la demande." },
      { status: 500 }
    );
  }
}

// La méthode GET est maintenant mise en cache par Prisma Accelerate
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where = status ? { status } : {};

    // Cast pour éviter les problèmes de typage avec Prisma Accelerate
    const prismaClient = prisma as any;
    const requests = await prismaClient.projectRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        projectType: true,
        projectName: true,
        budget: true,
        timeline: true,
        status: true,
        priority: true,
        createdAt: true,
      },
      cacheStrategy: { ttl: 120 }, // Cache pour 2 minutes
    });

    const total = await prismaClient.projectRequest.count({
      where,
      cacheStrategy: { ttl: 120 }, // Cache pour 2 minutes
    });

    return NextResponse.json({
      requests,
      total,
      hasMore: offset + limit < total,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des demandes:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
