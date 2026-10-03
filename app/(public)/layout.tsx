import type { ReactNode } from 'react';
import { Logo } from '@/components/logo';
import { NavigationWithDropdown } from '@/components/navigation-with-dropdown';
import { MobileMenu } from '@/components/mobile-menu/MobileMenu';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { Footer } from '@/components/footer';
import { ThemeToggle } from '@/components/theme-toggle';

/**
 * Chrome du site public. Il vit dans un groupe de routes pour que /admin et
 * /dashboard n'aient plus la navigation publique dans leur graphe client :
 * ConditionalWrapper ne faisait que la masquer à l'exécution, le JS était déjà
 * téléchargé sur ces 16 routes.
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
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
      <div className="flex-1 pb-safe-16 lg:pb-0">{children}</div>
      <BottomNav />
      <Footer />
    </>
  );
}
