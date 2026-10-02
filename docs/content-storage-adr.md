# ADR — Stockage du contenu : base de données ou fichiers ?

Date : 2026-10-02
Statut : accepté
Portée : `docs/architecture-reset.md` (règle de frontière de données), appliquée type de contenu par type de contenu.

## Contexte

Le site est une identité numérique personnelle : cinq pages publiques, un blog, un formulaire de contact. Deux options étaient possibles pour le contenu éditorial : des fichiers versionnés avec le code, ou la base de données déjà en place via Prisma.

`docs/architecture-reset.md` fixe la règle (« un modèle en base seulement si une fonctionnalité démontrée exige de la persistance ») mais ne tranche pas, type de contenu par type de contenu. C'est ce que cette note tranche.

## Décision

**Le contenu éditorial vit en base (Prisma). Le dépôt ne contient pas de contenu de publication, et aucun collecteur MDX/frontmatter n'est introduit.**

| Type de contenu                           | Stockage                            | Raison                                                                                                     |
| ----------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Articles de blog                          | Base — modèle `Post`                | Publication via `/admin/blog` sans déploiement ; les brouillons et l'état `publishedAt` sont gérés en base |
| Catégories et tags d'articles             | Base — `Category`, `Tag`            | Modélisation many-to-many des articles, sans usage éditorial indépendant                                   |
| Commentaires                              | Base — `Comment`                    | Taxonomie modérée (`pending` / `approved` / `spam`) : persistance et file de modération                    |
| Événements et inscriptions                | Base — `Event`, `EventRegistration` | Inscription utilisateur, unicité `(userId, eventId)`, rappels envoyés une seule fois                       |
| Messages de contact                       | Base — `ContactMessage`             | Workflow de traitement (statut, réponse, rattachement à un utilisateur)                                    |
| Textes marketing, pages, mentions légales | Code (composants)                   | Une seule version, pas de cycle de publication : la base n'apporterait rien                                |

## Conséquences

- Aucune collection MDX, aucun `content/`, aucune configuration de build supplémentaire.
- `pnpm db:generate` puis la synchronisation du schéma restent des prérequis de build (déjà couverts par `pnpm build` et la CI).
- Les modèles décrits comme « nécessitant une décision explicite » dans `architecture-reset.md` sont ici validés : `Comment`, `Event`, `EventRegistration`, `Category`, `Tag`.
- Tout nouveau modèle doit être justifié par une fonctionnalité démontrée, sinon il vit dans un composant.
- Le HTML riche est stocké sérialisé dans `Post.content` et assaini côté serveur par `lib/sanitize.ts` avant rendu ; le format n'est pas du MDX.
