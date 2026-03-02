export default function Principles() {
    return (
        <section className="py-24 sm:py-40 bg-background border-b border-foreground/5">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">

                {/* En-tête */}
                <div className="mb-20 sm:mb-32">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em] block mb-6">
                        Doctrine · Fondation
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        Trois axiomes.
                    </h2>
                </div>

                {/* Axiomes */}
                <div className="divide-y divide-foreground/5">

                    <div className="grid md:grid-cols-[80px_1fr] gap-8 py-16">
                        <div>
                            <span className="font-mono text-5xl font-bold text-foreground/10 leading-none">I</span>
                        </div>
                        <div className="max-w-2xl">
                            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
                                Clarté architecturale
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Un système doit être explicite. Sa structure doit refléter sa fonction
                                sans ambiguïté ni complexité inutile. La clarté n'est pas une option —
                                c'est la première condition de la résilience.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-[80px_1fr] gap-8 py-16">
                        <div>
                            <span className="font-mono text-5xl font-bold text-foreground/10 leading-none">II</span>
                        </div>
                        <div className="max-w-2xl">
                            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
                                Maîtrise des dépendances
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Toute dépendance non maîtrisée est une dette stratégique.
                                La souveraineté technique exige une réduction délibérée
                                du verrouillage propriétaire et une visibilité totale sur
                                chaque composant du système.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-[80px_1fr] gap-8 py-16">
                        <div>
                            <span className="font-mono text-5xl font-bold text-foreground/10 leading-none">III</span>
                        </div>
                        <div className="max-w-2xl">
                            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
                                Évolutivité progressive
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Construire pour demain, déployer pour aujourd'hui. Les fondations
                                doivent absorber une croissance exponentielle sans refonte.
                                L'évolutivité se conçoit au départ — elle ne s'ajoute pas.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
