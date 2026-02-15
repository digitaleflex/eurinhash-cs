'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, AlertTriangle, Mail } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log l'erreur pour le debugging
    console.error('Erreur de page:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(239,68,68,0.08),transparent_70%)]" />
      </div>

      <div className="text-center px-6 md:px-8 max-w-2xl mx-auto">
        {/* Icône d'erreur */}
        <div className="mb-8">
          <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-red-500 animate-pulse" />
          </div>
          <div className="h-1 w-24 bg-red-500 mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Titre et description */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Oups ! Une erreur s&apos;est produite
        </h1>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Quelque chose ne s&apos;est pas passé comme prévu. Ne vous inquiétez
          pas, ce n&apos;est probablement qu&apos;un problème temporaire.
        </p>

        {/* Détails de l'erreur (en mode développement) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 rounded-2xl border border-red-500/20 bg-red-500/5 text-left">
            <h3 className="font-semibold text-red-500 mb-2">
              Détails de l&apos;erreur :
            </h3>
            <code className="text-sm text-muted-foreground break-all">
              {error.message}
            </code>
          </div>
        )}

        {/* Suggestions */}
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <div className="p-4 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-sm">
            <RefreshCw className="h-6 w-6 text-accent mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Réessayez</h3>
            <p className="text-sm text-muted-foreground">
              Le problème peut être temporaire
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-sm">
            <Mail className="h-6 w-6 text-accent mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Signalez le problème</h3>
            <p className="text-sm text-muted-foreground">
              Aidez-moi à corriger cette erreur
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-accent text-white px-6 py-3 font-medium transition-all duration-300 hover:bg-accent/90 hover:shadow-[0_10px_40px_-10px] hover:shadow-accent/30 hover:scale-105"
          >
            <RefreshCw className="h-4 w-4" />
            Réessayer
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent/5"
          >
            <Home className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>
        </div>

        {/* Contact */}
        <div className="mt-12 pt-8 border-t border-foreground/10">
          <p className="text-sm text-muted-foreground mb-4">
            Si le problème persiste, contactez-moi :
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <Mail className="h-4 w-4" />
            contact@eurinhash.com
          </Link>
        </div>
      </div>
    </main>
  );
}
