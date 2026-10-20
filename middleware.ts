import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const TRUSTED_ORIGINS = [
  ...new Set(
    [
      process.env.NEXT_PUBLIC_SITE_URL,
      'http://localhost:3000',
      'https://localhost:3000',
    ].filter(Boolean) as string[]
  ),
];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
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
      "img-src 'self' blob: data: https://www.clarity.ms; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "connect-src 'self' " +
      (isTrustedOrigin ? `${origin} ` : '') +
      'https://*.vercel-analytics.com https://www.clarity.ms https://*.clarity.ms; ' +
      "frame-src 'self'; " +
      "form-action 'self'; " +
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

