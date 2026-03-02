import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/vision',
    '/architecture',
    '/architecture/ehaf',
    '/architecture/doctrine',
    '/architecture/standards',
    '/initiatives',
    '/initiatives/flexhost',
    '/initiatives/hashcode',
    '/communaute',
    '/contact',
    '/collaboration',
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
