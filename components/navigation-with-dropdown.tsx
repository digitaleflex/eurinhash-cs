'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronDown, Construction } from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
    description?: string;
    children?: NavItem[];
    isCTA?: boolean;
    placeholder?: boolean;
}

const navigationItems: NavItem[] = [
    {
        label: 'Vision',
        href: '/vision',
        description: 'Déclaration stratégique',
    },
    {
        label: 'Architecture',
        href: '/architecture',
        description: 'Cœur méthodologique',
    },
    {
        label: 'Initiatives',
        href: '/initiatives',
        description: 'Exécution concrète',
    },
    {
        label: 'Communauté',
        href: '/communaute',
        description: 'Espace humain',
    },
    {
        label: 'Contact',
        href: '/contact',
        description: 'Interaction directe',
    },
    {
        label: 'Collaboration',
        href: '/collaboration',
        isCTA: true,
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

                if (item.isCTA) {
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white font-medium text-sm tracking-tight transition-all duration-200 hover:bg-accent/90 ml-2"
                            aria-label="Parlons de votre projet"
                        >
                            <span>Votre projet</span>
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
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
                                        'group relative flex items-center gap-1.5 px-3 py-2 rounded-none transition-all duration-200',
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
                                        <span className="text-[10px] text-amber-500 font-mono tracking-tight uppercase ml-1">(Bientôt)</span>
                                    )}
                                    <ChevronDown
                                        className={cn(
                                            'w-3 h-3 transition-transform duration-200',
                                            isOpen && 'rotate-180'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {isActive && (
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-accent" />
                                    )}
                                </button>

                                {/* Dropdown Menu */}
                                {isOpen && (
                                    <div className="absolute top-full left-0 mt-0 w-56 py-0 bg-background border border-foreground/10 rounded-none shadow-none z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                                        {item.children?.map((child, index) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                onClick={() => setOpenDropdown(null)}
                                                className={cn(
                                                    'flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-tight transition-colors border-b border-foreground/5 last:border-0',
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
                                    'group relative flex items-center gap-1.5 px-3 py-2 rounded-none transition-all duration-200',
                                    isActive
                                        ? 'text-foreground font-semibold bg-foreground/5'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                                )}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <span className="text-sm font-medium">{item.label}</span>
                                {isActive && (
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-accent" />
                                )}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
