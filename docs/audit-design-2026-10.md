# Audit design & UX — eurinhash.com

Date : 2026-10-20
Périmètre : 16 routes publiques (desktop 1440×1000, mobile 390×844), shell global, thème clair et sombre.
Méthode : `next dev`, rendu Chromium via CDP, mesures `getComputedStyle` / `getBoundingClientRect`, lecture du CSS compilé, calcul WCAG des ratios réels.
Limites : pas de lecteur d'écran ni d'axe-core ; pas de test Firefox/Safari ; `/blog/[slug]` non rendable (0 article).

> Note après le commit `4551693` (nettoyage) : `npm run lint`, `npm run type-check` et `npm run build` passent ; `npm run test:ci` passe après suppression du seuil de couverture obsolète de `app/api/contact/route.ts` dans `jest.config.js` (10/10 tests). Les constats ci-dessous restent valides sur le code actuel.

## Verdict

Le site n'est **pas** un template SaaS générique : la direction artistique de la home est réelle (grille blueprint, angles vifs, accent bleu unique, section inversée, rail mono). Le problème est que **le système de design n'est pas appliqué de bout en bout** : la couche mono est morte, la typographie de contenu est absente, et 6 pages (blog, 4 pages légales, 404/error, popup de formulaire) sont construites dans un autre langage visuel (rayons 12–24 px, pilules, dégradés, cartes).

## 1. BLOCKER — à corriger avant toute mise en production

### 1.1 Menu mobile cassé (navigation inutilisable < 1024 px)

Le drawer et son overlay sont `position: fixed` **à l'intérieur du `<header>`** qui porte `backdrop-blur` (`app/layout.tsx:42`). `backdrop-filter` crée un bloc conteneur pour ses descendants `fixed` : le drawer mesure **390×72 px** au lieu de 390×844, l'overlay **390×72 px**. Résultat : au clic sur le hamburger, on voit un bandeau de 72 px, **aucun lien de navigation n'est visible**, et la page reste interactive derrière.

- Preuve structurelle vérifiée : `app/layout.tsx:42` (`backdrop-blur`), `:53` (`<MobileMenu />` dans le header), `components/mobile-menu/MobileMenuContent.tsx:60` et `MobileMenuOverlay.tsx:17` (`fixed`).
- Preuve métrique (CDP) : `drawer {w:390,h:72}`, `overlay {w:390,h:72}`, `headerRect.height = 73`.
- Correction : rendre drawer + overlay via un **portal** vers `document.body`, ou sortir `<MobileMenu>` du `<header>`.
- Défaut secondaire : hamburger (`z-[80]`) et croix de fermeture (`z-[70]`) se superposent — mesuré hamburger x=322 y=15 44×44, croix x=318 y=24 48×48. Supprimer la croix du drawer (le hamburger se transforme déjà en X).

### 1.2 Couche typographique morte

`tailwind.config.ts:62-65` référence `var(--font-inter)` et `var(--font-jetbrains-mono)`, variables **jamais définies** (0 occurrence dans le CSS compilé), alors que `app/layout.tsx` fournit `--font-geist-sans` / `--font-geist-mono`.

- Conséquence mesurée : `.font-mono` résout vers Geist Sans sur les 16 routes. Tous les labels techniques (`CASE-01`, `SERVICE · ARCHITECTURE`, eyebrows, rails) sont en sans.
- `body.font-sans` → déclaration invalide → hérite de `html` : le rendu ne tient que par accident de cascade.
- Correction : `sans: ['var(--font-geist-sans)', ...]`, `mono: ['var(--font-geist-mono)', ...]`.

### 1.3 Typographie de contenu absente (`prose`)

`@tailwindcss/typography` n'est ni dans `package.json` ni dans `node_modules` (vérifié). Les classes `prose` sont donc inertes : **0 occurrence de `.prose` dans le CSS compilé**.

- Conséquence mesurée : `<p>` et `<h2>` ont `margin: 0px` ; `<h2>` à 36 px sur `/legal/*` et `/blog/[slug]`. Les 4 pages légales et les articles s'affichent en mur de texte sans espacement.
- Correction : installer `@tailwindcss/typography` et l'enregistrer dans `tailwind.config.ts`, **ou** écrire un style de corps de texte maison en tokens (préférable pour rester dans le langage du site).

