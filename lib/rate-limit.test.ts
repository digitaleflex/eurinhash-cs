/**
 * @jest-environment node
 */
import { checkRateLimit, resetRateLimitStore, getClientIp } from './rate-limit';
import { SITE_CONFIG } from './config';

describe('checkRateLimit', () => {
  beforeEach(() => resetRateLimitStore());

  it('autorise jusqu’au seuil configuré puis rejette', () => {
    const { maxRequests } = SITE_CONFIG.rateLimit;
    for (let i = 0; i < maxRequests; i++) {
      expect(checkRateLimit('ip:1').allowed).toBe(true);
    }
    const denied = checkRateLimit('ip:1');
    expect(denied.allowed).toBe(false);
    expect(denied.retryAfterSeconds).toBeGreaterThan(0);
  });

  it('isole les clés entre elles', () => {
    const { maxRequests } = SITE_CONFIG.rateLimit;
    for (let i = 0; i < maxRequests; i++) checkRateLimit('ip:1');
    expect(checkRateLimit('ip:2').allowed).toBe(true);
  });
});

describe('getClientIp', () => {
  it('prend la première IP de x-forwarded-for', () => {
    const h = new Headers({ 'x-forwarded-for': '1.2.3.4, 5.6.7.8' });
    expect(getClientIp(h)).toBe('1.2.3.4');
  });

  it('retombe sur unknown sans en-tête', () => {
    expect(getClientIp(new Headers())).toBe('unknown');
  });
});
