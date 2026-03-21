'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileMenu } from './MobileMenuProvider';

const navigationItems = [
  { href: '/', label: 'Accueil', description: 'Valeur & Introduction' },
  { href: '/realisations', label: 'Réalisations', description: 'Études de cas & Impact' },
  { 
    href: '/services', 
    label: 'Services', 
    description: 'Expertise & Accompagnement',
    children: [
      { href: '/services/audit', label: 'Audit de Résilience' },
      { href: '/services/architecture', label: 'Architecture de Système' },
      { href: '/services/cto', label: 'Accompagnement CTO' },
    ]
  },
  { href: '/contact', label: 'Contact', description: 'Interaction directe' },
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
          <div className="flex flex-col h-full">
            {/* Header du menu */}
            <div className="flex items-center justify-between p-8 border-b border-foreground/5 bg-foreground/[0.02]">
              <div className="flex flex-col">
                <h2 className="text-lg font-bold tracking-tight text-foreground">Navigation</h2>
                <span className="font-mono text-[10px] text-muted-foreground tracking-tight">Eurin Hash CS</span>
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
            <nav className="flex-1 p-8 space-y-4 bg-background overflow-y-auto" role="navigation" aria-label="Navigation mobile">
              {navigationItems.map((item, index) => {
                const isActive = pathname && (pathname === item.href || pathname.startsWith(item.href + '/'));
                const hasChildren = 'children' in item && item.children;

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="space-y-2"
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

                    {/* Sub-links (Simple list for now, as requested "accordéon simple" - can be styled as sub-items) */}
                    {hasChildren && (
                      <div className="pl-10 space-y-2 pb-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeMenu}
                            className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                          >
                            <span className="w-1.5 h-1.5 bg-accent/20 rounded-full" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* CTA en bas du menu */}
            <div className="p-8 border-t border-foreground/5">
              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex items-center justify-center gap-3 w-full bg-accent text-white px-6 py-4 text-sm font-semibold tracking-tight transition-all duration-300 hover:bg-foreground"
                aria-label="Réserver un audit"
              >
                <span>Réserver un audit</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
