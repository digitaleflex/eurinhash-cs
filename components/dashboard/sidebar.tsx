'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { signOut, useSession } from '@/lib/auth-clients';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  FileText,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  ChevronRight,
  Loader2,
  ShieldCheck,
} from 'lucide-react';

const navItems = [
  {
    title: 'Tableau de bord',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Mon Profil',
    href: '/dashboard/profil',
    icon: User,
  },
  {
    title: 'Mes Messages',
    href: '/dashboard/messages',
    icon: Mail,
  },
  {
    title: 'Mes Demandes',
    href: '/dashboard/demandes',
    icon: FileText,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-background border border-border rounded-lg"
      >
        {isMobileOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-background border-r border-border',
          'transform transition-transform duration-300 lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full bg-background">

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-1">
            <div className="px-3 pb-2">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-4"> Menu </p>
            </div>
            {navItems.map(item => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  )}
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span>{item.title}</span>
                  {isActive && <div className="ml-auto w-1 h-4 bg-accent rounded-full" />}
                </Link>
              );
            })}

            {/* Admin Section */}
            {(session?.user as any)?.role === 'admin' && (
              <div className="pt-8">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-4 px-3"> 
                   Administration 
                </p>
                <Link
                  href="/admin"
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                    pathname?.startsWith('/admin')
                      ? 'bg-accent/10 text-accent border border-accent/20'
                      : 'text-muted-foreground hover:bg-accent/5 hover:text-accent'
                  )}
                >
                  <ShieldCheck className="w-4.5 h-4.5" />
                  <span>Portail Admin</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="p-3 space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>Retour au site</span>
            </Link>
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200 w-full"
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
