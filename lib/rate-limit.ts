import { SITE_CONFIG } from './config';

interface Bucket {
  timestamps: number[];
}

const buckets = new Map<string, Bucket>();

// Nettoyage périodique pour éviter une fuite mémoire (instance serverless).
let lastSweep = Date.now();
function sweep(now: number) {
  if (now - lastSweep < SITE_CONFIG.cache.cleanupInterval) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    bucket.timestamps = bucket.timestamps.filter(
      (t) => now - t < SITE_CONFIG.rateLimit.window
    );
    if (bucket.timestamps.length === 0) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

/**
 * Limiteur en mémoire (fenêtre glissante), dimensionné par IP côté serveur.
 * Compatible avec l'architecture actuelle (route Node, Prisma natif).
 * À remplacer par un store partagé (ex. Upstash) si le déploiement devient multi-instances.
 */
export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  sweep(now);
  const { window, maxRequests } = SITE_CONFIG.rateLimit;
  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < window);

  if (bucket.timestamps.length >= maxRequests) {
    buckets.set(key, bucket);
    const oldest = bucket.timestamps[0];
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((window - (now - oldest)) / 1000)),
    };
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return headers.get('x-real-ip')?.trim() || 'unknown';
}

/** Réservé aux tests. */
export function resetRateLimitStore() {
  buckets.clear();
}
