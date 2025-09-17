import { NextRequest, NextResponse } from 'next/server';
import { NewsletterService } from '@/app/lib/newsletter';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token de vérification requis' },
        { status: 400 }
      );
    }

    // Vérifier l'email avec le token
    const result = await NewsletterService.verifyEmail(token);

    if (result.success) {
      // Rediriger vers une page de confirmation
      return NextResponse.redirect(new URL('/newsletter/verified', request.url));
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Erreur API newsletter/verify:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur interne du serveur' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token de vérification requis' },
        { status: 400 }
      );
    }

    // Vérifier l'email avec le token
    const result = await NewsletterService.verifyEmail(token);

    return NextResponse.json(result);

  } catch (error) {
    console.error('Erreur API newsletter/verify POST:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur interne du serveur' 
      },
      { status: 500 }
    );
  }
}