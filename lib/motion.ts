import type { Transition, Variants } from 'framer-motion';

/**
 * Tokens motion — contrat dans docs/motion-system.md.
 * Aucune durée ni courbe ne doit être écrite en dur dans un composant.
 */

export const duration = {
  fast: 0.2,
  base: 0.3,
  slow: 0.5,
} as const;

export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const spring = {
  snappy: { type: 'spring', stiffness: 400, damping: 30 },
  soft: { type: 'spring', stiffness: 200, damping: 26 },
} as const satisfies Record<string, Transition>;

/** Pas de cascade : 50 ms, plafonné à 6 éléments (docs/motion-system.md). */
export const staggerStep = 0.05;
export const staggerMax = 6;

export const stagger = (index: number): number =>
  Math.min(index, staggerMax) * staggerStep;

export const variants = {
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: duration.fast, ease: ease.out },
    },
  },
  fadeRise: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.base, ease: ease.out },
    },
  },
  fadeRiseFar: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.slow, ease: ease.out },
    },
  },
  popIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: spring.soft },
  },
  overlay: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: duration.fast, ease: ease.out },
    },
  },
  disclosure: {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: { duration: duration.base, ease: ease.inOut },
    },
  },
} satisfies Record<string, Variants>;

/** Une seule configuration de déclenchement au scroll : jamais de rejeu. */
export const viewport = { once: true, amount: 0.3 } as const;
