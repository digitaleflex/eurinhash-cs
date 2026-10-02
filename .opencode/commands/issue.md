---
description: Implémente une issue GitHub en suivant son contrat d'exécution, valide et pousse
agent: build
subagent: true
---

Implémente l'issue GitHub #$1 du dépôt digitaleflex/eurinhash-cs.

Contexte : branche de travail courante = `develop` (jamais `main` ni `prod`).

Procédure obligatoire :

1. `gh issue view $1` — lis l'issue en entier, en particulier la section « AI Execution Contract ».
2. Inspecte le code réel et vérifie si le problème existe encore. S'il n'existe plus, documente le constat et ferme l'issue avec un commentaire, sans modifier le code.
3. Implémente le changement minimal et production-ready, sans nouvelle dépendance ni abstraction à usage unique.
4. Valide : `pnpm db:generate`, `pnpm lint`, `pnpm type-check`, `pnpm test:ci`. Ajoute les tests pertinents, y compris les chemins négatifs pour tout ce qui touche sécurité ou autorisation.
5. Si le schéma Prisma change, ajoute une migration dans `prisma/migrations/` avec un nom horodaté et preserve les données existantes.
6. Commit clair (type: scope) puis `git push origin HEAD:develop`.
7. Vérifie la CI : `gh run list --workflow CI --limit 1`. Si elle est verte, clos l'issue avec un commentaire résumant fichiers modifiés, comportement changé, tests exécutés et limitations connues. Si elle échoue, corrige et redimensionne, ou documente précisément la cause racine dans l'issue.

Règles absolues : ne jamais merger vers `main` ou `prod`, ne jamais réécrire l'historique, ne jamais exposer de secret, ne jamais affaiblir auth/CSP/validation.
