import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { createMetadata } from '@/lib/metadata';
import { NavigationWithDropdown } from '@/components/navigation-with-dropdown';
import { Logo } from '@/components/logo';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { MotionProvider } from '@/components/motion-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { JsonLd } from '@/components/json-ld';
import { ConditionalWrapper } from '@/components/layout-wrapper';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { MobileMenu } from '@/components/mobile-menu/MobileMenu';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

export const metadata: Metadata = createMetadata();

// Nécessaire pour que env(safe-area-inset-*) vaille autre chose que 0 sur iOS.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <link rel="icon" href="/Icon_Logo_claire.svg" type="image/svg+xml" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col overflow-x-hidden font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>
          <NextTopLoader
            color="#e11d48"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #e11d48,0 0 5px #e11d48"
          />
          <ConditionalWrapper excludePaths={['/admin', '/dashboard']}>
            <header className="border-b border-border sticky top-0 z-50 pt-safe bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
              <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12 py-3 sm:py-4 flex items-center justify-between">
                <div className="hidden lg:flex items-center justify-between w-full">
                  <Logo size="md" variant="default" />
                  <div className="flex items-center gap-2 sm:gap-4">
                    <NavigationWithDropdown />
                    <div className="flex items-center gap-2 sm:gap-3">
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
                <div className="lg:hidden flex items-center justify-between w-full">
                  <Logo size="md" variant="default" />
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <MobileMenu />
                  </div>
                </div>
              </div>
            </header>
          </ConditionalWrapper>
          <div className="flex-1 pb-safe-16 lg:pb-0">{children}</div>
          <ConditionalWrapper excludePaths={['/admin', '/dashboard']}>
            <BottomNav />
            <Footer />
          </ConditionalWrapper>
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <JsonLd />
      </body>
    </html>
  );
}
