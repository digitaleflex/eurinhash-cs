'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useMobileMenu } from './MobileMenuProvider';

export function MobileMenuOverlay() {
  const { isOpen, closeMenu } = useMobileMenu();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-background/90 backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}
    </AnimatePresence>
  );
}
