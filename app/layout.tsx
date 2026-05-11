import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { createMetadata } from '@/lib/metadata';
import { SITE_CONFIG } from '@/lib/config';
import { NavigationWithDropdown } from '@/components/navigation-with-dropdown';
import { Logo } from '@/components/logo';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { JsonLd } from '@/components/json-ld';
import { ConditionalWrapper } from '@/components/layout-wrapper';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { MobileMenu } from '@/components/mobile-menu/MobileMenu';
import NextTopLoader from 'nextjs-toploader';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Eurin Hash',
    template: '%s | Eurin Hash',
  },
  description:
    "Portfolio professionnel d'Eurin Hash - Développeur Full Stack & Expert Cloud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Icon_Logo_claire.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />

        <link rel="dns-prefetch" href="//vercel.com" />

        <meta name="author" content={SITE_CONFIG.seo.author} />
        <meta name="robots" content={SITE_CONFIG.seo.robots} />
        <meta name="revisit-after" content={SITE_CONFIG.seo.revisitAfter} />

        {SITE_CONFIG.seo.verification.bing && (
          <meta
            name="msvalidate.01"
            content={SITE_CONFIG.seo.verification.bing}
          />
        )}
        {SITE_CONFIG.seo.verification.baidu && (
          <meta
            name="baidu-site-verification"
            content={SITE_CONFIG.seo.verification.baidu}
          />
        )}
        {SITE_CONFIG.seo.verification.norton && (
          <meta
            name="norton-safeweb-site-verification"
            content={SITE_CONFIG.seo.verification.norton}
          />
        )}
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
          <NextTopLoader
            color="#e11d48"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #e11d48,0 0 5px #e11d48"
          />
          <ConditionalWrapper excludePaths={['/admin', '/dashboard']}>
            <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
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
          <main className="flex-1 pb-16 lg:pb-0">{children}</main>
          <ConditionalWrapper excludePaths={['/admin', '/dashboard']}>
            <BottomNav />
            <Footer />
          </ConditionalWrapper>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <JsonLd />
      </body>
    </html>
  );
}
