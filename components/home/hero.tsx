import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section
            className="relative isolate overflow-hidden flex flex-col items-center justify-start text-center min-h-screen pt-24 pb-32 bg-background text-foreground"
            aria-label="Section principale"
        >
            {/* Fond architectural : grille subtile */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, hsl(var(--foreground)/0.025) 1px, transparent 1px),
                        linear-gradient(to bottom, hsl(var(--foreground)/0.025) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Contenu */}
            <div className="mx-auto max-w-4xl px-4 sm:px-8 flex flex-col items-center gap-12">

                {/* Label discret */}
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <span className="text-xs font-mono text-muted-foreground tracking-tight">
                        Eurin Hash · Architecture de Systèmes
                    </span>
                </div>

                {/* H1 — Compact, lisible */}
                <h1 className="font-black tracking-tight leading-none text-foreground">
                    On construit des systèmes<br />
                    <span className="text-foreground/25">qui durent.</span>
                </h1>

                {/* Sous-titre — humain, direct */}
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed font-normal" style={{ letterSpacing: '-0.01em' }}>
                    Pas de complexité inutile. Pas de dette technique cachée.<br />
                    Une architecture claire, maîtrisée, pensée pour tenir dans le temps.
                </p>

                {/* Piliers — réduit à 3 mots clés lisibles */}
                <div className="flex items-center gap-8 text-xs text-muted-foreground/60 font-mono tracking-tight">
                    <span>Souveraineté</span>
                    <span className="w-1 h-1 bg-foreground/20 rounded-full" />
                    <span>Clarté</span>
                    <span className="w-1 h-1 bg-foreground/20 rounded-full" />
                    <span>Pérennité</span>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 items-center pt-6 border-t border-foreground/8 w-full justify-center">
                    <Link
                        href="/collaboration"
                        className="inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-sm font-semibold tracking-tight transition-all duration-300 hover:bg-accent hover:text-white group"
                    >
                        Parlons de votre projet
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                    <Link
                        href="/vision"
                        className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-muted-foreground tracking-tight transition-all duration-300 hover:text-foreground border border-transparent hover:border-foreground/10"
                    >
                        Notre vision
                    </Link>
                </div>

            </div>
        </section>
    );
}
