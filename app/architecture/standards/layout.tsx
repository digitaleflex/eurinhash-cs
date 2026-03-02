import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Standards Techniques — EurinHash v1.0',
    description: 'Règles opérationnelles et standards techniques pour le déploiement de systèmes numériques.',
};

export default function StandardsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
