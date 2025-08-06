# Requirements Document

## Introduction

Ce projet vise à créer un système de pages d'accueil adaptatives pour EurinHash, permettant de segmenter automatiquement les visiteurs entre trois audiences distinctes : entreprises, étudiants/reconversion, et particuliers. Chaque segment aura une page optimisée avec un contenu, des offres et des call-to-action spécifiques à leurs besoins.

## Requirements

### Requirement 1 - Système de sélection d'audience

**User Story:** En tant que visiteur arrivant sur EurinHash, je veux pouvoir indiquer mon profil (entreprise/étudiant/particulier) pour accéder à du contenu adapté à mes besoins.

#### Acceptance Criteria

1. WHEN un visiteur arrive sur le site THEN le système SHALL afficher une modal de sélection d'audience
2. WHEN le visiteur sélectionne "Entreprise" THEN le système SHALL rediriger vers la page entreprise actuelle
3. WHEN le visiteur sélectionne "Étudiant/Reconversion" THEN le système SHALL rediriger vers la page formation
4. WHEN le visiteur sélectionne "Particulier" THEN le système SHALL rediriger vers une page services particuliers
5. WHEN le visiteur ferme la modal sans choisir THEN le système SHALL afficher la page entreprise par défaut
6. WHEN le visiteur a déjà fait un choix THEN le système SHALL mémoriser sa préférence via localStorage

### Requirement 2 - Page Formation pour Étudiants/Reconversion

**User Story:** En tant qu'étudiant ou personne en reconversion, je veux découvrir les programmes de formation EurinHash pour développer mes compétences tech.

#### Acceptance Criteria

1. WHEN j'accède à la page formation THEN le système SHALL afficher un hero orienté apprentissage et carrière
2. WHEN je consulte les formations THEN le système SHALL présenter 5 programmes : Programmation, Réseaux & Infra, Cybersécurité, Cloud Computing, Intelligence Artificielle
3. WHEN je clique sur un programme THEN le système SHALL afficher les détails : durée, prérequis, certification, débouchés
4. WHEN je veux m'inscrire THEN le système SHALL proposer un formulaire avec : nom, email, téléphone, niveau actuel, programme souhaité
5. WHEN je soumets ma candidature THEN le système SHALL envoyer une confirmation et programmer un entretien
6. WHEN je consulte les témoignages THEN le système SHALL afficher des success stories d'anciens étudiants

### Requirement 3 - Page Services Particuliers

**User Story:** En tant que particulier, je veux accéder à des services tech personnalisés pour mes projets personnels ou petites activités.

#### Acceptance Criteria

1. WHEN j'accède à la page particuliers THEN le système SHALL afficher des services adaptés aux besoins individuels
2. WHEN je consulte les offres THEN le système SHALL présenter : dépannage informatique, création site web personnel, formation individuelle, consultation tech
3. WHEN je veux un devis THEN le système SHALL proposer un formulaire simplifié avec budget indicatif
4. WHEN je consulte les tarifs THEN le système SHALL afficher des prix accessibles en FCFA
5. WHEN je veux prendre rendez-vous THEN le système SHALL intégrer un calendrier de réservation

### Requirement 4 - Navigation et Mémorisation

**User Story:** En tant qu'utilisateur ayant choisi mon profil, je veux pouvoir naviguer facilement entre les sections et changer de profil si nécessaire.

#### Acceptance Criteria

1. WHEN j'ai sélectionné mon profil THEN le système SHALL ajouter un indicateur dans la navigation
2. WHEN je veux changer de profil THEN le système SHALL proposer un bouton "Changer de profil" dans le header
3. WHEN je navigue sur d'autres pages THEN le système SHALL maintenir le contexte de mon profil
4. WHEN je reviens sur le site THEN le système SHALL me rediriger automatiquement vers ma page profil
5. WHEN je partage un lien THEN le système SHALL permettre l'accès direct sans modal pour les liens spécifiques

### Requirement 5 - Optimisation Conversion par Segment

**User Story:** En tant que propriétaire du site, je veux maximiser les conversions en adaptant le contenu et les CTA à chaque audience.

#### Acceptance Criteria

1. WHEN un visiteur entreprise consulte la page THEN le système SHALL mettre l'accent sur ROI, sécurité, et audit gratuit
2. WHEN un étudiant consulte la page THEN le système SHALL mettre l'accent sur carrière, certification, et financement formation
3. WHEN un particulier consulte la page THEN le système SHALL mettre l'accent sur simplicité, prix abordables, et support personnalisé
4. WHEN je mesure les performances THEN le système SHALL tracker les conversions par segment
5. WHEN j'analyse les données THEN le système SHALL fournir des métriques séparées par audience

### Requirement 6 - Contenu Spécialisé Formation

**User Story:** En tant qu'étudiant intéressé par une formation tech, je veux des informations détaillées sur les programmes pour faire mon choix.

#### Acceptance Criteria

1. WHEN je consulte le programme Programmation THEN le système SHALL détailler : langages (Python, JavaScript, Java), projets pratiques, durée 6 mois
2. WHEN je consulte Réseaux & Infrastructure THEN le système SHALL détailler : CCNA, administration systèmes, sécurité réseau, durée 4 mois
3. WHEN je consulte Cybersécurité THEN le système SHALL détailler : ethical hacking, forensic, conformité, certifications CEH/CISSP, durée 8 mois
4. WHEN je consulte Cloud Computing THEN le système SHALL détailler : AWS/Azure, DevOps, containers, certification cloud, durée 5 mois
5. WHEN je consulte IA THEN le système SHALL détailler : machine learning, deep learning, Python/TensorFlow, projets concrets, durée 7 mois
6. WHEN je veux comparer THEN le système SHALL proposer un tableau comparatif des programmes