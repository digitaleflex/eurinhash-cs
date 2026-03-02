import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Initiative — FlexHOST v1.0',
    description: 'Spécification technique de l\'infrastructure cloud hybride et souveraine FlexHOST.',
};

export default function FlexhostLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
