import { siteConfig } from '@/lib/metadata';

export function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteConfig.name,
        url: siteConfig.url,
        image: siteConfig.ogImage,
        sameAs: [
            siteConfig.links.linkedin,
            siteConfig.links.github,
            siteConfig.url,
        ],
        jobTitle: 'Développeur Full Stack & Expert Cloud',
        worksFor: {
            '@type': 'Organization',
            name: 'Eurin Hash',
        },
        description: siteConfig.description,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
