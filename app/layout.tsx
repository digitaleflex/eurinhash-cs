import { Orbitron, Inter } from 'next/font/google';
import './globals.css'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navigation from './components/Navigation';
import IntelligentPrefetch from './components/IntelligentPrefetch';

// Lazy load Footer since it's below the fold
const Footer = dynamic(() => import('./components/Footer'), {
  loading: () => (
    <footer className="bg-[#0A0F2C] py-8">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-48 mx-auto"></div>
        </div>
      </div>
    </footer>
  ),
  ssr: false
});

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
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.linkedin.com" />
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//wa.me" />
        <link rel="dns-prefetch" href="//www.facebook.com" />
        
        {/* Viewport meta for mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className={`${inter.variable} ${orbitron.variable} font-sans`}>
        <Navigation />
        <div className="pt-20 min-h-screen flex flex-col">
          <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0] flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#007CF0]"></div>
            </div>
          }>
            {children}
          </Suspense>
        </div>
        
        {/* Intelligent prefetching for route optimization */}
        <IntelligentPrefetch 
          routes={['/entreprise', '/formation', '/particuliers']}
          delay={1000}
          onHover={true}
          onVisible={true}
        />
        
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  )
}
