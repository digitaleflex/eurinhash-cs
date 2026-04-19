'use client';

import Link from 'next/link';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center px-6 md:px-8 max-w-lg mx-auto">
        <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold mb-4">Erreur critique</h1>

        <p className="text-muted-foreground mb-8">
          Une erreur inattendue s&apos;est produite. Veuillez réessayer ou
          retourner à l&apos;accueil.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-red-500 text-white px-6 py-3 font-medium hover:bg-red-600 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Réessayer
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 font-medium hover:bg-foreground/5 transition-colors"
          >
            <Home className="h-4 w-4" />
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
