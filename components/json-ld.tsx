import { Organization, WithContext } from 'schema-dts';

export function JsonLd() {
  const organizationSchema: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Eurinhash',
    url: 'https://eurinhash.com',
    logo: 'https://eurinhash.com/logo.png',
    sameAs: [
      'https://linkedin.com/company/eurinhash',
      'https://github.com/eurinhash',
    ],
    description: 'Expertise en architecture logicielle, cloud et transformation digitale.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+229-01-51-07-05-55',
      contactType: 'customer service',
      availableLanguage: ['French', 'English'],
    },
  };

  const websiteSchema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Eurinhash',
    url: 'https://eurinhash.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://eurinhash.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
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
