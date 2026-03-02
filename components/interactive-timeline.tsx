'use client';

import { useState } from 'react';
import {
    ChevronDown,
    ChevronUp,
    Check,
} from 'lucide-react';

const phases = [
    {
        id: 'phase-0',
        year: '2024-2026',
        title: 'Fondation Invisible',
        subtitle: 'PHASE-0 — INCUBATION',
        status: 'current',
        description: "Période de structuration interne. Développement des socles méthodologiques et des frameworks d'architecture EH-CS.",
        objectives: [
            'Exploration technique de haut niveau',
            'Standardisation de la stack EHAF',
            'Consolidation des protocoles système',
        ],
        color: 'bg-accent/40',
    },
    {
        id: 'phase-1',
        year: '2026-2027',
        title: 'Structuration Publique',
        subtitle: 'PHASE-1 — DÉPLOIEMENT',
        status: 'upcoming',
        description: 'Lancement de la plateforme institutionnelle et déploiement des premiers standards de souveraineté numérique.',
        objectives: [
            'Publication de la Doctrine EHAF',
            'Déploiement MVP FlexHOST',
            'Initialisation de Hashcode 2.0',
        ],
        color: 'bg-foreground/20',
    },
    {
        id: 'phase-2',
        year: '2027-2028',
        title: 'Industrialisation',
        subtitle: 'PHASE-2 — CONSOLIDATION',
        status: 'upcoming',
        description: 'Intégration chez des partenaires stratégiques et stabilisation des infrastructures cloud hybrides.',
        objectives: [
            'Déploiement Clients Pilotes',
            'Gouvernance Technique EHAF',
            'Standardisation de l\'interconnectivité',
        ],
        color: 'bg-foreground/15',
    },
    {
        id: 'phase-3',
        year: '2028-2030',
        title: 'Maturité Systémique',
        subtitle: 'PHASE-3 — ÉTENDUE',
        status: 'upcoming',
        description: 'Mise en place d\'un écosystème interconnecté, réduire durablement la dépendance technologique externe.',
        objectives: [
            'Infrastructure Multi-Région EHAF',
            'Adoption Massive de Standards',
            'Souveraineté Systémique Totale',
        ],
        color: 'bg-foreground/10',
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
                {/* Ligne technique latérale */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-foreground/5" />

                <div className="space-y-4">
                    {phases.map((phase) => {
                        const isExpanded = expandedPhase === phase.id;

                        return (
                            <div key={phase.id} className="relative pl-12 sm:pl-16">
                                {/* Marqueur technique (Carré) */}
                                <div
                                    className={`absolute left-[-5px] top-8 w-[12px] h-[12px] border-2 border-background transition-all duration-700 ${phase.status === 'current' ? 'bg-accent scale-125' : 'bg-foreground/20'}`}
                                />

                                <div
                                    onClick={() => togglePhase(phase.id)}
                                    className={`group cursor-pointer p-8 sm:p-12 transition-all duration-700 border-l-[3px] ${isExpanded ? 'bg-foreground/[0.03] border-accent' : 'bg-transparent border-transparent hover:bg-foreground/[0.01] hover:border-foreground/10'}`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-4">
                                                <span className="font-mono text-[10px] text-accent font-black tracking-[0.4em]">
                                                    {phase.year}
                                                </span>
                                                {phase.status === 'current' && (
                                                    <span className="animate-pulse flex h-1.5 w-1.5 bg-accent" />
                                                )}
                                            </div>
                                            <h3 className="text-2xl font-black uppercase tracking-tighter">{phase.title}</h3>
                                            <p className="font-mono text-[9px] text-foreground/30 uppercase tracking-[0.5em]">{phase.subtitle}</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            {isExpanded ? <ChevronUp className="w-5 h-5 opacity-20" /> : <ChevronDown className="w-5 h-5 opacity-20" />}
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="grid md:grid-cols-2 gap-12 items-start animate-in fade-in slide-in-from-left-4 duration-1000">
                                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest leading-loose opacity-80">
                                                {phase.description}
                                            </p>
                                            <ul className="space-y-4 pt-1">
                                                {phase.objectives.map((objective, i) => (
                                                    <li key={i} className="flex items-center gap-4 group/item">
                                                        <Check className="w-3 h-3 text-accent/40 group-hover/item:text-accent transition-colors" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60">{objective}</span>
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

            {/* Légende Technique */}
            <div className="mt-20 pt-12 border-t border-foreground/5 flex items-center gap-12 font-mono text-[9px] uppercase tracking-[0.4em] opacity-30">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent" />
                    <span>Statut : Opérationnel</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-foreground/20" />
                    <span>Statut : Planifié</span>
                </div>
            </div>
        </div>
    );
}
