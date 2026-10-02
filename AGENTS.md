# AGENTS.md — conventions du dépôt eurinhash-cs

Site vitrine personnel (Next.js 15 App Router, React 19, pnpm 12, Prisma 6 + Postgres/Neon, Better Auth, Tailwind).

## Flux Git

- Branche de travail : `develop`. **`main` et `prod` sont protégés** : jamais de push ni de merge direct.
- Commits : `type: scope` en anglais (`fix:`, `refactor:`, `ci:`, `chore:`, `security:`).
- Push : `git push origin HEAD:develop`.

## Package manager

- pnpm uniquement. Aucun `npm`/`yarn`. `packageManager` est épinglé dans `package.json`.
- Lockfile : jamais édité à la main. Régénérer via `pnpm install`.

## Validation obligatoire avant commit

```bash
pnpm db:generate
pnpm lint
pnpm type-check
pnpm test:ci
```

`pnpm build` est lent et peut être tué par OOM en local (RAM partagée entre sessions) : s'appuyer sur la CI GitHub (`gh run list --workflow CI --limit 1`) pour valider le build.

## Base de données

- Toute modification de `prisma/schema.prisma` exige une migration dans `prisma/migrations/<timestamp>_<nom>/migration.sql`.
- Les migrations doivent préserver les données (`ALTER ... TYPE ... USING` plutôt que `DROP COLUMN`).
- La synchronisation d'un environnement de dev se fait avec `pnpm db:push` (la CI utilise `db push`).

## Auth & autorisation

- Toute vérification de session passe par `lib/authorization.ts` : `getCurrentUser()`, `requireUser()`, `requireAdmin()`.
- Le rôle provient **toujours** de la session serveur, jamais d'une donnée client.
- `middleware.ts` ne fait que du routage/redirection : ce n'est pas une frontière de sécurité.

## Qualité

- TypeScript strict, pas de nouveau `any` (les casts `(x as any)` existants sont des dettes à réduire, pas un modèle).
- Pas de dépendance ajoutée si la stack suffit.
- Pas d'abstraction sans second usage concret.
- Aucun TODO, code de debug, `console.log` oublié ni code commenté.
- Tests : chemins négatifs obligatoires pour tout ce qui touche sécurité, autorisation ou validation d'entrée.

## Issues GitHub

- Chaque issue contient un « AI Execution Contract » : le lire avant de coder, vérifier que le problème existe encore, et documenter le constat si ce n'est pas le cas.
- Clore l'issue avec un commentaire : fichiers modifiés, comportement changé, tests exécutés, limitations connues.
