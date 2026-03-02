import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Doctrine Architecturale — EurinHash v1.0',
    description: 'Les principes idéologiques et techniques qui dirigent la conception des systèmes EurinHash.',
};

export default function DoctrineLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
