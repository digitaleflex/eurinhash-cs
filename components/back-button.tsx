'use client'

import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent/5"
    >
      <ArrowLeft className="h-4 w-4" />
      Page précédente
    </button>
  );
}