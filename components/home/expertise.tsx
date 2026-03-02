import Link from 'next/link';

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
        details: ['Conventions techniques', 'CI/CD Immuable', 'Observabilité']
    }
];

export default function Expertise() {
    return (
        <section className="py-24 sm:py-40 bg-background border-t border-foreground/5 relative overflow-hidden">
            <div className="mx-auto max-w-6xl px-4 sm:px-8 relative z-10">

                {/* Header de section technique */}
                <div className="flex items-center gap-6 mb-24">
                    <span className="font-mono text-[10px] text-accent font-black uppercase tracking-[0.5em]">Expertise</span>
                    <div className="h-px flex-1 bg-foreground/5" />
                    <span className="font-mono text-[10px] text-foreground/20 uppercase tracking-[0.3em]">[ 03 FIELDS · EHAF ]</span>
                </div>

                {/* Liste façon nomenclature technique - Brutal */}
                <div className="divide-y divide-foreground/5 border-y border-foreground/5 mb-32">
                    {items.map((item, idx) => (
                        <div key={idx} className="group py-16 grid md:grid-cols-[1fr_2.5fr_1.5fr] gap-12 items-start hover:bg-foreground/[0.015] transition-all duration-700">
                            {/* Identifiant Monochrome */}
                            <div className="font-mono text-[11px] text-foreground/30 tracking-widest pt-1 font-bold">
                                [ ARCH-{item.id} ]
                            </div>

                            {/* Contenu - Brutal Typography */}
                            <div>
                                <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 group-hover:text-accent transition-colors duration-700">
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed max-w-lg text-sm sm:text-base">
                                    {item.description}
                                </p>
                            </div>

                            {/* Tags Techniques - Surgical Blue */}
                            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-1">
                                {item.details.map((detail, dIdx) => (
                                    <div key={dIdx} className="flex items-center gap-2 group/tag">
                                        <div className="w-1.5 h-1.5 bg-accent/20 group-hover/tag:bg-accent transition-all duration-500" />
                                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40 group-hover/tag:text-foreground/80 transition-colors">
                                            {detail}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Socle transversal - Brutal Bar Block */}
                <div className="bg-foreground text-background p-10 sm:p-16 flex flex-col md:flex-row items-center justify-between gap-16 group transition-all duration-1000 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="space-y-4 text-center md:text-left">
                        <span className="font-mono text-[10px] text-accent uppercase tracking-[0.5em] font-black">Capacités Transverses</span>
                        <h4 className="text-3xl font-black uppercase tracking-tighter leading-none">
                            Sécurité & <br /> Interconnectivité
                        </h4>
                    </div>
                    <div className="flex items-center gap-12 font-mono text-[10px] uppercase tracking-[0.3em] opacity-30 group-hover:opacity-100 transition-all duration-1000">
                        <div className="flex flex-col gap-2">
                            <span className="text-background/50">SEC-OPS</span>
                            <span className="text-white font-black">ZERO-TRUST</span>
                        </div>
                        <div className="w-px h-12 bg-background/10" />
                        <div className="flex flex-col gap-2">
                            <span className="text-background/50">DATA-INT</span>
                            <span className="text-white font-black">API-FIRST</span>
                        </div>
                    </div>
                </div>

                <div className="mt-20 flex justify-center">
                    <Link
                        href="/initiatives"
                        className="font-mono text-[10px] text-foreground/30 uppercase tracking-[0.4em] hover:text-accent transition-colors py-4 border-b border-transparent hover:border-accent"
                    >
                        Explorer les initiatives techniques →
                    </Link>
                </div>
            </div>
        </section>
    );
}
