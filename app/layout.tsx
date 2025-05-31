import { Orbitron, Inter } from 'next/font/google';
import './globals.css'
import type { Metadata } from 'next'
import Navigation from './components/Navigation';
import Footer from './components/Footer';

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
      <body className={`${inter.variable} ${orbitron.variable} font-sans`}>
        <Navigation />
        <div className="pt-20 min-h-screen flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
