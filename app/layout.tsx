import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { createMetadata } from '@/lib/metadata';
import { Navigation } from '@/components/navigation';
import { Logo } from '@/components/logo';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { MobileMenu } from '@/components/mobile-menu';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['monospace'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  adjustFontFallback: true,
});

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        {/* Preload des polices critiques */}
        <link
          rel="preload"
          href="/_next/static/media/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/jetbrains-mono-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Preload de l'image LCP */}
        <link rel="preload" as="image" href="/eurin-photo.webp" />

        {/* Meta tags de performance */}
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />

        {/* DNS prefetch pour les domaines externes */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//vercel.com" />

        {/* Preconnect pour les ressources critiques */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
              {/* Desktop: Logo à gauche, Navigation à droite */}
              <div className="hidden md:flex items-center justify-between w-full">
                <Logo size="md" variant="default" />
                <div className="flex items-center gap-2 sm:gap-4">
                  <Navigation />
                  <div className="flex items-center gap-2 sm:gap-3">
                    <ThemeToggle />
                  </div>
                </div>
              </div>

              {/* Mobile: Logo à gauche, Toggle et Menu à droite */}
              <div className="md:hidden flex items-center justify-between w-full">
                <Logo size="md" variant="default" />
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <MobileMenu />
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
