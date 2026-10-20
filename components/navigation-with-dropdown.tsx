'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
    isCTA?: boolean;
}

const navigationItems: NavItem[] = [
    { label: 'Accueil', href: '/' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Projets', href: '/realisations' },
    {
        label: 'Services',
        href: '/services',
        children: [
            { label: 'Faire le point sur un système', href: '/services/audit' },
            { label: 'Concevoir un projet numérique', href: '/services/architecture' },
            { label: 'Conseil technique', href: '/services/cto' },
            { label: 'Mentorat', href: '/services/mentorat' },
        ],
    },
    { label: 'Articles', href: '/blog' },
    { label: 'Parlons de votre projet', href: '/contact', isCTA: true },
];

export function NavigationWithDropdown() {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDropdownToggle = (href: string) => {
        setOpenDropdown(openDropdown === href ? null : href);
    };

    return (
        <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Navigation principale"
            ref={dropdownRef}
        >
            {navigationItems.map((item) => {
                const isActive = pathname && (
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'))
                );
                const hasChildren = Boolean(item.children?.length);
                const isOpen = openDropdown === item.href;

                if (item.isCTA) {
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="ml-2 flex items-center gap-2 bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
                        >
                            <span>{item.label}</span>
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                    );
                }

                return (
                    <div key={item.href} className="relative">
                        {hasChildren ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => handleDropdownToggle(item.href)}
                                    className={cn(
                                        'group relative flex items-center gap-1.5 px-3 py-2 transition-colors',
                                        isActive ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground'
                                    )}
                                    aria-expanded={isOpen}
                                    aria-haspopup="true"
                                >
                                    <span className="text-sm font-medium">{item.label}</span>
                                    <ChevronDown
                                        className={cn('h-3 w-3 opacity-60 transition-transform', isOpen && 'rotate-180')}
                                        aria-hidden="true"
                                    />
                                    {isActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent" />}
                                </button>
                                {isOpen && (
                                    <div className="absolute left-0 top-full z-50 mt-1 w-64 border border-foreground/10 bg-background py-1 shadow-lg">
                                        {item.children?.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                onClick={() => setOpenDropdown(null)}
                                                className={cn(
                                                    'block border-b border-foreground/5 px-4 py-3 text-sm last:border-0',
                                                    pathname === child.href
                                                        ? 'bg-foreground/5 font-medium text-foreground'
                                                        : 'text-muted-foreground hover:bg-foreground/[0.03] hover:text-foreground'
                                                )}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link
                                href={item.href}
                                className={cn(
                                    'relative flex items-center px-3 py-2 text-sm transition-colors',
                                    isActive ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground'
                                )}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {item.label}
                                {isActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent" />}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
