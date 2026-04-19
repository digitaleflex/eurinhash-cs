import Link from 'next/link';

const links = [
    { href: '/services', label: 'Nos services' },
    { href: '/realisations', label: 'Réalisations' },
    { href: '/blog', label: 'Ressources' },
    { href: '/contact', label: 'Contact' },
];

export default function Depth() {
    return (
        <section className="py-16 bg-background border-b border-foreground/5">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
                    <span className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-[0.3em] hidden sm:block">
                        Pour aller plus loin
                    </span>
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
                        {links.map((link, i) => (
                            <span key={link.href} className="flex items-center gap-12">
                                <Link
                                    href={link.href}
                                    className="text-sm font-semibold text-muted-foreground hover:text-accent transition-colors underline-offset-4 hover:underline"
                                >
                                    {link.label}
                                </Link>
                                {i < links.length - 1 && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/10 hidden sm:block" />
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
