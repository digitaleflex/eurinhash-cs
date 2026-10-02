# Système motion — contrat

Statut : accepté. S'applique à tout mouvement du site, public et privé.
Implémentation : `lib/motion.ts` (framer-motion) et `tailwind.config.ts` (CSS).

## Principes

1. **Le mouvement sert la compréhension, jamais le spectacle.** Une animation doit
   expliquer d'où vient un élément ou où il va. Ce qui n'explique rien ne bouge pas.
2. **Rien de bloquant.** Aucune animation ne retient ni n'empêche l'accès au contenu.
   Le contenu est lisible avant, pendant et après.
3. **Une seule échelle.** Trois durées, deux courbes, deux ressorts. Toute valeur
   hors de cette échelle est un défaut de conception, pas une exception.
4. **La préférence système prime.** `prefers-reduced-motion` neutralise tout
   (voir `components/motion-provider.tsx` et la media query de `app/globals.css`).
   Aucun composant ne doit se soustraire à ce réglage.
5. **Sur mobile, moins que sur desktop.** Les décalages de distance sont divisés par
   deux en dessous de `md` ; les ressorts visibles sont remplacés par des durées.

## Échelle de durée

| Token           | Valeur | Usage                                         |
| --------------- | ------ | --------------------------------------------- |
| `duration.fast` | 200 ms | survol, focus, changement d'état, retour      |
| `duration.base` | 300 ms | apparition d'un bloc, bascule de panneau      |
| `duration.slow` | 500 ms | entrée d'un élément principal (hero, article) |

Rien au-delà de 500 ms. Au-delà, l'utilisateur a fini de regarder.

## Courbes

| Token         | Valeur                           | Usage                                        |
| ------------- | -------------------------------- | -------------------------------------------- |
| `ease.out`    | `cubic-bezier(0.16, 1, 0.3, 1)`  | entrée : ce qui arrive, vite puis posé       |
| `ease.inOut`  | `cubic-bezier(0.65, 0, 0.35, 1)` | déplacement d'un élément qui reste à l'écran |
| `ease.linear` | `linear`                         | boucle (shimmer, indicateur d'attente)       |

## Ressorts

| Token           | Valeur                    | Usage                                         |
| --------------- | ------------------------- | --------------------------------------------- |
| `spring.snappy` | stiffness 400, damping 30 | pastille active d'une navigation (`layoutId`) |
| `spring.soft`   | stiffness 200, damping 26 | confirmation, icône de succès                 |

Un seul ressort pour chaque rôle : la « pastille qui glisse » ne peut pas avoir deux
physiques selon l'écran où elle se trouve.

## Primitives

| Primitive     | Description                                                                 | Durée | Courbe      |
| ------------- | --------------------------------------------------------------------------- | ----- | ----------- |
| `fade`        | opacité seule                                                               | fast  | out         |
| `fadeRise`    | opacité + translation verticale 10 px                                       | base  | out         |
| `fadeRiseFar` | opacité + translation verticale 20 px, pour un élément de premier plan      | slow  | out         |
| `slideIn`     | translation horizontale depuis le bord, 100 % sur mobile, 20 px sur desktop | base  | out         |
| `popIn`       | échelle 0.8 → 1 avec opacité                                                | base  | spring.soft |
| `overlay`     | scrim : opacité seule                                                       | fast  | out         |
| `disclosure`  | hauteur auto (accordéon)                                                    | base  | inOut       |

## Rythme (stagger)

Un seul pas : **50 ms** entre deux éléments d'une même liste, plafonné à 6 éléments.
Au-delà, l'effet devient une attente et non un rythme.

Les listes de plus de 6 éléments apparaissent d'un bloc, sans cascade.

## Portée des distances

| Contexte            | Distance maximale   |
| ------------------- | ------------------- |
| Mobile (`< md`)     | 10 px               |
| Desktop             | 20 px               |
| Panneau plein écran | 100 % de la largeur |

## Règles d'implémentation

- Les valeurs viennent de `lib/motion.ts`. Aucune durée ni courbe écrite en dur dans un composant.
- Les éléments animés au scroll utilisent `whileInView` avec `viewport={{ once: true, amount: 0.3 }}` :
  un élément ne rejoue jamais son animation.
- Aucun mouvement horizontal au scroll : il perturbe la lecture.
- Une animation qui modifie le sens de lecture ou l'état doit être annoncée (le contenu reste dans le DOM, seul le mouvement est retiré).
- Les boucles sont limitées à `linear` et doivent signaler un chargement réel.
