'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cpu, Server, Network, Shield, ArrowRight, Zap, Database, Terminal } from 'lucide-react';

const techPoints = [
    { icon: Cpu, label: 'Frontend', value: 'Next.js (Server-First)' },
    { icon: Terminal, label: 'Orchestration', value: 'Docker + Traefik' },
    { icon: Database, label: 'Persistance', value: 'PostgreSQL (Isolated)' },
    { icon: Zap, label: 'CI/CD', value: 'GitHub Actions' },
];

const phases = [
    { label: 'Cloud Public', value: 'Vercel + DB Managée', desc: 'Scalabilité maximale, déploiement immédiat.' },
    { label: 'VPS Contrôlé', value: 'Docker + Traefik', desc: 'Maîtrise totale, infrastructure souveraine.' },
    { label: 'Modèle Mixte', value: 'Hybride', desc: 'Le meilleur des deux mondes selon la criticité.' },
];

const nextSteps = [
    { id: '01', text: 'Formalisation complète de l’architecture cloud hybride' },
    { id: '02', text: 'Mise en place d’un environnement pilote' },
    { id: '03', text: 'Documentation complète du modèle de déploiement' },
    { id: '04', text: 'Définition d’une offre minimale viable (MVP)' },
];

export default function FlexHostPage() {
    return (
        <main className="bg-background min-h-screen pt-32 pb-48">
            <div className="mx-auto max-w-5xl px-4 sm:px-8">

                {/* ── HEADER INITIATIVE ── */}
                <header className="mb-48">
                    <div className="flex items-center gap-6 mb-12">
                        <Link href="/initiatives" className="font-mono text-[9px] text-foreground/30 uppercase tracking-tight hover:text-accent transition-colors">
                            ← Retour Initiatives
                        </Link>
                        <div className="h-px flex-1 bg-foreground/5" />
                        <span className="font-mono text-[9px] text-accent font-black uppercase tracking-tight">
                            EHAF-INFRA-01
                        </span>
                    </div>

                    <div className="space-y-8">
                        <span className="font-mono text-[10px] text-accent font-black uppercase tracking-tight block">
                            Pilier I — Infrastructure
                        </span>
                        <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
                            FlexHOST.
                        </h1>
                        <div className="flex flex-wrap gap-8 items-center border-t border-foreground/5 pt-8 font-mono text-[9px] uppercase tracking-tight text-foreground/40">
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-accent" />
                                Statut : CONCEPTION
                            </span>
                            <span>Mise à jour : Mars 2026</span>
                            <span>Version : 1.0</span>
                        </div>
                    </div>
                </header>

                {/* ── SECTION 1: VISION ── */}
                <section className="mb-48" aria-labelledby="vision">
                    <div className="grid md:grid-cols-[1fr_2fr] gap-12 sm:gap-24">
                        <div className="space-y-6">
                            <div className="w-16 h-px bg-accent" />
                            <h2 id="vision" className="text-4xl font-black uppercase tracking-tighter">Vision du produit</h2>
                        </div>
                        <div className="space-y-12">
                            <p className="text-xl sm:text-2xl font-medium text-foreground/80 leading-relaxed italic">
                                &quot;FLEXHOST vise à proposer une infrastructure cloud modulaire, maîtrisée et adaptable, destinée aux organisations souhaitant réduire leur dépendance technologique.&quot;
                            </p>
                            <div className="grid sm:grid-cols-2 gap-8">
                                {[
                                    'Isolation des environnements',
                                    'Containerisation progressive',
                                    'Standardisation des déploiements',
                                    'Maîtrise totale des flux de données',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-8 h-8 flex items-center justify-center bg-foreground/[0.03] text-foreground/20 group-hover:bg-accent group-hover:text-background transition-colors">
                                            <Shield className="w-4 h-4" />
                                        </div>
                                        <span className="text-[11px] font-black uppercase tracking-tight text-foreground/60 transition-colors group-hover:text-foreground">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── SECTION 2: ARCHITECTURE (DIAGRAMME) ── */}
                <section className="mb-48 bg-foreground/[0.015] border border-foreground/5 p-8 sm:p-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 font-mono text-[10px] text-foreground/5 uppercase tracking-tight select-none">
                        Network Flow Blueprint
                    </div>

                    <div className="relative z-10 space-y-24">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black uppercase tracking-tighter">Architecture Technique</h2>
                            <p className="font-mono text-[10px] text-accent uppercase tracking-tight font-black italic">
                                Modèle de déploiement standardisé
                            </p>
                        </div>

                        {/* Visual Flow */}
                        <div className="flex flex-col items-center space-y-12 max-w-2xl mx-auto">
                            <div className="w-full p-6 border border-foreground/10 bg-background text-center font-mono text-xs uppercase tracking-tighter font-bold">
                                Client Traffic
                            </div>
                            <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
                            <div className="grid grid-cols-2 gap-8 w-full">
                                <div className="p-8 border border-accent bg-accent/5 flex flex-col items-center gap-4 text-center">
                                    <Server className="w-6 h-6 text-accent" />
                                    <span className="font-mono text-[10px] font-black uppercase tracking-tight">Master Proxy</span>
                                </div>
                                <div className="p-8 border border-foreground/10 bg-background/50 flex flex-col items-center gap-4 text-center">
                                    <Shield className="w-6 h-6 text-foreground/20" />
                                    <span className="font-mono text-[10px] font-black uppercase tracking-tight">Protocol Isolation</span>
                                </div>
                            </div>
                            <div className="w-px h-12 bg-foreground/10" />
                            <div className="w-full p-8 border border-foreground text-background bg-foreground flex flex-col items-center gap-4 text-center shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                                <span className="font-black uppercase tracking-tighter text-lg">System Core</span>
                                <span className="font-mono text-[10px] opacity-50 uppercase tracking-tight">Operational Application Layer</span>
                            </div>
                            <div className="w-px h-12 bg-foreground/10" />
                            <div className="w-full p-8 border border-foreground/10 bg-background/20 flex items-center justify-between gap-8">
                                <div className="flex items-center gap-4">
                                    <Database className="w-5 h-5 text-accent" />
                                    <span className="font-mono text-[11px] font-black uppercase">Persistent Storage</span>
                                </div>
                                <div className="h-px flex-1 bg-foreground/5 border-t border-dashed border-foreground/10" />
                                <span className="font-mono text-[9px] text-foreground/30 uppercase">Isolated Network</span>
                            </div>
                        </div>

                        {/* Tech Stack List */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-foreground/5">
                            {techPoints.map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <span className="font-mono text-[9px] text-foreground/20 uppercase tracking-tighter">{item.label}</span>
                                    <div className="flex items-center gap-3">
                                        <item.icon className="w-4 h-4 text-accent" />
                                        <span className="text-[11px] font-black uppercase tracking-tight">{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SECTION 3: MODÈLE D'HÉBERGEMENT ── */}
                <section className="mb-48" aria-labelledby="hosting">
                    <div className="flex items-center gap-6 mb-16">
                        <span className="font-mono text-[10px] text-accent font-black uppercase tracking-tight">Modèles</span>
                        <div className="h-px flex-1 bg-foreground/5" />
                    </div>
                    <div className="grid md:grid-cols-3 gap-px bg-foreground/5 border border-foreground/5">
                        {phases.map((phase, i) => (
                            <div key={i} className="bg-background p-10 space-y-6 hover:bg-foreground/[0.015] transition-colors">
                                <span className="font-mono text-[10px] text-foreground/20 uppercase tracking-tight">Option 0{i + 1}</span>
                                <h3 className="text-xl font-black uppercase tracking-tighter text-accent">{phase.label}</h3>
                                <div className="font-mono text-[11px] font-black uppercase tracking-tight">{phase.value}</div>
                                <p className="text-xs text-muted-foreground leading-relaxed uppercase tracking-tight">{phase.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── SECTION 4/5/6: INFOS FINALES ── */}
                <div className="grid md:grid-cols-2 gap-24">
                    {/* Cible & Next Steps */}
                    <div className="space-y-16">
                        <div className="space-y-8">
                            <h2 className="text-2xl font-black uppercase tracking-tighter border-b border-foreground/5 pb-4">Prochaines Étapes</h2>
                            <div className="space-y-1">
                                {nextSteps.map((step) => (
                                    <div key={step.id} className="grid grid-cols-[40px_1fr] gap-6 py-4 group">
                                        <span className="font-mono text-[10px] text-accent font-black">{step.id} —</span>
                                        <span className="text-[11px] font-bold uppercase tracking-tight text-foreground/70 group-hover:text-foreground transition-colors">
                                            {step.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Résumé stratégique */}
                    <div className="space-y-8 bg-foreground text-background p-12 lg:p-16">
                        <span className="font-mono text-[10px] text-accent font-black uppercase tracking-tight block">Conclusion</span>
                        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
                            Réversibilité Totale.
                        </h2>
                        <p className="text-sm font-medium leading-loose opacity-60 uppercase tracking-tight italic">
                            &quot;FLEXHOST n’est pas attaché à un fournisseur unique. Le système est conçu pour être déplacé au besoin, garantissant l&apos;indépendance souveraine de chaque organisation.&quot;
                        </p>
                        <div className="h-px w-16 bg-accent/40" />
                        <div className="font-mono text-[9px] uppercase tracking-tight text-accent font-black">
                            System Sovereignty Guaranteed
                        </div>
                    </div>
                </div>

                {/* ── FOOTER SIGNATURE ── */}
                <footer className="mt-48 pt-24 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-12">
                    <p className="font-mono text-[9px] text-foreground/20 uppercase tracking-tight text-center md:text-left leading-relaxed">
                        FLEXHOST-SPEC-01 — EHAF INFRASTRUCTURE <br />
                        Mars 2026 — EurinHash CS Mainframe
                    </p>
                    <Link href="/initiatives" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-tight text-accent hover:text-foreground transition-colors">
                        Toutes les initiatives
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </footer>

            </div>
        </main>
    );
}
