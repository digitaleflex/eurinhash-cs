'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * `reducedMotion="user"` fait respecter la préférence système : framer-motion
 * supprime alors les animations de transformation et d'opacité pour les
 * utilisateurs qui l'ont activée, sans désactiver les callbacks d'animation.
 *
 * Le volet CSS (transitions Tailwind, keyframes) est traité dans globals.css via
 * la media query prefers-reduced-motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.2 }}>
      {children}
    </MotionConfig>
  );
}
