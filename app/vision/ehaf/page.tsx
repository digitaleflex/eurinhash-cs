import { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
    title: 'EHAF — EurinHash Architectural Framework v1.0',
    description: 'Spécification fondatrice du cadre architectural EHAF. Standardisation, structuration et déploiement de systèmes numériques maîtrisés.',
    openGraph: {
        title: 'EHAF v1.0 — Core Specification',
        description: 'Cadre architectural reproductible pour systèmes numériques souverains.',
        url: 'https://eurinhash.com/vision/ehaf',
        type: 'article',
    },
};

const problems = [
    { id: '01', text: 'Absence de structure initiale' },
    { id: '02', text: 'Mélange des responsabilités (UI, logique, data)' },
    { id: '03', text: 'Dépendances non maîtrisées' },
    { id: '04', text: 'Évolution non planifiée' },
    { id: '05', text: 'Dette technique rapide' },
];

const principles = [
    {
        id: 'I',
        name: 'Server-First Architecture',
        description: 'Les données sont traitées côté serveur par défaut. Le client est minimal.',
    },
    {
        id: 'II',
        name: 'Feature-First Organisation',
        description: 'La structure du projet suit les fonctionnalités, pas les technologies.',
    },
    {
        id: 'III',
        name: 'Clean Separation',
        description: 'Aucune couche ne mélange responsabilités.',
    },
    {
        id: 'IV',
        name: 'Strict Typing',
        description: 'TypeScript strict obligatoire. Validation via Zod.',
    },
    {
        id: 'V',
        name: 'Infrastructure as a Layer',
        description: 'La base de données, l\'authentification et les services externes sont isolés.',
    },
    {
        id: 'VI',
        name: 'Documentation First',
        description: 'Toute architecture doit être explicable en schéma simple.',
    },
];

const stack = [
    { label: 'Framework', value: 'Next.js (App Router)' },
    { label: 'Langage', value: 'TypeScript (strict mode)' },
    { label: 'Base de données', value: 'PostgreSQL' },
    { label: 'ORM', value: 'Prisma' },
    { label: 'Validation', value: 'Zod' },
    { label: 'Auth', value: 'Server-side auth' },
    { label: 'CI/CD', value: 'GitHub Actions' },
    { label: 'Containerisation', value: 'Docker' },
    { label: 'Proxy', value: 'Traefik' },
    { label: 'Hébergement', value: 'Cloud hybride (Vercel + VPS)' },
];

const roadmap = [
    { ref: 'EHAF-CORE', name: 'v1', description: 'Standardisation architecture Next.js', status: 'ACTIF' },
    { ref: 'EHAF-CLOUD', name: 'Cloud', description: 'Modèle cloud hybride reproductible', status: 'CONCEPTION' },
    { ref: 'EHAF-SEC', name: 'Security', description: 'Standard sécurité intégré', status: 'CONCEPTION' },
    { ref: 'EHAF-AI', name: 'AI', description: 'Intégration IA structurée', status: 'PLANIFIÉ' },
];

const layers = [
    { name: 'PRESENTATION', detail: 'UI · Pages · API Routes', accent: true },
    { name: 'APPLICATION', detail: 'Use Cases · Services', accent: false },
    { name: 'DOMAIN', detail: 'Business Logic · Rules', accent: false },
    { name: 'INFRASTRUCTURE', detail: 'DB · External Services', accent: false },
];

/**
 * EHAF v1.0 — Core Specification
 * Document fondateur du EurinHash Architectural Framework.
 * Présentation structurée en 7 sections scrollables.
 */
