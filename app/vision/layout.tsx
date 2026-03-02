import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Vision - Eurin Hash | Architecte d\'écosystèmes numériques souverains',
    description: 'Ma vision : créer une technologie accessible, souveraine et conçue pour durer. Je milite pour un numérique responsable et une Afrique leader dans la tech.',
    openGraph: {
        title: 'Vision - Eurin Hash | Architecte d\'écosystèmes numériques',
        description: 'Ma vision pour un numérique responsable et souverain en Afrique.',
        url: 'https://eurinhash.com/vision',
        type: 'website',
    },
};

export default function VisionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
