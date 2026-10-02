import type { Metadata } from 'next';
import { SITE_CONFIG } from './config';

export const siteConfig = {
  name: 'Eurin Hash',
  title: 'Eurin Hash — Software Architect · Digital Entrepreneur',
  description: 'Eurin Hash conçoit, construit et sécurise des systèmes numériques fiables à l’intersection de l’architecture logicielle, de l’IA appliquée et de la cybersécurité.',
  url: 'https://eurinhash.com',
  ogImage: 'https://eurinhash.com/og-image.jpg',
  links: {
    email: 'contact@eurinhash.com',
    linkedin: 'https://www.linkedin.com/in/eurindalemeida/',
    github: 'https://github.com/digitaleflex',
  },
};

export function createMetadata(override: Partial<Metadata> = {}): Metadata {
  return {
    title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
    description: siteConfig.description,
    keywords: ['software architecture', 'architecture logicielle', 'IA appliquée', 'cybersécurité', 'cloud', 'ingénierie produit'],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    openGraph: { type: 'website', locale: 'fr_FR', url: siteConfig.url, title: siteConfig.title, description: siteConfig.description, siteName: siteConfig.name, images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.title }] },
    twitter: { card: 'summary_large_image', title: siteConfig.title, description: siteConfig.description, images: [siteConfig.ogImage] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    verification: {
      google: SITE_CONFIG.seo.verification.google || undefined,
      yandex: SITE_CONFIG.seo.verification.yandex || undefined,
      other: {
        'msvalidate.01': [SITE_CONFIG.seo.verification.bing].filter((v): v is string => Boolean(v)),
        'baidu-site-verification': [SITE_CONFIG.seo.verification.baidu].filter((v): v is string => Boolean(v)),
        'norton-safeweb-site-verification': [SITE_CONFIG.seo.verification.norton].filter((v): v is string => Boolean(v)),
      },
    },
    alternates: { canonical: siteConfig.url },
    ...override,
  };
}
