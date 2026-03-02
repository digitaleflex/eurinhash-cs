'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileMenu } from './MobileMenuProvider';

const navigationItems = [
  { href: '/vision', label: 'Doctrine', description: 'Manifeste & Stratégie' },
  { href: '/initiatives', label: 'Initiatives', description: 'Piliers & Déploiements' },
  { href: '/skills', label: 'Expertise', description: 'Capacités techniques' },
  { href: '/about', label: 'Auteur', description: 'Parcours structurel' },
];

export function MobileMenuContent() {
  const { isOpen, closeMenu } = useMobileMenu();
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-0 top-0 h-full w-full sm:w-96 z-50 bg-background border-l border-foreground/10 shadow-none"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          <div className="flex flex-col h-full uppercase">
            {/* Header du menu */}
            <div className="flex items-center justify-between p-8 border-b border-foreground/5 bg-foreground/[0.02]">
              <div className="flex flex-col">
                <h2 className="text-xl font-black tracking-tighter text-foreground">Système</h2>
                <span className="font-mono text-[9px] text-accent tracking-[.3em] font-black uppercase">Navigation Menu</span>
              </div>
              <button
                onClick={closeMenu}
                className="p-4 bg-foreground text-background transition-colors hover:bg-accent hover:text-white"
                aria-label="Fermer le menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-8 space-y-4 bg-background" role="navigation" aria-label="Navigation mobile">
              {navigationItems.map((item, index) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={cn(
                        'group flex flex-col gap-1 p-6 transition-all duration-300 border border-transparent',
                        isActive
                          ? 'bg-foreground/5 border-l-4 border-accent pl-10'
                          : 'hover:bg-foreground/[0.03] hover:border-foreground/5'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className={cn(
                        "text-2xl font-black tracking-tighter transition-colors",
                        isActive ? "text-accent" : "text-foreground group-hover:text-foreground"
                      )}>
                        {item.label}
                      </span>
                      <span className="font-mono text-[9px] text-muted-foreground tracking-[.2em] font-bold">
                        {item.description}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* CTA en bas du menu */}
            <div className="p-8 border-t border-foreground/5 bg-foreground/[0.01]">
              <Link
                href="/start-project"
                onClick={closeMenu}
                className="flex items-center justify-center gap-4 w-full bg-foreground text-background px-8 py-8 text-xs font-black uppercase tracking-[.4em] transition-all duration-500 hover:bg-accent hover:text-white"
                aria-label="Démarrer un projet"
              >
                <span>Initialiser Collaboration</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
