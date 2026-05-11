'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Briefcase, Zap, Newspaper, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/realisations', label: 'Projets', icon: Briefcase },
  { href: '/services', label: 'Services', icon: Zap },
  { href: '/blog', label: 'Blog', icon: Newspaper },
  { href: '/contact', label: 'Contact', icon: MessageSquare },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-foreground/5 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors group"
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-all duration-300",
                isActive ? "bg-accent text-white scale-110 shadow-lg shadow-accent/20" : "text-muted-foreground group-hover:text-foreground"
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-tighter transition-colors",
                isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground"
              )}>
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
