'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronDown, Construction, User, ShieldCheck } from 'lucide-react';
import { useSession } from '@/lib/auth-clients';

interface NavItem {
    label: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
    description?: string;
    children?: NavItem[];
    isCTA?: boolean;
}

const navigationItems: NavItem[] = [
    {
        label: 'Accueil',
        href: '/',
    },
    {
        label: 'Réalisations',
        href: '/realisations',
        description: 'Études de cas et impact',
    },
    {
        label: 'Services',
        href: '/services',
        description: 'Expertise & Accompagnement',
        children: [
            {
                label: 'Audit de Résilience',
                href: '/services/audit',
                description: 'Analyse 360° en 5 jours',
            },
            {
                label: 'Architecture de Système',
                href: '/services/architecture',
                description: 'Conception haute performance',
            },
            {
                label: 'Accompagnement CTO',
                href: '/services/cto',
                description: 'Suivi stratégique long terme',
            },
            {
                label: 'Programme de Mentorat',
                href: '/services/mentorat',
                description: 'Formation d\'élite et mentorat pour les talents en programmation et cloud.',
            },
        ],
    },
    {
        label: 'Événements',
        href: '/evenements',
        description: 'Lives & Conférences',
    },
    {
        label: 'Blog',
        href: '/blog',
        description: 'Veille & Analyses',
    },
    {
        label: 'Ressources',
        href: '/ressources',
        description: 'Guides & eBooks',
    },
    {
        label: 'Contact',
        href: '/contact',
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

    const { data: session, isPending } = useSession();

    return (
        <>
            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Navigation principale" ref={dropdownRef}>
                {navigationItems.map((item) => {
                    const isActive = pathname && (pathname === item.href || pathname.startsWith(item.href + '/'));
                    const hasChildren = item.children && item.children.length > 0;
                    const isOpen = openDropdown === item.href;

                    if (item.isCTA) {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white font-medium text-sm tracking-tight transition-all duration-200 hover:bg-accent/90 ml-2"
                                aria-label="Réserver un audit"
                            >
                                <span>Réserver un audit</span>
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
                                            'group relative flex items-center gap-1.5 px-3 py-2 transition-all duration-200',
                                            isActive
                                                ? 'text-foreground font-semibold'
                                                : 'text-muted-foreground hover:text-foreground'
                                        )}
                                        aria-expanded={isOpen}
                                        aria-haspopup="true"
                                    >
                                        <span className="text-sm font-medium tracking-tight">{item.label}</span>
                                        <ChevronDown
                                            className={cn(
                                                'w-3 h-3 transition-transform duration-200 opacity-50 group-hover:opacity-100',
                                                isOpen && 'rotate-180 opacity-100'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {isActive && (
                                            <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent" />
                                        )}
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isOpen && (
                                        <div className="absolute top-full left-0 mt-0 w-56 py-0 bg-background border border-foreground/10 rounded-none shadow-none z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                                            {item.children?.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    onClick={() => setOpenDropdown(null)}
                                                    className={cn(
                                                        'flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-tight transition-colors border-b border-foreground/5 last:border-0',
                                                        pathname === child.href
                                                            ? 'text-foreground font-semibold bg-foreground/5'
                                                            : 'text-muted-foreground hover:text-foreground'
                                                    )}
                                                >
                                                    <span>{child.label}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'group relative flex items-center gap-1.5 px-3 py-2 transition-all duration-200',
                                        isActive
                                            ? 'text-foreground font-bold'
                                            : 'text-muted-foreground hover:text-foreground'
                                    )}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <span className="text-sm font-medium tracking-tight">{item.label}</span>
                                    {isActive && (
                                        <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent" />
                                    )}
                                </Link>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-4">
                {!isPending && session ? (
                    <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 group">
                        {/* Admin Link for admins */}
                        {(session.user as { role?: string }).role === 'admin' && (
                            <Link
                                href="/admin"
                                className="mr-4 text-[10px] font-bold uppercase tracking-widest text-accent hover:text-accent/80 flex items-center gap-1 border border-accent/20 px-2 py-1 bg-accent/5"
                            >
                                <ShieldCheck className="w-3 h-3" /> Admin
                            </Link>
                        )}
                        <Link
                            href="/dashboard/profil"
                            className="flex items-center gap-3 min-w-max"
                        >
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden ring-1 ring-border group-hover:ring-accent/50 transition-all">
                                {session.user?.image ? (
                                    <img
                                        src={session.user.image}
                                        alt={session.user.name || 'User'}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User className="w-3.5 h-3.5" />
                                )}
                            </div>
                            <span className="tracking-tight">{session.user?.name || 'Mon Compte'}</span>
                        </Link>
                    </div>
                ) : (
                    <Link
                        href="/sign-in"
                        className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-xs font-bold uppercase tracking-widest transition-all duration-200 hover:bg-accent hover:text-white"
                    >
                        Se connecter
                    </Link>
                )}
            </div>
        </>
    );
}
