import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const steps = [
    {
        id: '01',
        title: 'Analyser le contexte',
        description:
            'Identifier les besoins réels, contraintes techniques, et dépendances existantes avant toute décision structurelle.',
    },
    {
        id: '02',
        title: 'Concevoir l\'architecture',
        description:
            'Définir les couches, les interfaces, et les flux de données. Structurer des fondations modulaires, isolées et scalables.',
    },
    {
        id: '03',
        title: 'Formaliser les standards',
        description:
            'Rédiger la doctrine technique. Établir les conventions, patterns, et protocoles qui garantissent la cohérence systémique.',
    },
    {
        id: '04',
        title: 'Déployer progressivement',
        description:
            'Mettre en œuvre par itérations contrôlées. Réduire le risque d\'intégration en livrant des incréments validés.',
    },
    {
        id: '05',
        title: 'Documenter et transmettre',
        description:
            'Garantir que la connaissance reste dans l\'organisation. Un système non documenté est un système dépendant de son créateur.',
    },
];

export default function Approach() {
    return (
        <section className="py-24 sm:py-40 bg-foreground/[0.02] border-b border-foreground/5">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">

                {/* En-tête */}
                <div className="mb-20 sm:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em] block mb-6">
                            Méthodologie · Systémique
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                            Une approche systémique.
                        </h2>
                    </div>
                    <Link
                        href="/vision"
                        className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-sm group"
                    >
                        Explorer la doctrine
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Étapes — tableau vertical */}
                <div className="divide-y divide-foreground/5">
                    {steps.map((step) => (
                        <div key={step.id} className="grid md:grid-cols-[100px_1fr] gap-8 py-10 group hover:bg-accent/[0.02] transition-colors -mx-4 px-4">
                            <div className="flex items-start pt-1">
                                <span className="font-mono text-3xl font-bold text-foreground/15 group-hover:text-accent/30 transition-colors">
                                    {step.id}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold tracking-tight mb-3">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Citation doctrine */}
                <div className="mt-24 pt-16 border-t border-foreground/5">
                    <blockquote className="text-2xl sm:text-3xl font-bold text-foreground/60 italic max-w-3xl">
                        "Un système se construit.
                        <span className="text-foreground not-italic font-black"> Il ne se corrige pas."</span>
                    </blockquote>
                </div>

            </div>
        </section>
    );
}
