import { SITE_CONFIG } from './config';

// Système de mise en cache simple pour les opérations fréquentes
class SimpleCache<T> {
  private cache: Map<string, { value: T; expiry: number }> = new Map();
  private defaultTtl: number;

  constructor(defaultTtl: number = SITE_CONFIG.cache.defaultTtl) {
    // 5 minutes par défaut
    this.defaultTtl = defaultTtl;
    // Nettoyer le cache périodiquement
    setInterval(() => this.cleanup(), SITE_CONFIG.time.oneMinute); // Nettoyage toutes les minutes
  }

  set(key: string, value: T, ttl?: number): void {
    const expiry = Date.now() + (ttl ?? this.defaultTtl);
    this.cache.set(key, { value, expiry });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }

  getSize(): number {
    return this.cache.size;
  }
}

// Cache pour les statistiques et les données fréquemment consultées
export const statsCache = new SimpleCache<unknown>(SITE_CONFIG.cache.statsTtl); // 10 minutes
export const dataCache = new SimpleCache<unknown>(SITE_CONFIG.cache.defaultTtl); // 5 minutes

// Cache pour les requêtes API fréquentes
export const apiCache = new SimpleCache<unknown>(SITE_CONFIG.cache.apiTtl); // 2 minutes

export default SimpleCache;