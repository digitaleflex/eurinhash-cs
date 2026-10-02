import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-foreground/5 bg-background py-28 text-center sm:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        <span className="font-mono text-xs tracking-[0.16em] text-accent uppercase">Prochaine étape</span>
        <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
          Parlons du système
          <br />
          <span className="text-foreground/25">à construire.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Décrivez le contexte, le problème et ce que vous cherchez à accomplir. Nous pouvons commencer par clarifier les contraintes avant de parler de solution.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/contact" className="inline-flex items-center justify-center gap-3 bg-accent px-8 py-4 text-sm font-bold text-white hover:bg-foreground">
            Discuter d’un projet
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/realisations" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold text-muted-foreground hover:text-foreground">
            Voir les réalisations
          </Link>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          Pas de solution prédéfinie ni de promesse artificielle : d’abord le problème, puis l’architecture adaptée.
        </p>
      </div>
    </section>
  );
}
