# Audit niveau de langue & copywriting — eurinhash.com

Date : 2026-10-20
Périmètre : toutes les pages publiques, shell de navigation, formulaire de contact, emails transactionnels, pages légales, 404/error.
Référentiel : `docs/brand-voice.md` (voix, vocabulaire interdit, règles de claims et de CTA).

> Note après le commit `4551693` (nettoyage) : les constats restent valides. Les descriptions de navigation contenant « Formation d'élite » ont été retirées de `components/navigation-with-dropdown.tsx`, mais « élite » reste présent dans `/services/cto`, `/services/mentorat` et le menu mobile.

## 1. Référentiel appliqué (extraits de `docs/brand-voice.md`)

- Voix : précise, calme, technique sans être obscure, confiante sans arrogance, directe, analytique, pragmatique, retenue.
- Vocabulaire interdit comme positionnement vide : elite, genius, revolutionary, limitless, unstoppable, world-class, absolute security, zero risk, perfect, cutting-edge, next generation, game changer, digital transformation expert, expert in everything.
- Claims : pas de chiffres clients inventés, pas de témoignages inventés, pas de certifications non étayées, pas d'années d'expérience inventées, pas de métriques décoratives présentées comme preuve.
- CTA : « Réserver un audit » uniquement si le processus et l'offre existent réellement ; éviter « En savoir plus », « Commencer maintenant », « Réserver maintenant ».
- Anti-patterns : empilement d'adjectifs, répétition de la même promesse, peur, urgence/scarcité fabriquées, preuve sociale inventée, technologie avant le problème.

## 2. Constats transversaux (BLOCKER)

### 2.1 Six noms publics pour la même identité

| Nom | Emplacement |
|---|---|
| Eurin Hash | `lib/metadata.ts:5` |
| Eurin Hash CS | `components/mobile-menu/MobileMenuContent.tsx:70`, `emails/ContactAcknowledgement.tsx:51` |
| Eurinhash | `components/json-ld.tsx:7,26` |
| E-FLEX | `app/legal/mentions-legales/page.tsx:34,39`, `app/legal/cgv/page.tsx:8,19,33` |
| EH HUB | `emails/ContactNotification.tsx:34` |
| EHAF | `components/_hooks/useContactForm.ts:91`, `lib/mail.ts:84`, `app/services/mentorat/page.tsx:23,47` |

Impact : identité illisible, contredit le positionnement « une personne, pas une agence ».
Recommandation : un seul nom public (« Eurin Hash ») + une seule entité légale explicite dans les mentions légales.

### 2.2 Deux voix : « je » et « nous »

- « Je » : `/`, `/a-propos`, `/contact`.
- « Nous / notre équipe / notre communauté » : `emails/ContactAcknowledgement.tsx:39`, `app/services/mentorat/page.tsx:22,46,66-67`, `components/home/cta.tsx:16`.

Impact : contredit « Échange direct… avec la personne qui analyse le sujet » (`app/contact/page.tsx:9`).
Recommandation : tout passer en « je » sur le site public et les emails transactionnels.

### 2.3 Typographie française non homogène

- Apostrophes courbes `’` (`components/home/hero.tsx:44`, `app/services/page.tsx:10`) vs droites `'` / `&apos;` (`app/services/mentorat/page.tsx:7`, pages légales, `app/not-found.tsx:30`).
- Guillemets droits `"{subject}"` au lieu de « » (`emails/ContactAcknowledgement.tsx:36`).
- Dates « 21 Mars 2026 » avec majuscule anglaise (`app/legal/*` : `lastUpdated="21 Mars 2026"`).
- « 24h » au lieu de « 24 h » (`components/feedback-popup.tsx:128`).

Recommandation : imposer une règle unique (apostrophe typographique, guillemets français, mois en minuscule, espace insécable avant `:` `;` `!` `?`).

## 3. Constats par page

### `/` — Accueil (NEEDS WORK)

