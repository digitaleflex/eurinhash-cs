import Link from 'next/link';

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

            {/* ── Cercles concentriques architecturaux ── */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                <div className="w-[1000px] h-[1000px] border border-foreground/[0.02] rounded-full" />
                <div className="absolute w-[700px]  h-[700px]  border border-foreground/[0.02] rounded-full" />
                <div className="absolute w-[420px]  h-[420px]  border border-foreground/5  rounded-full" />
                <div className="absolute w-[180px]  h-[180px]  border border-accent/10  rounded-full" />
            </div>

            {/* ── Halo central très atténué ── */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -z-10 inset-0"
                style={{
                    background: 'radial-gradient(ellipse 50% 35% at 50% 50%, hsl(var(--accent)/0.05), transparent)',
                }}
            />

            {/* ── Contenu ── */}
            <div className="mx-auto max-w-5xl px-4 sm:px-8 flex flex-col items-center gap-10">

                {/* Micro-label honnête */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-px bg-foreground/15" />
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em]">
                        Initiative architecturale indépendante
                    </span>
                    <div className="w-8 h-px bg-foreground/15" />
                </div>

                {/* H1 massif */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[1.05]">
                    Architectures numériques
                    <br />
                    <span className="text-accent">souveraines</span>.
                </h1>

                {/* Sous-texte ancrage */}
                <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-xl">
                    Pensées pour la résilience, la scalabilité
                    <br className="hidden sm:block" /> et la maîtrise structurelle.
                </p>

                {/* Bloc signature — 3 piliers */}
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/30">
                    <span>Maîtrise des dépendances</span>
                    <span className="w-1 h-1 rounded-full bg-foreground/10" />
                    <span>Standards reproductibles</span>
                    <span className="w-1 h-1 rounded-full bg-foreground/10" />
                    <span>Autonomie stratégique</span>
                </div>

                {/* CTAs sobres — dynamiques */}
                <div className="flex flex-col sm:flex-row gap-4 items-center pt-4">
                    <Link
                        href="/start-project"
                        className="inline-flex items-center justify-center bg-foreground text-background px-10 py-4 text-[13px] font-bold uppercase tracking-[0.2em] transition hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
                    >
                        Initier une collaboration
                    </Link>
                    <Link
                        href="/vision"
                        className="inline-flex items-center justify-center border border-foreground/10 text-muted-foreground px-10 py-4 text-[13px] font-bold uppercase tracking-[0.2em] transition hover:border-foreground/25 hover:text-foreground"
                    >
                        Lire la doctrine
                    </Link>
                </div>

                {/* Mention fondatrice discrète */}
                <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.2em] mt-4">
                    Initiée par Eurin Hash · Architecte cloud indépendant
                </p>

            </div>

            {/* ── Signature architecturale pied de hero ── */}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4">
                <div className="w-12 h-px bg-foreground/10" />
                <span className="text-[9px] font-mono text-muted-foreground/30 uppercase tracking-[0.4em]">
                    Core Architecture · EHAF · Version 1.0
                </span>
                <div className="w-12 h-px bg-foreground/10" />
            </div>
        </section>
    );
}
