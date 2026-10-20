import { Person, WebSite, WithContext } from 'schema-dts';
import { siteConfig } from '@/lib/metadata';

/**
 * Données structurées limitées à ce que le site affiche réellement :
 * identité personnelle, coordonnées publiques et profils liés depuis le
 * footer / la page contact. Aucune organisation, aucun profil ni aucun
 * numéro qui ne soit visible sur le site.
 */
export function JsonLd() {
  const personId = `${siteConfig.url}/#person`;

  const personSchema: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@id': personId,
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    jobTitle: 'Architecte logiciel et entrepreneur numérique',
    description: siteConfig.description,
    email: `mailto:${siteConfig.links.email}`,
    telephone: '+2290162265246',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abomey-Calavi',
      addressCountry: 'BJ',
    },
    sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
  };

  const websiteSchema: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'fr-FR',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
