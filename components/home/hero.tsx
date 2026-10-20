import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden bg-background text-foreground" aria-labelledby="hero-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.025)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.025)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute right-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full border border-accent/10" />
        <div className="absolute right-[-4rem] top-[-2rem] h-[22rem] w-[22rem] rounded-full border border-foreground/5" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
        <div className="max-w-4xl">
          <p className="mb-8 text-sm font-semibold text-muted-foreground sm:text-base">
            Eurin Hash · Architecte logiciel et entrepreneur numérique
          </p>
          <h1 id="hero-title" className="max-w-4xl text-[2.8rem] font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-8xl">
            Je rends les projets numériques
            <br />
            <span className="text-accent">plus clairs et plus solides.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-2xl">
            J’aide à comprendre les problèmes techniques, à faire les bons choix et à construire des logiciels et des infrastructures plus fiables, plus sûrs et plus faciles à faire évoluer.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/realisations" className="inline-flex items-center justify-center gap-3 bg-accent px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-foreground">
              Découvrir mes projets <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-3 border border-foreground/10 px-7 py-4 text-sm font-semibold text-foreground transition-colors hover:border-foreground/20 hover:bg-foreground/[0.03]">
              Parlons de votre besoin
            </Link>
          </div>
          <div className="mt-14 border-t border-foreground/10 pt-5">
            <p className="text-sm text-muted-foreground">
              Logiciels · Cloud et infrastructure · Cybersécurité · Intelligence artificielle
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
