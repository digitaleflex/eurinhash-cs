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
      className={`relative inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-foreground/50 bg-background/95 backdrop-blur-sm shadow-lg hover:shadow-xl text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-white hover:border-accent hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${className}`}
      aria-label="Toggle mobile menu"
      aria-expanded={isOpen}
    >
      {/* Indicateur de notification */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse z-10" />

      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
        )}
      </motion.div>
    </button>
  );
}
