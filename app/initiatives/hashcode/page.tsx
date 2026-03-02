import { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, BookOpen, Target, ArrowRight, CheckCircle2, Search, Trophy } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Hashcode — Eurin Hash CS',
    description: 'Programme de formation et de mentorat architectural Hashcode. Apprentissage par la structure.',
};

const modules = [
    { id: '01', title: 'Fondamentaux du Web', desc: 'Protocoles, sémantique et structures de base.' },
    { id: '02', title: 'Introduction au cloud', desc: 'Abstraction, virtualisation et orchestration.' },
    { id: '03', title: 'Bases en cybersécurité', desc: 'Hygiène numérique, vecteurs d\'attaque et défense.' },
    { id: '04', title: 'Architecture applicative', desc: 'Standards EHAF, séparation des responsabilités.' },
    { id: '05', title: 'Projet encadré', desc: 'Conception et réalisation d\'un système complet.' },
];

const methodology = [
    { icon: Search, label: 'Observer', value: 'Comprendre avant d\'implémenter.' },
    { icon: BookOpen, label: 'Documenter', value: 'Documenter avant d\'exécuter.' },
    { icon: Target, label: 'Structurer', value: 'Structurer avant d\'optimiser.' },
];

const criteria = [
    'Observation initiale',
    'Participation active',
    'Engagement mesurable',
    'Constance technique',
];

export default function HashcodePage() {
    return (
        <main className="bg-background text-foreground min-h-screen pt-28 pb-40">
            <div className="mx-auto max-w-5xl px-4 sm:px-8">

                {/* Header */}
                <header className="mb-24">
                    <div className="flex items-center gap-6 mb-10">
                        <Link href="/initiatives" className="font-mono text-xs text-foreground/30 hover:text-accent transition-colors tracking-tight">
                            ← Initiatives
                        </Link>
                        <div className="h-px flex-1 bg-foreground/5" />
                        <span className="font-mono text-xs text-accent font-medium tracking-tight">
                            EHAF-EDU-01
                        </span>
                    </div>

                    <div className="space-y-6">
                        <span className="font-mono text-xs text-accent font-medium tracking-tight block">
                            Pilier III — Formation & Communauté
                        </span>
                        <h1 className="font-black tracking-tight text-foreground">
                            Hashcode.
                        </h1>
                        <div className="flex flex-wrap gap-6 items-center border-t border-foreground/5 pt-6 font-mono text-xs text-foreground/35 tracking-tight">
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-accent rounded-full inline-block" />
                                En structuration
                            </span>
                            <span>Mars 2026</span>
                            <span>Programme v1.0</span>
                        </div>
                    </div>
                </header>

                {/* Philosophie */}
                <section className="mb-24 grid md:grid-cols-[1fr_2fr] gap-12 sm:gap-20 border-t border-foreground/5 pt-16" aria-labelledby="objectif">
                    <div className="space-y-4">
                        <div className="w-8 h-0.5 bg-accent" />
                        <h2 id="objectif" className="text-xl font-bold tracking-tight">
                            Philosophie de formation
                        </h2>
                    </div>
                    <div className="space-y-6">
                        <blockquote className="border-l-4 border-foreground pl-6 py-2">
                            <p className="text-base sm:text-lg font-semibold text-foreground leading-relaxed">
                                "Hashcode ne vise pas à produire des développeurs rapides.
                                Il vise à former des architectes capables de concevoir des systèmes durables."
                            </p>
                        </blockquote>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            On privilégie la discipline et la constance plutôt que le niveau technique initial.
                            L'architecture est une école de la pensée avant d'être une maîtrise d'outils.
                        </p>
                    </div>
                </section>

                {/* Syllabus */}
                <section className="mb-24" aria-labelledby="syllabus">
                    <div className="flex items-center gap-4 mb-10">
                        <span className="font-mono text-xs text-accent font-medium tracking-tight">Syllabus v1.0</span>
                        <div className="h-px flex-1 bg-foreground/5" />
                    </div>

                    <div className="divide-y divide-foreground/5 border-y border-foreground/5">
                        {modules.map((module) => (
                            <div key={module.id} className="grid md:grid-cols-[80px_1fr_2fr] gap-6 py-8 group hover:bg-foreground/[0.015] transition-colors items-center px-2">
                                <span className="font-mono text-xs text-foreground/20 group-hover:text-accent transition-colors font-medium">
                                    MOD-{module.id}
                                </span>
                                <h3 className="text-base font-bold tracking-tight group-hover:text-accent transition-colors">
                                    {module.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {module.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Méthode & Sélection */}
                <section className="mb-24 grid md:grid-cols-2 gap-16">
                    {/* Méthode */}
                    <div className="space-y-8">
                        <h2 className="text-xl font-bold tracking-tight">Méthode pédagogique</h2>
                        <div className="space-y-6">
                            {methodology.map((m, i) => (
                                <div key={i} className="flex gap-5 items-start">
                                    <div className="w-10 h-10 shrink-0 border border-foreground/5 flex items-center justify-center bg-foreground/[0.02]">
                                        <m.icon className="w-4 h-4 text-accent" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <span className="font-mono text-[10px] text-foreground/30 tracking-tight block font-medium">{m.label}</span>
                                        <span className="text-sm font-semibold">{m.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sélection */}
                    <div className="bg-foreground text-background p-10 sm:p-12 space-y-8">
                        <div className="space-y-2">
                            <span className="font-mono text-xs text-accent font-medium tracking-tight block">Critères d'accès</span>
                            <h2 className="text-2xl font-bold tracking-tight text-background leading-tight">
                                Sélection sur engagement.
                            </h2>
                        </div>
                        <ul className="space-y-4">
                            {criteria.map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                                    <span className="text-sm text-background/80">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Vision long terme */}
                <section className="mb-24 border-t border-foreground/5 pt-16">
                    <div className="text-center max-w-2xl mx-auto space-y-8">
                        <Trophy className="w-10 h-10 mx-auto text-accent opacity-30" />
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                            Former des têtes, pas des bras.
                        </h2>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            L'objectif est de créer une communauté technique capable de porter
                            des projets d'envergure avec une rigueur architecturale absolue.
                        </p>
                    </div>
                </section>

                {/* Footer signature */}
                <footer className="pt-16 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-1 text-center md:text-left">
                        <p className="font-mono text-[10px] text-foreground/20 tracking-tight">
                            HASHCODE-PROTOCOL-01 · EDU-INFRA
                        </p>
                        <p className="font-mono text-[10px] text-foreground/10 tracking-tight">
                            EurinHash Foundation — 2026
                        </p>
                    </div>
                    <Link
                        href="/initiatives"
                        className="group inline-flex items-center gap-3 text-sm font-medium text-accent hover:text-foreground transition-colors"
                    >
                        Toutes les initiatives
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </footer>

            </div>
        </main>
    );
}
