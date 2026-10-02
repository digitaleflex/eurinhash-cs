import type { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { siteConfig } from '@/lib/metadata';

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: '/', changeFrequency: 'monthly', priority: 1 },
  { url: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/services/audit', changeFrequency: 'yearly', priority: 0.7 },
  { url: '/services/architecture', changeFrequency: 'yearly', priority: 0.7 },
  { url: '/services/cto', changeFrequency: 'yearly', priority: 0.7 },
  { url: '/services/mentorat', changeFrequency: 'yearly', priority: 0.7 },
  { url: '/realisations', changeFrequency: 'monthly', priority: 0.9 },
  { url: '/a-propos', changeFrequency: 'yearly', priority: 0.7 },
  { url: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { url: '/evenements', changeFrequency: 'weekly', priority: 0.7 },
  { url: '/ressources', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/contact', changeFrequency: 'yearly', priority: 0.7 },
  { url: '/legal/mentions-legales', changeFrequency: 'yearly', priority: 0.3 },
  {
    url: '/legal/politique-confidentialite',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  { url: '/legal/cookies', changeFrequency: 'yearly', priority: 0.3 },
  { url: '/legal/cgv', changeFrequency: 'yearly', priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(route => ({
    ...route,
    url: `${baseUrl}${route.url}`,
    lastModified: now,
  }));

  let posts: MetadataRoute.Sitemap = [];
  try {
    const publishedPosts = await prisma.post.findMany({
      where: { published: true, publishedAt: { not: null } },
      select: { slug: true, updatedAt: true, publishedAt: true },
      orderBy: { publishedAt: 'desc' },
    });

    posts = publishedPosts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.publishedAt ?? now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch {
    // Without a database the sitemap still serves every static route.
  }

  return [...staticEntries, ...posts];
}
