# Roadmap — Eurin Hash Portfolio (reboot)

> **Statut :** nouvelle base en préparation sur `reboot/simplified-portfolio`.
> **Principe :** site vitrine personnel, pas de SaaS ni de CMS surdimensionné.
> **Important :** cette roadmap décrit la cible. Le code doit être audité et simplifié avant de considérer les tâches terminées.

## Objectif produit

Présenter clairement Eurin Hash, ses compétences, ses projets vérifiables et ses contenus techniques ; faciliter la prise de contact. Le site doit être rapide, accessible, crédible, maintenable et peu coûteux à exploiter.

## Périmètre V1

- Accueil avec positionnement clair et appels à l'action utiles.
- À propos / parcours professionnel.
- Compétences organisées par domaines réellement maîtrisés.
- Projets et études de cas avec contexte, rôle, choix techniques, résultats vérifiables et liens.
- Articles techniques uniquement si le rythme éditorial le justifie.
- Contact simple, validé côté serveur et protégé contre le spam.
- Pages légales nécessaires, 404, métadonnées, sitemap et robots.
- Responsive design, accessibilité clavier, états de focus, reduced motion et performances mesurées.

## Hors périmètre V1

- Authentification, comptes utilisateurs, rôles et bannissement.
- Tableau de bord, KPI, analytics applicatifs et audit log.
- CMS personnalisé, éditeur riche et workflow de publication.
- Base PostgreSQL, Prisma et migrations, sauf besoin concret démontré.
- Gestion d'événements, inscriptions, newsletters et campagnes groupées.
- Upload média administrable, stockage Blob et système de tickets.
- Animations complexes ou système de motion autonome.
- API ou abstractions créées uniquement pour un éventuel besoin futur.

## Architecture cible

- Next.js App Router + TypeScript.
- Tailwind CSS et composants accessibles simples.
- Contenu versionné dans Git : fichiers TypeScript/MDX/Markdown selon le besoin réel.
- Server Components par défaut ; Client Components uniquement pour l'interactivité nécessaire.
- Contact : endpoint minimal ou service externe fiable, validation, limitation anti-spam et e-mail uniquement si le besoin le justifie.
- Pas de base de données ni d'authentification dans la V1.
- Déploiement simple, variables d'environnement minimales et logs sans données sensibles.

## Plan d'exécution

### Phase 0 — Préserver et repartir proprement
- [x] Créer la branche `reboot/simplified-portfolio`.
- [x] Fermer les PR de l'ancien périmètre sans les fusionner ; conserver leur historique.
- [x] Documenter les décisions de périmètre.
- [ ] Inventorier les routes, dépendances, modèles, variables d'environnement et composants existants.
- [ ] Identifier ce qui est conservé, supprimé ou réécrit.
- [ ] Vérifier les données et services de production avant toute suppression destructive.

### Phase 1 — Socle fonctionnel
- [ ] Stabiliser le positionnement, la navigation et la structure des pages.
- [ ] Définir les types de contenu Projet et Article sans CMS.
- [ ] Réduire les dépendances à celles utilisées.
- [ ] Retirer Better Auth et les routes associées après vérification de toutes les références.
- [ ] Retirer Prisma/PostgreSQL et les modèles non nécessaires après vérification des données et du déploiement.
- [ ] Simplifier le formulaire de contact ; valider et limiter les soumissions.

### Phase 2 — Contenu et preuve
- [ ] Réécrire l'accueil autour de la proposition de valeur et de preuves concrètes.
- [ ] Publier des études de cas factuelles, sans métriques ou témoignages inventés.
- [ ] Clarifier le parcours professionnel et les domaines d'expertise.
- [ ] Vérifier tous les liens, CTA, coordonnées et informations légales.

### Phase 3 — Qualité et mise en ligne
- [ ] Installer/maintenir lint, typecheck, tests utiles et build dans la CI.
- [ ] Tester les routes publiques sur mobile et desktop.
- [ ] Vérifier clavier, focus, contraste, labels, erreurs de formulaire et reduced motion.
- [ ] Vérifier SEO technique, sitemap, robots et métadonnées.
- [ ] Mesurer les performances sur une build de production.
- [ ] Vérifier variables d'environnement et absence de secrets dans le dépôt.
- [ ] Déployer et tester le parcours de contact de bout en bout.

## Règles de décision

1. Une fonctionnalité n'entre dans le périmètre que si elle aide directement à présenter le travail ou à générer un contact professionnel.
2. Pas d'authentification sans utilisateurs authentifiés ayant un besoin réel.
3. Pas de base de données si des fichiers versionnés suffisent.
4. Pas de CMS avant d'avoir démontré qu'éditer le contenu dans Git est un vrai frein.
5. Ne jamais supprimer une base, un fichier de production ou un secret sans inventaire et procédure de sauvegarde appropriée.
6. Une issue ne se ferme comme terminée qu'avec une preuve ; les chantiers abandonnés sont fermés comme `not planned` avec justification.
7. La qualité du contenu, la crédibilité et la facilité de maintenance priment sur le nombre de fonctionnalités.

## Définition de terminé

Le portfolio est prêt lorsque les pages publiques essentielles sont utiles et cohérentes, les projets sont crédibles, le contact fonctionne, le site est accessible et responsive, le build passe, les performances sont acceptables et aucune dépendance majeure n'existe sans justification.
