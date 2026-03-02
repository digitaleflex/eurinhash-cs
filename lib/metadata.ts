import { Metadata } from 'next';
import { SITE_CONFIG } from './config';

export const siteConfig = {
  name: 'Eurin Hash',
  title: 'Eurin Hash - Développeur Full Stack & Spécialiste Cloud',
  description:
    "Développeur passionné spécialisé dans les solutions web modernes, l'architecture cloud et l'expérience utilisateur. Création d'applications performantes et sécurisées.",
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
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      'développeur web',
      'full stack',
      'cloud computing',
      'React',
      'Next.js',
      'TypeScript',
      'AWS',
      'architecture logicielle',
      'expérience utilisateur',
      'développement moderne',
    ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: siteConfig.url,
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.title,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // Balises de vérification pour les moteurs de recherche
    // Configuration centralisée dans SITE_CONFIG.seo.verification
    verification: {
      google: SITE_CONFIG.seo.verification.google || undefined,
      yandex: SITE_CONFIG.seo.verification.yandex || undefined,
      other: {
        'msvalidate.01': [SITE_CONFIG.seo.verification.bing].filter(Boolean) as string[],
        'baidu-site-verification': [SITE_CONFIG.seo.verification.baidu].filter(Boolean) as string[],
        'norton-safeweb-site-verification': [SITE_CONFIG.seo.verification.norton].filter(Boolean) as string[],
      },
    },
    // Canonical URL pour éviter le duplicate content
    alternates: {
      canonical: siteConfig.url,
      languages: {
        'fr': siteConfig.url,
        'en': `${siteConfig.url}/en`,
      },
    },
    ...override,
  };
}
