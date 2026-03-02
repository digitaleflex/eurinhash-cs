const issues = [
    { id: '01', title: 'Dépendances non maîtrisées', detail: 'Vendor lock-in et infrastructures opaques.' },
    { id: '02', title: 'Croissance improvisée', detail: 'Difficulté de passage à l\'échelle.' },
    { id: '03', title: 'Complexité accumulée', detail: 'Dette technique paralysante.' },
    { id: '04', title: 'Absence de standards', detail: 'Fragmentation des outils et méthodes.' },
];

export default function Problem() {
    return (
        <section className="py-24 sm:py-40 bg-foreground text-background overflow-hidden relative">
            <div className="mx-auto max-w-6xl px-4 sm:px-8">

                <div className="max-w-4xl mb-20">
                    <span className="font-mono text-xs text-accent tracking-tight font-medium block mb-8">
                        Diagnostic
                    </span>
                    <h2 className="font-black tracking-tight leading-tight text-background">
                        Le problème n'est pas le cloud.<br />
                        <span className="text-background/25 italic">C'est l'absence de structure.</span>
                    </h2>
                </div>

                <div className="border-t border-background/15">
                    {issues.map(({ id, title, detail }) => (
                        <div
                            key={id}
                            className="grid md:grid-cols-[120px_1fr_1fr] gap-8 py-10 group hover:bg-background/[0.04] transition-all duration-500 border-b border-background/5 px-2"
                        >
                            <span className="font-mono text-xs font-medium text-accent/60 tracking-tight self-center">
                                {id}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-background group-hover:text-accent transition-colors duration-300">
                                {title}
                            </h3>
                            <p className="text-background/45 text-sm leading-relaxed self-center">
                                {detail}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 pt-16 border-t border-background/15 flex flex-col md:flex-row items-end justify-between gap-10">
                    <blockquote className="max-w-3xl">
                        <p className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug text-background/90">
                            "Sans architecture, la croissance<br />
                            devient <span className="text-accent underline decoration-2 underline-offset-4">fragilité</span>."
                        </p>
                    </blockquote>
                    <span className="font-mono text-[10px] text-background/20 tracking-tight shrink-0">
                        EHAF · Diagnostic-01
                    </span>
                </div>

            </div>
        </section>
    );
}
