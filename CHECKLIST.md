# Release Readiness Checklist — eurinhash.com

> **Source de vérité de la préparation à la mise en production.**
>
> Snapshot initial : 2026-10-02  
> Repository : `digitaleflex/eurinhash-cs`  
> Branche de référence : `main`

Principe : **Finish → Stabilize → Secure → Validate → Polish → Release**.

Une case ne passe à `[x]` qu'avec une preuve vérifiable : commit, PR, CI, test, audit, capture ou résultat reproductible.

## 0. Règles de release

- [ ] Aucun changement fonctionnel non planifié après feature freeze.
- [ ] Toute modification importante est liée à une issue.
- [ ] Toute issue terminée possède une preuve dans un commentaire.
- [ ] Aucun élément « fait » sur la seule base d'une intention ou d'un plan.
- [ ] Aucun contenu public ne contient de métrique, client, lien ou affirmation non vérifiable.
- [ ] Aucun secret ou identifiant sensible n'est commité.
- [ ] La release candidate est reproductible depuis un checkout propre.

## 1. Foundation & architecture

- [x] Foundation Reset défini — #42.
- [x] Positionnement / Brand Excellence défini — #43.
- [x] Accès Prisma centralisé — #22 (closed).
- [x] ESLint/build gating rétabli — #24 (closed).
- [x] CI utilise Node 22 + pnpm + PostgreSQL de test.
- [ ] Vérifier la CI sur le flux actuel `main` + PR.
- [ ] Valider l'architecture finale après intégration du Content Hub.

**Preuves connues :**
- PR #44 merged : Foundation Reset.
- CI run #15 précédent : success sur lint/typecheck/tests/build.
- PR #90 : Content Domain en attente de validation CI.

## 2. Content Hub — domaine de données

- [ ] #88 — modèle Project / ProjectSection / Media / ProjectMedia / SeoMetadata validé.
- [ ] Migration additive validée sur PostgreSQL propre.
- [ ] `prisma validate` OK.
- [ ] `prisma generate` OK.
- [ ] Tests de contraintes OK.
- [ ] Seed de validation créé si nécessaire.
- [ ] ADR du domaine validé.
- [ ] Compatibilité avec #41 confirmée.

**PR actuelle :** #90 — `feat(content): implement Content Hub project domain`.

## 3. Admin sécurisé

- [ ] #78 — socle `/admin`.
- [ ] Authentification obligatoire.
- [ ] Autorisation serveur centralisée.
- [ ] Mutations validées avec Zod.
- [ ] Aucun endpoint de mutation accessible anonymement.
- [ ] Protection des brouillons.
- [ ] Journalisation des mutations critiques.
- [ ] Tests des chemins refusés.

## 4. Projects / Case Studies

- [ ] #79 — CRUD Projects.
- [ ] Création / édition / archivage.
- [ ] Sections structurées.
- [ ] Ordre éditorial.
- [ ] Preuves GitHub/demo/site uniquement si réelles.
- [ ] SEO par projet.
- [ ] Slug unique et comportement de changement explicitement défini.
- [ ] Aucun page builder arbitraire.

## 5. Editorial content

- [ ] #80 — articles, services et contenus globaux.
- [x] Sanitization HTML identifiée comme exigence de sécurité — #17 closed.
- [ ] Vérifier l'implémentation réelle du sanitizer côté serveur.
- [ ] Aucun doublon entre ancien système et Content Hub.
- [ ] Contenus non publiés exclus du public.

## 6. Media

- [ ] #81 — Media Library.
- [ ] Upload réservé aux admins.
- [ ] MIME réel contrôlé.
- [ ] Taille contrôlée.
- [ ] Nom/path généré côté serveur.
- [ ] Aucun chemin contrôlé par l'utilisateur.
- [ ] Relations et suppressions protégées.
- [ ] Alt text administrable.
- [ ] Images optimisées et responsives.

## 7. Publication

- [ ] #82 — DRAFT → REVIEW → PUBLISHED → ARCHIVED.
- [ ] Aucun brouillon exposé publiquement.
- [ ] Preview protégé et non indexable, si implémenté.
- [ ] Publication sans déploiement manuel.
- [ ] Revalidation ciblée après mutation.
- [ ] Sitemap cohérent avec les contenus publiés.
- [ ] Audit des mutations critiques.

## 8. Public integration

- [ ] #83 — frontend alimenté par le Content Hub.
- [ ] Server Components par défaut.
- [ ] Une seule source de vérité.
- [ ] `/realisations` dynamique.
- [ ] `/realisations/[slug]` dynamique.
- [ ] Blog sans seconde implémentation.
- [ ] Metadata dynamiques.
- [ ] 404 propre pour contenu absent/non publié.
- [ ] Aucun secret serveur exposé.

## 9. Security hardening

