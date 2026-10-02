'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useMobileMenu } from './MobileMenuProvider';
import { duration, ease } from '@/lib/motion';

export function MobileMenuOverlay() {
  const { isOpen, closeMenu } = useMobileMenu();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.fast, ease: ease.out }}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md"
          onClick={closeMenu}
        />
      )}
    </AnimatePresence>
  );
}
