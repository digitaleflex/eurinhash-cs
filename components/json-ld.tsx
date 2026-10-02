import type { Organization, WebSite, WithContext } from 'schema-dts';
import { siteConfig } from '@/lib/metadata';

export function JsonLd() {
  const organizationSchema: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
    description: siteConfig.description,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+229 01 62 26 52 46',
      contactType: 'customer service',
      availableLanguage: ['French', 'English'],
    },
  };

  const websiteSchema: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
