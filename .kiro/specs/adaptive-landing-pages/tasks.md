# Implementation Plan - Système de Pages Adaptatives EurinHash

## Phase 1 - Infrastructure et Routage

- [x] 1. Créer la structure de routage adaptative
  - Modifier app/page.tsx pour intégrer le système de sélection d'audience
  - Créer les dossiers app/entreprise/, app/formation/, app/particuliers/
  - Implémenter la logique de redirection basée sur localStorage
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 2. Développer le composant AudienceSelector
  - Créer app/components/AudienceSelector.tsx avec modal overlay
  - Implémenter les 3 options de sélection avec icônes et descriptions
  - Ajouter les animations d'entrée/sortie et gestion de fermeture
  - Intégrer la logique de mémorisation localStorage
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 3. Créer le système de mémorisation des préférences
  - Implémenter les utilitaires localStorage pour UserPreferences
  - Créer les hooks personnalisés useAudiencePreference
  - Ajouter la gestion des fallbacks (cookies, session)
  - Implémenter la logique de redirection automatique
  - _Requirements: 1.6, 4.4_

- [x] 4. Migrer la page entreprise existante
  - Déplacer le contenu actuel vers app/entreprise/page.tsx
  - Adapter les imports et références
  - Tester que la page entreprise fonctionne identiquement
  - _Requirements: 1.2_

## Phase 2 - Page Formation pour Étudiants

- [x] 5. Créer la structure de la page formation
  - Développer app/formation/page.tsx avec layout de base
  - Créer le hero section orienté apprentissage et carrière
  - Implémenter la structure des sections principales
  - _Requirements: 2.1_

- [x] 6. Développer les composants de programmes de formation
  - Créer app/components/ProgramCard.tsx pour afficher chaque programme
  - Implémenter les 5 programmes : Programmation, Réseaux, Cybersécurité, Cloud, IA
  - Ajouter les détails : durée, prérequis, certification, débouchés, prix FCFA
  - Créer le système d'expansion/collapse pour les détails
  - _Requirements: 2.2, 2.3, 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 7. Implémenter le formulaire d'inscription formation
  - Créer le composant FormationRegistrationForm
  - Ajouter les champs : nom, email, téléphone, niveau actuel, programme souhaité
  - Implémenter la validation côté client et la soumission
  - Ajouter la confirmation et logique de programmation d'entretien
  - _Requirements: 2.4, 2.5_

- [x] 8. Créer la section témoignages étudiants
  - Adapter le composant TestimonialsSection pour les success stories d'étudiants
  - Créer du contenu spécifique aux parcours de formation
  - Intégrer les témoignages dans la page formation
  - _Requirements: 2.6_

- [x] 9. Développer la FAQ spécifique formation
  - Adapter FAQSection avec des questions orientées formation/carrière
  - Ajouter les questions sur financement, durée, prérequis, débouchés
  - Intégrer dans la page formation
  - _Requirements: 2.1_

## Phase 3 - Page Services Particuliers

- [x] 10. Créer la structure de la page particuliers
  - Développer app/particuliers/page.tsx avec hero simplifié
  - Créer le design orienté accessibilité et prix abordables
  - Implémenter la structure des sections services
  - _Requirements: 3.1_

- [x] 11. Développer les composants services particuliers
  - Créer app/components/ServiceCard.tsx pour les services individuels
  - Implémenter les services : dépannage, site web, formation individuelle, consultation
  - Ajouter les tarifs accessibles en FCFA et descriptions claires
  - _Requirements: 3.2, 3.4_

- [x] 12. Créer le système de devis et prise de rendez-vous
  - Développer le formulaire de demande de devis simplifié
  - Implémenter le système de sélection de budget indicatif
  - Créer l'intégration calendrier pour prise de rendez-vous
  - Ajouter la logique de soumission et confirmation
  - _Requirements: 3.3, 3.5_

- [x] 13. Adapter les témoignages pour particuliers
  - Créer des témoignages spécifiques aux services particuliers
  - Adapter le composant TestimonialsSection
  - Intégrer dans la page particuliers
  - _Requirements: 3.1_

## Phase 4 - Navigation et Optimisation

- [x] 14. Implémenter le système de changement de profil
  - Créer app/components/ProfileSwitcher.tsx dans la navigation
  - Ajouter l'indicateur de profil actuel dans le header
  - Implémenter la logique de changement de profil
  - Tester la navigation entre les différentes pages
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 15. Optimiser le contenu par segment
  - Adapter les CTA et messages selon l'audience (entreprise/formation/particuliers)
  - Implémenter les variations de contenu pour maximiser les conversions
  - Créer les métriques de tracking par segment
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 16. Créer le tableau comparatif des programmes
  - Développer un composant ProgramComparison interactif
  - Permettre la comparaison des 5 programmes de formation
  - Intégrer dans la page formation
  - _Requirements: 6.6_

- [x] 17. Implémenter les optimisations performance






  - Ajouter le code splitting par route (entreprise/formation/particuliers)
  - Implémenter le lazy loading des composants non critiques
  - Optimiser les images et ajouter le prefetching intelligent
  - Tester les performances sur mobile et desktop
  - _Requirements: Performance considerations du design_

- [ ] 18. Ajouter les tests et validation
  - Créer les tests unitaires pour AudienceSelector, ProgramCard, ServiceCard
  - Implémenter les tests d'intégration pour le flux de sélection
  - Ajouter les tests E2E pour chaque parcours utilisateur
  - Valider la gestion d'erreurs et les fallbacks
  - _Requirements: Error handling et Testing strategy du design_

- [ ] 19. Finaliser l'intégration et déploiement
  - Tester l'ensemble du système sur tous les parcours
  - Valider la persistance des préférences et la navigation
  - Vérifier la compatibilité mobile et les performances
  - Préparer le déploiement avec les métriques de suivi
  - _Requirements: Tous les requirements_