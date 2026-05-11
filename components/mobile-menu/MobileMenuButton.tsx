'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useMobileMenu } from './MobileMenuProvider';

interface MobileMenuButtonProps {
  className?: string;
}

export function MobileMenuButton({ className = '' }: MobileMenuButtonProps) {
  const { isOpen, toggleMenu } = useMobileMenu();

  return (
    <button
      onClick={toggleMenu}
      className={`relative inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border-2 border-foreground/20 bg-background shadow-xl hover:shadow-2xl text-sm font-medium transition-all duration-300 hover:bg-foreground hover:text-background hover:border-foreground hover:scale-110 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${className}`}
      aria-label="Toggle mobile menu"
      aria-expanded={isOpen}
    >
      {/* Indicateur de notification */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse z-10" />

      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-foreground" />
        ) : (
          <Menu className="h-6 w-6 text-foreground" />
        )}
      </motion.div>
    </button>
  );
}
