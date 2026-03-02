import { Network, TrendingUp, Layers, Scale } from 'lucide-react';

const issues = [
    { id: '01', icon: Network, title: 'Dépendances non maîtrisées', detail: 'Vendor lock-in et infrastructures opaques.' },
    { id: '02', icon: TrendingUp, title: 'Croissance improvisée', detail: 'Difficulté de passage à l\'échelle.' },
    { id: '03', icon: Layers, title: 'Complexité accumulée', detail: 'Dette technique paralysante.' },
    { id: '04', icon: Scale, title: 'Absence de standards', detail: 'Fragmentation des outils et méthodes.' },
];

export default function Problem() {
    return (
        <section className="py-24 sm:py-40 bg-foreground text-background overflow-hidden relative">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">

                {/* En-tête */}
                <div className="max-w-3xl mb-20 sm:mb-32">
                    <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-6 px-2 py-1 border border-accent/30 w-fit">
                        Diagnostic · Systémique
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
                        Le problème n'est pas le cloud.<br />
                        <span className="opacity-40">C'est l'absence de stratégie architecturale.</span>
                    </h2>
                </div>

                {/* Issues — liste numérotée */}
                <div className="divide-y divide-background/10">
                    {issues.map(({ id, title, detail }) => (
                        <div
                            key={id}
                            className="grid md:grid-cols-[100px_1fr_1fr] gap-6 py-10 group hover:bg-background/5 transition-colors -mx-4 px-4"
                        >
                            <span className="font-mono text-3xl font-bold opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all pt-1">
                                {id}
                            </span>
                            <h3 className="text-xl font-bold tracking-tight self-center">{title}</h3>
                            <p className="opacity-60 leading-relaxed self-center">{detail}</p>
                        </div>
                    ))}
                </div>

                {/* Phrase signature */}
                <div className="mt-20 sm:mt-32 pt-16 border-t border-background/10">
                    <blockquote className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight opacity-80 max-w-3xl">
                        "Sans architecture,<br />
                        <span className="opacity-100 italic">la croissance devient fragilité."</span>
                    </blockquote>
                </div>

            </div>
        </section>
    );
}