### 1.4 Rayons incohérents

`--radius: 0px` (`app/globals.css:54`) mais seuls `lg/md/sm` sont redéfinis (`tailwind.config.ts:57-61`) :

- `rounded-lg` = 0 px, `rounded-md` = `calc(0px - 2px)` (invalide → 0).
- `rounded-xl` (12 px), `rounded-2xl` (16 px), `rounded-3xl` (24 px), `rounded-full` restent aux valeurs Tailwind par défaut.
- 3 langages de rayon coexistent : 0 px (grilles, header, footer), 12–24 px (blog, légal, 404/error, popup, sommaire, back-to-top), pilule (toggle thème, bouton d'envoi, 404).
- Correction : assumer 0 partout, ou introduire une échelle explicite. Ne jamais laisser `rounded-md = calc(0 - 2px)`.

### 1.5 Contrastes en échec

| Zone | Ratio mesuré | Seuil | Preuve |
|---|---|---|---|
| Liens de footer `text-foreground/20` et `/25` | 1,55:1 et 1,74:1 | 4,5:1 | `components/footer.tsx:48,51-62` |
| Titres de colonnes footer `/40` | 2,58:1 | 4,5:1 | `footer.tsx:26,37` |
| Sommaire légal `text-foreground/50` | 3,46:1 | 4,5:1 | `components/legal-page.tsx:101,111` |
| « Espace Légal » `/40` | 2,58:1 | 4,5:1 | `legal-page.tsx:52` |
| CTA h1 `/25` | 1,74:1 (clair), 2,10:1 (sombre) | 3:1 (large) | `components/home/cta.tsx:13` + 6 autres pages |
| Blanc sur accent en thème sombre | 3,68:1 | 4,5:1 | accent dark `221 83% 62%` ; `components/navigation/bottom-nav.tsx:56`, `contact-form.tsx:161`, `not-found.tsx:56` |
| Erreur formulaire `text-red-500` | 3,67:1 | 4,5:1 | `components/contact-form.tsx:56,87,139` |
| Anneau de focus `ring-accent/50` | 2,28:1 | 3:1 | `components/theme-toggle.tsx:13` |
| Bottom nav inactif `opacity-70` | 2,75:1 | 4,5:1 | `components/navigation/bottom-nav.tsx:61-64` |
| Section inversée labels `/40` | 2,66:1 (sombre) | 4,5:1 | `components/home/results.tsx:52,57,61` |

- Correction : passer tous ces textes à `text-muted-foreground` ou `/70` minimum ; utiliser `--accent-foreground` (déjà défini, inutilisé) sur l'accent en sombre ; recalibrer `--destructive` en `.dark` ; `ring-accent/50` → `ring-accent` ; anneau de remplacement sur le hamburger.

### 1.6 Popup de feedback hors design system et inaccessible

`components/feedback-popup.tsx` n'utilise **aucun token** : `bg-white dark:bg-gray-900`, `text-gray-*`, `border-gray-*`, dégradés `green-400→emerald-500` / `red-500→red-600`, `rounded-xl/2xl`. Ratios mesurés : `text-gray-600` sur blanc **4,48:1** (FAIL AA), croix `text-gray-400` **2,96:1** (FAIL).

- Fermeture automatique à **5 s** (`:39-47`) sans pause au survol/focus → le message d'erreur peut disparaître avant lecture (WCAG 2.2.1).
- Pas de `role="dialog"`, pas d'`aria-live`, croix sans `aria-label`, pas de gestion de focus.
- Correction : réécrire avec les tokens, supprimer l'auto-fermeture (ou la suspendre), `role="dialog" aria-modal="true"`, `aria-live`, `aria-label="Fermer"`, focus management.

### 1.7 Mouvement non conditionné

`grep useReducedMotion|prefers-reduced-motion|motion-reduce` → **0 résultat** dans tout le projet. 13 animations framer-motion, `animate-pulse` (légal, 404, error) et `scrollToTop smooth` s'exécutent sans condition.

- Sur `/legal/*`, le contenu textuel est animé en opacité : mesuré **0,308 à 2,2 s**, 1 à 6 s → le contenu juridique est quasi invisible à l'hydratation (risque SEO/rendu sans JS).
- Correction : `<MotionConfig reducedMotion="user">` autour de l'app (`app/layout.tsx:39`), `initial={false}` sur le contenu légal, et simplifier la popup.

## 2. Shell global

### Header — deux CTA concurrents (BLOCKER)
`components/navigation-with-dropdown.tsx:86-98` rend « Réserver un audit » (`bg-accent`) et `:171-178` rend « Discuter d'un projet » (`bg-foreground`) — les deux vers `/contact`. Poids visuel maximal pour une action identique, aucune hiérarchie. Correction : garder un seul CTA.

### Header — 4 images de logo dans le DOM (NEEDS WORK)
`app/layout.tsx:44-54` + `components/logo.tsx:23-41` : 2 variantes × 2 branches (`hidden lg:flex` / `lg:hidden`), toutes `priority` → 4 preloads LCP dont 2 invisibles. Le wordmark rend à 236×48 px alors que `width={140} height={40}` est déclaré (`logo.tsx:13-18,26-41`) : `size` ne pilote que `maxHeight`.

### Header — aria-labels anglais (NEEDS WORK)
`components/theme-toggle.tsx:14` « Toggle theme », `MobileMenuButton.tsx:17` « Toggle mobile menu », libellés non dynamiques. Correction : français + libellé selon l'état.

### Dropdown Services (PASS avec réserve)
`aria-expanded` / `aria-haspopup`, fermeture au clic extérieur, liens de 41 px, contraste 4,85:1. Manque : `Escape` et retour de focus. Les classes `animate-in fade-in slide-in-from-top-2` (`:130`) n'existent pas dans le CSS (pas de `tailwindcss-animate`) → ouverture sèche, code mort.

### Bottom nav mobile (NEEDS WORK)
Trois systèmes de navigation coexistent sur mobile (hamburger + bottom nav + drawer) et l'état actif est signalé **trois fois** (`bottom-nav.tsx:53-74` : pastille, libellé, barre `layoutId`). Libellés 10 px `opacity-70` → 2,75:1. Correction : un seul système mobile, un seul marqueur actif, `opacity-100`.

### Footer (BLOCKER contrastes, NEEDS WORK grille)
`components/footer.tsx` : liens à 1,55–1,74:1 ; colonne à x=68 alors que les pages sont à x=96–304. Cinq marges gauches différentes sur le site (mesures : 68 / 96 / 128 / 176 / 304). Correction : une grille unique + `text-muted-foreground`.

## 3. Page d'accueil

- **Hero** : très bon (h1 96 px `font-black leading-[0.94]`, accent sur la 2e ligne, grille blueprint), mais eyebrow mono cassé (cf. 1.2). Rail « Architecture · IA appliquée · Cybersécurité · Cloud » non `flex-wrap` → débordement à 390 px (`components/home/hero.tsx:52-55`).
- **Section Résultats** : `bg-foreground text-background` s'inverse en thème sombre (bandeau blanc) ; labels `text-background/40` à 2,66:1 (sombre) / 3,76:1 (clair). Remplacer par des tokens `surface-inverse` dédiés. Les 3 « résultats » sont des intentions, pas des résultats (`results.tsx:10,18,26,63`).
- **Expertise** : labels à 9 px (`expertise.tsx:41`) — sous le plancher de lisibilité 11–12 px.
- **CTA final** : `text-foreground/25` = 1,74:1 (cf. 1.5).
- **Section Blog** : aucune carte, `posts.json = []`.

## 4. Pages de contenu

### `/a-propos`
- Les 6 étapes sont des `<p>`, pas des titres → navigation par titres incomplète (`app/a-propos/page.tsx:42-47`). Les passer en `h3`.
- Photo : `alt="Eurin Hash"` ici vs alt long sur la home ; traitement grayscale identique, caption différent. Un seul composant `<Portrait>`.
- CTA secondaire `border-foreground/10` ≈ 1,3:1 → invisible (`:62`). Trois variantes de CTA sur le site (bleu plein / noir plein / filet).

### `/realisations`
- Grille à 5 champs sans séparateurs verticaux → les rubriques se lisent comme un flux (`app/realisations/page.tsx:81-87`). Ajouter `divide-x`.
- Liens de bas de cas à 12 px, hauteur 16 px → sous le minimum WCAG 2.2 SC 2.5.8 (24 px). Idem « Explorer » (72×16) et tous les liens de footer.

### `/services`
- Carte « Intégrer l'IA » → `/services` elle-même (`app/services/page.tsx:27`) : clic = rechargement, carte perçue cassée.
- Deux cartes pointent vers `/services/audit` (`:34`), et CTO/Mentorat sont absents de la page.
- Grille et structure : PASS.

### `/services/architecture`, `/services/audit`
- PASS structurel (h1 72 px, sections filetées, CTA unique). Harmoniser la largeur de colonne.

### `/services/cto` (BLOCKER)
- H1 « Accompagnement CTO On-Demand. » déborde à 390 px : `scrollWidth = 413` dans 358 px → `window.innerWidth = 429` → bottom nav large de 429 px, onglet « CONTACT » coupé (`app/services/cto/page.tsx:11-14`).
- Titres `H1 H3 H3 H4 H4` : saut H2 (`:25,30`).
- Typographie à part (`tracking-tighter`, `leading-[0.9]`, italique fin fantôme) vs les autres pages service.
- Contenu : offre non définie, mots interdits (cf. audit langue).

### `/services/mentorat` (BLOCKER/NEEDS WORK)
- Ordre de titres `H1 H3 H3 H3 H2 H4…` : saut et ordre inversé (`:35,42,54`).
- CTA `bg-accent text-white` : `text-white/80` à 2,94:1 en sombre ; bouton `bg-white text-accent` à 3,68:1 (`:60-71`).
- Icônes sans `aria-hidden` (`:34`).
- Contenu : « élite », « certification EHAF », scarcity (cf. audit langue).

## 5. Blog & pages légales

### `/blog` (BLOCKER)
- Page vide (`lib/content/posts.json = []`), état vide `rounded-3xl border-2 border-dashed` de 1248×220 px.
- Identité divergente : h1 **centré uppercase 60 px** (contre gauche 72 px partout), `max-w-7xl` (1280 px contre 1152), cartes `rounded-2xl`, aucun eyebrow mono, aucun filet (`app/blog/page.tsx:16-24,30-31,63`).
- Images : `<img>` brut, `alt` dupliquant le titre, pas de `sizes`/`priority` (`:33-37`).

### `/blog/[slug]` (BLOCKER)
- `prose prose-invert lg:prose-xl` inerte (cf. 1.3) : `<p>` margin 0, `<h2>` 36 px.
- `prose-invert` forcé : en thème clair, le corps d'article serait clair sur clair.

### `/legal/*` (BLOCKER)
- Corps de texte inerte (`components/legal-page.tsx:76-83`).
- h1 à **24 px** (contre 72 px ailleurs) avec dégradé `from-foreground to-foreground/60` → fin de dégradé ~1,9:1, et `bg-clip-text` = titre invisible si le dégradé ne se peint pas (`:57`).
- Sommaire et fil d'Ariane à 2,58–3,46:1 (`:52,101,111,113`).
- Langage visuel « dashboard » (rounded-2xl, pastille `animate-pulse`, blob `blur-3xl`, backdrop-blur) : 3e identité du site.
- Alignement x=128 vs header x=68.
- Contenu animé en opacité (cf. 1.7).

## 6. Contact

- **Pré-remplissage du sujet cassé (BLOCKER)** : les liens envoient `?subject=Audit|Architecture|Cybersécurité|Mentorat|Produit numérique` alors que les `<option>` sont « Audit de Résilience », « Architecture de Système », « Accompagnement CTO », « Formation & Communauté », « Support Technique », « Autre demande ». Mesuré : le select reste sur `value: ""` pour les 5 valeurs.
- Icônes sans rapport : `CheckCircle` sur le nom, `Send` sur email/sujet/message (`components/contact-form.tsx:35,64,96,118`).
- Erreurs non reliées : `aria-describedby: null` mesuré sur les 4 champs, pas de région live (`:55-59,86-90,138-142`).
- Bordure des champs `border-foreground/20` = 1,55:1 ; fond identique au fond = 1,00:1 → WCAG 1.4.11 en échec (`:45`).
- Rayon qui change au breakpoint (`rounded-lg` → `sm:rounded-xl`) et bouton `rounded-full` + `scale-105` (`:45,76,104,128,161`).
- Aside : PASS (sticky, canaux, carte confidentialité).

## 7. 404 / error / global-error

Trois pages, trois langages : `rounded-2xl`, boutons `rounded-full`, halo `rgba(59,130,246,0.08)` (bleu Tailwind hors token), grille blanche `rgba(255,255,255,0.02)` invisible en clair, `animate-pulse` (`app/not-found.tsx:10-11,17,20,35,43,56,84`, `app/error.tsx:12-13,29-30`). Un seul composant `<StatusPage>` aligné sur le gabarit éditorial.

## 8. Accessibilité visuelle

- **PASS** : liens focus visibles via outline navigateur ; labels de formulaire associés ; `required` + `aria-invalid` ; honeypot `tabIndex={-1}` ; `rel="noopener noreferrer"` sur les liens externes ; cibles bottom nav 44 px et drawer 48 px ; un seul `<h1>` sur 14 routes / 16.
- **FAIL** : contrastes (cf. 1.5), focus du hamburger supprimé sans remplacement (`MobileMenuButton.tsx:16`), focus drawer non géré (`activeElement = BODY` mesuré), erreurs non annoncées, hiérarchies de titres de `/services/cto` et `/services/mentorat`, `prefers-reduced-motion` absent.

## 9. Motion

- Drawer 400 ms, overlay fade, bottom nav spring : justifiés.
- Popup : 7 mouvements concurrents (6 décalés de 100 ms + barre de progression) + auto-fermeture 5 s → décoratif.
- Page légale : opacité animée sur le contenu → à supprimer.
- `NextTopLoader` rose `#e11d48` hors palette (`app/layout.tsx:40`) → `#1555E0`.
- 5 classes CSS mortes (`fade-in-up`, `shimmer`, `.gpu-accelerated`, `.bg-grid-pattern`, `.bg-blueprint-pattern`) et 5 implémentations inline du même motif de grille avec 5 opacités différentes (0.02 / 0.025 / 0.03 / 0.08 / 0.09).

## 10. Ce qui est solide (à préserver)

- Direction artistique de la home : grille blueprint, angles vifs, section inversée, accent bleu unique, rail mono, espacement vertical généreux.
- Dropdown desktop : `aria-expanded`, fermeture au clic extérieur, cibles 41 px.
- Formulaire : labels associés, `required`, honeypot correct.
- Liens externes : `noopener noreferrer`.
- Mécanisme `bg-foreground text-background` comme section contrastée (à tokeniser).
- Cibles tactiles bottom nav 44 px et drawer 48 px.
- Un seul `<h1>` par page sur 14 routes / 16.

## 11. Top 5 des corrections

1. **Réparer le menu mobile** (portal hors header) — navigation inutilisable sur 100 % des pages < 1024 px.
2. **Réparer la typographie** (Geist dans `tailwind.config.ts`, `@tailwindcss/typography` ou style maison, suppression de la syntaxe v4 dans `globals.css`) — signature mono morte + 5 pages sans espacement de texte.
3. **Unifier grille et rayons** (une largeur de colonne, 0 px partout ou échelle explicite) — c'est ce qui donne l'aspect « template assemblé ».
4. **Reprendre les contrastes** (footer, sommaire légal, CTA fantômes, accent en sombre, erreurs, focus).
5. **Réduire et conditionner le mouvement** (`MotionConfig reducedMotion="user"`, `initial={false}` sur le légal, popup avec tokens + `role="dialog"`).

## 12. Vérifications indépendantes effectuées

- `tailwind.config.ts:62-65` : `--font-inter` / `--font-jetbrains-mono` confirmés.
- CSS compilé : ces variables **absentes** ; `.prose`, `.animate-in`, `.custom-scrollbar` **absents**.
- `package.json` / `node_modules` : `@tailwindcss/typography` absent.
- `app/globals.css:3,203-212` : syntaxe Tailwind v4 présente dans un projet v3.4.17.
- `app/layout.tsx:42,53` : `backdrop-blur` + `MobileMenu` dans le `<header>`.
- `navigation-with-dropdown.tsx:86-98,171-178` : deux CTA vers `/contact`.
- `app/globals.css:38-80` : accent dark `221 83% 62%` → blanc/accent = 3,68:1 (calcul vérifié).
