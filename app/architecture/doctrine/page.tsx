import { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert, Cloud, Zap, ArrowRight, XCircle, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Doctrine Architecturale — EurinHash v1.0',
    description: 'Les principes idéologiques et techniques qui dirigent la conception des systèmes EurinHash.',
};

const favors = [
    'La séparation stricte des responsabilités',
    'Les architectures server-first',
    'Les systèmes modulaires',
    'Les dépendances explicites',
    'Les standards réutilisables',
];

const refuses = [
    'Le mélange UI / logique métier',
    'Les architectures improvisées',
    'La dépendance opaque aux services externes',
    'Le “move fast” sans structure',
    'Les décisions techniques basées sur la mode',
];

const sections = [
    {
        id: '03',
        title: 'Approche du Cloud',
        icon: Cloud,
        content: `Le cloud n’est pas un produit. C’est une infrastructure. Je le considère comme un levier d’abstraction et un outil de scalabilité, mais jamais comme une dépendance aveugle. Principe fondamental : toute dépendance cloud doit être documentée, maîtrisée et réversible.`,
        model: 'Modèle hybride : Cloud public pour la scalabilité, Infrastructure contrôlée pour la maîtrise.',
    },
    {
        id: '04',
        title: 'Approche de la Sécurité',
        icon: ShieldAlert,
        content: `La sécurité n’est pas un module. C’est une couche transversale. Elle repose sur le moindre privilège, la séparation des environnements, la validation stricte et la réduction des surfaces d’attaque.`,
        model: 'Une architecture non sécurisée n’est pas un système. C’est une fragilité latente.',
    },
    {
        id: '05',
        title: 'Approche de la Scalabilité',
        icon: Zap,
        content: `La scalabilité ne consiste pas à ajouter des serveurs. Elle consiste à concevoir des systèmes modulaires, isoler les responsabilités et réduire les dépendances croisées.`,
        model: 'Un système bien conçu scale naturellement. Un système mal structuré s’effondre.',
    },
];

