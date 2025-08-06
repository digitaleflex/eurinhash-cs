import { NextRequest, NextResponse } from 'next/server';
import { NewsletterService } from '@/app/lib/newsletter';
import { NewsletterType, SubscriptionSource } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation des données
    const { 
      email, 
      firstName, 
      lastName, 
      company, 
      jobTitle, 
      newsletters, 
      source, 
      referrer, 
      userAgent, 
      gdprConsent, 
      marketingConsent 
    } = body;

    // Vérifications de base
    if (!email || !Array.isArray(newsletters) || newsletters.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Email et au moins une newsletter sont requis' },
        { status: 400 }
      );
    }

    if (!gdprConsent) {
      return NextResponse.json(
        { success: false, error: 'Le consentement RGPD est obligatoire' },
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

    // Validation des types de newsletters
    const validNewsletterTypes = Object.values(NewsletterType);
    const invalidTypes = newsletters.filter((type: string) => !validNewsletterTypes.includes(type as NewsletterType));
    if (invalidTypes.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Types de newsletter invalides' },
        { status: 400 }
      );
    }

    // Récupération de l'adresse IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0] : 
                     request.headers.get('x-real-ip') || 
                     request.ip || 
                     'unknown';

    // Données pour l'inscription
    const subscriptionData = {
      email: email.toLowerCase().trim(),
      firstName: firstName?.trim() || undefined,
      lastName: lastName?.trim() || undefined,
      company: company?.trim() || undefined,
      jobTitle: jobTitle?.trim() || undefined,
      newsletters: newsletters as NewsletterType[],
      source: source as SubscriptionSource || SubscriptionSource.HOMEPAGE,
      referrer: referrer || undefined,
      ipAddress,
      userAgent: userAgent || 'unknown',
      gdprConsent: Boolean(gdprConsent),
      marketingConsent: Boolean(marketingConsent),
    };

    // Appel du service d'inscription
    const result = await NewsletterService.subscribe(subscriptionData);

    if (result.success) {
      // TODO: Envoyer l'email de confirmation
      // await sendConfirmationEmail(result.subscriber);
      
      return NextResponse.json({
        success: true,
        message: result.message,
        subscriberId: result.subscriber?.id
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Erreur API newsletter/subscribe:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur interne du serveur. Veuillez réessayer plus tard.' 
      },
      { status: 500 }
    );
  }
}

// Endpoint pour obtenir les statistiques (optionnel, pour l'admin)
export async function GET() {
  try {
    const stats = await NewsletterService.getStats();
    
    if (stats) {
      return NextResponse.json({ success: true, data: stats });
    } else {
      return NextResponse.json(
        { success: false, error: 'Impossible de récupérer les statistiques' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur API newsletter/subscribe GET:', error);
    
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}