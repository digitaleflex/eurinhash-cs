'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Briefcase, Zap, Newspaper, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSession } from '@/lib/auth-clients';

export function BottomNav() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  const navItems = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/realisations', label: 'Projets', icon: Briefcase },
    { href: '/services', label: 'Services', icon: Zap },
    { href: '/blog', label: 'Blog', icon: Newspaper },
    // Si connecté, on montre Profil, sinon Contact
    (!isPending && session) 
      ? { href: '/dashboard/profil', label: 'Profil', icon: User }
      : { href: '/contact', label: 'Contact', icon: MessageSquare },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-foreground/5 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-300 group"
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-500",
                isActive 
                  ? "bg-accent text-white scale-110 shadow-lg shadow-accent/25" 
                  : "text-muted-foreground group-hover:text-foreground group-hover:bg-foreground/5"
              )}>
                {/* On affiche l'image de l'utilisateur si c'est l'onglet Profil et qu'il y en a une */}
                {item.label === 'Profil' && session?.user?.image ? (
                  <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-white/20">
                    <img src={session.user.image} alt="Profil" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-300",
                isActive ? "text-accent opacity-100" : "text-muted-foreground opacity-70 group-hover:opacity-100"
              )}>
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-1 bg-accent rounded-b-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
