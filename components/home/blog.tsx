import { Newspaper, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function BlogSection() {
  return (
    <section className="border-y border-foreground/5 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-3 text-accent">
            <Newspaper className="h-5 w-5" aria-hidden="true" />
            <span className="font-mono text-xs font-bold tracking-[0.16em] uppercase">Insights</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Comprendre les systèmes, pas seulement les utiliser.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Architecture logicielle, IA appliquée, cybersécurité, cloud et décisions techniques : des analyses publiées lorsqu’elles apportent une expérience ou une idée réellement utile.
          </p>
          <Link href="/blog" className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-foreground hover:text-accent">
            Explorer les insights
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
