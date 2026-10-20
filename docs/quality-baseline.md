# Baseline qualité reproductible

> Issues : #109 (Tailwind v3/v4) et #110 (baseline lint/types/tests/build)
> Branche : `fix/p0-quality-baseline` — environnement : Windows, Node 22.22.2, pnpm 12.3.4 (via `corepack pnpm`).

## 1. Commandes et résultats observés

Exécutées depuis la racine du dépôt, après `pnpm install --frozen-lockfile` (exit 0, lockfile inchangé).

| Commande | Résultat | Détail |
| --- | --- | --- |
| `pnpm install --frozen-lockfile` | ✅ exit 0 | « Lockfile is up to date, resolution step is skipped » |
| `pnpm lint` | ✅ exit 0 | Aucune erreur, aucun warning |
| `pnpm type-check` | ✅ exit 0 | Aucune erreur TypeScript |
| `pnpm test:ci` | ✅ exit 0 | 5 suites / 34 tests passés |
| `pnpm build` | ✅ exit 0 | 21 pages générées, aucune erreur Tailwind |
| `pnpm prisma validate` | ✅ exit 0 en local (`.env`) | Échouait en CI faute de `DATABASE_URL` → corrigé (voir §3) |

### Couverture (fichiers sous seuil strict)

| Fichier | Stmts | Branch | Funcs | Lines |
| --- | --- | --- | --- | --- |
| `app/api/contact/route.ts` | 96.66 | 100 | 100 | 96.66 |
| `lib/validation.ts` | 100 | 100 | 100 | 100 |
| `lib/sanitize.ts` | 100 | 100 | 100 | 100 |
| `lib/rate-limit.ts` | 81.25 | 75 | 83.33 | 82.14 |
| `components/contact-form.tsx` | 57.14 | 100 | 40 | 66.66 |
| `components/_hooks/useContactForm.ts` | 64.51 | 27.77 | 55.55 | 67.24 |

Seuils stricts (70 %) appliqués à : `lib/sanitize.ts`, `lib/rate-limit.ts`, `lib/validation.ts`, `app/api/contact/route.ts`.

## 2. Décision Tailwind (#109) : rester sur Tailwind CSS v3

Constat vérifié :

- `package.json` déclare `tailwindcss@^3.4.17`, le lockfile résout **3.4.19**.
- `postcss.config.mjs` utilise le plugin `tailwindcss` (API v3 ; v4 exigerait `@tailwindcss/postcss`).
- `tailwind.config.ts` est bien chargé (les couleurs `hsl(var(--accent))` etc. sont générées).
- Une seconde version, **4.2.4**, n'existe que comme dépendance transitive de `@react-email/tailwind` (emails). Elle n'entre pas dans le build Next.js — c'est l'origine de la confusion.
- `app/globals.css` mélangeait les deux syntaxes : `@tailwind base/components/utilities` (v3) **plus** `@custom-variant` et `@theme inline` (v4). Ces deux directives étaient recopiées telles quelles dans le CSS final (CSS invalide) et les tokens `--sidebar*` n'étaient utilisés nulle part.

Corrections appliquées (voie v3 uniquement, aucune migration entamée) :

- suppression de `@custom-variant dark (&:is(.dark *));` — le mode sombre est déjà géré par `darkMode: ['class']` ; les utilitaires `dark:*` sont générés à l'identique avant/après (vérifié sur le CSS produit) ;
- suppression du bloc `@theme inline` et des tokens `--sidebar*` morts (‑923 octets de CSS, 0 occurrence restante) ;
- vérification post-build : plus aucune occurrence de `@theme` ni de `@custom-variant` dans `.next/static/css`, `--accent` et les variantes `.dark` toujours présentes.

Étapes différées (volontairement hors périmètre) :

- migration v4 : à décider explicitement dans une issue dédiée (change `postcss.config.mjs`, les directives, `@theme`, et le rendu des couleurs `hsl(var(...))`) ;
- non utilisés mais conservés : `autoprefixer` reste nécessaire en v3.

## 3. CI (#110)

La CI échouait sur `main` (run [39425284708](https://github.com/digitaleflex/eurinhash-cs/actions/runs/39425284708)) à l'étape « Validate Prisma schema » : `Environment variable not found: DATABASE_URL`, car l'env n'était défini que sur les étapes `migrate deploy` et `build`.

Correction : `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `RESEND_API_KEY` sont désormais définis au niveau du job `quality`, donc identiques pour toutes les étapes. Le déclenchement `pull_request` sur `main`/`develop` reste en place et publie un statut par étape (Prisma, lint, types, tests, build).

## 4. Tests restaurés

- `app/api/contact/route.test.ts` : le test de la route critique avait été supprimé par le commit `4551693` alors que la route existe toujours. Version adaptée à la route actuelle (sans authentification) : succès + payload persisté (trim/lowercase), `subject` vide → « Sans objet », honeypot rempli → succès factice sans effet de bord, rate limiting → 429 + `Retry-After`, payload invalide → 400, erreur DB → 500.
- `lib/validation.test.ts` : schéma Zod (bornes nom/message, email, `subject` optionnel, honeypot `website`).
- `components/contact-form.test.tsx` : contrat du formulaire (labels associés, honeypot masqué/non tabulable, options de sujet, POST vers `/api/contact`).
- `@testing-library/react@16.3.3` ajouté en devDependency (React 19) — unique ajout de dépendance.

Aucun test existant n'a été supprimé, désactivé ou rendu permissif ; aucun seuil de couverture n'a été abaissé.

## 5. Audit de sécurité

`pnpm security:audit` (`pnpm audit --audit-level=moderate`) : ❌ exit 1 — 4 vulnérabilités (2 high, 2 moderate), toutes dans des dépendances **de développement ou de build**, aucune dans le code exécuté en production :

| Sévérité | Paquet | Chaîne | Correctif |
| --- | --- | --- | --- |
| high | `braces` ≤ 3.0.3 | `depcheck > findup-sync > micromatch > braces` | aucun (`<0.0.0`) |
| high | `source-map-js` < 1.2.2 | `depcheck > @vue/compiler-sfc > source-map-js` | ≥ 1.2.2 |
| moderate | `sprintf-js` ≤ 1.1.3 | `depcheck > js-yaml > argparse > sprintf-js` | aucun (`<0.0.0`) |
| moderate | `postcss-selector-parser` < 7.1.6 | `tailwindcss > postcss-selector-parser` | ≥ 7.1.6 |

Impact : `depcheck` n'est appelé que par le script `deps:check` (jamais en CI ni au runtime) ; `postcss-selector-parser` ne s'exécute qu'au build. `pnpm security:check` (`audit-ci`) n'est pas branché dans la CI — il n'y a donc pas de faux statut vert, mais pas de garde-fou automatique non plus.

Suivi : issue dédiée pour trancher entre `pnpm.overrides` (source-map-js ≥ 1.2.2, postcss-selector-parser ≥ 7.1.6) et remplacement/suppression de `depcheck` (seule source des deux vulnérabilités sans correctif), puis ajout de `security:check` en CI.

## 6. Limites restantes

- Pas de test de régression visuelle automatisé (comparaison avant/après du CSS à faire manuellement sur les pages principales, thèmes clair/sombre) ; le retrait ne touchait que des tokens inutilisés.
- Couverture globale du dépôt encore faible (composants de pages à 0 %) : à traiter dans une issue dédiée (#112/#114).
- Avertissement Next.js « inferred your workspace root » dû à des lockfiles hors du dépôt (`C:\Users\PC\package-lock.json`) : artefact local, absent en CI.
