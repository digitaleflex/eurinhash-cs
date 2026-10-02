# Rapport de reset — ce qui a été supprimé, simplifié, gardé

Référence : PR #44 (merge `e3faf4b`) puis les passes de durcissement qui ont suivi
(diff `main` → `develop` : 89 fichiers, +1862 / −1118).

Ce rapport répond aux questions que l'issue #42 pose. Il ne réinterprète pas le
reset : chaque affirmation est vérifiable par un diff.

## 1. Qu'est-ce qui a été supprimé

| Élément                                                        | Nature                         | Pourquoi                                                                                                                                     |
| -------------------------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `pages/_document.tsx`                                          | configuration legacy           | Le projet est 100 % App Router ; la route `pages/` n'a jamais contenu de route. Doublon mort de `app/layout.tsx`.                            |
| `lib/prisma-api.ts`                                            | couche d'accès dupliquée       | Deuxième instance Prisma (variante Accelerate) pour les routes API. Le client canonique unique est `lib/prisma.ts`.                          |
| `app/api/debug/seed/route.ts`                                  | endpoint de debug              | Route d'insertion en base accessible en HTTP, non protégée.                                                                                  |
| `scratch/test-db.js`, `test-mail.ts`                           | scripts de mise au point       | Écrits dans le dépôt à la racine, exécutables à la main, non couverts par la CI.                                                             |
| `.eslintrc.json`                                               | double configuration ESLint    | Remplacé par `eslint.config.mjs` (flat config), le format attendu par ESLint 9.                                                              |
| `.npmrc` (`shamefully-hoist`, `node-linker=hoisted`)           | mode d'installation            | Reproduisait le `node_modules` plat de npm : masquait les dépendances réellement manquantes.                                                 |
| `SECURITY.md`, `.github/dependabot.yml`                        | fichiers de sécurité obsolètes | Le premier n'était plus le processus réel, le second pointait un configurateur npm/yarn inexistant.                                          |
| 4 composants jamais importés                                   | code mort                      | `home/community.tsx` (faux compteurs « +9000 abonnés »), `home/events.tsx`, `home/resources.tsx` (PDF fictifs), `faq-section.tsx`.           |
| 4 extensions tiptap                                            | dépendances                    | `@tiptap/extension-{highlight,task-item,task-list,typography}` installées, jamais configurées dans l'éditeur.                                |
| `allowBuilds` non documenté, variables mortes de `SITE_CONFIG` | configuration                  | Clés jamais lues (images, `cache.*Ttl`, `time`, `forms.projectRequest`), doublons de métadonnées entre `lib/config.ts` et `lib/metadata.ts`. |

## 2. Ce qui a été simplifié

- **Une seule famille de versions** : `eslint-config-next` était en v16 pendant que le projet tournait en Next 15 — le lint ne démarrait même pas.
- **Un seul package manager** : pnpm épinglé dans `packageManager`, scripts et README alignés, plus de `npm audit` dans un dépôt pnpm.
- **Un seul landmark `<main>` par route** : le layout racine l'enveloppait _et_ chaque page en déclarait un (HTML invalide).
- **Une seule source pour l'URL du site**, l'image OG et les liens sociaux (avant : 5 copies en dur, dont une qui pointait vers un fichier inexistant).
- **Un seul état de publication** pour le blog : `publishedAt` fait autorité, avec migration de remplissage.
- **Un seul statut typé** : `status` est passé de `String` libre à des enums Prisma.
- **Zéro `any` explicite** dans le code applicatif, avec le verrou ESLint en `error`.
- **Une seule frontière d'authentification** : `getCurrentUser()`, `requireUser()`, `requireAdmin()`.

## 3. Ce qui a été délibérément gardé

- `app/admin/**` complet : la gestion éditoriale via la base est un vrai usage, pas une abstraction spéculative (décision consignée dans `docs/content-storage-adr.md`).
- Le blog TipTap : l'édition riche justifiée par la publication d'articles.
- Les 4 modèles `Comment`, `Event`, `EventRegistration`, `Category`, `Tag` : utilisés, donc conservés.
- Better Auth avec son plugin admin : il fournit la session serveur, source de vérité de l'autorisation.
- La base Postgres : le contenu éditorial et les messages de contact exigent une persistance.

## 4. Abstractions qui se sont révélées inutiles

