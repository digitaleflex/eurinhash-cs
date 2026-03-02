import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Info, ShieldCheck, Cpu, Users } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Initiatives — Eurin Hash CS',
    description: 'Structure des initiatives architecturales d\'Eurin Hash. Infrastructure, Frameworks et Formation.',
};

const pillars = [
    {
        id: 'I',
        title: 'Infrastructure',
        icon: Cpu,
        description: 'Systèmes de déploiement, cloud hybride et hébergement souverain.',
        initiatives: [
            {
                name: 'FLEXHOST',
                ref: 'EHAF-INFRA-01',
                pillar: 'Infrastructure',
                status: 'ALPHA',
                phase: 'Tests de résilience multi-régions',
                updated: 'Mars 2026',
                objectif: 'Concevoir une infrastructure cloud modulaire garantissant la souveraineté totale des données critiques.',
                probleme: 'La dépendance aux fournisseurs cloud globaux crée des opacités structurelles et des risques de verrouillage (vendor lock-in).',
                architecture: 'Stack conteneurisée (Docker/Traefik), isolation des réseaux par client, et réplication asynchrone hors-site.',
                etat: 'Le socle de base est opérationnel. Prochaine étape : automatisation des protocoles de disaster recovery.'
            }
        ]
    },
    {
        id: 'II',
        title: 'Framework & Standards',
        icon: ShieldCheck,
        description: 'Protocoles, doctrines et modèles techniques reproductibles.',
        initiatives: [
            {
                name: 'EHAF FRAMEWORK',
                ref: 'EHAF-ARCH-01',
                pillar: 'Framework & Standards',
                status: 'BETA',
                phase: 'Standardisation des interfaces API',
                updated: 'Mars 2026',
                objectif: 'Établir un socle de développement unifié pour accélérer le déploiement de systèmes complexes sans sacrifier la rigueur.',
                probleme: 'L\'hétérogénéité des méthodes de développement empêche la maintenance cohérente des systèmes sur le long terme.',
                architecture: 'Approche orientée composants, typage strict via TypeScript, et validation automatique des schémas de données.',
                etat: 'Version 0.8 déployée sur 3 projets pilotes. Documentation de la doctrine en cours de finalisation.'
            }
        ]
    },
    {
        id: 'III',
        title: 'Formation & Communauté',
        icon: Users,
        description: 'Transmission du savoir, mentorat et sélection de talents.',
        initiatives: [
            {
                name: 'HASHCODE',
                ref: 'EHAF-EDU-01',
                pillar: 'Formation & Communauté',
                status: 'STRUCTURATION',
                phase: 'Définition du curriculum systémique',
                updated: 'Mars 2026',
                objectif: 'Transformer les praticiens du code en architectes de systèmes capables de penser la structure avant la syntaxe.',
                probleme: 'Le marché produit des développeurs, mais manque cruellement d\'architectes capables d\'appréhender la complexité globale.',
                architecture: 'Modèle de mentorat direct complété par des exercices de design system réel (Blueprints).',
                etat: 'Sélection des premiers mentors. La plateforme de ressources techniques est en cours de montage.'
            }
        ]
    }
];

