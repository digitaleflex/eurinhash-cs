import { NextRequest, NextResponse, after } from 'next/server';

// Edge Runtime disabled for Prisma compatibility
// export const runtime = 'edge';

import { prismaApi } from '@/lib/prisma-api';
import { sendMail } from '@/lib/mail';
import { ProjectRequestSchema } from '@/lib/validation';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const body = await request.json();

    // Validation avec Zod
    const result = ProjectRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({
        error: 'Données invalides',
        details: result.error.issues.map((e: { message: string }) => e.message)
      }, { status: 400 });
    }

    const projectData = {
      ...result.data,
      organization: result.data.organization.trim(),
      initiativeName: result.data.initiativeName.trim(),
      email: result.data.email.trim().toLowerCase(),
      ipAddress: ip,
      userAgent: request.headers.get('user-agent') || null,
    };

    const prismaClient = prismaApi as any;
    const project = await prismaClient.projectRequest.create({ 
      data: projectData,
      cacheStrategy: { swr: 60, ttl: 60 },
    });

    // Envoi des emails en tâche de fond
    after(async () => {
      try {
        // EMAIL ADMIN
        await sendMail({
          to: process.env.RESEND_FROM_EMAIL || 'contact@eurinhash.com',
          subject: `[DIAGNOSTIC] ${projectData.initiativeName} - ${projectData.organization}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
              <h2 style="color: #333;">Nouveau Dossier d'Initiative</h2>
              <p><strong>Organisation :</strong> ${projectData.organization} (${projectData.role})</p>
              <p><strong>Contact :</strong> <a href="mailto:${projectData.email}">${projectData.email}</a> | ${projectData.phone || 'N/A'}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p><strong>Type :</strong> ${projectData.initiativeType}</p>
              <p><strong>Nom :</strong> ${projectData.initiativeName}</p>
              <p><strong>Vision :</strong><br/>${projectData.vision}</p>
              <p><strong>Priorité :</strong> ${projectData.priority} | <strong>Engagement :</strong> ${projectData.engagementLevel}</p>
              <p><strong>Technologies :</strong> ${projectData.technologies.join(', ') || 'Aucune'}</p>
            </div>
          `,
        });

        // EMAIL UTILISATEUR
        await sendMail({
          to: projectData.email,
          subject: `[EHAF-COLLAB] Initialisation du protocole de qualification`,
          html: `
            <div style="max-width: 600px; font-family: sans-serif; line-height: 1.6; color: #333;">
              <h2 style="text-transform: uppercase; color: #000;">Dossier Enregistré.</h2>
              <p>Bonjour,</p>
              <p>Votre demande d'initiative concernant <strong>${projectData.initiativeName}</strong> a été soumise avec succès au protocole de diagnostic EurinHash.</p>
              <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-left: 4px solid #000;">
                <p style="margin: 0; font-size: 13px; font-style: italic;">
                  "L'architecture d'un système est le reflet de la clarté de sa vision stratégique."
                </p>
              </div>
              <p><strong>Étapes de traitement :</strong></p>
              <ol>
                <li>Analyse de la maturité et des contraintes (48h).</li>
                <li>Consultation technique sectorielle.</li>
                <li>Établissement du Blueprint architectural.</li>
              </ol>
              <p style="font-size: 11px; color: #999; margin-top: 40px; border-top: 1px solid #eee; padding-top: 10px;">
                EHAF — Architecture, Souveraineté & Systèmes Critiques
              </p>
            </div>
          `,
        });
      } catch (err) {
        console.error("Erreur Notification Collaboration:", err);
      }
    });

    return NextResponse.json({
      success: true,
      id: project.id,
      message: 'Protocole de qualification initié.',
    }, { status: 201 });

  } catch (error) {
    logger.error({ error, path: '/api/project-request' }, 'Erreur API Collaboration');
    return NextResponse.json({ error: 'Échec de la synchronisation système.' }, { status: 500 });
  }
}
