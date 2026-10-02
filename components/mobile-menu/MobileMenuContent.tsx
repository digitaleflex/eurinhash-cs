'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X, ArrowRight, ChevronDown, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileMenu } from './MobileMenuProvider';
import { useSession } from '@/lib/auth-clients';

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
  { href: '/', label: 'Accueil', description: 'Valeur & Introduction' },
  { href: '/realisations', label: 'Réalisations', description: 'Études de cas & Impact' },
  {
    href: '/services',
    label: 'Services',
    description: 'Expertise & Accompagnement',
    children: [
      { href: '/services/audit', label: 'Audit de Résilience', description: 'Audit technique' },
      { href: '/services/architecture', label: 'Architecture de Système', description: 'Architecture applicative' },
      { href: '/services/cto', label: 'Accompagnement CTO', description: 'Suivi stratégique long terme' },
      { href: '/services/mentorat', label: 'Programme de Mentorat', description: 'Mentorat pratique' },
    ]
  },
  { href: '/evenements', label: 'Événements', description: 'Lives & Conférences' },
  { href: '/blog', label: 'Blog', description: 'Veille & Analyses' },
  { href: '/ressources', label: 'Ressources', description: 'Guides & eBooks' },
  { href: '/contact', label: 'Contact', description: 'Interaction directe' },
];

export function MobileMenuContent() {
  const { isOpen, closeMenu } = useMobileMenu();
  const pathname = usePathname();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { data: session, isPending } = useSession();

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
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-0 top-0 h-full w-full sm:w-[400px] z-[70] bg-background border-l border-foreground/10 shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          <div className="flex flex-col h-full bg-background overflow-hidden">
            {/* Header du menu */}
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-foreground/5 bg-foreground/[0.02]">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold tracking-tight text-foreground">Navigation</h2>
                <span className="font-mono text-[10px] text-accent tracking-[.2em] uppercase font-bold">Eurin Hash CS</span>
              </div>
              <button
                onClick={closeMenu}
                className="group relative p-3 bg-foreground text-background transition-all duration-300 hover:bg-accent hover:text-white rounded-full"
                aria-label="Fermer le menu"
              >
                <X className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 sm:p-6 space-y-3 overflow-y-auto custom-scrollbar" role="navigation" aria-label="Navigation mobile">
              {!isPending && !session && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <Link
                    href="/sign-in"
                    onClick={closeMenu}
                    className="flex items-center justify-between w-full bg-accent text-white p-5 rounded-xl shadow-lg shadow-accent/20 group"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-lg font-black tracking-tight">Se connecter</span>
                      <span className="text-[10px] opacity-80 font-bold uppercase tracking-widest">Accéder à votre espace</span>
                    </div>
                    <User className="w-6 h-6 transition-transform group-hover:scale-110" />
                  </Link>
                </motion.div>
              )}

              {navigationItems.map((item, index) => {
                const isActive = pathname && (pathname === item.href || pathname.startsWith(item.href + '/'));
                const hasChildren = item.children && item.children.length > 0;
                const isAccordionOpen = openAccordion === item.href;

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {hasChildren ? (
                      /* Accordion Item */
                      <div className="border border-foreground/5 bg-foreground/[0.01] rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleAccordion(item.href)}
                          className={cn(
                            'group w-full flex flex-col gap-1 p-5 transition-all duration-300',
                            isActive
                              ? 'bg-accent/5'
                              : 'hover:bg-foreground/[0.03]'
                          )}
                          aria-expanded={isAccordionOpen}
                        >
                          <div className="flex items-center justify-between">
                            <span className={cn(
                              "text-xl font-black tracking-tighter transition-colors",
                              isActive ? "text-accent" : "text-foreground"
                            )}>
                              {item.label}
                            </span>
                            <ChevronDown
                              className={cn(
                                "w-5 h-5 text-muted-foreground transition-transform duration-500",
                                isAccordionOpen && "rotate-180 text-accent"
                              )}
                            />
                          </div>
                          <span className="font-mono text-[9px] text-muted-foreground tracking-[.2em] font-bold">
                            {item.description}
                          </span>
                        </button>

                        {/* Accordion Content */}
                        <AnimatePresence>
                          {isAccordionOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "circOut" }}
                              className="overflow-hidden bg-foreground/[0.02]"
                            >
                              <div className="p-3 space-y-1">
                                {item.children?.map((child) => {
                                  const isChildActive = pathname === child.href;
                                  return (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={closeMenu}
                                      className={cn(
                                        "flex flex-col gap-1 p-4 rounded-md transition-all duration-200 border border-transparent",
                                        isChildActive
                                          ? "bg-accent/10 border-accent/20 text-accent"
                                          : "text-muted-foreground hover:bg-foreground/[0.03] hover:text-foreground"
                                      )}
                                    >
                                      <span className="text-sm font-bold">{child.label}</span>
                                      {child.description && (
                                        <span className="text-[10px] text-muted-foreground/70">
                                          {child.description}
                                        </span>
                                      )}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      /* Simple Link */
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={cn(
                          'group flex flex-col gap-1 p-5 transition-all duration-300 border rounded-lg',
                          isActive
                            ? 'bg-accent/5 border-accent/20 border-l-4 border-l-accent pl-7'
                            : 'bg-foreground/[0.01] border-foreground/5 hover:bg-foreground/[0.03] hover:border-foreground/10'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className={cn(
                          "text-xl font-black tracking-tighter transition-colors",
                          isActive ? "text-accent" : "text-foreground group-hover:text-accent"
                        )}>
                          {item.label}
                        </span>
                        <span className="font-mono text-[9px] text-muted-foreground tracking-[.2em] font-bold uppercase">
                          {item.description}
                        </span>
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* CTA / Auth en bas du menu */}
            <div className="p-6 border-t border-foreground/5 bg-foreground/[0.01] space-y-3">
              {!isPending && session && (
                <Link
                  href="/dashboard/profil"
                  onClick={closeMenu}
                  className="flex items-center justify-between w-full bg-background border border-foreground/10 px-6 py-5 text-sm font-bold uppercase tracking-widest transition-all hover:bg-foreground/5 hover:border-accent group"
                >
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-accent" />
                    <span className="text-foreground">{session.user?.name || 'Mon Compte'}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex items-center justify-center gap-3 w-full bg-foreground text-background px-6 py-5 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-accent hover:text-white"
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
