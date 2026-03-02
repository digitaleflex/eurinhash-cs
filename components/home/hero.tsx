import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section
            className="relative isolate overflow-hidden flex flex-col items-center justify-start text-center min-h-screen pt-20 pb-32 bg-background text-foreground"
            aria-label="Section principale"
        >
            {/* ── Fond architectural : grille blueprint (dynamique) ── */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, hsl(var(--foreground)/0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, hsl(var(--foreground)/0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* ── Cercles concentriques architecturaux (Brutalisés: Sharp) ── */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-20">
                <div className="w-[1000px] h-[1000px] border border-foreground/[0.05]" />
                <div className="absolute w-[700px]  h-[700px]  border border-foreground/[0.05]" />
                <div className="absolute w-[420px]  h-[420px]  border border-foreground/10" />
            </div>

            {/* ── Contenu ── */}
            <div className="mx-auto max-w-5xl px-4 sm:px-8 flex flex-col items-center gap-14">

                {/* Micro-résumé Vision */}
                <div className="flex flex-col items-center gap-6 max-w-2xl border-l-2 border-accent pl-10 py-2 transition-all duration-1000">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-[0.5em] font-black">
                        Vision & Stratégie
                    </span>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-[0.2em] leading-relaxed text-left">
                        Vers une architecture numérique maîtrisée et durable. <br />
                        <span className="text-foreground/40 italic">L’organisation des systèmes est un choix stratégique, pas un hasard.</span>
                    </p>
                </div>

                {/* H1 massif - Brutal */}
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.85] uppercase">
                    Architectures
                    <br />
                    <span className="text-foreground/10">Systémiques</span>
                </h1>

                {/* Bloc signature — Brutal Table */}
                <div className="flex bg-foreground/5 p-4 border border-foreground/5 gap-12 font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/40">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent" />
                        <span>Souveraineté</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent" />
                        <span>Maîtrise</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent" />
                        <span>Pérennité</span>
                    </div>
                </div>

                {/* CTAs - Sharper */}
                <div className="flex flex-col sm:flex-row gap-0 items-center pt-8 border-t border-foreground/5 w-full justify-center">
                    <Link
                        href="/start-project"
                        className="inline-flex items-center justify-center gap-6 bg-foreground text-background px-16 py-8 text-xs font-black uppercase tracking-[0.4em] transition-all duration-700 hover:bg-accent hover:text-white group relative"
                    >
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                        Initialiser la structure
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-700" />
                    </Link>
                    <Link
                        href="/vision"
                        className="w-full sm:w-auto inline-flex items-center justify-center border border-foreground/5 text-muted-foreground px-16 py-8 text-xs font-black uppercase tracking-[0.4em] transition-all duration-700 hover:border-foreground/30 hover:text-foreground"
                    >
                        Lire la doctrine
                    </Link>
                </div>

                {/* Mention fondatrice discrète */}
                <p className="text-[10px] font-mono text-muted-foreground/20 uppercase tracking-[0.4em] mt-8">
                    Fragment EHAF-01 · Initié par Eurin Hash · Architecte
                </p>

            </div>

            {/* ── Signature architecturale pied de hero ── */}
            <div className="absolute bottom-8 left-8 flex items-center gap-4">
                <span className="text-[9px] font-mono text-muted-foreground/10 uppercase tracking-[0.6em] [writing-mode:vertical-rl] transform -rotate-180">
                    EHAF-2025-SYSTEM
                </span>
            </div>
        </section>
    );
}
