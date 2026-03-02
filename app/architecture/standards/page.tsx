'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cloud, ShieldCheck, Terminal, Code2, FileText, ArrowRight, Check } from 'lucide-react';

const standardSections = [
    {
        id: 'STD-CLOUD',
        title: 'Standards Cloud',
        objective: 'Garantir maîtrise, réversibilité et scalabilité contrôlée.',
        icon: Cloud,
        rules: [
            'Toute dépendance cloud doit être documentée.',
            'Les données critiques doivent pouvoir être exportées à tout moment.',
            'Séparation stricte des environnements (dev / staging / prod).',
            'Pas d’accès direct à la base de production depuis le local.',
            'Les secrets sont gérés via variables d’environnement sécurisées.',
            'Logs activés et centralisés.',
        ],
        model: 'Hybride : Frontend scalable · DB managée · Infra VPS/Docker.'
    },
    {
        id: 'STD-SEC',
        title: 'Standards Sécurité',
        objective: 'Réduire la surface d’attaque dès la conception.',
        icon: ShieldCheck,
        rules: [
            'Validation stricte de toutes les entrées (Zod obligatoire).',
            'Authentification côté serveur prioritaire.',
            'Principe du moindre privilège.',
            'Pas de secrets exposés côté client.',
            'Headers de sécurité activés.',
            'Rate limiting sur toutes les routes sensibles.',
            'Audit des dépendances régulier.',
        ],
        model: 'La sécurité est transversale. Jamais ajoutée après.'
    },
    {
        id: 'STD-DEVOPS',
        title: 'Standards DevOps',
        objective: 'Assurer reproductibilité et stabilité des déploiements.',
        icon: Terminal,
        rules: [
            'CI/CD obligatoire (GitHub Actions).',
            'Aucune mise en production manuelle.',
            'Build validé avant merge sur main.',
            'Versioning clair (tags).',
            'Rollback possible.',
            'Environnements isolés.',
        ],
        model: 'Docker recommandé · Configuration versionnée.'
    },
    {
        id: 'STD-CODE',
        title: 'Standards Code',
        objective: 'Garantir lisibilité, maintenabilité et évolutivité.',
        icon: Code2,
        rules: [
            'TypeScript strict activé.',
            'Aucune logique métier dans les composants UI.',
            'Feature-first organisation.',
            'Services isolés.',
            'Early return pattern privilégié.',
            'Pas de duplication (DRY).',
            'Naming explicite.',
            'ESLint + Prettier obligatoires.',
        ],
        model: 'Interdiction : Logique métier dans UI · Requêtes directes DB dans UI.'
    },
    {
        id: 'STD-DOC',
        title: 'Standards Documentation',
        objective: 'Rendre le système compréhensible sans son auteur.',
        icon: FileText,
        rules: [
            'README structuré obligatoire par projet.',
            'Diagramme d’architecture simplifié requis.',
            'Liste des dépendances externes documentée.',
            'Mise à jour datée des documents.',
            'Justification des décisions techniques majeures.',
        ],
        model: 'Un système non documenté est un système fragile.'
    }
];

