import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/services',
    '/services/audit',
    '/services/architecture',
    '/services/cto',
    '/services/mentorat',
    '/realisations',
    '/blog',
    '/evenements',
    '/ressources',
    '/contact',
    '/legal/mentions-legales',
    '/legal/politique-confidentialite',
    '/legal/cgv',
    '/legal/cookies',
  ];

  return routes.map(route => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
