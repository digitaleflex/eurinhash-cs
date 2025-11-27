import { Metadata, Viewport } from 'next'

export const siteConfig = {
  name: "Eurin Hash",
  title: "Eurin Hash - Développeur Full Stack & Spécialiste Cloud",
  description: "Consultant IT et entrepreneur numérique spécialisé dans les solutions cloud et web. Création d'applications performantes, sécurisées et sur mesure au Bénin et en Afrique.",
  url: "https://eurinhash.com",
  ogImage: "https://eurinhash.com/og-image.jpg",
  locale: "fr_FR",
  links: {
    email: "contact@eurinhash.com",
    linkedin: "https://linkedin.com/in/eurinalmeida",
    github: "https://github.com/digitaleflex",
    whatsapp: "+22901622652",
  },
  author: {
    name: "Eurin Hash",
    jobTitle: "Consultant IT & Entrepreneur Numérique",
    company: "E-FLEX",
  },
} as const

// Viewport configuration (separate from metadata in Next.js 14+)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

// JSON-LD structured data for SEO
export function generatePersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.jobTitle,
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.author.company,
    },
    url: siteConfig.url,
    email: siteConfig.links.email,
    sameAs: [
      siteConfig.links.linkedin,
      siteConfig.links.github,
    ],
    knowsAbout: [
      'Web Development',
      'Cloud Computing',
      'DevOps',
      'Next.js',
      'React',
      'TypeScript',
      'Docker',
      'Infrastructure',
    ],
  }
}

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    inLanguage: 'fr-FR',
  }
}

export function createMetadata(override: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      "développeur web",
      "full stack",
      "cloud computing",
      "consultant IT",
      "React",
      "Next.js",
      "TypeScript",
      "Docker",
      "DevOps",
      "architecture logicielle",
      "expérience utilisateur",
      "développement moderne",
      "Bénin",
      "Afrique",
      "E-FLEX",
      "formation IT",
      "infrastructure cloud",
    ],
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.company,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: siteConfig.url,
      languages: {
        'fr-FR': siteConfig.url,
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
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
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: "@eurinhash",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
    category: 'technology',
    ...override,
  }
}

// Helper function to create page-specific metadata
export function createPageMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image || siteConfig.ogImage

  return createMetadata({
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  })
}