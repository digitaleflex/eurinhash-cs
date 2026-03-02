'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    const [expandedPhase, setExpandedPhase] = useState<string | null>('phase-0');

    const togglePhase = (phaseId: string) => {
        setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
    };

    return (
        <div className="w-full">
            {/* Timeline verticale interactive */}
            <div className="relative">
                {/* Ligne centrale */}
                <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent transform sm:-translate-x-1/2" />

                {/* Phases */}
                <div className="space-y-4 sm:space-y-8">
                    {phases.map((phase, index) => {
                        const isExpanded = expandedPhase === phase.id;
                        const Icon = phase.icon;
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={phase.id}
                                className={`relative flex items-center ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                                    }`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {/* Point sur la timeline */}
                                <button
                                    onClick={() => togglePhase(phase.id)}
                                    className="absolute left-4 sm:left-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 border-background flex items-center justify-center transform -translate-x-1/2 z-10 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent"
                                    style={{
                                        backgroundColor: phase.status === 'current' ? '#22c55e' : '#6b7280',
                                    }}
                                    aria-label={`Voir ${phase.title}`}
                                >
                                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                </button>

                                {/* Contenu */}
                                <div className={`ml-12 sm:ml-0 sm:w-1/2 ${isEven ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'}`}>
                                    <button
                                        onClick={() => togglePhase(phase.id)}
                                        className={`w-full text-left p-4 sm:p-6 rounded-xl border transition-all ${isExpanded
                                                ? 'bg-accent/10 border-accent shadow-lg'
                                                : 'bg-background border-foreground/10 hover:border-accent/30'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${phase.color} text-white`}>
                                                {phase.year}
                                            </span>
                                            {phase.status === 'current' && (
                                                <span className="flex items-center gap-1 text-xs text-green-500 font-medium">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                    En cours
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="font-semibold text-lg mb-1">{phase.title}</h3>
                                        <p className="text-sm text-muted-foreground">{phase.subtitle}</p>

                                        <div className="mt-2 flex items-center justify-end gap-1 text-accent">
                                            {isExpanded ? (
                                                <ChevronUp className="w-4 h-4" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Détails expansibles */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-4"
                                            >
                                                <p className="text-sm text-muted-foreground mb-4 italic">
                                                    {phase.description}
                                                </p>
                                                <ul className="space-y-2">
                                                    {phase.objectives.map((objective, i) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                                            <span className="text-sm">{objective}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Légende */}
            <div className="mt-8 pt-6 border-t border-foreground/10 flex flex-wrap gap-4 justify-center text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span>Phase en cours</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full" />
                    <span>Phase à venir</span>
                </div>
            </div>
        </div>
    );
}
