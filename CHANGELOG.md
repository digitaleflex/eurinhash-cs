# Changelog

Toutes les modifications importantes du projet sont documentées ici.

## [Unreleased]

### Release Readiness

- Ajout de `CHECKLIST.md` comme source de vérité pour la préparation de la production.
- Formalisation des gates Foundation, Content Hub, Security, UX, SEO, Performance, Infrastructure et Release QA.
- Règle de preuve : une étape n'est considérée comme terminée qu'avec une preuve vérifiable (commit, PR, CI, test ou audit).

### Content Hub

- PR #90 en cours pour le domaine Prisma Project / Media / SEO.
- Modèle cible documenté dans un ADR.
- Migration PostgreSQL additive préparée.
- CI configurée pour prendre en compte `main`.

### Release posture

- Le projet reste explicitement **NOT READY FOR PUBLIC RELEASE** tant que les gates de données, admin, publication, sécurité, QA et production ne sont pas validés.
- Les travaux de motion restent secondaires et ne doivent pas retarder la stabilisation fonctionnelle.

## Historical

Voir l'historique Git et les PR associées pour les changements antérieurs.
