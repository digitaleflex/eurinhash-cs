import { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Veille Technologique - Eurin Hash',
  description: 'Articles de fond, études de cas et veille technologique pour rester à la pointe.',
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <header className="mb-24 space-y-8">
          <span className="font-mono text-xs text-accent tracking-widest font-bold block uppercase">
            Savoir · Blog & Veille
          </span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9] text-foreground">
            Analyses &<br />
            <span className="text-foreground/20 font-light italic">Perspectives Tech.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Articles de fond, études de cas et veille technologique pour rester à la pointe.
          </p>
        </header>

        <div className="grid gap-12">
          <div className="p-10 border border-foreground/5 bg-foreground/[0.01] flex flex-col items-center justify-center text-center space-y-6">
            <Newspaper className="w-12 h-12 text-accent/20" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">En cours de rédaction</h2>
              <p className="text-muted-foreground">Le labo EHAF prépare des dossiers exclusifs sur la résilience cloud.</p>
            </div>
            <Link href="/contact?subject=Blog" className="inline-flex items-center gap-2 text-sm font-bold text-accent group">
              S'abonner à la veille par email <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
