import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'EHAF — EurinHash Architectural Framework v1.0',
    description: 'Spécification fondatrice du cadre architectural EHAF. Standardisation, structuration et déploiement de systèmes numériques maîtrisés.',
    openGraph: {
        title: 'EHAF v1.0 — Core Specification',
        description: 'Cadre architectural reproductible pour systèmes numériques souverains.',
        url: 'https://eurinhash.com/architecture/ehaf',
        type: 'article',
    },
};

export default function EhafLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
