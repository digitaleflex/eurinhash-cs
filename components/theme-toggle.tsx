'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-foreground/50 bg-background/95 backdrop-blur-sm shadow-lg hover:shadow-xl hover:bg-foreground/5 hover:border-accent/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-foreground block dark:hidden" />
      <Moon className="h-5 w-5 sm:h-6 sm:w-6 text-foreground hidden dark:block" />
    </button>
  );
}
