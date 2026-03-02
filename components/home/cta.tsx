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

                <h2 className="font-black tracking-tight mb-8 text-foreground">
                    Un projet en tête ?
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed mb-12 font-normal max-w-xl mx-auto" style={{ letterSpacing: '-0.01em' }}>
                    Que ce soit une infrastructure à structurer, un cloud à maîtriser
                    ou une base technique à poser — on en parle simplement.
                </p>

                <Link
                    href="/collaboration"
                    className="inline-flex items-center justify-center gap-3 bg-foreground text-background px-10 py-5 text-sm font-semibold tracking-tight transition-all duration-300 hover:bg-accent hover:text-white group"
                >
                    Démarrer une discussion
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

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
