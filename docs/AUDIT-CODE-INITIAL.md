# Audit initial du code — remise à plat du portfolio

Date : 2026-10-20  
Branche auditée : `reboot/simplified-portfolio`  
Périmètre : lecture des routes publiques, navigation, authentification, accès aux données et dépendances. Cet audit est statique : aucun build ni test n'a été exécuté dans un environnement cloné.

## Conclusion

Le dépôt n'est pas encore une base de portfolio sans authentification. La documentation a été simplifiée, mais le code conserve un produit plus large : Better Auth, un espace utilisateur, un back-office, des inscriptions aux événements, un CMS/blog éditable, des messages stockés en base et une configuration PostgreSQL/Prisma.

**Ne pas supprimer les dépendances de base de données dans cette étape** : plusieurs pages et routes les importent encore. Retirer uniquement les variables d'environnement ou les paquets casserait le build ou certaines pages.

## Constats vérifiés

| Zone | Fichiers observés | Constat | Priorité |
|---|---|---|---|
| Authentification | `lib/auth.ts`, `lib/auth-clients.ts`, `app/api/auth/[...all]/route.ts`, `app/sign-in/page.tsx` | Better Auth configure PostgreSQL, OTP par email, Google OAuth et le plugin admin. | P0 — supprimer avec ses consommateurs |
| Espace utilisateur | `app/dashboard/**`, `app/api/dashboard/**`, `middleware.ts` | Plusieurs pages vérifient la session et lisent les données Prisma. Le middleware redirige vers `/sign-in`. | P0 |
| Administration | `app/admin/**`, `lib/actions/admin.ts`, `lib/authorization.ts`, composants `components/admin/**` | Back-office dépendant des utilisateurs, messages, événements et articles. Les actions vérifient le rôle admin. | P0 |
| Blog | `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `components/blog/**` | Les pages publiques interrogent Prisma. L'édition utilise TipTap et le contenu est stocké en base. | P1 — migrer vers contenu versionné avant retrait de Prisma |
| Événements | `app/evenements/page.tsx`, `lib/actions/events.ts`, `components/events/**` | La page interroge Prisma et la session ; les inscriptions sont liées à un compte. | P1 — retirer les inscriptions ou afficher des événements statiques |
| Contact | `app/contact/page.tsx`, `components/contact-form.tsx`, `app/api/contact/route.ts` | Le formulaire stocke les messages via Prisma et envoie des emails. La route inclut validation, honeypot et rate limiting. | P1 — conserver les protections, remplacer le stockage DB |
| Navigation | `components/navigation-with-dropdown.tsx`, `components/navigation/bottom-nav.tsx` | La navigation mobile et desktop utilise les hooks Better Auth et expose Connexion/Profil. | P0 |
| Build | `package.json`, `next.config.ts`, `prisma/**` | Le build exécute `prisma generate`; la configuration externalise Prisma et Neon. | P0 — ne modifier qu'après migration des imports |
| Pages principales | `app/page.tsx`, `app/realisations/page.tsx`, `app/services/page.tsx` | La page d'accueil et certaines pages de présentation sont déjà rendues à partir de composants/données locales. | À préserver |

## Architecture cible

- Site public : accueil, parcours, réalisations, services, contact et pages légales.
- Aucun compte, connexion, profil, dashboard, back-office ou rôle applicatif dans la V1.
- Contenus éditoriaux versionnés dans Git (Markdown/MDX ou modules TypeScript), sans CMS propriétaire.
- Contact : lien email/WhatsApp en première option. Si un formulaire est conservé, il doit fonctionner sans base de données et garder validation, anti-spam, limitation de débit et traitement d'erreurs.
- Aucun PostgreSQL/Prisma/Neon, Better Auth, Google OAuth, TipTap, Resend ou Vercel Blob tant qu'un usage public indispensable n'est pas démontré.
- Analytics et animations : garder uniquement s'ils sont utilisés, utiles et testés.

## Ordre de migration sans casser le site

1. Cartographier toutes les routes et références d'authentification/Prisma ; identifier les URLs publiques à conserver.
2. Remplacer les lectures du blog par un petit catalogue de contenu versionné dans Git ; retirer les fonctions d'édition.
3. Remplacer la page événements par une page statique ou retirer cette page si elle n'apporte pas de valeur immédiate.
4. Simplifier le contact pour qu'il ne dépende plus de Prisma ; conserver les protections existantes.
5. Retirer navigation Connexion/Profil, puis supprimer les routes dashboard/admin/auth et leurs API/actions uniquement quand aucun import ne les référence.
6. Nettoyer les dépendances, scripts, configuration Next.js, schéma/migrations et variables d'environnement ; régénérer le lockfile avec la version pnpm déclarée.
7. Exécuter installation propre, lint, type-check, tests, build et QA des routes. Comparer les URLs avant/après.
8. Ne déployer qu'après validation explicite et après avoir confirmé si la base de production contient des données à conserver.

## Risques et limites de cet audit

- Le contenu de la base de production n'a pas été inspecté. Aucune migration destructive ni suppression de données n'est autorisée par cet audit.
- Le lockfile doit être régénéré par pnpm ; ne pas supprimer simplement des lignes du lockfile.
- L'audit est basé sur la lecture de fichiers ciblés et la recherche de références, pas sur un build exécuté. Les constats doivent être validés par les checks automatisés à la fin de la migration.

## Avancement de la migration

### Première tranche appliquée

- Les menus desktop et mobile ne proposent plus Connexion, Profil, Dashboard ou Administration.
- La navigation mobile se termine désormais par un CTA de contact, et non par un lien de compte.
- Fichiers modifiés : `components/navigation-with-dropdown.tsx`, `components/navigation/bottom-nav.tsx`, `components/mobile-menu/MobileMenuContent.tsx`.

Cette tranche retire uniquement les points d'entrée de l'authentification dans la navigation. **Elle ne supprime pas encore Better Auth ni les routes privées** : `/sign-in`, `/dashboard`, `/admin` et les API associées restent dans le dépôt et doivent rester protégées jusqu'à leur retrait complet. Aucun déploiement n'a été effectué. Les tests automatisés restent à exécuter.
