'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

const phases = [
    {
        id: 'phase-0',
        year: '2024–2026',
        title: 'Fondation invisible',
        subtitle: 'Phase 0 · Incubation',
        status: 'current',
        description: "Structuration interne. Développement des socles méthodologiques et des frameworks d'architecture EH-CS.",
        objectives: [
            'Exploration technique de haut niveau',
            'Standardisation de la stack EHAF',
            'Consolidation des protocoles système',
        ],
    },
    {
        id: 'phase-1',
        year: '2026–2027',
        title: 'Structuration publique',
        subtitle: 'Phase 1 · Déploiement',
        status: 'upcoming',
        description: 'Lancement de la plateforme institutionnelle et déploiement des premiers standards de souveraineté numérique.',
        objectives: [
            'Publication de la doctrine EHAF',
            'Déploiement MVP FlexHOST',
            'Initialisation de Hashcode 2.0',
        ],
    },
    {
        id: 'phase-2',
        year: '2027–2028',
        title: 'Industrialisation',
        subtitle: 'Phase 2 · Consolidation',
        status: 'upcoming',
        description: 'Intégration chez des partenaires stratégiques et stabilisation des infrastructures cloud hybrides.',
        objectives: [
            'Déploiement chez les clients pilotes',
            'Gouvernance technique EHAF',
            'Standardisation de l\'interconnectivité',
        ],
    },
    {
        id: 'phase-3',
        year: '2028–2030',
        title: 'Maturité systémique',
        subtitle: 'Phase 3 · Étendue',
        status: 'upcoming',
        description: 'Mise en place d\'un écosystème interconnecté réduisant durablement la dépendance technologique externe.',
        objectives: [
            'Infrastructure multi-région EHAF',
            'Adoption large des standards',
            'Souveraineté systémique totale',
        ],
    },
];

export default function InteractiveTimeline() {
    const [expandedPhase, setExpandedPhase] = useState<string | null>('phase-0');

    const togglePhase = (phaseId: string) => {
        setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
    };

    return (
        <div className="w-full">
            <div className="relative">
                {/* Ligne latérale */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/8" />

                <div className="space-y-2">
                    {phases.map((phase) => {
                        const isExpanded = expandedPhase === phase.id;

                        return (
                            <div key={phase.id} className="relative pl-10 sm:pl-14">
                                {/* Marqueur */}
                                <div
                                    className={`absolute left-[-5px] top-7 w-2.5 h-2.5 border-2 border-background transition-all duration-500 ${phase.status === 'current' ? 'bg-accent scale-110' : 'bg-foreground/20'}`}
                                />

                                <div
                                    onClick={() => togglePhase(phase.id)}
                                    className={`group cursor-pointer px-6 sm:px-10 py-7 transition-all duration-500 border-l-2 ${isExpanded ? 'bg-foreground/[0.025] border-accent' : 'border-transparent hover:bg-foreground/[0.01] hover:border-foreground/10'}`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-0">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <span className="font-mono text-xs text-accent font-medium tracking-tight">
                                                    {phase.year}
                                                </span>
                                                {phase.status === 'current' && (
                                                    <span className="animate-pulse flex h-1.5 w-1.5 bg-accent rounded-full" />
                                                )}
                                            </div>
                                            <h3 className="text-lg font-bold tracking-tight">{phase.title}</h3>
                                            <p className="font-mono text-[10px] text-foreground/30 tracking-tight">{phase.subtitle}</p>
                                        </div>
                                        <div className="shrink-0">
                                            {isExpanded
                                                ? <ChevronUp className="w-4 h-4 text-foreground/30" />
                                                : <ChevronDown className="w-4 h-4 text-foreground/20" />
                                            }
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="mt-6 grid md:grid-cols-2 gap-8 items-start animate-in fade-in slide-in-from-left-4 duration-500">
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {phase.description}
                                            </p>
                                            <ul className="space-y-3">
                                                {phase.objectives.map((objective, i) => (
                                                    <li key={i} className="flex items-center gap-3 group/item">
                                                        <Check className="w-3 h-3 text-accent/40 group-hover/item:text-accent transition-colors shrink-0" />
                                                        <span className="text-sm text-foreground/65">{objective}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Légende */}
            <div className="mt-12 pt-8 border-t border-foreground/5 flex items-center gap-8 font-mono text-[10px] text-foreground/25 tracking-tight">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent" />
                    <span>En cours</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-foreground/20" />
                    <span>Planifié</span>
                </div>
            </div>
        </div>
    );
}
