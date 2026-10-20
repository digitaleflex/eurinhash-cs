'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X, ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileMenu } from './MobileMenuProvider';

type NavChild = {
  href: string;
  label: string;
  description?: string;
};

type NavItem = {
  href: string;
  label: string;
  description?: string;
  children?: NavChild[];
};

const navigationItems: NavItem[] = [
  { href: '/', label: 'Accueil', description: 'Découvrir mon travail' },
  { href: '/a-propos', label: 'À propos', description: 'Mon parcours et ma façon de travailler' },
  { href: '/realisations', label: 'Projets', description: 'Ce que j’ai conçu et réalisé' },
  {
    href: '/services',
    label: 'Services',
    description: 'Comment je peux vous aider',
    children: [
      { href: '/services/audit', label: 'Faire le point sur un système', description: 'Comprendre les problèmes et les priorités' },
      { href: '/services/architecture', label: 'Concevoir un projet numérique', description: 'Préparer une base solide pour votre projet' },
      { href: '/services/cto', label: 'Conseil technique', description: 'Prendre les bonnes décisions techniques' },
      { href: '/services/mentorat', label: 'Mentorat', description: 'Progresser avec un accompagnement individuel' },
    ],
  },
  { href: '/blog', label: 'Articles', description: 'Mes idées, analyses et retours d’expérience' },
];

export function MobileMenuContent() {
  const { isOpen, closeMenu } = useMobileMenu();
  const pathname = usePathname();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (href: string) => {
    setOpenAccordion(openAccordion === href ? null : href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-0 top-0 z-[70] h-full w-full border-l border-foreground/10 bg-background shadow-2xl sm:w-[400px]"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          <div className="flex h-full flex-col overflow-hidden bg-background">
            <div className="flex items-center justify-between border-b border-foreground/5 p-6 sm:p-8">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-foreground">Menu</h2>
                <span className="mt-1 text-xs text-muted-foreground">EURINHASH · Site personnel</span>
              </div>
              <button
                type="button"
                onClick={closeMenu}
                className="rounded-full bg-foreground p-3 text-background transition-colors hover:bg-accent hover:text-white"
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto p-4 sm:p-6" aria-label="Navigation mobile">
              {navigationItems.map((item, index) => {
                const isActive = Boolean(pathname && (
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'))
                ));
                const hasChildren = Boolean(item.children?.length);
                const isAccordionOpen = openAccordion === item.href;

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                  >
                    {hasChildren ? (
                      <div className="overflow-hidden border border-foreground/10">
                        <button
                          type="button"
                          onClick={() => toggleAccordion(item.href)}
                          className={cn(
                            'flex w-full items-center justify-between gap-4 p-4 text-left',
                            isActive ? 'bg-accent/5' : 'hover:bg-foreground/[0.03]'
                          )}
                          aria-expanded={isAccordionOpen}
                        >
                          <span className="flex flex-col gap-1">
                            <span className={cn('text-base font-semibold', isActive ? 'text-accent' : 'text-foreground')}>
                              {item.label}
                            </span>
                            {item.description && <span className="text-sm text-muted-foreground">{item.description}</span>}
                          </span>
                          <ChevronDown className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', isAccordionOpen && 'rotate-180')} />
                        </button>
                        <AnimatePresence>
                          {isAccordionOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-1 border-t border-foreground/10 p-2">
                                {item.children?.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={closeMenu}
                                    className={cn(
                                      'flex flex-col gap-1 p-3 text-sm',
                                      pathname === child.href
                                        ? 'bg-accent/10 text-accent'
                                        : 'text-muted-foreground hover:bg-foreground/[0.03] hover:text-foreground'
                                    )}
                                  >
                                    <span className="font-medium">{child.label}</span>
                                    {child.description && <span className="text-xs text-muted-foreground">{child.description}</span>}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={cn(
                          'flex flex-col gap-1 border p-4 transition-colors',
                          isActive
                            ? 'border-accent/20 bg-accent/5'
                            : 'border-foreground/10 hover:bg-foreground/[0.03]'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className={cn('text-base font-semibold', isActive ? 'text-accent' : 'text-foreground')}>
                          {item.label}
                        </span>
                        {item.description && <span className="text-sm text-muted-foreground">{item.description}</span>}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            <div className="space-y-2 border-t border-foreground/10 p-4 sm:p-6">
              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex w-full items-center justify-center gap-2 bg-accent px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
              >
                Parlons de votre projet
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
