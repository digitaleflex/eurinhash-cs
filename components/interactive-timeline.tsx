'use client';

import { useState } from 'react';
import {
    Globe,
    Shield,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Layers,
    Building2,
    Rocket,
} from 'lucide-react';

const phases = [
    {
        id: 'phase-0',
        year: '2024-2026',
        title: 'Fondation invisible',
        subtitle: 'Phase 0 — Incubation',
        status: 'current',
        description: "Avant de construire un écosystème, il faut construire l'architecte. Cette phase n'était pas inactive. Elle était préparatoire.",
        objectives: [
            'Exploration technique approfondie',
            'Standardisation personnelle de stack',
            'Construction de frameworks internes',
            'Formalisation de vision',
            "Tests d'architectures cloud",
            'Consolidation des compétences système',
        ],
        icon: Layers,
        color: 'bg-blue-500',
    },
    {
        id: 'phase-1',
        year: '2026-2027',
        title: 'Structuration active',
        subtitle: 'Phase 1 — Lancement Structuré',
        status: 'upcoming',
        description: 'Ici, les choses commencent vraiment.',
        objectives: [
            'Formalisation publique des standards',
            'Publication de doctrine architecturale',
            "Lancement du hub eurinhash.com version institutionnelle",
            'Déploiement initial de FlexHOST (MVP réel)',
            'Structuration de Hashcode comme pipeline de talents',
        ],
        icon: Rocket,
        color: 'bg-green-500',
    },
    {
        id: 'phase-2',
        year: '2027-2028',
        title: 'Industrialisation',
        subtitle: 'Phase 2 — Consolidation',
        status: 'upcoming',
        description: 'Déploiement chez clients pilotes et stabilisation.',
        objectives: [
            "Déploiement d'architectures chez clients pilotes",
            'Stabilisation de infrastructure cloud',
            'Mise en place de gouvernance technique',
            'Création de premiers partenariats stratégiques',
        ],
        icon: Building2,
        color: 'bg-purple-500',
    },
    {
        id: 'phase-3',
        year: '2028-2030',
        title: 'Expansion maîtrisée',
        subtitle: "Phase 3 — Extension Régionale",
        status: 'upcoming',
        description: 'Infrastructure multi-région et standards adoptés.',
        objectives: [
            'Infrastructure cloud multi-région',
            'Standards adoptés par PME locales',
            'Communauté technique structurée',
            'Déploiement de briques SaaS souveraines',
        ],
        icon: Globe,
        color: 'bg-orange-500',
    },
    {
        id: 'phase-4',
        year: '2030+',
        title: 'Maturité systémique',
        subtitle: 'Phase 4 — Infrastructure Souveraine Structurée',
        status: 'upcoming',
        description: "Écosystème interconnecté et réduction de la dépendance.",
        objectives: [
            'Écosystème interconnecté',
            'Standards formalisés',
            'Formation architecturale institutionnalisée',
            'Réduction dépendance cloud externe',
        ],
        icon: Shield,
        color: 'bg-accent',
    },
];

export default function InteractiveTimeline() {
    const [expandedPhase, setExpandedPhase] = useState<string | null>('phase-1');

    const togglePhase = (phaseId: string) => {
        setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
    };

    return (
        <div className="w-full py-12">
            <div className="relative">
                {/* Ligne centrale */}
                <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-foreground/10 transform sm:-translate-x-1/2" />

                <div className="space-y-12">
                    {phases.map((phase, index) => {
                        const isExpanded = expandedPhase === phase.id;
                        const Icon = phase.icon;
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={phase.id}
                                className={`relative flex items-center ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                            >
                                {/* Point sur la timeline */}
                                <div
                                    className="absolute left-4 sm:left-1/2 w-10 h-10 rounded-full border-4 border-background flex items-center justify-center transform -translate-x-1/2 z-10 shadow-sm"
                                    style={{
                                        backgroundColor: phase.status === 'current' ? '#3b82f6' : '#94a3b8',
                                    }}
                                >
                                    <Icon className="w-5 h-5 text-white" />
                                </div>

                                {/* Contenu */}
                                <div className={`ml-12 sm:ml-0 sm:w-1/2 ${isEven ? 'sm:pr-12' : 'sm:pl-12'}`}>
                                    <div
                                        onClick={() => togglePhase(phase.id)}
                                        className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${isExpanded ? 'bg-accent/5 border-accent shadow-sm' : 'bg-background border-foreground/10 hover:border-accent/30 hover:shadow-md'}`}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${phase.color} text-white`}>
                                                {phase.year}
                                            </span>
                                            {phase.status === 'current' && (
                                                <span className="flex items-center gap-1.5 text-[10px] text-accent font-bold uppercase tracking-wider">
                                                    Actuel
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between gap-4 text-left">
                                            <div>
                                                <h3 className="font-bold text-xl mb-1">{phase.title}</h3>
                                                <p className="text-sm text-muted-foreground">{phase.subtitle}</p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                {isExpanded ? <ChevronUp className="w-5 h-5 opacity-40" /> : <ChevronDown className="w-5 h-5 opacity-40" />}
                                            </div>
                                        </div>

                                        {isExpanded && (
                                            <div className="mt-6 pt-6 border-t border-foreground/5">
                                                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                                    {phase.description}
                                                </p>
                                                <ul className="grid gap-3">
                                                    {phase.objectives.map((objective, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-left">
                                                            <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                                            <span className="text-sm font-medium">{objective}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-foreground/5 flex flex-wrap gap-6 justify-center text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Phase Actuelle</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full" />
                    <span>Prochaines étapes</span>
                </div>
            </div>
        </div>
    );
}
