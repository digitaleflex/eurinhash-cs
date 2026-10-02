---
description: Valide l'état du dépôt et rapporte la cause racine de tout échec
agent: qa-runner
subagent: true
---

Valide le dépôt courant et rapporte précisément : `pnpm install --frozen-lockfile`, `pnpm db:generate`, `pnpm lint`, `pnpm type-check`, `pnpm test:ci`, puis la CI GitHub (`gh run list --workflow CI --limit 1`).

Pour chaque étape échouée : message d'erreur exact, fichier concerné, cause racine, correctif minimal proposé. Ne fusionne rien.
