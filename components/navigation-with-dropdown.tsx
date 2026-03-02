'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronDown, Eye, Layout, BookOpen, Globe, Lightbulb, GraduationCap, Handshake, Construction } from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
    description?: string;
    children?: NavItem[];
    isCTA?: boolean;
    placeholder?: boolean; // Pages à venir (à implémenter)
}

const navigationItems: NavItem[] = [
    {
        label: 'Doctrine',
        href: '/vision',
        description: 'Manifeste & Stratégie',
    },
    {
        label: 'Initiatives',
        href: '/projects',
        description: 'Déploiements & Architectures',
    },
    {
        label: 'Expertise',
        href: '/skills',
        description: 'Capacités techniques',
    },
    {
        label: 'Auteur',
        href: '/about',
        description: 'Parcours structurel',
    },
    {
        label: 'Écosystème',
        href: '/ecosystem',
        description: 'Projets & Services',
        children: [
            { label: 'Vue globale', href: '/ecosystem' },
            { label: 'FlexHOST', href: '/ecosystem/flexhost' },
            { label: 'Framework EHAF', href: '/ecosystem/ehaf' },
        ],
    },
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
        <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Navigation principale" ref={dropdownRef}>
            {navigationItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = openDropdown === item.href;
                const Icon = item.icon;

                if (item.isCTA) {
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-lg font-medium transition-all duration-200 hover:bg-accent/90 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md ml-2"
                            aria-label={item.label}
                        >
                            <span>{item.label}</span>
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                    );
                }

                return (
                    <div key={item.href} className="relative">
                        {hasChildren ? (
                            <>
                                <button
                                    onClick={() => handleDropdownToggle(item.href)}
                                    className={cn(
                                        'group relative flex items-center gap-1.5 px-3 py-2 rounded-md transition-all duration-200',
                                        isActive
                                            ? 'text-foreground font-semibold bg-foreground/5'
                                            : item.placeholder
                                                ? 'text-amber-500/70 hover:text-amber-500 hover:bg-amber-500/10'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                                    )}
                                    aria-expanded={isOpen}
                                    aria-haspopup="true"
                                >
                                    {item.placeholder && (
                                        <Construction
                                            className="w-3.5 h-3.5 text-amber-500"
                                            aria-hidden="true"
                                        />
                                    )}
                                    <span className="text-sm font-medium">{item.label}</span>
                                    {item.placeholder && (
                                        <span className="text-[10px] text-amber-500 font-mono tracking-widest uppercase ml-1">(Bientôt)</span>
                                    )}
                                    <ChevronDown
                                        className={cn(
                                            'w-3 h-3 transition-transform duration-200',
                                            isOpen && 'rotate-180'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {isActive && (
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                                    )}
                                </button>

                                {/* Dropdown Menu */}
                                {isOpen && (
                                    <div className="absolute top-full left-0 mt-1 w-56 py-2 bg-background border border-foreground/10 rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        {item.children?.map((child, index) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                onClick={() => setOpenDropdown(null)}
                                                className={cn(
                                                    'flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                                                    child.placeholder
                                                        ? 'text-muted-foreground/60 cursor-not-allowed'
                                                        : pathname === child.href
                                                            ? 'text-foreground font-semibold bg-foreground/5'
                                                            : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                                                )}
                                            >
                                                {child.placeholder && (
                                                    <Construction className="w-3 h-3 text-amber-500" aria-hidden="true" />
                                                )}
                                                <span>{child.label}</span>
                                                {child.placeholder && (
                                                    <span className="ml-auto text-xs text-amber-500">(Bientôt)</span>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link
                                href={item.href}
                                className={cn(
                                    'group relative flex items-center gap-1.5 px-3 py-2 rounded-md transition-all duration-200',
                                    isActive
                                        ? 'text-foreground font-semibold bg-foreground/5'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                                )}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <span className="text-sm font-medium">{item.label}</span>
                                {isActive && (
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                                )}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