export default function StandardsPage() {
    return (
        <main className="bg-background min-h-screen pt-32 pb-48">
            <div className="mx-auto max-w-6xl px-4 sm:px-8">

                {/* ── HEADER OPÉRATIONNEL ── */}
                <header className="mb-48">
                    <div className="flex items-center gap-6 mb-12 font-mono text-[9px] uppercase tracking-tight">
                        <Link href="/vision" className="text-foreground/30 hover:text-accent transition-colors">← Vision</Link>
                        <div className="h-px flex-1 bg-foreground/5" />
                        <span className="text-accent font-black">Core Operational Standards</span>
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
                            Standards.
                        </h1>
                        <p className="text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground/40 max-w-2xl">
                            Règles internes et protocoles d&apos;exécution v1.0
                        </p>
                    </div>

                    <div className="mt-20 flex flex-wrap gap-12 font-mono text-[9px] text-foreground/20 uppercase tracking-tight">
                        <div className="flex flex-col gap-2">
                            <span className="text-foreground/40 font-black">Diffusion</span>
                            <span>Partiellement Publique</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-foreground/40 font-black">Statut</span>
                            <span className="text-accent">Obligatoire</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-foreground/40 font-black">Dernière révision</span>
                            <span>Mars 2026</span>
                        </div>
                    </div>
                </header>

                {/* ── GRILLE DES STANDARDS ── */}
                <div className="space-y-32">
                    {standardSections.map((section, idx) => (
                        <section key={section.id} className="relative">
                            <div className="grid lg:grid-cols-[350px_1fr] gap-12 sm:gap-20">
                                {/* Side Info */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center">
                                            <section.icon className="w-6 h-6" />
                                        </div>
                                        <span className="font-mono text-[10px] text-accent font-black tracking-tight">{section.id}</span>
                                    </div>
                                    <h2 className="text-3xl font-black uppercase tracking-tighter leading-tight">{section.title}</h2>
                                    <p className="text-sm text-foreground/50 font-medium uppercase tracking-tight leading-relaxed italic">
                                        &quot;{section.objective}&quot;
                                    </p>
                                    <div className="p-6 border border-foreground/5 bg-foreground/[0.02]">
                                        <p className="font-mono text-[9px] text-foreground/40 uppercase tracking-tight leading-loose">
                                            {section.model}
                                        </p>
                                    </div>
                                </div>

                                {/* Rules List */}
                                <div className="grid sm:grid-cols-2 gap-px bg-foreground/5 border border-foreground/5">
                                    {section.rules.map((rule, i) => (
                                        <div key={i} className="bg-background p-8 flex gap-6 group hover:bg-foreground/[0.015] transition-colors">
                                            <div className="w-6 h-6 border border-foreground/10 flex items-center justify-center shrink-0 group-hover:border-accent group-hover:bg-accent/5 transition-all">
                                                <Check className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <span className="text-[13px] font-bold uppercase tracking-tight text-foreground/70 leading-snug group-hover:text-foreground">
                                                {rule}
                                            </span>
                                        </div>
                                    ))}
                                    {section.rules.length % 2 !== 0 && (
                                        <div className="bg-foreground/[0.02] p-8 flex items-center justify-center border-t border-foreground/5">
                                            <span className="font-mono text-[9px] text-foreground/10 uppercase tracking-tight">End of section</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    ))}
                </div>

                {/* ── RÉSUMÉ EXÉCUTIF ── */}
                <section className="mt-48 py-24 border-t border-foreground/10">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-foreground/5 border border-foreground/5">
                        {[
                            { l: 'Cloud', v: 'Maîtrise & Réversibilité' },
                            { l: 'Sécurité', v: 'Validation & Isolation' },
                            { l: 'DevOps', v: 'Reproductibilité' },
                            { l: 'Code', v: 'Clarté & Séparation' },
                            { l: 'Documentation', v: 'Transparence' },
                        ].map((item, i) => (
                            <div key={i} className="bg-background p-8 text-center space-y-2">
                                <span className="font-mono text-[8px] text-foreground/30 uppercase tracking-tight font-black">{item.l}</span>
                                <span className="text-[11px] font-black uppercase tracking-tighter block text-accent">{item.v}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── FOOTER ── */}
                <footer className="mt-48 flex flex-col md:flex-row items-center justify-between gap-12 pt-24 border-t border-foreground/5">
                    <div className="space-y-4">
                        <p className="text-xl font-black uppercase tracking-tighter">
                            Ces standards sont la loi du système.
                        </p>
                        <p className="text-[10px] font-mono text-foreground/20 uppercase tracking-tight">
                            Aucune exception ne sera accordée sans validation architecturale.
                        </p>
                    </div>
                    <Link
                        href="/start-project"
                        className="flex items-center gap-6 bg-foreground text-background px-10 py-5 text-[10px] font-mono font-black uppercase tracking-tight hover:bg-accent transition-colors"
                    >
                        Appliquer maintenant
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </footer>

            </div>
        </main>
    );
}
