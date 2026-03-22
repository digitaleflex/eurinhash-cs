import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
    return (
        <section className="py-32 sm:py-48 bg-background border-t border-foreground/5 text-center relative overflow-hidden">

            {/* Grille architecturale discrète */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, hsl(var(--foreground)/0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, hsl(var(--foreground)/0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: '100px 100px',
                }}
            />

            <div className="mx-auto max-w-3xl px-4 sm:px-8">

                <span className="font-mono text-xs text-accent tracking-tight font-medium block mb-8">
                    Travaillons ensemble
                </span>

                <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-8 text-foreground leading-[1.1]">
                    Prêt à sécuriser et faire<br />
                    <span className="text-foreground/20 font-light italic">évoluer votre infrastructure ?</span>
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed mb-12 font-normal max-w-xl mx-auto" style={{ letterSpacing: '-0.01em' }}>
                    Ne construisez plus sur des sables mouvants.<br />
                    On en parle simplement, avec une approche axée sur les résultats.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-3 bg-accent text-white px-12 py-6 text-sm font-bold tracking-tight transition-all duration-300 hover:bg-foreground group"
                    >
                        Réserver un audit maintenant
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                    <Link
                        href="/realisations"
                        className="inline-flex items-center justify-center gap-3 px-12 py-6 text-sm font-bold tracking-tight text-muted-foreground hover:text-foreground transition-all"
                    >
                        Voir les réalisations
                    </Link>
                </div>

                {/* Signature finale sobre */}
                <div className="mt-24 pt-12 border-t border-foreground/5 flex flex-col items-center gap-3">
                    <span className="font-mono text-[10px] text-foreground/20 tracking-tight">
                        Eurin Hash CS · EHAF Foundation · 2026
                    </span>
                </div>

            </div>
        </section>
    );
}
