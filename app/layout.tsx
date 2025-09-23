import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { createMetadata } from "@/lib/metadata";
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col overflow-x-hidden`}
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
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
