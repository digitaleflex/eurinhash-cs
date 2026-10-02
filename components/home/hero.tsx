import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden flex min-h-[82vh] items-center bg-background text-foreground" aria-labelledby="hero-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.025)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.025)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute right-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full border border-accent/10" />
        <div className="absolute right-[-4rem] top-[-2rem] h-[22rem] w-[22rem] rounded-full border border-foreground/5" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
        <div className="max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase sm:text-xs">
              Software Architect · Digital Entrepreneur
            </span>
          </div>

          <h1 id="hero-title" className="max-w-4xl text-[2.8rem] font-black leading-[0.94] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-8xl">
            Concevoir des systèmes
            <br />
            <span className="text-accent">qui tiennent.</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-2xl">
            Je conçois, construis et sécurise des systèmes numériques fiables pour transformer des problèmes techniques complexes en fondations claires et évolutives.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/realisations"
              className="inline-flex items-center justify-center gap-3 bg-accent px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-foreground"
            >
              Voir les réalisations
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 border border-foreground/10 px-7 py-4 text-sm font-semibold text-foreground transition-colors hover:border-foreground/20 hover:bg-foreground/[0.03]"
            >
              Discuter d’un projet
            </Link>
          </div>

          <div className="mt-14 border-t border-foreground/10 pt-5">
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              Architecture · IA appliquée · Cybersécurité · Cloud
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
