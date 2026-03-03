import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const steps = [
    {
        id: '01',
        title: 'Analyse de contexte',
        description: 'Identifier les besoins réels, contraintes techniques et dépendances avant toute décision structurelle.',
    },
    {
        id: '02',
        title: 'Conception systémique',
        description: 'Définir les couches, les interfaces et les flux de données. Structurer des fondations modulaires et isolées.',
    },
    {
        id: '03',
        title: 'Formalisation doctrinale',
        description: 'Rédiger la doctrine technique. Établir les conventions et patterns qui garantissent la cohérence sur le long terme.',
    },
    {
        id: '04',
        title: 'Implémentation maîtrisée',
        description: 'Mettre en œuvre par itérations contrôlées. Réduire le risque d\'intégration via des livrables validés.',
    },
    {
        id: '05',
        title: 'Transmission du savoir',
        description: 'Un système non documenté est un système fragile. On documente pour que la connaissance reste dans l\'organisation.',
    },
];

export default function Approach() {
    return (
        <section className="py-24 sm:py-40 bg-background border-b border-foreground/5 relative overflow-hidden">

            {/* Fond grille discrète */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, hsl(var(--foreground)/0.02) 1px, transparent 1px),
                                      linear-gradient(to bottom, hsl(var(--foreground)/0.02) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

            <div className="mx-auto max-w-6xl px-4 sm:px-8">

                {/* Header */}
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div className="space-y-5">
                        <span className="font-mono text-[10px] text-accent tracking-widest font-medium block uppercase opacity-80">
                            Méthodologie
                        </span>
                        <h2 className="font-bold tracking-tight text-foreground">
                            Notre approche,<br />
                            <span className="text-foreground/25 font-light">étape par étape.</span>
                        </h2>
                    </div>
                    <Link
                        href="/vision"
                        className="inline-flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-accent transition-colors group shrink-0"
                    >
                        Lire la doctrine complète
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grille des étapes — Premium */}
                <div className="grid md:grid-cols-5 gap-px bg-foreground/5 border border-foreground/5">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="group bg-background p-8 sm:p-10 flex flex-col gap-6 hover:bg-foreground/[0.025] transition-all duration-500 relative overflow-hidden"
                        >
                            {/* Barre accent au hover */}
                            <div className="absolute top-0 left-0 h-0.5 w-full bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                            {/* Numéro premium */}
                            <div className="flex items-center justify-between">
                                <span
                                    className="font-mono text-3xl font-bold leading-none select-none"
                                    style={{
                                        color: `hsl(var(--foreground) / ${0.04 + index * 0.015})`,
                                    }}
                                >
                                    {step.id}
                                </span>
                                <div className="w-1 h-1 bg-accent/20 group-hover:bg-accent rounded-full transition-colors duration-500" />
                            </div>

                            {/* Titre */}
                            <h3 className="text-xs font-bold tracking-tight text-foreground leading-snug group-hover:text-accent transition-colors duration-300 uppercase">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[11px] text-muted-foreground leading-relaxed flex-1 font-normal opacity-80">
                                {step.description}
                            </p>

                            {/* Indicateur bas discret */}
                            <div className="w-4 h-px bg-foreground/5 group-hover:bg-accent group-hover:w-8 transition-all duration-500" />
                        </div>
                    ))}
                </div>

                {/* Citation finale — raffinée */}
                <div className="mt-16 grid md:grid-cols-[1fr_auto] gap-8 items-center bg-foreground text-background p-10 sm:p-14 overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-accent/20" />
                    <blockquote>
                        <p className="text-xl sm:text-2xl font-bold tracking-tight leading-snug text-background">
                            "Un système{' '}
                            <span className="text-accent italic font-light">se construit</span>.<br />
                            Il ne se corrige pas."
                        </p>
                    </blockquote>
                    <div className="text-right">
                        <p className="font-mono text-[9px] text-background/30 tracking-[0.2em] uppercase">
                            ehaf · Règle fondatrice 001
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
