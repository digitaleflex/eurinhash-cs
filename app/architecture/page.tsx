import Link from 'next/link';
import { ArrowRight, Layers, Shield, Terminal } from 'lucide-react';

const modules = [
    {
        id: 'EHAF',
        title: 'EHAF Framework',
        href: '/architecture/ehaf',
        desc: 'Le cadre méthodologique pour la conception de systèmes complexes et durables.',
        icon: Layers,
    },
    {
        id: 'DOCTRINE',
        title: 'Doctrine & Principes',
        href: '/architecture/doctrine',
        desc: 'Les règles fondamentales de décision et de structuration technique.',
        icon: Shield,
    },
    {
        id: 'STANDARDS',
        title: 'Standards Techniques',
        href: '/architecture/standards',
        desc: 'Normes de code, de déploiement et de sécurité applicables à tous nos systèmes.',
        icon: Terminal,
    },
];

const pillars = [
    { id: '01', title: 'Isolation', desc: 'Chaque composant fonctionne de façon autonome.' },
    { id: '02', title: 'Maîtrise', desc: 'Aucune dépendance sans audit préalable.' },
    { id: '03', title: 'Pérennité', desc: 'Concevoir pour un cycle de vie de 10 ans minimum.' },
];

export default function ArchitecturePage() {
    return (
        <main className="bg-background text-foreground min-h-screen pt-28 pb-40">
            <div className="mx-auto max-w-5xl px-4 sm:px-8">

                {/* Header */}
                <header className="mb-24 space-y-8">
                    <span className="font-mono text-xs text-accent tracking-tight font-medium block">
                        Pilier II — Comment ?
                    </span>
                    <h1 className="font-black tracking-tight text-foreground">
                        La méthode derrière<br />
                        <span className="text-foreground/25">chaque décision.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed font-normal" style={{ letterSpacing: '-0.01em' }}>
                        L'architecture n'est pas une étape du projet.
                        C'est le fondement à partir duquel tout le reste est construit.
                        Voici comment on pense, et ce qu'on applique systématiquement.
                    </p>
                </header>

                {/* Grille des modules */}
                <section className="mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <span className="font-mono text-xs text-muted-foreground tracking-tight">Modules méthodologiques</span>
                        <div className="h-px flex-1 bg-foreground/5" />
                    </div>
                    <div className="grid md:grid-cols-3 gap-px bg-foreground/5 border border-foreground/5">
                        {modules.map((m) => (
                            <Link
                                key={m.id}
                                href={m.href}
                                className="bg-background p-8 sm:p-10 group hover:bg-foreground/[0.02] transition-all space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <m.icon className="w-6 h-6 text-foreground/20 group-hover:text-accent transition-colors" />
                                    <span className="font-mono text-[10px] text-accent tracking-tight font-medium">{m.id}</span>
                                </div>
                                <h3 className="text-base font-bold tracking-tight group-hover:text-accent transition-colors">
                                    {m.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                                <div className="flex items-center gap-2 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-all pt-2 border-t border-foreground/5">
                                    Consulter <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Section doctrine */}
                <section className="bg-foreground text-background p-10 sm:p-16">
                    <div className="grid md:grid-cols-2 gap-16 items-start">
                        <div className="space-y-6">
                            <h2 className="font-black tracking-tight text-background leading-tight">
                                Structure<br />avant le code.
                            </h2>
                            <p className="text-base text-background/60 leading-relaxed font-normal">
                                "L'absence de planification architecturale est la première cause
                                de dette technique systémique."
                            </p>
                        </div>
                        <div className="space-y-6">
                            {pillars.map((p) => (
                                <div key={p.id} className="flex gap-6 items-start border-l border-background/15 pl-6">
                                    <span className="font-mono text-xs text-accent font-medium">{p.id}</span>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold text-background">{p.title}</h4>
                                        <p className="text-sm text-background/50 leading-relaxed">{p.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
