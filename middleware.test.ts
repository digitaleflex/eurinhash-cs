/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { middleware } from './middleware';

const url = (pathname: string, origin?: string) => {
  const request = new NextRequest(`http://localhost${pathname}`);
  if (origin !== undefined) request.headers.set('origin', origin);
  return request;
};

describe('middleware', () => {
  it('redirige /dashboard vers /sign-in avec callbackUrl si le cookie de session est absent', () => {
    const response = middleware(url('/dashboard/messages'));

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'http://localhost/sign-in?callbackUrl=%2Fdashboard%2Fmessages'
    );
  });

  it('laisse passer les routes publiques', () => {
    const response = middleware(url('/a-propos'));

    expect(response.status).toBe(200);
  });

  it('pose les en-têtes de sécurité sur chaque requête servie', () => {
    const response = middleware(url('/a-propos'));

    expect(response.headers.get('x-frame-options')).toBe('DENY');
    expect(response.headers.get('x-content-type-options')).toBe('nosniff');
    expect(response.headers.get('referrer-policy')).toBe(
      'strict-origin-when-cross-origin'
    );
    expect(response.headers.get('content-security-policy')).toContain(
      "frame-ancestors 'none'"
    );
    expect(response.headers.get('strict-transport-security')).toContain(
      'max-age=31536000'
    );
  });

  it("n'interpole jamais l'en-tête Origin brut dans la CSP connect-src", () => {
    // Un ';' termine la directive connect-src : injecter l'en-tête brut permettrait
    // d'ajouter une origine non approuvée.
    const response = middleware(
      url('/a-propos', 'http://localhost:3000/evil; *')
    );

    const csp = response.headers.get('content-security-policy') ?? '';
    expect(csp).not.toContain('evil; *');
    expect(csp).not.toContain('" *"');
  });

  it("ajoute l'origine normalisée quand elle est de confiance", () => {
    const response = middleware(url('/a-propos', 'http://localhost:3000'));

    expect(response.headers.get('content-security-policy')).toContain(
      'http://localhost:3000 '
    );
  });

  it('ignore une origine syntaxiquement invalide', () => {
    const response = middleware(url('/a-propos', 'not-a-url'));

    expect(response.headers.get('content-security-policy')).not.toContain(
      'not-a-url'
    );
  });
});
