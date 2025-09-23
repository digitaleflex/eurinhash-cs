/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { createMetadata } from "@/lib/metadata";
import { Navigation } from "@/components/navigation";
import { Logo } from "@/components/logo";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
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
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-border">
            <div className="mx-auto w-full max-w-6xl px-6 py-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <Logo size="sm" />
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
                  <a href="mailto:contact@eurinhash.com" className="hover:text-foreground transition-colors min-h-[44px] flex items-center">
                    contact@eurinhash.com
                  </a>
                  <a href="https://linkedin.com/in/eurinalmeida" className="hover:text-foreground transition-colors min-h-[44px] flex items-center" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                  <a href="https://github.com/digitaleflex" className="hover:text-foreground transition-colors min-h-[44px] flex items-center" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>
                <div className="text-sm text-muted-foreground text-center md:text-left">
                  ©2025 Eurin Hash. Tous droits réservés.
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
