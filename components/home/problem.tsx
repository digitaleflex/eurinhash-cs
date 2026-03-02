const issues = [
    { id: '01', title: 'Dépendances non maîtrisées', detail: 'Vendor lock-in et infrastructures opaques.' },
    { id: '02', title: 'Croissance improvisée', detail: 'Difficulté de passage à l\'échelle.' },
    { id: '03', title: 'Complexité accumulée', detail: 'Dette technique paralysante.' },
    { id: '04', title: 'Absence de standards', detail: 'Fragmentation des outils et méthodes.' },
];

export default function Problem() {
    return (
        <section className="py-24 sm:py-48 bg-foreground text-background overflow-hidden relative">
            <div className="mx-auto max-w-6xl px-4 sm:px-8">

                {/* En-tête Monochrome */}
                <div className="max-w-4xl mb-32">
                    <span className="font-mono text-[10px] text-accent uppercase tracking-[0.5em] font-black block mb-12">
                        Diagnostic Systémique
                    </span>
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none uppercase">
                        Le problème n'est pas le cloud.<br />
                        <span className="text-background/20 italic">C'est l'absence de structure.</span>
                    </h2>
                </div>

                {/* Issues — Tableau technique Brutal */}
                <div className="border-t border-background/20">
                    {issues.map(({ id, title, detail }) => (
                        <div
                            key={id}
                            className="grid md:grid-cols-[150px_1fr_1fr] gap-12 py-16 group hover:bg-background/[0.05] transition-all duration-1000 border-b border-background/5"
                        >
                            <span className="font-mono text-[10px] font-black text-accent tracking-[0.4em]">
                                [ PHASE-{id} ]
                            </span>
                            <div>
                                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 group-hover:pl-4 transition-all duration-1000 ease-out">
                                    {title}
                                </h3>
                            </div>
                            <p className="text-background/40 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] leading-relaxed self-center">
                                {detail}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Signature Block */}
                <div className="mt-32 pt-24 border-t border-background/20 flex flex-col md:flex-row items-end justify-between gap-12">
                    <blockquote className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase max-w-4xl opacity-90 italic">
                        "Sans architecture,<br />
                        la croissance devient <span className="text-accent underline decoration-2 underline-offset-8">fragilité</span>."
                    </blockquote>
                    <span className="font-mono text-[9px] text-background/20 uppercase tracking-[0.5em]">
                        Diagnostic Document · EHAF-01
                    </span>
                </div>

            </div>
        </section>
    );
}