| Constat | Preuve | Sévérité |
|---|---|---|
| « Software Architect · Digital Entrepreneur » : anglicisme de positionnement | `components/home/hero.tsx:18`, `components/home/bio.tsx:20` | NEEDS WORK |
| Titre SEO anglais et identique partout | `lib/metadata.ts:6`, `app/layout.tsx:20` | NEEDS WORK |
| Phrase hero de 18 mots à 4 adjectifs empilés | `components/home/hero.tsx:29` | NEEDS WORK |
| « Des problèmes réels. Des décisions techniques concrètes. » : slogans non prouvés | `components/home/results.tsx:37` | NEEDS WORK |
| La rubrique « Résultat » ne contient aucun résultat mesuré | `components/home/results.tsx:10,18,26,63` | NEEDS WORK |
| « Insights » au lieu de « analyses » | `components/home/blog.tsx:11,20` | NEEDS WORK |
| « Nous pouvons commencer… » alors que le site dit « je » | `components/home/cta.tsx:16` | NEEDS WORK |
| « Pas de solution prédéfinie ni de promesse artificielle » : méta-discours ironique | `components/home/cta.tsx:28` | NEEDS WORK |

Passent : « L'architecture commence par le problème, pas par la technologie » (`expertise.tsx:40`), signature « Concevoir des systèmes qui tiennent » (`hero.tsx:23-25`).

### `/a-propos` (NEEDS WORK)

- H1 métaphorique « Construire avec méthode, pas avec du bruit » (`app/a-propos/page.tsx:17-19`) : interdit par `brand-voice.md:223`.
- « software architect » en minuscule anglaise dans une phrase française (`page.tsx:22`, metadata `:7`).
- Phrase de 45 mots sans verbe principal (`page.tsx:35`) : liste de problèmes à découper en puces.
- PASS : « Des systèmes suffisamment simples… » (`page.tsx:54`), les 6 étapes Comprendre/Simplifier/Concevoir/Construire/Sécuriser/Valider, CTA « Voir les réalisations » / « Discuter d'un projet » (`:60,63`).

### `/realisations` (NEEDS WORK, 1 BLOCKER)

- **BLOCKER** : « La validation exhaustive des parcours, les tests récents de CI, la restauration et les métriques de production restent à confirmer. » (`app/realisations/page.tsx:46`) — annonce publiquement un produit non validé.
- « Voir comment les décisions deviennent des systèmes » : titre métaphorique (`:59-61`).
- Chaque étude de cas remplace le résultat par une clause de méthode (`:13,24,35,46`).
- Étiquettes internes « CASE-01 » (`:76`).
- « back-office » (`:41`) et « risque nul » (`:24`) : anglicismes/jargon.
- CTA répété « Discuter d'un besoin similaire » (`:90`).

### `/services` (NEEDS WORK, 1 BLOCKER)

- **BLOCKER** : carte « Intégrer l'IA avec discernement » pointant vers `/services` elle-même (`app/services/page.tsx:24-25`) : offre fantôme.
- Carte « Sécuriser une infrastructure » pointant vers `/services/audit` (`:34`) : doublon, et CTO/Mentorat absents de la page alors qu'ils sont dans le menu.
- « à ces formats » au lieu de « à ces interventions » (`:90`).
- PASS : accroche problème (`:9`), « Une base technique compréhensible et adaptée au stade réel du produit » (`:21`), H1 (`:50-52`).

### `/services/audit` (NEEDS WORK)

- Aucun `metadata` exporté : la page hérite du titre/description de la homepage.
- « Aucun résultat n'est présenté comme garanti avant vérification » (`app/services/audit/page.tsx:32`) : clause interne qui dévalue le livrable.
- « points de risque pertinents » (`:5`) : redondant.
- Nom incohérent : la navigation et le formulaire disent « Audit de Résilience » (`navigation-with-dropdown.tsx:30`, `contact-form.tsx:107`) alors que la page ne parle jamais de résilience.
- PASS : CTA « Discuter d'un audit » (`:33`).

