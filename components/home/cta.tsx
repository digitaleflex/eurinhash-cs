import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
    return (
        <section className="py-24 sm:py-56 bg-background border-t border-foreground/5 text-center relative overflow-hidden">

            {/* Grille architecturale massive */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, hsl(var(--foreground)/0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, hsl(var(--foreground)/0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '120px 120px',
                }}
            />

            <div className="mx-auto max-w-5xl px-4 sm:px-8">

                <span className="font-mono text-[10px] text-accent uppercase tracking-[1em] font-black block mb-20 animate-pulse duration-[3000ms]">
                    Collaboration · EHAF
                </span>

                <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8] mb-16 uppercase">
                    Bâtissons une <br />
                    <span className="text-foreground/20 italic">infrastructure</span> <br />
                    pérenne.
                </h2>

                <p className="text-sm font-medium text-muted-foreground uppercase tracking-[0.3em] leading-loose max-w-3xl mx-auto mb-24 opacity-60">
                    Si vous souhaitez structurer une plateforme d'envergure, <br className="hidden sm:block" />
                    maîtriser votre cloud, ou contribuer à un écosystème <br className="hidden sm:block" />
                    numérique souverain.
                </p>

                <Link
                    href="/start-project"
                    className="inline-flex items-center justify-center gap-8 bg-foreground text-background px-20 py-10 text-xs font-black uppercase tracking-[0.5em] transition-all duration-700 hover:bg-accent hover:text-white group relative shadow-2xl"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                    Engager la transformation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-700" />
                </Link>

                {/* Signature finale - Brutal Footer */}
                <div className="mt-40 pt-16 border-t border-foreground/5 flex flex-col items-center gap-6">
                    <span className="font-mono text-[9px] text-foreground/20 uppercase tracking-[0.6em]">
                        Eurinhash CS · Architecture Foundation
                    </span>
                    <div className="w-px h-24 bg-foreground/10" />
                    <span className="font-mono text-[11px] text-foreground/40 uppercase tracking-[0.3em]">
                        Document EHAF-2025-SYSTEM · VERSION 1.0.0
                    </span>
                </div>

            </div>
        </section>
    );
}
