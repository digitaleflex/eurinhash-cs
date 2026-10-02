'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { signOut, useSession } from '@/lib/auth-clients';
import {
  User,
  Mail,
  LogOut,
  LayoutDashboard,
  ChevronRight,
  Loader2,
  ShieldCheck,
  MessageSquare,
  Fingerprint,
  LayoutGrid,
  Globe,
} from 'lucide-react';
import { spring } from '@/lib/motion';


const navItems = [
  {
    title: 'Tableau de bord',
    href: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
  },
  {
    title: 'Profil',
    href: '/dashboard/profil',
    icon: Fingerprint,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav aria-label="Navigation tableau de bord mobile" className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm pb-safe">
        <div className="flex items-center justify-around p-2 bg-background/60 backdrop-blur-xl border border-foreground/10 rounded-full shadow-2xl">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 p-3 rounded-full transition-all duration-300 relative',
                  isActive ? 'text-accent' : 'text-muted-foreground'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-accent/10 rounded-full -z-10"
                    transition={spring.snappy}
                  />
                )}
                <Icon className={cn("w-5 h-5", isActive && "animate-in zoom-in-75")} />
                <span className="text-[9px] font-black uppercase">{item.title}</span>
              </Link>
            );
          })}
          
          {/* Mobile Admin Icon if applicable */}
          {(session?.user as { role?: string } | undefined)?.role === 'admin' && (
            <Link
              href="/admin"
              className={cn(
                'flex flex-col items-center justify-center gap-1 p-3 rounded-full transition-all duration-300',
                pathname?.startsWith('/admin') ? 'text-accent' : 'text-muted-foreground'
              )}
            >
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[9px] font-black uppercase">Admin</span>
            </Link>
          )}

          {/* Quick Return */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-1 p-3 text-muted-foreground"
          >
            <Globe className="w-5 h-5" />
            <span className="text-[9px] font-black uppercase">Site</span>
          </Link>
        </div>
      </nav>

      {/* Sidebar (Desktop Only) */}
      <aside
        className={cn(
          'hidden lg:flex fixed lg:sticky top-0 left-0 z-40 h-dvh w-64 bg-background border-r border-border',
          'flex-col'
        )}
      >
        <div className="flex flex-col h-full bg-background pt-8">

          {/* Navigation */}
          <nav aria-label="Navigation tableau de bord" className="flex-1 px-3 space-y-1">
            <div className="px-4 pb-6">
               <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  <span className="text-[10px] font-black text-foreground uppercase">Centre de Contrôle</span>
               </div>
               <div className="h-px w-full bg-foreground/5" />
            </div>
            
            {navItems.map(item => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-4 px-4 py-3 rounded-none text-xs font-black uppercase transition-all duration-200 group relative',
                    isActive
                      ? 'text-accent'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive && "text-accent")} />
                  <span>{item.title}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="sidebarActive"
                      className="absolute right-0 w-1 h-6 bg-accent rounded-l-full" 
                    />
                  )}
                </Link>
              );
            })}

            {/* Admin Section */}
            {(session?.user as { role?: string } | undefined)?.role === 'admin' && (
              <div className="pt-10">
                <p className="text-[9px] font-black text-muted-foreground/40 uppercase mb-4 px-4"> 
                   Protocoles d'Accès 
                </p>
                <Link
                  href="/admin"
                  className={cn(
                    'flex items-center gap-4 px-4 py-3 rounded-none text-xs font-black uppercase transition-all duration-200 group',
                    pathname?.startsWith('/admin')
                      ? 'text-accent bg-accent/5'
                      : 'text-muted-foreground hover:bg-accent/5 hover:text-accent'
                  )}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Portail Admin</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 space-y-2 border-t border-foreground/5">
            <Link
              href="/"
              className="flex items-center gap-4 px-4 py-3 text-xs font-black uppercase text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <Globe className="w-4 h-4" />
              <span>Revenir au site</span>
            </Link>
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex items-center gap-4 px-4 py-3 text-xs font-black uppercase text-destructive/60 hover:text-destructive hover:bg-destructive/5 transition-all duration-200 w-full"
            >
              {isSigningOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
