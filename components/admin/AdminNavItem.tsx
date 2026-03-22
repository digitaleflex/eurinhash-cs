'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminNavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

export function AdminNavItem({ href, icon: Icon, label }: AdminNavItemProps) {
  const pathname = usePathname();

  const isActive = React.useMemo(() => {
    if (!pathname) return false;
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  }, [pathname, href]);

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-accent text-white'
          : 'text-muted-foreground hover:bg-accent/10 hover:text-accent'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  );
}
