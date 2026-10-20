import type { Metadata } from 'next';
import { SITE_CONFIG } from './config';

export const siteConfig = {
  name: 'Eurin Hash',
  title: 'Eurin Hash — Software Architect · Digital Entrepreneur',
  description: 'Eurin Hash conçoit, construit et sécurise des systèmes numériques fiables à l’intersection de l’architecture logicielle, de l’IA appliquée et de la cybersécurité.',
  url: SITE_CONFIG.url,
  ogImage: '/eurin-photo.webp',
  ogImageWidth: 3840,
  ogImageHeight: 2280,
  links: {
    email: 'contact@eurinhash.com',
    linkedin: 'https://www.linkedin.com/in/eurindalemeida/',
    github: 'https://github.com/digitaleflex',
  },
};

type SocialImage = {
  url: string;
  /** Dimensions réelles de l'image, omises si elles ne sont pas connues. */
  width?: number;
  height?: number;
  alt: string;
};

const defaultSocialImage: SocialImage = {
  url: siteConfig.ogImage,
  width: siteConfig.ogImageWidth,
  height: siteConfig.ogImageHeight,
  alt: 'Eurin Hash',
};

export type PageMetadataOptions = {
  title: string;
  description: string;
  /** Chemin canonique de la page, par exemple `/services/audit`. */
  path: string;
  type?: 'website' | 'article';
  image?: SocialImage;
  /** Date ISO du contenu pour Open Graph / JSON-LD. */
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

function absoluteImage(image: SocialImage): SocialImage {
  return {
    ...image,
    url: /^https?:\/\//i.test(image.url) ? image.url : absoluteUrl(image.url),
  };
}

/**
 * Métadonnées du layout racine. Aucun canonical n'est défini ici : un
 * canonical global serait hérité par toutes les pages et les déclarerait
 * toutes comme des doublons de la page d'accueil.
 */
export function createMetadata(override: Partial<Metadata> = {}): Metadata {
  const base: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
    description: siteConfig.description,
    keywords: ['software architecture', 'architecture logicielle', 'IA appliquée', 'cybersécurité', 'cloud', 'ingénierie produit'],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: siteConfig.url,
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [absoluteImage(defaultSocialImage)],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.title,
      description: siteConfig.description,
      images: [absoluteImage(defaultSocialImage).url],
    },
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
  };

  const baseRobots = typeof base.robots === 'object' && base.robots ? base.robots : {};
  const overrideRobots = typeof override.robots === 'object' && override.robots ? override.robots : {};

  return {
    ...base,
    ...override,
    openGraph: { ...base.openGraph, ...override.openGraph },
    twitter: { ...base.twitter, ...override.twitter },
    alternates: { ...base.alternates, ...override.alternates },
    robots: { ...baseRobots, ...overrideRobots },
  };
}

/**
 * Métadonnées complètes et autonomes pour une page publique : canonical
 * absolu, Open Graph et Twitter card alignés sur le contenu de la page.
 */
export function createPageMetadata({
  title,
  description,
  path,
  type = 'website',
  image,
  publishedTime,
  modifiedTime,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const socialImage = absoluteImage(image ?? defaultSocialImage);
  const commonOpenGraph = {
    locale: 'fr_FR',
    url: canonical,
    title,
    description,
    siteName: siteConfig.name,
    images: [socialImage],
  };

  return {
    title,
    description,
    alternates: { canonical },
    openGraph:
      type === 'article'
        ? { type: 'article', ...commonOpenGraph, publishedTime, modifiedTime }
        : { type: 'website', ...commonOpenGraph },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImage.url],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