export default function DoctrinePage() {
    return (
        <main className="bg-background min-h-screen pt-32 pb-48 overflow-hidden">
            <div className="mx-auto max-w-5xl px-4 sm:px-8">

                {/* ── HEADER IDÉOLOGIQUE ── */}
                <header className="mb-48 relative">
                    <div className="absolute -left-24 top-0 text-[12rem] font-black text-foreground/[0.02] select-none pointer-events-none hidden lg:block">
                        DOC
                    </div>

                    <div className="flex items-center gap-6 mb-12">
                        <Link href="/vision" className="font-mono text-[9px] text-foreground/30 uppercase tracking-tight hover:text-accent transition-colors">
                            ← Retour Vision
                        </Link>
                        <div className="h-px flex-1 bg-foreground/5" />
                        <span className="font-mono text-[9px] text-accent font-black uppercase tracking-tight">
                            VERS-1.0-DOC
                        </span>
                    </div>

                    <div className="space-y-8 relative z-10">
                        <span className="font-mono text-[10px] text-accent font-black uppercase tracking-tight block">
                            Cœur Idéologique
                        </span>
                        <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
                            Doctrine.
                        </h1>
                        <p className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground/60 max-w-2xl">
                            Un système se conçoit. Il ne s&apos;improvise pas.
                        </p>
                    </div>
                </header>

                {/* ── SECTION 1 & 2: OUI / NON (COMPARAISON BRUTALE) ── */}
                <section className="mb-48 grid md:grid-cols-2 gap-px bg-foreground/5 border border-foreground/5">
                    {/* PRIVILÉGIÉS */}
                    <div className="bg-background p-8 sm:p-12 space-y-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-accent">
                                <CheckCircle2 className="w-6 h-6" />
                                <h2 className="text-2xl font-black uppercase tracking-tighter">Approches Privilégiées</h2>
                            </div>
                            <p className="font-mono text-[10px] text-foreground/30 uppercase tracking-tight">
                                Pour la pérennité structurelle
                            </p>
                        </div>
                        <ul className="space-y-6">
                            {favors.map((item, i) => (
                                <li key={i} className="flex gap-4 group">
                                    <span className="font-mono text-[10px] text-accent font-black">{String(i + 1).padStart(2, '0')} —</span>
                                    <span className="text-sm font-bold uppercase tracking-wide text-foreground/70 group-hover:text-foreground transition-colors leading-tight">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* REFUSÉS */}
                    <div className="bg-foreground text-background p-8 sm:p-12 space-y-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-accent">
                                <XCircle className="w-6 h-6" />
                                <h2 className="text-2xl font-black uppercase tracking-tighter">Pratiques Refusées</h2>
                            </div>
                            <p className="font-mono text-[10px] text-background/30 uppercase tracking-tight">
                                Pour éviter l&apos;effondrement
                            </p>
                        </div>
                        <ul className="space-y-6">
                            {refuses.map((item, i) => (
                                <li key={i} className="flex gap-4 group">
                                    <span className="font-mono text-[10px] text-accent font-black">{String(i + 1).padStart(2, '0')} —</span>
                                    <span className="text-sm font-bold uppercase tracking-wide text-background/60 group-hover:text-background transition-colors leading-tight">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ── SECTION 3, 4, 5: POSITIONNEMENTS ── */}
                <div className="space-y-32 mb-48">
                    {sections.map((section) => (
                        <section key={section.id} className="relative">
                            <div className="grid md:grid-cols-[1fr_2fr] gap-12 sm:gap-24">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 flex items-center justify-center bg-foreground text-background">
                                            <section.icon className="w-6 h-6" />
                                        </div>
                                        <span className="font-mono text-[11px] text-accent font-black tracking-tight">{section.id}</span>
                                    </div>
                                    <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
                                        {section.title}
                                    </h2>
                                </div>
                                <div className="space-y-12">
                                    <p className="text-lg sm:text-xl font-medium text-foreground/80 leading-relaxed italic">
                                        &quot;{section.content}&quot;
                                    </p>
                                    <div className="p-8 border-l-2 border-accent bg-foreground/[0.02]">
                                        <span className="font-mono text-[9px] text-foreground/30 uppercase tracking-tight block mb-4">Principe Actif</span>
                                        <p className="text-sm font-black uppercase tracking-tight leading-loose">
                                            {section.model}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>

                {/* ── PRINCIPE CENTRAL (FULL WIDTH) ── */}
                <section className="mb-48 relative overflow-hidden bg-foreground text-background p-12 sm:p-24">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none">
                        <svg width="200" height="200" viewBox="0 0 100 100" className="rotate-45">
                            <rect x="10" y="10" width="80" height="80" stroke="currentColor" fill="none" strokeWidth="0.5" />
                            <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="0.5" />
                        </svg>
                    </div>

                    <div className="relative z-10 space-y-12 max-w-3xl">
                        <span className="font-mono text-[10px] text-accent font-black uppercase tracking-tight">Axiome Central</span>
                        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-tight">
                            La durabilité est une conséquence de la structure.
                        </h2>
                        <div className="h-px w-24 bg-accent" />
                        <p className="text-xl text-background/50 uppercase tracking-tight font-mono">
                            Pas de la technologie utilisée.
                        </p>
                    </div>
                </section>

                {/* ── VERSION CONDENSÉE (GRID) ── */}
                <section className="mb-48" aria-labelledby="condensed">
                    <div className="flex items-center gap-6 mb-16">
                        <span className="font-mono text-[10px] text-foreground/30 uppercase tracking-tight">Manifeste</span>
                        <div className="h-px flex-1 bg-foreground/5" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/5 border border-foreground/5">
                        {[
                            { t: 'Architecture', sub: 'Avant technologie' },
                            { t: 'Structure', sub: 'Avant vitesse' },
                            { t: 'Maîtrise', sub: 'Avant dépendance' },
                            { t: 'Documentation', sub: 'Avant complexité' },
                        ].map((item, i) => (
                            <div key={i} className="bg-background p-8 text-center space-y-4">
                                <span className="text-xl font-black uppercase tracking-tighter block">{item.t}</span>
                                <span className="font-mono text-[8px] text-accent uppercase tracking-tight font-black">{item.sub}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── FOOTER SIGNATURE ── */}
                <footer className="pt-24 border-t border-foreground/5 text-center sm:text-left">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-4">
                            <p className="text-sm font-black uppercase tracking-tight">
                                Doctrine Architecturale v1.0
                            </p>
                            <p className="text-[10px] font-mono text-foreground/20 uppercase tracking-tight">
                                Document non négociable · EurinHash Foundation
                            </p>
                        </div>
                        <Link
                            href="/initiatives"
                            className="group flex items-center gap-6 bg-foreground text-background px-8 py-4 text-[10px] font-mono uppercase tracking-tight hover:bg-accent transition-colors"
                        >
                            Appliquer la doctrine
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </footer>

            </div>
        </main>
    );
}
