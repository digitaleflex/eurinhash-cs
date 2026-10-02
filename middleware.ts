import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const TRUSTED_ORIGINS = [
  ...new Set(
    [
      process.env.NEXT_PUBLIC_SITE_URL,
      process.env.BETTER_AUTH_URL,
      'http://localhost:3000',
      'https://localhost:3000',
    ].filter(Boolean) as string[]
  ),
];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // Dashboard route protection
  if (pathname.startsWith('/dashboard')) {
    const sessionToken = request.cookies.get(
      'better-auth.session_token'
    )?.value;

    if (!sessionToken) {
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Get the origin from the request
  const origin = request.headers.get('origin') || '';
  const isTrustedOrigin = TRUSTED_ORIGINS.some((trusted) => {
    try {
      return new URL(origin).origin === new URL(trusted).origin;
    } catch {
      return false;
    }
  });

  // Headers de Sécurité (Standard EHAF) - Updated for OAuth
  const isDev = process.env.NODE_ENV === 'development';
  const securityHeaders = {
    'Content-Security-Policy':
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://www.clarity.ms; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "img-src 'self' blob: data: https://*.googleusercontent.com https://www.clarity.ms https://accounts.google.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "connect-src 'self' " +
      (isTrustedOrigin ? `${origin} ` : '') +
      'https://*.vercel-analytics.com https://*.resend.com https://www.clarity.ms https://*.clarity.ms https://kv.better-auth.com https://*.better-auth.com https://oauth2.googleapis.com https://www.googleapis.com https://accounts.google.com; ' +
      "frame-src 'self' https://accounts.google.com; " +
      "form-action 'self' https://accounts.google.com; " +
      "frame-ancestors 'none'; " +
      (isDev ? '' : 'upgrade-insecure-requests;'),
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy':
      'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - Common static extensions (svg, png, jpg, webp, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|txt)$).*)',
  ],
};

