# Migrations — dossier non canonique

Ce dossier **n'est pas l'historique de la base**. Il ne doit pas être exécuté.

## Pourquoi

1. **Aucune migration n'a jamais été appliquée.** `prisma migrate status` annonce les
   7 migrations comme « pas encore appliquées » : la base a été créée et maintenue
   exclusivement par `prisma db push`.
2. **L'historique est incomplet.** Sur les 12 modèles du schéma, seuls `contact_messages`
   et une table `project_requests` — qui n'existe plus dans le schéma — ont une migration.
   `users`, `accounts`, `sessions`, `verifications`, `events`, `event_registrations`,
   `posts`, `categories`, `tags`, `comments` et `audit_logs` n'en ont aucune.
3. **Il n'est pas rejouable.** Les quatre migrations ajoutées le 2026-10-02 font un
   `ALTER TABLE "events"`, `"posts"` et `"event_registrations"` : sur une base neuve,
   `migrate deploy` échoue immédiatement, car aucune migration ne crée ces tables.

Conséquence : sur la base actuelle, `prisma migrate deploy` échoue aussi, dès la
première migration (`CREATE TABLE "contact_messages"` alors que la table existe déjà).

## Source de vérité

- Le schéma : `prisma/schema.prisma`.
- La synchronisation d'un environnement : `pnpm db:push`.
- La CI applique exactement la même commande, sur une base Postgres éphémère.

## Migrer un jour vers `migrate deploy`

Il faudra d'abord établir une **baseline** : snapshotter la base existante pour créer
l'entrée `_prisma_migrations` correspondant à l'état actuel, puis réécrire un historique
complet et cohérent. Tant que ce travail n'est pas fait, `db push` reste la seule
stratégie valide — et c'est celle documentée dans `AGENTS.md`.