export default function EHAFPage() {
    return (
        <main className="bg-background min-h-screen pt-32 pb-48">
            <div className="mx-auto max-w-5xl px-4 sm:px-8">

                {/* ═══════════════════════════════════════════════════════
                    SECTION 0 — HEADER FONDATEUR
                ═══════════════════════════════════════════════════════ */}
                <header className="mb-48">
                    <div className="flex items-center gap-6 mb-12">
                        <Link href="/vision" className="font-mono text-[9px] text-foreground/30 uppercase tracking-[0.4em] hover:text-accent transition-colors">
                            ← Doctrine
                        </Link>
                        <div className="h-px flex-1 bg-foreground/5" />
                        <span className="font-mono text-[9px] text-accent font-black uppercase tracking-[0.4em]">
                            EHAF-ARCH-01
                        </span>
                    </div>

                    <div className="space-y-8">
                        <span className="font-mono text-[10px] text-accent uppercase tracking-[1em] font-black block">
                            Framework & Standards
                        </span>
                        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
                            EHAF
                        </h1>
                        <p className="text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground/60">
                            EurinHash Architectural Framework
                        </p>
                        <div className="flex items-center gap-8 font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/30 border-t border-foreground/5 pt-8">
                            <span>Version 1.0</span>
                            <span className="text-foreground/10">—</span>
                            <span>Core Specification</span>
                            <span className="text-foreground/10">—</span>
                            <span>Mars 2026</span>
                        </div>
                    </div>
                </header>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 1 — OBJECTIF DU FRAMEWORK
                ═══════════════════════════════════════════════════════ */}
                <section className="mb-48" aria-labelledby="objectif">
                    <div className="flex items-center gap-6 mb-16">
                        <span className="font-mono text-[10px] text-accent font-black uppercase tracking-[0.5em]">01</span>
                        <div className="h-px flex-1 bg-foreground/5" />
                    </div>
                    <h2 id="objectif" className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-12">
                        Objectif du Framework
                    </h2>

                    <p className="text-base sm:text-lg font-medium text-foreground/80 leading-relaxed max-w-3xl mb-12">
                        EHAF est un cadre architectural reproductible destiné à concevoir, structurer et déployer des systèmes numériques maîtrisés.
                    </p>

                    <blockquote className="border-l-2 border-accent pl-8 py-4 mb-16">
                        <p className="text-sm font-black uppercase tracking-widest text-foreground/60 leading-loose">
                            Standardiser la conception des architectures logicielles afin de garantir cohérence, scalabilité, sécurité et durabilité.
                        </p>
                    </blockquote>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/5 border border-foreground/5">
                        {['Pas une stack', 'Pas un template', 'Pas une boilerplate', 'Un cadre systémique'].map((item, i) => (
                            <div key={i} className={`bg-background p-6 sm:p-8 text-center ${i === 3 ? 'bg-foreground text-background' : ''}`}>
                                <span className={`font-mono text-[9px] uppercase tracking-[0.3em] font-bold ${i === 3 ? 'text-accent' : 'text-foreground/40'}`}>
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 grid md:grid-cols-2 gap-px bg-foreground/5 border border-foreground/5">
                        {[
                            'Organisation claire',
                            'Séparation stricte des responsabilités',
                            'Traçabilité architecturale',
                            'Croissance maîtrisée',
                        ].map((rule, i) => (
                            <div key={i} className="bg-background p-6 flex items-center gap-4">
                                <div className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 font-bold">{rule}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 2 — PROBLÈME
                ═══════════════════════════════════════════════════════ */}
                <section className="mb-48" aria-labelledby="probleme">
                    <div className="flex items-center gap-6 mb-16">
                        <span className="font-mono text-[10px] text-accent font-black uppercase tracking-[0.5em]">02</span>
                        <div className="h-px flex-1 bg-foreground/5" />
                    </div>
                    <h2 id="probleme" className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-12">
                        Problème Résolu
                    </h2>

                    <div className="divide-y divide-foreground/5 border-y border-foreground/5 mb-16">
                        {problems.map((p) => (
                            <div key={p.id} className="grid grid-cols-[60px_1fr] gap-8 py-6 group hover:bg-foreground/[0.015] transition-colors">
                                <span className="font-mono text-[11px] text-accent font-black tracking-widest">{p.id}</span>
                                <span className="text-sm font-bold uppercase tracking-wider text-foreground/70 group-hover:text-foreground transition-colors">{p.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-foreground/[0.02] border border-foreground/5 p-8 sm:p-12 space-y-6">
                        <span className="font-mono text-[9px] text-foreground/30 uppercase tracking-[0.4em] font-bold">Résultat sans EHAF</span>
                        <div className="flex flex-wrap gap-8 font-mono text-[10px] uppercase tracking-[0.2em]">
                            <span className="text-red-400/80 font-black">Systèmes fragiles</span>
                            <span className="text-foreground/10">·</span>
                            <span className="text-red-400/80 font-black">Croissance instable</span>
                            <span className="text-foreground/10">·</span>
                            <span className="text-red-400/80 font-black">Maintenance coûteuse</span>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 3 — ARCHITECTURE TYPE
                ═══════════════════════════════════════════════════════ */}
                <section className="mb-48" aria-labelledby="architecture">
                    <div className="flex items-center gap-6 mb-16">
                        <span className="font-mono text-[10px] text-accent font-black uppercase tracking-[0.5em]">03</span>
                        <div className="h-px flex-1 bg-foreground/5" />
                    </div>
                    <h2 id="architecture" className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-12">
                        Architecture Type
                    </h2>
                    {/* Diagramme en couches 3D */}
                    <div className="relative py-20 mb-20 overflow-visible">
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                            <div className="w-[800px] h-[800px] border border-accent rounded-full animate-pulse" />
                        </div>

                        <div className="relative flex flex-col items-center perspective-[1000px] space-y-[-40px]">
                            {layers.map((layer, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                    className="relative w-full max-w-2xl"
                                    style={{ zIndex: layers.length - i }}
                                >
                                    {/* Annotation technique */}
                                    <div className="absolute -left-12 sm:-left-32 top-1/2 -translate-y-1/2 h-px w-8 sm:w-24 bg-foreground/10 flex items-center">
                                        <span className="absolute -left-2 w-1 h-1 bg-accent rotate-45" />
                                        <span className="ml-4 font-mono text-[8px] text-foreground/30 uppercase tracking-[0.2em] whitespace-nowrap hidden sm:block">
                                            L0{layers.length - i} · {layer.name.toLowerCase()}
                                        </span>
                                    </div>

                                    {/* La Couche */}
                                    <div
                                        className={`group relative p-8 sm:p-12 border border-foreground/10 backdrop-blur-sm transition-all duration-700 transform rotateX-[25deg] shadow-[0_20px_40px_rgba(0,0,0,0.1)] ${layer.accent
                                            ? 'bg-foreground text-background shadow-accent/20'
                                            : 'bg-background/80 text-foreground hover:bg-foreground/[0.02]'
                                            }`}
                                    >
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div className="space-y-1">
                                                <h3 className={`text-2xl sm:text-3xl font-black uppercase tracking-tighter ${layer.accent ? 'text-white' : ''}`}>
                                                    {layer.name}
                                                </h3>
                                                <p className={`font-mono text-[9px] uppercase tracking-[0.1em] ${layer.accent ? 'text-accent' : 'text-foreground/40'}`}>
                                                    System Layer Specification
                                                </p>
                                            </div>
                                            <span className={`font-mono text-[10px] uppercase tracking-[0.3em] font-bold ${layer.accent ? 'text-accent' : 'text-foreground/60'}`}>
                                                {layer.detail}
                                            </span>
                                        </div>

                                        {/* Corner decor */}
                                        <div className="absolute top-0 right-0 w-8 h-8 flex items-start justify-end p-1 overflow-hidden">
                                            <div className={`w-0.5 h-6 rotate-[45deg] ${layer.accent ? 'bg-background/10' : 'bg-foreground/5'}`} />
                                        </div>
                                    </div>

                                    {/* Connecteur vertical (entre couches) */}
                                    {i < layers.length - 1 && (
                                        <div className="absolute left-1/2 -bottom-10 w-px h-10 bg-gradient-to-b from-accent/40 to-transparent z-0 hidden sm:block" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Flux d'information - Schema simplifié */}
                    <div className="mb-20 flex flex-col items-center">
                        <div className="font-mono text-[9px] text-accent uppercase tracking-[0.5em] mb-8 font-black">Architecture Logic Flow</div>
                        <div className="w-full max-w-4xl p-8 border border-foreground/5 bg-foreground/[0.01] flex flex-wrap justify-center items-center gap-8 sm:gap-16">
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-3 border border-foreground/10 bg-background font-mono text-[9px] uppercase">User Interaction</div>
                                <ArrowFlow />
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-3 border border-accent bg-background font-mono text-[9px] uppercase text-accent font-black">Business Logic</div>
                                <ArrowFlow />
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-3 border border-foreground/10 bg-background font-mono text-[9px] uppercase">Data Persistence</div>
                            </div>
                        </div>
                    </div>

                    {/* Règles des couches */}
                    <div className="grid md:grid-cols-2 gap-px bg-foreground/5 border border-foreground/5">
                        {[
                            'La UI ne contient pas de logique métier.',
                            'Le domaine ne dépend d\'aucune technologie.',
                            'L\'infrastructure est interchangeable.',
                            'Les services orchestrent, ils ne décident pas.',
                        ].map((rule, i) => (
                            <div key={i} className="bg-background p-8 flex items-start gap-4">
                                <span className="font-mono text-[9px] text-accent font-black mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-foreground/60 leading-relaxed">{rule}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 4 — PRINCIPES FONDAMENTAUX
                ═══════════════════════════════════════════════════════ */}
                <section className="mb-48" aria-labelledby="principes">
                    <div className="flex items-center gap-6 mb-16">
                        <span className="font-mono text-[10px] text-accent font-black uppercase tracking-[0.5em]">04</span>
                        <div className="h-px flex-1 bg-foreground/5" />
                    </div>
                    <h2 id="principes" className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-12">
                        Principes Fondamentaux
                    </h2>

                    <div className="divide-y divide-foreground/5 border-y border-foreground/5">
                        {principles.map((p) => (
                            <div key={p.id} className="grid md:grid-cols-[80px_1fr_2fr] gap-8 py-12 group hover:bg-foreground/[0.015] transition-all duration-500">
                                <span className="font-mono text-2xl font-black text-foreground/10 group-hover:text-accent transition-colors duration-500">
                                    {p.id}
                                </span>
                                <h3 className="text-lg font-black uppercase tracking-tighter group-hover:text-accent transition-colors duration-500">
                                    {p.name}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                                    {p.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 5 — STACK RECOMMANDÉE
                ═══════════════════════════════════════════════════════ */}
                <section className="mb-48" aria-labelledby="stack">
                    <div className="flex items-center gap-6 mb-16">
                        <span className="font-mono text-[10px] text-accent font-black uppercase tracking-[0.5em]">05</span>
                        <div className="h-px flex-1 bg-foreground/5" />
                    </div>
                    <h2 id="stack" className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-12">
                        Stack Recommandée
                    </h2>

                    <div className="divide-y divide-foreground/5 border-y border-foreground/5 mb-16">
                        {stack.map((s, i) => (
                            <div key={i} className="grid grid-cols-[1fr_2fr] gap-8 py-5 group hover:bg-foreground/[0.015] transition-colors">
                                <span className="font-mono text-[10px] text-foreground/30 uppercase tracking-[0.3em] font-bold">{s.label}</span>
                                <span className="font-mono text-[11px] text-foreground/80 font-bold">{s.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-foreground/[0.02] border-l-2 border-accent p-8">
                        <p className="font-mono text-[10px] text-foreground/50 uppercase tracking-[0.3em] leading-loose">
                            La stack peut évoluer. <br />
                            <span className="text-accent font-black">Les principes ne changent pas.</span>
                        </p>
                    </div>
                </section>
                {/* ═══════════════════════════════════════════════════════
                    SECTION 6 — CONVENTION DE STRUCTURE
                ═══════════════════════════════════════════════════════ */}
                <section className="mb-48" aria-labelledby="convention">
                    <div className="flex items-center gap-6 mb-16">
                        <span className="font-mono text-[10px] text-accent font-black uppercase tracking-[0.5em]">06</span>
                        <div className="h-px flex-1 bg-foreground/5" />
                    </div>
                    <h2 id="convention" className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-12">
                        Convention de Structure
                    </h2>

                    {/* Blueprint de dossiers */}
                    <div className="relative p-8 sm:p-16 border border-foreground/5 bg-foreground/[0.01] mb-16 overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-foreground/10 uppercase tracking-[0.2em] border-l border-b border-foreground/5">
                            Project Blueprint v1.0
                        </div>

                        <div className="space-y-4 relative z-10">
                            {[
                                { name: '/app', desc: 'Routes & Pages', accent: true },
                                { name: '/features', desc: 'Modules fonctionnels' },
                                { name: '/components', desc: 'UI réutilisable' },
                                { name: '/lib', desc: 'Utilitaires purs' },
                                { name: '/services', desc: 'Orchestration' },
                                { name: '/types', desc: 'Contrats de données' },
                                { name: '/infrastructure', desc: 'DB & Services externes' },
                            ].map((dir, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-6 group"
                                >
                                    <div className="flex items-center">
                                        <div className="w-px h-8 bg-foreground/10" />
                                        <div className="w-4 h-px bg-foreground/10" />
                                    </div>
                                    <div className={`flex items-center gap-4 p-3 pr-8 border transition-all duration-300 ${dir.accent ? 'border-accent bg-accent/5' : 'border-foreground/5 bg-background group-hover:border-foreground/20'}`}>
                                        <FolderIcon className={dir.accent ? 'text-accent' : 'text-foreground/40'} />
                                        <span className={`font-mono text-xs font-bold ${dir.accent ? 'text-foreground' : 'text-foreground/70'}`}>
                                            {dir.name}
                                        </span>
                                    </div>
                                    <span className="font-mono text-[9px] text-foreground/20 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {dir.desc}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Règles */}
                    <div className="grid md:grid-cols-2 gap-px bg-foreground/5 border border-foreground/5">
                        {[
                            'Pas de logique métier dans components',
                            'Pas d\'accès direct DB dans UI',
                            'Services = orchestration',
                            'Domain = règles pures',
                        ].map((rule, i) => (
                            <div key={i} className="bg-background p-6 flex items-center gap-4">
                                <div className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
                                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">{rule}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 7 — ROADMAP D'ÉVOLUTION
                ═══════════════════════════════════════════════════════ */}
                <section className="mb-48" aria-labelledby="roadmap">
                    <div className="flex items-center gap-6 mb-16">
                        <span className="font-mono text-[10px] text-accent font-black uppercase tracking-[0.5em]">07</span>
                        <div className="h-px flex-1 bg-foreground/5" />
                    </div>
                    <h2 id="roadmap" className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-12">
                        Roadmap
                    </h2>

                    <div className="divide-y divide-foreground/5 border-y border-foreground/5 mb-20">
                        {roadmap.map((r) => (
                            <div key={r.ref} className="grid md:grid-cols-[120px_1.5fr_2fr_100px] gap-8 py-8 group hover:bg-foreground/[0.015] transition-colors items-center">
                                <span className="font-mono text-[9px] text-foreground/30 uppercase tracking-[0.3em] font-bold">{r.ref}</span>
                                <span className="text-lg font-black uppercase tracking-tighter group-hover:text-accent transition-colors">{r.name}</span>
                                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{r.description}</span>
                                <span className={`font-mono text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1 text-center ${r.status === 'ACTIF'
                                    ? 'bg-accent/10 text-accent'
                                    : r.status === 'CONCEPTION'
                                        ? 'bg-foreground/5 text-foreground/40'
                                        : 'bg-foreground/[0.02] text-foreground/20'
                                    }`}>
                                    {r.status}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-foreground/[0.02] border-l-2 border-accent p-8">
                        <span className="font-mono text-[9px] text-foreground/30 uppercase tracking-[0.4em] block mb-4">Objectif Long Terme</span>
                        <p className="text-lg font-black uppercase tracking-tight">
                            Transformer EHAF en framework propriétaire complet.
                        </p>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    FOOTER — SIGNATURE
                ═══════════════════════════════════════════════════════ */}
                <footer className="pt-24 border-t border-foreground/5">
                    <div className="flex flex-col items-center gap-8 text-center mb-20">
                        <div className="w-px h-16 bg-foreground/10" />
                        <div className="space-y-4">
                            <p className="text-sm font-black uppercase tracking-tight">
                                EHAF n&apos;est pas une promesse.
                            </p>
                            <p className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-accent">
                                C&apos;est une discipline.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-12 border-t border-foreground/5 font-mono text-[9px] text-foreground/20 uppercase tracking-[0.4em]">
                        <span>EHAF-ARCH-01 · Core Specification v1.0</span>
                        <span>Mars 2026 · EurinHash Foundation</span>
                    </div>
                </footer>

            </div>
        </main>
    );
}

{/* ── Helpers visuels pour diagrammes ── */ }

function ArrowFlow() {
    return (
        <div className="flex items-center justify-center">
            <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-8 h-px bg-accent/40 relative"
            >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-accent/60 rotate-45" />
            </motion.div>
        </div>
    );
}

function FolderIcon({ className }: { className?: string }) {
    return (
        <svg
            width="14"
            height="11"
            viewBox="0 0 14 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path d="M1 1.5C1 1.22386 1.22386 1 1.5 1H5.5L7 2.5H12.5C12.7761 2.5 13 2.72386 13 3V9.5C13 9.77614 12.7761 10 12.5 10H1.5C1.22386 10 1 9.77614 1 9.5V1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
    );
}
