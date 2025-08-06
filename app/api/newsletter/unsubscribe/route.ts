import { NextRequest, NextResponse } from 'next/server';
import { NewsletterService } from '@/app/lib/newsletter';
import { NewsletterType } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, newsletterType } = body;

    // Validation de base
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email requis' },
        { status: 400 }
      );
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Validation du type de newsletter si spécifié
    if (newsletterType && !Object.values(NewsletterType).includes(newsletterType)) {
      return NextResponse.json(
        { success: false, error: 'Type de newsletter invalide' },
        { status: 400 }
      );
    }

    // Appel du service de désabonnement
    const result = await NewsletterService.unsubscribe(
      email.toLowerCase().trim(),
      newsletterType as NewsletterType
    );

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Erreur API newsletter/unsubscribe:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur interne du serveur. Veuillez réessayer plus tard.' 
      },
      { status: 500 }
    );
  }
}

// Endpoint GET pour la page de désabonnement avec token
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    const newsletterType = searchParams.get('type');

    if (!email || !token) {
      return NextResponse.json(
        { success: false, error: 'Email et token requis' },
        { status: 400 }
      );
    }

    // TODO: Vérifier le token de désabonnement
    // const isValidToken = await verifyUnsubscribeToken(email, token);
    // if (!isValidToken) {
    //   return NextResponse.json(
    //     { success: false, error: 'Token invalide ou expiré' },
    //     { status: 400 }
    //   );
    // }

    // Effectuer le désabonnement
    const result = await NewsletterService.unsubscribe(
      email.toLowerCase().trim(),
      newsletterType as NewsletterType
    );

    if (result.success) {
      // Rediriger vers une page de confirmation
      return NextResponse.redirect(new URL('/newsletter/unsubscribed', request.url));
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Erreur API newsletter/unsubscribe GET:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur interne du serveur' 
      },
      { status: 500 }
    );
  }
}