import { Orbitron, Inter } from 'next/font/google';
import './globals.css'
import type { Metadata } from 'next'

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'EurinHash - Hub Central de l\'Innovation Digitale',
  description: 'Cybersécurité, Cloud, IA, Formation, Architecture de solutions... Tout ce qui va transformer votre univers numérique.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${orbitron.variable} font-sans`}>{children}</body>
    </html>
  )
}
