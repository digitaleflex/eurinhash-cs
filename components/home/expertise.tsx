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
                    <span className="font-mono text-[10px] text-accent/80 tracking-widest uppercase">Domaines d'expertise</span>
                    <div className="h-px flex-1 bg-foreground/5" />
                    <span className="font-mono text-[10px] text-foreground/20 tracking-widest uppercase">03 champs · ehaf</span>
                </div>

                <div className="divide-y divide-foreground/5 border-y border-foreground/5 mb-20">
                    {items.map((item) => (
                        <div key={item.id} className="group py-12 grid md:grid-cols-[1fr_2.5fr_1.5fr] gap-10 items-start hover:bg-foreground/[0.015] transition-all duration-500 px-2">
                            <div className="font-mono text-[10px] text-foreground/20 tracking-widest pt-1 uppercase">
                                arch · {item.id}
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-normal">
                                    {item.description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1">
                                {item.details.map((detail, i) => (
                                    <div key={i} className="flex items-center gap-2 group/tag">
                                        <div className="w-1 h-1 bg-accent/20 group-hover/tag:bg-accent rounded-full transition-colors duration-300" />
                                        <span className="font-mono text-[10px] text-foreground/30 tracking-tight group-hover/tag:text-foreground/60 transition-colors uppercase">
                                            {detail}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bloc transversal */}
                <div className="bg-foreground text-background p-10 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-12 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-0.5 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="space-y-3 text-center md:text-left">
                        <span className="font-mono text-[10px] text-accent tracking-widest uppercase opacity-80 block">Capacités transverses</span>
                        <h4 className="text-2xl font-bold tracking-tight text-background">
                            Sécurité & Interconnectivité
                        </h4>
                    </div>
                    <div className="flex items-center gap-10 font-mono text-xs opacity-50 group-hover:opacity-100 transition-all duration-500">
                        <div className="flex flex-col gap-1">
                            <span className="text-background/40 text-[9px] tracking-widest uppercase">Modèle</span>
                            <span className="text-background font-medium tracking-tight">Zero-Trust</span>
                        </div>
                        <div className="w-px h-10 bg-background/10" />
                        <div className="flex flex-col gap-1">
                            <span className="text-background/40 text-[9px] tracking-widest uppercase">Standard</span>
                            <span className="text-background font-medium tracking-tight">API-First</span>
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
