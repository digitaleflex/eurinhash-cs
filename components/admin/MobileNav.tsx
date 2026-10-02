'use client';

import * as React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  Mail,
  FileText,
  Settings,
  ShieldCheck,
  Calendar,
  Menu,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: "Vue d'ensemble" },
  { href: '/admin/users', icon: Users, label: 'Utilisateurs' },
  { href: '/admin/messages', icon: Mail, label: 'Messages' },
  { href: '/admin/evenements', icon: Calendar, label: 'Événements' },
];

const systemItems = [
  { href: '/admin/settings', icon: Settings, label: 'Configuration' },
];

export function AdminMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-card border-r">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-accent" />
            <span className="font-bold tracking-tight text-lg uppercase">
              Admin
            </span>
          </div>

          <nav aria-label="Navigation admin mobile" className="flex-1 p-4 space-y-1 overflow-y-auto">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-4">
              Management
            </p>

            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-accent text-white'
                    : 'text-muted-foreground hover:bg-accent/10 hover:text-accent'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="pt-8">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-4">
                Système
              </p>
              {systemItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-accent text-white'
                      : 'text-muted-foreground hover:bg-accent/10 hover:text-accent'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t border-border">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Retour Client
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
