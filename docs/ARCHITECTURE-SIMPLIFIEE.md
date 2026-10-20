# Architecture cible — Eurin Hash Portfolio

## Décision

Le produit est un portfolio personnel public. Il ne doit pas être traité comme une application multi-utilisateur. La V1 ne nécessite ni authentification, ni tableau de bord, ni base de données par défaut.

## Stack minimale proposée

- Next.js App Router
- TypeScript strict
- Tailwind CSS
- MDX/Markdown ou données TypeScript versionnées dans Git pour les projets et articles
- Hébergement Next.js déjà adapté au projet
- Service e-mail uniquement pour le formulaire de contact si celui-ci en a réellement besoin

Conserver une dépendance existante uniquement si elle sert une fonction visible, nécessaire et effectivement utilisée.

## Structure fonctionnelle indicative

```text
app/
  page.tsx
  about/page.tsx
  projects/page.tsx
  projects/[slug]/page.tsx
  writing/page.tsx             # uniquement si les articles sont retenus
  writing/[slug]/page.tsx      # uniquement si les articles sont retenus
  contact/page.tsx
  privacy/page.tsx
  not-found.tsx
content/
  projects/
  articles/                    # facultatif
components/
  layout/
  projects/
  contact/
  ui/
lib/
  content.ts
  validation.ts
public/
```

Cette structure est indicative : ne pas créer les dossiers/routes avant d'avoir audité l'existant et confirmé le contenu utile.

## Contenu

Les projets sont des fichiers versionnés contenant au minimum :
- titre et slug ;
- résumé ;
- problème/contexte ;
- rôle exact d'Eurin ;
- décisions techniques pertinentes ;
- résultats vérifiables ;
- technologies réellement utilisées ;
- liens vers une démo ou un dépôt, quand ils existent ;
- visuel avec texte alternatif.

Les articles sont facultatifs. S'ils sont retenus, les stocker dans Git (Markdown/MDX) et les publier avec le déploiement. Aucun éditeur riche n'est requis.

## Contact et sécurité

- Garder le formulaire court.
- Validation côté serveur et messages d'erreur explicites.
- Anti-spam proportionné : honeypot et/ou rate limit adapté à l'infrastructure.
- Ne pas exposer les clés e-mail au navigateur.
- Ne pas journaliser le contenu des messages ni les secrets inutilement.
- Pas de comptes ou de route admin publique.
- Ne collecter que les données indispensables et afficher les informations de confidentialité nécessaires.

Si le formulaire peut simplement ouvrir un client e-mail ou utiliser un service externe fiable, préférer cette option à un backend propriétaire inutile.

## Dépendances à auditer

Le `package.json` actuel contient Better Auth, Prisma, Neon, des bibliothèques d'éditeur riche, Recharts, Resend, Vercel Blob, analytics et plusieurs dépendances d'interface. Ne pas les supprimer en masse sans vérifier les imports et les fonctionnalités actuelles. Procéder par étapes, avec build et tests après chaque lot.

Ordre d'audit :
1. Authentification : routes, middleware, sessions, providers, schéma et variables d'environnement.
2. Données : modèles Prisma, appels DB, migrations, scripts de sauvegarde et éventuelles données de production.
3. CMS : routes admin, éditeur, upload, publication, brouillons et liens vers le blog.
4. E-mail : formulaire, notifications et templates.
5. Analytics : scripts tiers et collecte de données.
6. Motion/UI : dépendances réellement utilisées, préférences reduced-motion et coût JavaScript.

## Déploiement

- Un build de production reproductible.
- CI minimale : installation verrouillée, lint, typecheck, tests pertinents, build.
- Variables d'environnement documentées dans `.env.example`, sans valeur secrète.
- Vérification du domaine, HTTPS, sitemap, robots et métadonnées.
- Avant de retirer la base ou les services d'un environnement actif, confirmer qu'aucune donnée métier utile n'y est conservée, sauvegarder si nécessaire et prévoir un rollback.

## Non-objectifs

- SaaS, multi-tenant, RBAC, dashboard analytics, CRM, système de tickets, événements et gestion de membres.
- CMS personnalisé, page builder, stockage média administrable.
- Architecture distribuée ou API générique pour des besoins hypothétiques.
- Motion complexe conçu comme un produit séparé.

## Critères d'acceptation

- Aucune authentification ni page admin dans le parcours public.
- Toutes les pages retenues sont accessibles et utiles.
- Contenu factuel, sans faux chiffres ni témoignages inventés.
- Formulaire de contact fiable et protégé si conservé.
- Aucun secret dans Git.
- Lint, typecheck, tests retenus et build passent.
- Responsive, navigation clavier, focus visible, contrastes et reduced motion vérifiés.
- Les dépendances restantes ont une justification claire.
