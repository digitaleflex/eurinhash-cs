import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const items = [
    {
        id: '01',
        title: 'Architecture Cloud Hybride',
        description: 'Coexistence du cloud public et des infrastructures locales. Conception de systèmes résilients garantissant la maîtrise totale des données critiques.',
        details: ['Souveraineté des données', 'Continuité d\'activité', 'Isolation réseaux']
    },
    {
        id: '02',
        title: 'Ingénierie SaaS Multi-tenant',
        description: 'Industrialisation de plateformes logicielles massives. Isolation totale des données et gestion unifiée pour des structures s\'adressant au marché global.',
        details: ['Isolation par client', 'Passage à l\'échelle', 'Gouvernance IAM']
    },
    {
        id: '03',
        title: 'Standardisation & Blueprints',
        description: 'Création de frameworks internes et de socles techniques reproductibles. Passer de l\'artisanat de code à l\'ingénierie systémique.',
        details: ['Conventions techniques', 'CI/CD immuable', 'Observabilité']
    }
];

export default function Expertise() {
    return (
        <section className="py-24 sm:py-40 bg-background border-t border-foreground/5">
            <div className="mx-auto max-w-6xl px-4 sm:px-8">

                <div className="flex items-center gap-6 mb-20">
                    <span className="font-mono text-xs text-accent tracking-tight font-medium">Domaines d'expertise</span>
                    <div className="h-px flex-1 bg-foreground/5" />
                    <span className="font-mono text-xs text-foreground/20 tracking-tight">03 champs · EHAF</span>
                </div>

                <div className="divide-y divide-foreground/5 border-y border-foreground/5 mb-20">
                    {items.map((item) => (
                        <div key={item.id} className="group py-12 grid md:grid-cols-[1fr_2.5fr_1.5fr] gap-10 items-start hover:bg-foreground/[0.015] transition-all duration-500 px-2">
                            <div className="font-mono text-xs text-foreground/25 tracking-tight pt-1 font-medium">
                                ARCH-{item.id}
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                    {item.description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1">
                                {item.details.map((detail, i) => (
                                    <div key={i} className="flex items-center gap-2 group/tag">
                                        <div className="w-1 h-1 bg-accent/30 group-hover/tag:bg-accent rounded-full transition-colors duration-300" />
                                        <span className="font-mono text-xs text-foreground/40 group-hover/tag:text-foreground/70 transition-colors">
                                            {detail}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bloc transversal */}
                <div className="bg-foreground text-background p-10 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-12 group relative">
                    <div className="absolute top-0 left-0 w-0.5 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="space-y-3 text-center md:text-left">
                        <span className="font-mono text-xs text-accent tracking-tight font-medium block">Capacités transverses</span>
                        <h4 className="text-2xl font-bold tracking-tight text-background">
                            Sécurité & Interconnectivité
                        </h4>
                    </div>
                    <div className="flex items-center gap-10 font-mono text-sm opacity-60 group-hover:opacity-100 transition-all duration-500">
                        <div className="flex flex-col gap-1">
                            <span className="text-background/50 text-xs">Modèle</span>
                            <span className="text-background font-bold">Zero-Trust</span>
                        </div>
                        <div className="w-px h-10 bg-background/15" />
                        <div className="flex flex-col gap-1">
                            <span className="text-background/50 text-xs">Standard</span>
                            <span className="text-background font-bold">API-First</span>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex justify-center">
                    <Link
                        href="/initiatives"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors group"
                    >
                        Explorer les initiatives techniques
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
