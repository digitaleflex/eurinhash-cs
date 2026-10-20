import { Newspaper, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function BlogSection() {
  return (
    <section className="border-y border-foreground/5 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-3 text-accent">
            <Newspaper className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm font-semibold">Articles et retours d’expérience</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Des explications concrètes sur les technologies que j’utilise.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Je partage des méthodes, des choix techniques et des leçons tirées de projets. Les articles commencent par le problème à résoudre et expliquent les détails techniques au fil du texte.
          </p>
          <Link href="/blog" className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-foreground hover:text-accent">
            Lire les articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
