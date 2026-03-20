export interface TimelinePhase {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  status: 'current' | 'upcoming';
  description: string;
  objectives: string[];
}

export const TIMELINE_PHASES: TimelinePhase[] = [
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
