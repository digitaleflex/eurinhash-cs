import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const steps = [
    {
        id: '01',
        title: 'Analyse de Contexte',
        description: 'Identifier les besoins réels, contraintes techniques et dépendances avant toute décision structurelle.',
    },
    {
        id: '02',
        title: 'Conception Systémique',
        description: 'Définir les couches, les interfaces et les flux de données. Structurer des fondations modulaires et isolées.',
    },
    {
        id: '03',
        title: 'Formalisation Doctrinale',
        description: 'Rédiger la doctrine technique. Établir les conventions et patterns qui garantissent la cohérence sur le long terme.',
    },
    {
        id: '04',
        title: 'Implémentation Maîtrisée',
        description: 'Mettre en œuvre par itérations contrôlées. Réduire le risque d\'intégration via des livrables validés.',
    },
    {
        id: '05',
        title: 'Transmission Savoir',
        description: 'Un système non documenté est un système dépendant. Garantir la souveraineté de la connaissance au sein de l\'organisation.',
    },
];

export default function Approach() {
    return (
        <section className="py-24 sm:py-48 bg-background border-b border-foreground/5 relative overflow-hidden">
            <div className="mx-auto max-w-6xl px-4 sm:px-8 relative z-10">

                {/* Header Brutal */}
                <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-6">
                        <span className="font-mono text-[10px] text-accent uppercase tracking-[0.5em] font-black">Méthodologie</span>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                            L'Approche <br />
                            Architecturale.
                        </h2>
                    </div>
                    <Link
                        href="/vision"
                        className="inline-flex items-center gap-4 text-foreground/40 font-mono text-[10px] uppercase tracking-[0.4em] group hover:text-accent transition-colors py-4 border-b border-foreground/10 hover:border-accent"
                    >
                        Lire la doctrine complète
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                    </Link>
                </div>

                {/* Étapes — Nomenclature technique */}
                <div className="grid md:grid-cols-5 gap-px bg-foreground/5 border border-foreground/5">
                    {steps.map((step) => (
                        <div key={step.id} className="bg-background p-10 sm:p-12 group hover:bg-foreground/[0.015] transition-all duration-700 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                            <span className="font-mono text-xs font-black text-accent/20 group-hover:text-accent transition-colors block mb-12">
                                [ STEP-0{step.id} ]
                            </span>
                            <h3 className="text-xl font-black uppercase tracking-tighter mb-6 group-hover:translate-x-2 transition-transform duration-700">
                                {step.title}
                            </h3>
                            <p className="text-muted-foreground text-[13px] leading-relaxed uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Quote Doctrine Brutale */}
                <div className="mt-32 p-12 bg-foreground text-background flex flex-col md:flex-row items-center justify-between gap-12">
                    <blockquote className="text-3xl sm:text-4xl font-black tracking-tighter uppercase leading-none">
                        "Un système <span className="text-accent underline decoration-4 underline-offset-8">se construit</span>. <br />
                        Il ne se corrige pas."
                    </blockquote>
                    <div className="font-mono text-[9px] uppercase tracking-[0.5em] opacity-40 text-center md:text-right">
                        EHAF DOCUMENT <br />
                        RULE-001-ALPHA
                    </div>
                </div>

            </div>
        </section>
    );
}
