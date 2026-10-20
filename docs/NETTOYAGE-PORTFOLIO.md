# Nettoyage du portfolio

## Décision de périmètre

Le dépôt sert un portfolio personnel public. Il ne doit plus exposer de comptes visiteurs, de dashboard utilisateur, de panneau d'administration ni de gestion d'événements.

## Retiré sur la branche reboot

- Routes d'administration et de dashboard.
- Page de connexion et endpoint Better Auth.
- Endpoint d'upload média destiné à l'administration.
- API dashboard utilisateur.
- Gestion CRUD et inscriptions aux événements.
- Composants orphelins d'administration, d'authentification et de dashboard.
- Composants de page d'accueil non utilisés et catalogue Better Auth copié par erreur dans `llms.txt`.
- Éditeur riche de blog utilisé uniquement par l'administration.
- Liens de navigation vers la page Événements.

## Conservé volontairement pour la transition

- Prisma et la base de données : ne pas retirer avant l'export et la vérification des contenus existants.
- Endpoint de contact, validation, anti-spam, notification et accusé de réception.
- Script d'export des articles publiés, à exécuter dans un environnement possédant l'accès DB.
- Blog statique, avec données à exporter avant une mise en production.

## Prochaines vérifications obligatoires

1. Exporter et relire les articles publiés avant de déployer.
2. Décider si les messages de contact existants doivent être exportés/archivés et migrer le formulaire hors DB si l'on veut réellement retirer Prisma.
3. Auditer les références restantes à Better Auth, Prisma, Neon, Resend, Blob et aux composants inutilisés.
4. Retirer les dépendances seulement après suppression de tous les imports et scripts qui les utilisent.
5. Exécuter installation verrouillée, lint, type-check, tests et build en CI.
6. Vérifier les routes, le sitemap, les variables d'environnement et le formulaire de contact.
7. Ne pas merger ni déployer avant validation.

## État

Les routes hors périmètre et les principaux composants orphelins ont été retirés de cette branche. Le nettoyage des dépendances et la suppression de la base restent bloqués par l'export de contenu et la vérification du parcours de contact. Le build n'est pas encore confirmé.