export default function InitiativesPage() {
    return (
        <main className="bg-background min-h-screen pt-32 pb-48">
            <div className="mx-auto max-w-6xl px-4 sm:px-8">

                {/* Header Institutionnel */}
                <div className="mb-40 space-y-8">
                    <div className="flex items-center gap-6">
                        <span className="font-mono text-[10px] text-accent font-black uppercase tracking-[1em]">Stratégie</span>
                        <div className="h-px flex-1 bg-foreground/5" />
                    </div>
                    <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
                        Initiatives.
                    </h1>
                    <p className="max-w-2xl text-sm font-medium text-muted-foreground uppercase tracking-[0.3em] leading-loose opacity-60">
                        Cartographie des déploiements actifs et des socles de standardisation du système Eurin Hash. <br />
                        <span className="text-foreground">3 piliers · Structure souveraine · EHAF Foundation</span>
                    </p>
                </div>

                {/* Grille des Piliers */}
                <div className="space-y-48">
                    {pillars.map((pillar) => (
                        <div key={pillar.id} className="relative">
                            <div className="flex flex-col md:flex-row gap-12 mb-20 border-b border-foreground/5 pb-12">
                                <div className="flex items-center justify-center w-24 h-24 bg-foreground text-background font-black text-4xl font-mono">
                                    {pillar.id}
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-4xl font-black uppercase tracking-tighter">{pillar.title}</h2>
                                    <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.4em]">{pillar.description}</p>
                                </div>
                            </div>

                            <div className="space-y-24">
                                {pillar.initiatives.map((initiative) => (
                                    <div key={initiative.ref} className="group relative bg-foreground/[0.015] border border-foreground/5 p-8 sm:p-16 transition-all duration-700 hover:bg-foreground/[0.025] hover:border-accent/20">

                                        {/* Header Initiative - Taxonomie Stricte */}
                                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 border-b border-foreground/5 pb-12 font-mono text-[9px] uppercase tracking-[0.3em]">
                                            <div className="space-y-2">
                                                <span className="text-foreground/30">Initiative</span>
                                                <div className="text-[14px] text-foreground font-black tracking-tighter uppercase">{initiative.name}</div>
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-foreground/30">Référence</span>
                                                <div className="text-foreground font-bold">{initiative.ref}</div>
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-foreground/30">Statut</span>
                                                <div className="text-accent font-black">{initiative.status}</div>
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-foreground/30">Mise à jour</span>
                                                <div className="text-foreground/60">{initiative.updated}</div>
                                            </div>
                                        </div>

                                        {/* Contenu - Format Obligatoire */}
                                        <div className="grid md:grid-cols-2 gap-20">
                                            <div className="space-y-12">
                                                <div className="space-y-4">
                                                    <h4 className="font-mono text-[10px] text-accent uppercase tracking-[0.5em] font-black italic">01. Objectif</h4>
                                                    <p className="text-lg font-bold leading-tight uppercase tracking-tight">{initiative.objectif}</p>
                                                </div>
                                                <div className="space-y-4">
                                                    <h4 className="font-mono text-[10px] text-foreground/40 uppercase tracking-[0.5em] font-black italic">02. Problème traité</h4>
                                                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest leading-loose opacity-70 italic">{initiative.probleme}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-12">
                                                <div className="space-y-4">
                                                    <h4 className="font-mono text-[10px] text-foreground/40 uppercase tracking-[0.5em] font-black italic">03. Architecture</h4>
                                                    <p className="text-sm text-foreground/80 font-mono leading-relaxed uppercase tracking-wider">{initiative.architecture}</p>
                                                </div>
                                                <div className="space-y-4 bg-foreground/5 p-8 border-l-2 border-accent">
                                                    <h4 className="font-mono text-[10px] text-accent uppercase tracking-[0.5em] font-black italic mb-4">04. État actuel</h4>
                                                    <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.3em] mb-2">[ PHASE : {initiative.phase} ]</div>
                                                    <p className="text-xs font-black uppercase tracking-widest leading-relaxed">{initiative.etat}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Lien vers la spécification si disponible */}
                                        {initiative.ref === 'EHAF-INFRA-01' && (
                                            <div className="mt-16 pt-8 border-t border-foreground/5">
                                                <Link
                                                    href="/initiatives/flexhost"
                                                    className="inline-flex items-center gap-4 font-mono text-[10px] text-accent uppercase tracking-[0.4em] font-black hover:text-foreground transition-colors group/link"
                                                >
                                                    Voir les spécifications techniques FlexHOST
                                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-500" />
                                                </Link>
                                            </div>
                                        )}
                                        {initiative.ref === 'EHAF-ARCH-01' && (
                                            <div className="mt-16 pt-8 border-t border-foreground/5">
                                                <Link
                                                    href="/vision/ehaf"
                                                    className="inline-flex items-center gap-4 font-mono text-[10px] text-accent uppercase tracking-[0.4em] font-black hover:text-foreground transition-colors group/link"
                                                >
                                                    Lire la spécification complète v1.0
                                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-500" />
                                                </Link>
                                            </div>
                                        )}

                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Signature Section */}
                <div className="mt-48 pt-24 border-t border-foreground/5 flex flex-col items-center gap-12 text-center">
                    <div className="w-px h-24 bg-foreground/10" />
                    <p className="max-w-xl text-[10px] font-mono text-foreground/20 uppercase tracking-[0.5em] leading-loose">
                        Toutes les initiatives présentées ici sont soumises à la doctrine architecturale EHAF. <br />
                        Aucun développement n'est initié sans validation structurelle préalable.
                    </p>
                    <span className="font-mono text-[9px] text-accent font-black uppercase tracking-[1em]">System Verified</span>
                </div>
            </div>
        </main>
    );
}
