import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-foreground/5 bg-background py-28 text-center sm:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        <span className="text-sm font-semibold text-accent">Vous avez un projet ?</span>
        <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
          Commençons par
          <br />
          <span className="text-foreground/25">comprendre votre besoin.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Expliquez ce que vous souhaitez faire, ce qui vous bloque et les contraintes à prendre en compte. Nous pourrons ensuite voir quelle approche est adaptée.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/contact" className="inline-flex items-center justify-center gap-3 bg-accent px-8 py-4 text-sm font-bold text-white hover:bg-foreground">
            Parlons de votre besoin <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/realisations" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold text-muted-foreground hover:text-foreground">
            Voir mes projets
          </Link>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Aucun jargon nécessaire pour le premier échange.
        </p>
      </div>
    </section>
  );
}
