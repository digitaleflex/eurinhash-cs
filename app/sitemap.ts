import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import { posts } from '@/lib/content/posts';
import { parsePublishedDate } from '@/lib/content/dates';

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');

/**
 * Routes statiques réellement servies par l'application. Aucune `lastModified`
 * n'est inventée pour les pages sans date de contenu fiable ; les articles
 * utilisent leur date de publication.
 */
const staticRoutes: MetadataRoute.Sitemap = [
  { url: baseUrl, changeFrequency: 'monthly', priority: 1 },
  { url: `${baseUrl}/services`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${baseUrl}/services/audit`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${baseUrl}/services/architecture`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${baseUrl}/services/cto`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${baseUrl}/services/mentorat`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${baseUrl}/realisations`, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${baseUrl}/a-propos`, changeFrequency: 'yearly', priority: 0.7 },
  { url: `${baseUrl}/blog`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${baseUrl}/contact`, changeFrequency: 'yearly', priority: 0.7 },
  { url: `${baseUrl}/legal/mentions-legales`, changeFrequency: 'yearly', priority: 0.3 },
  { url: `${baseUrl}/legal/politique-confidentialite`, changeFrequency: 'yearly', priority: 0.3 },
  { url: `${baseUrl}/legal/cgv`, changeFrequency: 'yearly', priority: 0.3 },
  { url: `${baseUrl}/legal/cookies`, changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: parsePublishedDate(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
