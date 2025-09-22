import { Metadata } from 'next'

export const siteConfig = {
  name: "Eurin Hash",
  title: "Eurin Hash - Développeur Full Stack & Expert Cloud",
  description: "Développeur passionné spécialisé dans les solutions web modernes, l'architecture cloud et l'expérience utilisateur. Création d'applications performantes et sécurisées.",
  url: "https://eurinhash.dev",
  ogImage: "https://eurinhash.dev/og-image.jpg",
  links: {
    email: "contact@eurinhash.com",
    linkedin: "https://linkedin.com/in/eurinalmeida",
    github: "https://github.com/digitaleflex",
  },
}

export function createMetadata(override: Partial<Metadata> = {}): Metadata {
  return {
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      "développeur web",
      "full stack",
      "cloud computing",
      "React",
      "Next.js",
      "TypeScript",
      "AWS",
      "architecture logicielle",
      "expérience utilisateur",
      "développement moderne"
    ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    openGraph: {
      type: "website",
      locale: "fr_FR",
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
      card: "summary_large_image",
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
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
    ...override,
  }
}