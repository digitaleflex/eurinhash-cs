import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { createMetadata } from '@/lib/metadata';
import { ThemeProvider } from '@/components/theme-provider';
import { MotionProvider } from '@/components/motion-provider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { JsonLd } from '@/components/json-ld';
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
          <div className="flex-1">{children}</div>
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <JsonLd />
      </body>
    </html>
  );
}