- [x] #17 — rich-text HTML sanitization issue closed.
- [x] #18 — contact rate limiting issue closed.
- [x] #19 — trusted origins issue closed.
- [x] #20 — SVG config issue closed.
- [x] #21 — validation issue closed.
- [x] #15 — authorization issue closed.
- [x] #16 — upload issue closed.
- [ ] Revalider ces protections dans le parcours Content Hub complet — #96.
- [ ] Tests négatifs de sécurité — #96.
- [ ] Audit des permissions admin — #94/#96.
- [ ] Audit des uploads — #81/#96.
- [ ] Vérifier dépendances et vulnérabilités avant release.

## 10. UX / accessibility / mobile

- [ ] #67 — Copy QA 20/20.
- [ ] #35 — safe areas et navigation mobile.
- [ ] WCAG 2.2 AA sur les parcours critiques.
- [ ] Navigation clavier complète.
- [ ] Focus visible.
- [ ] Contrastes conformes.
- [ ] Alt text.
- [ ] États loading/error/empty.
- [ ] Mobile sans contenu masqué par fixed/sticky UI.

## 11. Motion

> À traiter uniquement après stabilisation fonctionnelle.

- [ ] #46 — Motion System.
- [ ] #47 — Motion Foundation.
- [ ] #48 — Navigation.
- [ ] #49 — Hero.
- [ ] #50 — Scroll.
- [ ] #51 — Work.
- [ ] #52 — Micro-interactions.
- [ ] #53 — Accessibility & Mobile.
- [ ] #54 — Performance.
- [ ] #55 — QA 20/20.

## 12. SEO & discoverability

- [ ] Sitemap contient uniquement des URLs canoniques et accessibles.
- [ ] Metadata cohérentes avec l'identité réelle.
- [ ] Canonical correct.
- [ ] Open Graph correct.
- [ ] robots correct.
- [ ] JSON-LD uniquement pour des données factuelles.
- [ ] Brouillons/non-publics exclus de l'indexation.
- [ ] 404/redirects vérifiés.
- [ ] Titles/descriptions relus page par page.

## 13. Performance

- [ ] Build production propre.
- [ ] Bundle client contrôlé.
- [ ] Images optimisées.
- [ ] Requêtes DB maîtrisées.
- [ ] Pas de provider/session client global inutile.
- [ ] Core Web Vitals mesurées sur les pages critiques.
- [ ] Aucun coût JS ajouté sans valeur utilisateur.

## 14. Production infrastructure

- [ ] Variables d'environnement de production vérifiées — #95.
- [ ] Base PostgreSQL de production vérifiée — #95.
- [ ] Migration de production testée sur une base disposable — #93.
- [ ] Backup PostgreSQL configuré et restauration testée — #95.
- [ ] HTTPS/DNS vérifiés — #95.
- [ ] Monitoring/logging vérifiés — #95.
- [ ] Procédure rollback documentée — #95.
- [ ] Procédure de récupération documentée — #95.
- [ ] Upload/storage de production vérifié — #95.
- [ ] Domaine canonique vérifié — #95.

## 15. Content & legal

- [ ] Homepage finale.
- [ ] Services finaux.
- [ ] Case studies réelles et documentées.
- [ ] About final.
- [ ] Contact fonctionnel.
- [ ] Mentions légales / confidentialité vérifiées.
- [ ] Aucun contenu placeholder.
- [ ] Aucun faux témoignage.
- [ ] Aucun faux chiffre.
- [ ] Aucun lien mort.

## 16. Release QA

- [ ] Checkout propre + installation frozen réussie — #93.
- [ ] Prisma validate/generate réussi — #93.
- [ ] Migration deploy réussie sur DB disposable — #93.
- [ ] Lint OK — #93.
- [ ] Typecheck OK — #93.
- [ ] Tests OK — #93.
- [ ] Build OK — #93.
- [ ] Smoke test des routes publiques — #97.
- [ ] Smoke test login/admin — #97.
- [ ] Smoke test création → publication → affichage d'un contenu — #97.
- [ ] Smoke test upload média — #97.
- [ ] Smoke test SEO/sitemap — #97.
- [ ] Test responsive — #97.
- [ ] Test accessibilité — #97.
- [ ] Vérification erreurs console — #97.
- [ ] Vérification logs production — #95/#97.

## 17. Release gate

La release est autorisée uniquement lorsque :

- [ ] aucun P0 bloquant n'est ouvert ;
- [ ] les issues P1 nécessaires au parcours public sont terminées ;
- [ ] CI verte sur la version candidate ;
- [ ] migration validée ;
- [ ] security review terminée ;
- [ ] QA 20/20 terminée ;
- [ ] backup/rollback vérifiés ;
- [ ] contenu réel finalisé ;
- [ ] smoke test production terminé.

### État actuel

**Status : NOT READY FOR PUBLIC RELEASE**

Chemin prioritaire :

`#90 → #93 → #94 → #79/#80/#81 → #82 → #83 → #96 → #95 → #97`

Chantiers UX/motion (#35, #46–#55, #67) sont parallèles mais ne doivent pas masquer les gates techniques et de release.

Ne pas fermer une étape sans preuve vérifiable dans GitHub.