### `/services/architecture` (NEEDS WORK)

- Aucun `metadata`.
- H1 terminé par un point, seul de son espèce (`app/services/architecture/page.tsx:9`).
- Phrase de 20 mots, 5 substantifs abstraits, sans bénéfice client (`:10`).
- « secrets » et « observabilité » non expliqués (`:21`).
- Page très courte (2 sections + CTA).

### `/services/cto` (BLOCKER — page à réécrire ou retirer)

- « Accompagnement CTO On-Demand » : anglicisme + offre non définie (`app/services/cto/page.tsx:12-13`).
- « recrutement d'élite et culture de l'excellence » (`:19`) : mots explicitement interdits.
- « Scale Culture », « Vision Tech » : franglais (`:25,30`).
- « leads » (`:31`), « roadmap technique / objectifs business » (`:26`).
- CTA « Prendre rendez-vous avec un expert » sans créneau ni processus (`:37`).
- Aucun `metadata` (fichier `'use client'`).

### `/services/mentorat` (BLOCKER — page à réécrire ou retirer)

- « Formation d'Élite » dans le titre, la description SEO et la navigation (`app/services/mentorat/page.tsx:7,14`, `MobileMenuContent.tsx:35`) : mot interdit indexé.
- « Nous détectons et formons les hauts potentiels techniques » (`:22`) : passage au « nous » + jargon RH.
- « standards de l'industrie (EHAF) » (`:23`) et « Certification EHAF » (`:47`) : acronyme jamais défini, certification auto-décernée sans référentiel.
- « Le mentorat n'est pas ouvert à tous. Nous cherchons la discipline et la passion. » (`:66-67`) : scarcity + flatterie interdites.
- « Si vous vous sentez prêt pour l'excellence, postulez » (`:67`).
- « Clean Code », « Hacking éthique », « infrastructure-as-code » (`:29-31`).
- Casse Titre Chaque Mot (`Sélection au Mérite`, `Pratique Réelle`).
- Page absente du sitemap et de `/services`.

### `/blog` + `/blog/[slug]` (BLOCKER — placeholder)

- `lib/content/posts.json` = `[]` (`:1`) : zéro article, donc `/blog/[slug]` ne génère aucune URL.
- « Insights Techniques » (`app/blog/page.tsx:18-19`), « Eurin Hash Insights » (`:39`), « Tous les insights » (`app/blog/[slug]/page.tsx:63`).
- « Analyses, tutoriels et réflexions sur les infrastructures de demain » (`:22`) : promesse de contenus inexistants.
- « Les prochains articles sont en préparation. Revenez bientôt. » (`:65`) : placeholder sans date.
- Sitemap en `priority 0.8 / weekly` sur une page vide (`app/sitemap.ts:12`).

### `/contact` (PASS avec réserves)

- PASS : « Parlons du problème à résoudre » (`app/contact/page.tsx:32-34`), description du premier échange (`:37`).
- « Base opérationnelle » (`:109`) : vocabulaire militaire pour dire « localisation ».
- « Eurin Almeida » (`:16`) vs « Eurin Hash » partout ailleurs : identité incohérente.
- « Email professionnel » (`:14`) et canaux hétérogènes.
- Contradiction avec la politique de confidentialité sur le « suivi commercial » (`:10` vs `app/legal/politique-confidentialite/page.tsx:66`).
- Deux CTA primaires concurrents dans le header : « Réserver un audit » + « Discuter d'un projet » (`navigation-with-dropdown.tsx:94,176`).

### Formulaire & emails (BLOCKER)

