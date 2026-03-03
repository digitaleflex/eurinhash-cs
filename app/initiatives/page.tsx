import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Cpu, ShieldCheck, Users } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Initiatives — Eurin Hash CS',
    description: 'Les initiatives actives d\'Eurin Hash : infrastructure souveraine, framework EHAF, et formation architecturale.',
};

const pillars = [
    {
        id: 'I',
        title: 'Infrastructure',
        icon: Cpu,
        description: 'Systèmes de déploiement, cloud hybride et hébergement souverain.',
        initiatives: [
            {
                name: 'FlexHOST',
                ref: 'EHAF-INFRA-01',
                status: 'Alpha',
                phase: 'Tests de résilience multi-régions',
                updated: 'Mars 2026',
                objectif: 'Concevoir une infrastructure cloud modulaire garantissant la souveraineté totale des données critiques.',
                probleme: 'La dépendance aux fournisseurs cloud globaux crée des opacités structurelles et des risques de verrouillage (vendor lock-in).',
                architecture: 'Stack conteneurisée (Docker/Traefik), isolation des réseaux par client, réplication asynchrone hors-site.',
                etat: 'Le socle de base est opérationnel. Prochaine étape : automatisation des protocoles de disaster recovery.',
                href: '/initiatives/flexhost',
                linkLabel: 'Spécifications FlexHOST',
            },
        ],
    },
    {
        id: 'II',
        title: 'Framework & Standards',
        icon: ShieldCheck,
        description: 'Protocoles, doctrines et modèles techniques reproductibles.',
        initiatives: [
            {
                name: 'EHAF Framework',
                ref: 'EHAF-ARCH-01',
                status: 'Beta',
                phase: 'Standardisation des interfaces API',
                updated: 'Mars 2026',
                objectif: 'Établir un socle de développement unifié pour accélérer le déploiement de systèmes complexes sans sacrifier la rigueur.',
                probleme: 'L\'hétérogénéité des méthodes de développement empêche la maintenance cohérente des systèmes sur le long terme.',
                architecture: 'Approche orientée composants, typage strict TypeScript, validation automatique des schémas de données.',
                etat: 'Version 0.8 déployée sur 3 projets pilotes. Documentation de la doctrine en cours de finalisation.',
                href: '/architecture/ehaf',
                linkLabel: 'Lire la spécification v1.0',
            },
        ],
    },
    {
        id: 'III',
        title: 'Formation & Communauté',
        icon: Users,
        description: 'Transmission du savoir, mentorat et sélection de talents.',
        initiatives: [
            {
                name: 'Hashcode',
                ref: 'EHAF-EDU-01',
                status: 'Structuration',
                phase: 'Définition du curriculum systémique',
                updated: 'Mars 2026',
                objectif: 'Former des praticiens capables de penser en architectures, pas seulement en code.',
                probleme: 'Le marché produit des développeurs, mais manque cruellement d\'architectes capables d\'appréhender la complexité globale.',
                architecture: 'Mentorat direct complété par des exercices de design system réel (Blueprints architecturaux).',
                etat: 'Sélection des premiers mentors en cours. Ressources techniques en montage.',
                href: '/initiatives/hashcode',
                linkLabel: 'Voir le modèle pédagogique',
            },
        ],
    },
];

const statusColors: Record<string, string> = {
    Alpha: 'text-yellow-500',
    Beta: 'text-blue-500',
    Structuration: 'text-accent',
};

export default function InitiativesPage() {
    return (
        <main className="bg-background min-h-screen pt-28 pb-40">
            <div className="mx-auto max-w-5xl px-4 sm:px-8">

                {/* Header */}
                <header className="mb-24 space-y-8">
                    <span className="font-mono text-xs text-accent tracking-tight font-medium block">
                        En cours
                    </span>
                    <h1 className="font-black tracking-tight text-foreground">
                        Ce qu'on construit<br />
                        <span className="text-foreground/25">en ce moment.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed font-normal" style={{ letterSpacing: '-0.01em' }}>
                        Trois piliers d'action : infrastructure souveraine, framework interne,
                        et transmission du savoir architectural.
                    </p>
                </header>

                {/* Piliers */}
                <div className="space-y-32">
                    {pillars.map((pillar) => (
                        <div key={pillar.id}>

                            {/* Pillar Header */}
                            <div className="flex items-center gap-6 mb-12 border-b border-foreground/5 pb-6">
                                <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center font-mono font-black text-lg shrink-0">
                                    {pillar.id}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold tracking-tight">{pillar.title}</h2>
                                    <p className="text-sm text-muted-foreground">{pillar.description}</p>
                                </div>
                            </div>

                            {/* Initiatives */}
                            <div className="space-y-16">
                                {pillar.initiatives.map((initiative) => (
                                    <div
                                        key={initiative.ref}
                                        className="border border-foreground/5 p-8 sm:p-12 hover:border-foreground/10 transition-colors"
                                    >
                                        {/* Meta */}
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 pb-8 border-b border-foreground/5 font-mono text-xs">
                                            <div className="space-y-1">
                                                <span className="text-foreground/30 block">Initiative</span>
                                                <span className="font-bold text-foreground text-sm">{initiative.name}</span>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-foreground/30 block">Référence</span>
                                                <span className="font-medium">{initiative.ref}</span>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-foreground/30 block">Statut</span>
                                                <span className={`font-bold ${statusColors[initiative.status] || 'text-foreground'}`}>
                                                    {initiative.status}
                                                </span>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-foreground/30 block">Mise à jour</span>
                                                <span className="text-foreground/60">{initiative.updated}</span>
                                            </div>
                                        </div>

                                        {/* Contenu */}
                                        <div className="grid md:grid-cols-2 gap-12">
                                            <div className="space-y-8">
                                                <div className="space-y-3">
                                                    <h4 className="font-mono text-xs text-accent font-medium">Objectif</h4>
                                                    <p className="text-base font-semibold text-foreground leading-relaxed">{initiative.objectif}</p>
                                                </div>
                                                <div className="space-y-3">
                                                    <h4 className="font-mono text-xs text-muted-foreground font-medium">Problème traité</h4>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">{initiative.probleme}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-8">
                                                <div className="space-y-3">
                                                    <h4 className="font-mono text-xs text-muted-foreground font-medium">Architecture technique</h4>
                                                    <p className="text-sm text-foreground/75 leading-relaxed">{initiative.architecture}</p>
                                                </div>
                                                <div className="space-y-3 bg-foreground/[0.03] p-6 border-l-2 border-accent">
                                                    <h4 className="font-mono text-xs text-accent font-medium">État actuel</h4>
                                                    <p className="text-xs text-muted-foreground mb-2 font-mono">Phase : {initiative.phase}</p>
                                                    <p className="text-sm font-medium leading-relaxed">{initiative.etat}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Lien */}
                                        <div className="mt-10 pt-6 border-t border-foreground/5">
                                            <Link
                                                href={initiative.href}
                                                className="inline-flex items-center gap-3 text-sm font-semibold text-accent hover:text-foreground transition-colors group"
                                            >
                                                {initiative.linkLabel}
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer note */}
                <div className="mt-24 pt-12 border-t border-foreground/5 text-center">
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                        Toutes les initiatives suivent la doctrine architecturale EHAF.
                        Aucun développement n'est initié sans validation structurelle préalable.
                    </p>
                </div>

            </div>
        </main>
    );
}
