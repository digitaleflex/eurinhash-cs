import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
    return (
        <section className="py-24 sm:py-48 bg-background border-t border-foreground/5 text-center relative overflow-hidden">

            {/* Grille architecturale très discrète */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)/0.03) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)/0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px',
                }}
            />

            <div className="mx-auto max-w-4xl px-4 sm:px-8">

                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em] block mb-10">
                    Collaboration · Stratégique
                </span>

                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.0] mb-12">
                    Bâtissons une infrastructure <span className="text-foreground/30">pérenne</span>.
                </h2>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-16">
                    Si vous souhaitez structurer une plateforme d'envergure,
                    maîtriser votre cloud, ou contribuer à un écosystème
                    numérique souverain.
                </p>

                <Link
                    href="/start-project"
                    className="inline-flex items-center justify-center gap-4 bg-foreground text-background px-12 py-6 text-lg font-bold uppercase tracking-widest transition hover:bg-accent hover:text-white group"
                >
                    Planifier une discussion stratégique
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Signature finale */}
                <div className="mt-24 flex items-center justify-center gap-4">
                    <div className="w-16 h-px bg-foreground/10" />
                    <span className="font-mono text-[9px] text-foreground/25 uppercase tracking-[0.4em]">
                        Eurinhash CS · Architecture Foundation
                    </span>
                    <div className="w-16 h-px bg-foreground/10" />
                </div>

            </div>
        </section>
    );
}
