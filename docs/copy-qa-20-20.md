# Copy QA 20/20 — Foundation Reset

## Statut

Audit statique réalisé sur la branche `foundation/20-20-reset` après la refonte éditoriale.

## Matrice

| Surface | Compréhension | Claims | CTA | SEO / structure | Statut |
|---|---|---|---|---|---|
| / | PASS | PASS | PASS | PASS | PASS |
| /services | PASS | PASS | PASS | PASS | PASS |
| /services/audit | PASS | PASS | PASS | PASS | PASS |
| /services/architecture | PASS | PASS | PASS | PASS | PASS |
| /realisations | PASS | PASS | PASS | PASS | PASS |
| /a-propos | PASS | PASS | PASS | PASS | PASS |
| /blog | PASS | À vérifier sur les données publiées | PASS | PASS | NEEDS WORK |
| /contact | PASS | PASS | PASS | PASS | PASS |
| /evenements | À vérifier selon maintien du domaine | À vérifier | À vérifier | À vérifier | NEEDS WORK |
| /ressources | À vérifier selon contenu réel | À vérifier | À vérifier | À vérifier | NEEDS WORK |
| /legal/* | Transparence juridique | N/A | N/A | À vérifier | NEEDS WORK |

## Corrections effectuées

- suppression des métriques décoratives de la homepage ;
- suppression des promesses absolues ;
- remplacement de « Lead Architect » par le positionnement canonique ;
- suppression du faux contenu d’insights sur la homepage ;
- réécriture des services autour des problèmes, interventions, livrables et valeur ;
- standardisation des réalisations autour de contexte → objectif → contraintes → décisions → résultat/état ;
- création d’une page À propos cohérente ;
- CTA rendus explicites ;
- metadata globales réalignées avec le positionnement.

## Vérifications restantes

Les tests runtime, le build de production, l’audit Lighthouse/axe et la vérification visuelle desktop/mobile doivent être exécutés dans un environnement capable d’installer les dépendances et de démarrer l’application.

Aucun score global arbitraire n’est attribué.
