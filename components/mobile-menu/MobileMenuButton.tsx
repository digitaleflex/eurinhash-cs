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
      className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 bg-background/50 backdrop-blur-lg shadow-lg transition-all duration-500 hover:bg-foreground hover:text-background hover:scale-105 active:scale-95 focus-visible:outline-none z-[80] ${className}`}
      aria-label="Toggle mobile menu"
      aria-expanded={isOpen}
    >
      <div className="flex flex-col gap-1.5 items-center justify-center w-6">
        <motion.span
          animate={{ 
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 7.5 : 0,
            width: isOpen ? "100%" : "80%"
          }}
          className="h-0.5 bg-current rounded-full transition-all"
        />
        <motion.span
          animate={{ 
            opacity: isOpen ? 0 : 1,
            x: isOpen ? -10 : 0
          }}
          className="h-0.5 w-full bg-current rounded-full"
        />
        <motion.span
          animate={{ 
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -7.5 : 0,
            width: isOpen ? "100%" : "60%"
          }}
          className="h-0.5 bg-current rounded-full transition-all"
        />
      </div>
    </button>
  );
}