| Abstraction                       | Verdict                                                                                                                                                                                                                                                          |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lib/prisma-api.ts`               | supprimée — même rôle que `lib/prisma.ts`                                                                                                                                                                                                                        |
| `ConditionalWrapper`              | conservée provisoirement : elle masque l'en-tête sur `/admin` et `/dashboard` **à l'exécution**, donc ces routes téléchargent encore le JS de la navigation publique. Un groupe de routes `(public)` la rendrait inutile (gain estimé 20 KB gzip sur 16 routes). |
| `components/mobile-menu/index.ts` | barrel importé par personne, à supprimer                                                                                                                                                                                                                         |
| `SiteConfig` / `siteConfig`       | un seul conservé, l'autre supprimé                                                                                                                                                                                                                               |
| `sitemap` statique                | remplacé par une version qui interroge la base                                                                                                                                                                                                                   |

## 5. Modèles de base de données disparus

Aucun modèle n'a été supprimé depuis `main`. Les changements sont :

- `ContactMessage` : ajout de `userId` (relation), avec remplissage par email.
- `Post` : `publishedAt` devient la source de vérité, rempli à partir de `createdAt`.
- `EventRegistration` : ajout de `reminderSentAt`.
- `ContactMessage`, `Event`, `Comment` : `status` devient un enum.
- Une table `project_requests` existait dans l'historique de migrations sans modèle correspondant : le dossier `prisma/migrations/` n'est pas canonique, ce qui est désormais écrit noir sur blanc.

## 6. Routes disparues

Aucune route publique n'a été supprimée. Les routes supprimées sont :

- `pages/_document.tsx` (route inexistante, configuration legacy)
- `app/api/debug/seed` (endpoint de debug)

`/projects` n'existe plus : la route publique s'appelle `/realisations`. Le README documentait encore l'ancien nom.

## 7. Dépendances disparues

- 4 extensions tiptap
- `@eslint/eslintrc` reste requis par la compat flat config ; `eslint-config-next` est repassé en 15.5.x
- Ajoutées et assumées : `@tailwindcss/typography` (les classes `prose*` étaient inertes sans lui), `tailwindcss-animate` (les classes `animate-in`/`animate-out` ne produisaient aucun CSS), `@typescript-eslint/eslint-plugin` (pour verrouiller l'interdiction du `any`)

## 8. Pourquoi l'architecture est plus facile à maintenir

1. **Une seule façon de faire chaque chose** : session, base, publication, styles, package manager. Les couches dupliquées ont été supprimées ou fusionnées.
2. **Les invariants sont vérifiés par la machine** : la CI échoue si le lint, le typecheck, les tests ou le build cassent ; le `any` est interdit ; le `use client` inutile ne peut plus entrer sans justification.
3. **Les promesses du code correspondent au code** : avant, le site annonçait des compteurs, une certification et une promesse de 24 h qui n'existaient nulle part.
4. **La surface d'API est minimale** : `/api/*` ne contient que le formulaire de contact, l'upload d'image et l'authentification.

## 9. Ce qui empêche de reconstruire la complexité retirée

- `AGENTS.md` : règles de flux, de base de données, d'authentification et de qualité, lu par tout agent qui travaille sur le dépôt.
- `prisma/migrations/README.md` : interdit explicitement `migrate deploy`.
- `docs/content-storage-adr.md` : la règle de frontière de données, appliquée type de contenu par type de contenu.
- `docs/motion-system.md` : le contrat motion, pour que les animations restent une question de tokens.
- Le verrou ESLint `no-explicit-any: error` et la CI stricte : les régressions de dette ne passent pas.

## 10. Ce qui reste et pourrait être supprimé

Question posée par l'issue, à laquelle il faut répondre franchement — oui, il en reste :

| Reste                                                                                                  | Pourquoi ce n'est pas « peut-être plus tard »                                                              | Suite                                                             |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `ConditionalWrapper`                                                                                   | Coût réel : la navigation publique est téléchargée sur `/admin` et `/dashboard`                            | Groupe de routes `(public)` — gain ~20 KB gzip sur 16 routes      |
| `components/mobile-menu/index.ts`                                                                      | Barrel importé par personne                                                                                | Supprimer                                                         |
| `app/dashboard/messages/message-item.tsx` et `app/admin/blog/new/page.tsx` en Client Component complet | Une page entière en client pour un seul formulaire                                                         | Extraire le formulaire, comme c'est déjà fait pour les événements |
| `EventForm` sans champ `status`                                                                        | Un événement reste `upcoming` indéfiniment : le compteur « à venir » et la page d'accueil tournent en faux | Ajouter le champ, ou le retirer du formulaire                     |
| `/legal/cookies` promet un bandeau de consentement qui n'existe pas                                    | Promesse non tenue                                                                                         | Écrire le bandeau ou retirer la promesse                          |

Ces points sont ceux qui restent à traiter ; ils sont listés ici plutôt que traités
dans ce rapport pour qu'on ne les perde pas de vue.
