import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const axioms = [
    {
        id: '01',
        title: 'Souveraineté Totale',
        desc: 'Maîtriser chaque couche de données et chaque flux de trafic. Aucune opacité acceptée.',
    },
    {
        id: '02',
        title: 'Réversibilité Native',
        desc: 'Aucun système ne doit être prisonnier d\'un fournisseur unique.',
    },
    {
        id: '03',
        title: 'Clarté Conceptuelle',
        desc: 'Tout ce qui est inutilement complexe est fragile. On conçoit pour la maintenance.',
    },
    {
        id: '04',
        title: 'Discipline de Fer',
        desc: 'Pas de code sans structure. Pas de déploiement sans audit préalable.',
    },
];

export default function VisionPage() {
    return (
        <main className="bg-background text-foreground min-h-screen pt-28 pb-40">
            <div className="mx-auto max-w-4xl px-4 sm:px-8">

                {/* Header */}
                <header className="mb-24 space-y-8">
                    <span className="font-mono text-xs text-accent tracking-tight font-medium block">
                        Pilier I — Pourquoi ?
                    </span>
                    <h1 className="font-black tracking-tight text-foreground">
                        Pourquoi l'architecture<br />
                        <span className="text-foreground/25">avant tout le reste.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed font-normal" style={{ letterSpacing: '-0.01em' }}>
                        La plupart des systèmes numériques sont construits dans l'urgence.
                        On empile les technologies sans penser à la structure.
                        Résultat : des architectures fragiles, dépendantes, impossibles à faire évoluer.
                    </p>
                </header>

                {/* Le Problème */}
                <section className="mb-24 grid md:grid-cols-[1fr_2fr] gap-16 border-t border-foreground/5 pt-16">
                    <div className="space-y-4">
                        <div className="w-8 h-0.5 bg-accent" />
                        <h2 className="font-black tracking-tight text-foreground">
                            Le problème structurel
                        </h2>
                    </div>
                    <div className="space-y-6">
                        <p className="text-base text-muted-foreground leading-relaxed">
                            La majorité des systèmes numériques actuels sont construits sur une fondation d'urgence.
                            On empile les technologies sans penser à la structure — créant des architectures
                            fragmentées, dépendantes de fournisseurs, et impossibles à auditer.
                        </p>
                        <blockquote className="border-l-4 border-foreground pl-6 py-2">
                            <p className="text-base font-semibold text-foreground leading-relaxed">
                                L'architecture n'est pas un coût.<br />
                                C'est l'assurance-vie de votre système.
                            </p>
                        </blockquote>
                    </div>
                </section>

                {/* Axiomes */}
                <section className="mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <span className="font-mono text-xs text-muted-foreground tracking-tight">Nos principes fondateurs</span>
                        <div className="h-px flex-1 bg-foreground/5" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-px bg-foreground/5 border border-foreground/5">
                        {axioms.map((a) => (
                            <div key={a.id} className="bg-background p-8 sm:p-10 space-y-3 group hover:bg-foreground/[0.02] transition-colors">
                                <span className="font-mono text-xs text-accent tracking-tight font-medium">AXIOME {a.id}</span>
                                <h3 className="text-lg font-bold tracking-tight group-hover:text-accent transition-colors">
                                    {a.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Ambition */}
                <section className="bg-foreground text-background p-10 sm:p-16 space-y-8">
                    <h2 className="font-black tracking-tight text-background leading-tight">
                        Vers une infrastructure<br />qui dure.
                    </h2>
                    <p className="text-base text-background/65 leading-relaxed max-w-2xl font-normal">
                        Notre objectif est de fournir les standards et les outils pour que chaque organisation
                        puisse posséder ses propres systèmes — sans compromis sur la performance ou la modernité.
                    </p>
                    <Link
                        href="/architecture"
                        className="inline-flex items-center gap-3 bg-accent text-white px-6 py-3 text-sm font-semibold tracking-tight hover:bg-white hover:text-accent transition-all group"
                    >
                        Voir la méthodologie
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </section>

            </div>
        </main>
    );
}
