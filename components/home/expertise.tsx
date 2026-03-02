import Link from 'next/link';

export default function Expertise() {
    return (
        <section className="py-24 sm:py-40 bg-background border-b border-foreground/5 relative overflow-hidden">
            {/* Motif Blueprint discret pour la section */}
            <div className="absolute inset-0 bg-blueprint-pattern opacity-[0.2] pointer-events-none" />

            <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 relative z-10">
                <div className="mb-20 sm:mb-32">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em] block mb-6">
                        Domaines d'intervention · Expertise
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-8 max-w-4xl">
                        Ingénierie & Transformation.
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                        Solutions techniques de haut niveau pour répondre aux enjeux de souveraineté et de croissance. Plus qu'une prestation : une transformation durable de vos architectures.
                    </p>
                </div>

                <div className="divide-y divide-foreground/5 mb-16 border-t border-foreground/5">
                    {/* Bloc Large 1 */}
                    <div className="group py-16 flex flex-col md:flex-row gap-8 items-start md:items-center -mx-4 px-4 hover:bg-foreground/[0.015] transition-colors">
                        <div className="w-48 flex-shrink-0">
                            <span className="font-mono text-[11px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
                                [ ARCH-01 ]
                            </span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 group-hover:text-accent transition-colors">
                                Architecture Cloud Hybride
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
                                Coexistence élégante du cloud public et des infrastructures locales. Conception de systèmes résilients qui garantissent la maîtrise totale des données critiques.
                            </p>
                            <div className="flex flex-wrap gap-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
                                <span className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-accent/50" />
                                    Souveraineté des données
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-accent/50" />
                                    Continuité d'activité
                                </span>
                            </div>
                        </div>
                        <div className="hidden lg:block text-right">
                            <Link href="/start-project" className="text-[10px] font-mono font-bold uppercase tracking-widest hover:text-accent transition-colors">
                                Planifier un audit →
                            </Link>
                        </div>
                    </div>

                    {/* Bloc Large 2 */}
                    <div className="group py-16 flex flex-col md:flex-row gap-8 items-start md:items-center -mx-4 px-4 hover:bg-foreground/[0.015] transition-colors">
                        <div className="w-48 flex-shrink-0">
                            <span className="font-mono text-[11px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
                                [ ARCH-02 ]
                            </span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 group-hover:text-accent transition-colors">
                                Ingénierie SaaS Multi-tenant
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
                                Industrialisation de plateformes logicielles massives. Isolation totale des données et gestion unifiée pour des structures s'adressant au marché global.
                            </p>
                            <div className="flex flex-wrap gap-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
                                <span className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-accent/50" />
                                    Isolation par client
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-accent/50" />
                                    Passage à l'échelle (Scale)
                                </span>
                            </div>
                        </div>
                        <div className="hidden lg:block text-right">
                            <Link href="/projects" className="text-[10px] font-mono font-bold uppercase tracking-widest hover:text-accent transition-colors">
                                Voir les initiatives →
                            </Link>
                        </div>
                    </div>

                    {/* Bloc Large 3 */}
                    <div className="group py-16 flex flex-col md:flex-row gap-8 items-start md:items-center -mx-4 px-4 hover:bg-foreground/[0.015] transition-colors">
                        <div className="w-48 flex-shrink-0">
                            <span className="font-mono text-[11px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
                                [ ARCH-03 ]
                            </span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 group-hover:text-accent transition-colors">
                                Standardisation & Blueprints
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
                                Création de frameworks internes et de socles techniques reproductibles. Passer de l'artisanat de code à l'ingénierie systémique.
                            </p>
                            <div className="flex flex-wrap gap-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
                                <span className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-accent/50" />
                                    Conventions techniques
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-accent/50" />
                                    Gouvernance du code
                                </span>
                            </div>
                        </div>
                        <div className="hidden lg:block text-right">
                            <Link href="/contact" className="text-[10px] font-mono font-bold uppercase tracking-widest hover:text-accent transition-colors">
                                Demander un blueprint →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Résumé des capacités critiques remplaçant les 2 petits blocs */}
                <div className="bg-foreground flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-12 text-background mt-20">
                    <div className="flex-1">
                        <h4 className="text-xl font-bold tracking-tight mb-2">Capacités transverses critiques</h4>
                        <p className="text-background/60 font-medium">Sécurité systémique organisationnelle et interconnectivité multi-régions des systèmes d'informations.</p>
                    </div>
                    <div className="flex items-center gap-8 font-mono text-[10px] uppercase tracking-widest opacity-60">
                        <span className="flex flex-col gap-1 items-start">
                            <span className="font-bold text-white text-base">TLS / IAM</span>
                            Protocoles Isolation
                        </span>
                        <div className="w-px h-8 bg-background/20" />
                        <span className="flex flex-col gap-1 items-start">
                            <span className="font-bold text-white text-base">API / VPN</span>
                            Passerelles Sync
                        </span>
                    </div>
                </div>

            </div>
        </section>
    );
}
