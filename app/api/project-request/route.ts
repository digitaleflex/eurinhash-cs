import { NextRequest, NextResponse } from 'next/server';
import { prismaApi as prisma } from '@/lib/prisma-api';
import { SITE_CONFIG } from '@/lib/config';
import { sendMail } from '@/lib/mail';

// Rate limiting institutionnel
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 heure
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 tentatives par heure

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimit.get(ip);
  if (!userLimit || now > userLimit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) return false;
  userLimit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Protocole de sécurité : Trop de tentatives. Réessayez plus tard.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validation minimale
    const required = ['organization', 'email', 'initiativeType', 'initiativeName', 'vision'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Champ manquant : ${field}` }, { status: 400 });
      }
    }

    // Préparation des données pour Prisma (Mapping sur le nouveau schéma)
    const projectData = {
      organization: body.organization.trim(),
      role: body.role?.trim() || 'N/A',
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      country: body.country || 'BJ',
      location: body.location?.trim() || null,
      initiativeType: body.initiativeType,
      initiativeName: body.initiativeName.trim(),
      vision: body.vision.trim(),
      context: body.context?.trim() || null,
      engagementLevel: body.engagementLevel || 'standard',
      priority: body.priority || 'strategic',
      timeline: body.timeline || 'Q3 2026',
      dataSensitivity: body.dataSensitivity || 'standard',
      existingInfrastructure: body.existingInfrastructure?.trim() || null,
      regulatoryRequirements: body.regulatoryRequirements?.trim() || null,
      technologies: Array.isArray(body.technologies) ? body.technologies : [],
      ipAddress: ip,
      userAgent: request.headers.get('user-agent') || null,
    };

    const prismaClient = prisma as any;
    const result = await prismaClient.projectRequest.create({ data: projectData });

    // ── EMAIL ADMIN (DÉTAILS TECHNIQUES) ──
    const adminEmail = await sendMail({
      to: process.env.RESEND_FROM_EMAIL || 'contact@eurinhash.com',
      subject: `[DIAGNOSTIC] ${projectData.initiativeName} - ${projectData.organization}`,
      html: `
        <h1 style="color: #000; font-family: sans-serif;">Nouveau Dossier d'Initiative</h1>
        <div style="border: 1px solid #eee; padding: 20px; font-family: monospace;">
          <p><strong>Entité:</strong> ${projectData.organization} (${projectData.role})</p>
          <p><strong>Contact:</strong> ${projectData.email} | ${projectData.phone || 'N/A'}</p>
          <hr />
          <p><strong>Nature:</strong> ${projectData.initiativeType}</p>
          <p><strong>Désignation:</strong> ${projectData.initiativeName}</p>
          <p><strong>Vision:</strong><br/>${projectData.vision}</p>
          <p><strong>Contexte:</strong><br/>${projectData.context || 'Non spécifié'}</p>
          <hr />
          <p><strong>Engagement:</strong> ${projectData.engagementLevel} | <strong>Priorité:</strong> ${projectData.priority}</p>
          <p><strong>Contraintes:</strong> ${projectData.regulatoryRequirements || 'Aucune'}</p>
          <p><strong>Sensibilité:</strong> ${projectData.dataSensitivity}</p>
          <p><strong>Technologies:</strong> ${projectData.technologies.join(', ')}</p>
        </div>
      `,
    });

    // ── EMAIL UTILISATEUR (ACCUSÉ PROTOCOLAIRE) ──
    const userEmail = await sendMail({
      to: projectData.email,
      subject: `[EHAF-COLLAB] Initialisation du protocole de qualification`,
      html: `
        <div style="max-width: 600px; font-family: sans-serif; line-height: 1.6;">
          <h2 style="text-transform: uppercase; letter-spacing: -0.05em;">Dossier Enregistré.</h2>
          <p>Votre demande d'initiative concernant <strong>${projectData.initiativeName}</strong> a été soumise avec succès au protocole de diagnostic EurinHash.</p>
          
          <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-left: 4px solid #000;">
            <p style="margin: 0; font-size: 13px; font-style: italic;">
              "L'architecture d'un système est le reflet de la clarté de sa vision stratégique."
            </p>
          </div>

          <p><strong>Prochaines étapes :</strong></p>
          <ol>
            <li>Analyse de la maturité et des contraintes systémiques (Sous 48h).</li>
            <li>Consultation technique si le dossier est qualifié.</li>
            <li>Définition de la roadmap de déploiement.</li>
          </ol>

          <p style="font-size: 12px; color: #666; margin-top: 40px;">
            Ceci est un message protocolaire automatique. <br />
            EHAF — Architecture & Souveraineté
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      id: result.id,
      message: 'Protocole de qualification initié.',
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur Protocole Collaboration:', error);
    return NextResponse.json({ error: 'Échec de la synchronisation système.' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const prismaClient = prisma as any;
    const requests = await prismaClient.projectRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json({ requests });
  } catch (error) {
    return NextResponse.json({ error: 'Serveur indisponible' }, { status: 500 });
  }
}
