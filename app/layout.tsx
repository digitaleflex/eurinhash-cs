import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { createMetadata, viewport as viewportConfig, generatePersonJsonLd, generateWebsiteJsonLd } from "@/lib/metadata";
import { Navigation } from "@/components/navigation";
import { Logo } from "@/components/logo";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload primary font
});

export const metadata: Metadata = createMetadata();
export const viewport = viewportConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePersonJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteJsonLd()),
          }}
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
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md"
          >
            Aller au contenu principal
          </a>
          
          <header
            className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            role="banner"
          >
            <div className="mx-auto w-full max-w-6xl px-6 py-4 flex items-center justify-between">
              <Logo />
              <div className="flex items-center gap-4">
                <Navigation />
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <MobileNav />
                </div>
              </div>
            </div>
          </header>
          
          <main id="main-content" className="flex-1" role="main">
            {children}
          </main>
          
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
