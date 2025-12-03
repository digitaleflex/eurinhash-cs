// Système de mise en cache simple pour les opérations fréquentes
class SimpleCache<T = any> {
  private cache: Map<string, { value: T; expiry: number }> = new Map();
  private defaultTtl: number;

  constructor(defaultTtl: number = 5 * 60 * 1000) { // 5 minutes par défaut
    this.defaultTtl = defaultTtl;
    // Nettoyer le cache périodiquement
    setInterval(() => this.cleanup(), 60 * 1000); // Nettoyage toutes les minutes
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
export const statsCache = new SimpleCache<any>(10 * 60 * 1000); // 10 minutes
export const dataCache = new SimpleCache<any>(5 * 60 * 1000); // 5 minutes

// Cache pour les requêtes API fréquentes
export const apiCache = new SimpleCache<any>(2 * 60 * 1000); // 2 minutes

export default SimpleCache;