- « Message transmis avec succès au protocole EHAF. » (`components/_hooks/useContactForm.ts:91`) : jargon interne incompréhensible.
- Trois délais différents : « dans les plus brefs délais » (`feedback-popup.tsx:112`), « Réponse sous 24h » (`:128`), « 24 heures ouvrées » (`emails/ContactAcknowledgement.tsx:39`).
- « Confirmation par email » (`feedback-popup.tsx:124`) alors que l'email n'est pas garanti si `RESEND_API_KEY` manque (`lib/mail.ts:18-21`).
- « Réessayer » ne fait que fermer la popup (`feedback-popup.tsx:225-228`).
- `&#39;` littéral dans le fallback d'erreur (`:217`).
- Pré-remplissage du sujet cassé : les liens envoient `subject=Audit|Architecture|Cybersécurité|Mentorat|Produit numérique` (`app/services/*`, `app/realisations/page.tsx:14,25,36`) alors que les `<option>` sont « Audit de Résilience », « Architecture de Système », « Accompagnement CTO », « Formation & Communauté », « Support Technique », « Autre demande » (`contact-form.tsx:107-112`) → le select s'affiche vide.
- « **24 heures ouvrées** » : astérisques Markdown affichées littéralement dans l'email (`ContactAcknowledgement.tsx:39`).
- « notre équipe technique » (`ContactAcknowledgement.tsx:39`) : contredit le face-à-face revendiqué.
- Astérisque obligatoire sans légende (`contact-form.tsx:53,84,136`), select sans label visible (`:103`), « Sélectionnez un sujet » présenté comme obligatoire alors que `subject` est `optional` (`lib/validation.ts:16`).

### Pages légales (NEEDS WORK)

- Dates « 21 Mars 2026 » (`app/legal/*/page.tsx`) : majuscule anglaise.
- Entité « E-FLEX » vs « Eurin Hash » (`mentions-legales:34,39`, `cgv:8,19`).
- Titres dupliquant « | Eurin Hash » alors que le template l'ajoute (`app/legal/*/page.tsx:4-12` + `lib/metadata.ts:19`).

### 404 / error / global-error (NEEDS WORK)

- Apostrophes droites / entités (`app/not-found.tsx:30`), ton à vérifier avec le reste de la voix.

## 4. Pages sans metadata propre

`/`, `/contact`, `/realisations`, `/services`, `/services/architecture`, `/services/audit`, `/services/cto` n'ont pas de titre/description propres. Elles héritent du titre et de la description de la homepage via `app/layout.tsx:20` et `lib/metadata.ts:6-7`, avec un canonical global vers la homepage (`lib/metadata.ts:36`).

## 5. Top 10 des corrections prioritaires

1. **Unifier l'identité** : un seul nom public, une seule entité légale, une seule voix (« je »).
2. **Retirer ou réécrire `/services/cto` et `/services/mentorat`** : mots interdits, certification non étayée, offre non définie.
3. **Retirer la carte IA fantôme** de `/services` (`services/page.tsx:24-25`).
4. **Corriger le pré-remplissage du sujet** du formulaire (valeurs `subject` ↔ options).
5. **Aligner les délais de réponse** et supprimer « 24h » non tenable ; supprimer « protocole EHAF ».
6. **Publier ou masquer `/blog`** : zéro article = pas de promesse de tutoriels.
7. **Supprimer la clause « restent à confirmer »** de `/realisations` et remplacer les rubriques « Résultat » par des livrables concrets.
8. **Traduire le positionnement** : « Software Architect · Digital Entrepreneur » → « Architecte logiciel · Entrepreneur numérique ».
9. **Donner un titre/description propres à chaque page** et un canonical par page.
10. **Homogénéiser la typographie française** (apostrophes, guillemets, dates, « 24 h »).

## 6. Ce qui passe déjà

- La page `/contact` a une accroche et un premier paragraphe clairs, sans promesse excessive.
- Les 6 étapes de `/a-propos` sont concrètes et alignées avec la voix.
- « L'architecture commence par le problème, pas par la technologie » et « Concevoir des systèmes qui tiennent » sont des formulations justes.
- Aucun faux témoignage, faux logo client ou chiffre inventé n'a été trouvé.
- Aucun dark pattern d'urgence ou de rareté fabriquée, hors `/services/mentorat`.
