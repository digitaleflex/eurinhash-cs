import { siteConfig } from '@/lib/metadata';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@eurinhash.com';

export function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Eurin Hash',
        url: 'https://eurinhash.com',
        image: 'https://eurinhash.com/eurin-photo.webp',
        sameAs: [
            'https://linkedin.com/in/eurinalmeida',
            'https://github.com/digitaleflex',
            'https://eurinhash.com'
        ],
        jobTitle: 'Consultant IT & Entrepreneur Numérique',
        worksFor: {
            '@type': 'Organization',
            name: 'E-FLEX',
            url: 'https://eurinhash.com'
        },
        description: 'Développeur Full Stack et Expert Cloud. Je crée des solutions sur mesure pour transformer vos défis techniques en résultats concrets.',
        knowsAbout: [
            'Cloud Computing',
            'Web Development',
            'DevOps',
            'React',
            'Next.js',
            'TypeScript',
            'AWS',
            'Docker'
        ],
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'BJ',
            addressLocality: 'Cotonou'
        },
        contactPoint: {
            '@type': 'ContactPoint',
            email: CONTACT_EMAIL,
            contactType: 'customer service',
            availableLanguage: ['French', 'English']
        },
        founder: {
            '@type': 'Organization',
            name: 'E-FLEX'
        },
        areaServed: {
            '@type': 'Place',
            name: 'Afrique de l\'Ouest, Europe, Monde'
        },
        serviceType: [
            'Développement Web',
            'Conseil Cloud',
            'Formation Technique'
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
