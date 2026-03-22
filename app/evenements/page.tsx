import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Video, Mic2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Événements & Webinaires - Eurin Hash',
  description: 'Participez en direct à nos sessions techniques et découvrez les coulisses de l\'architecture moderne.',
};

export default function EvenementsPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <header className="mb-24 space-y-8">
          <span className="font-mono text-xs text-accent tracking-widest font-bold block uppercase">
            Écosystème · Événements
          </span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9] text-foreground">
            Lives, Webinaires &<br />
            <span className="text-foreground/20 font-light italic">Conférences.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Participez en direct à nos sessions techniques et découvrez les coulisses de l'architecture moderne.
          </p>
        </header>

        <div className="grid gap-12">
          <div className="p-10 border border-foreground/5 bg-foreground/[0.01] flex flex-col items-center justify-center text-center space-y-6">
            <Calendar className="w-12 h-12 text-accent/20" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Prochains rendez-vous</h2>
              <p className="text-muted-foreground">La programmation complète pour Avril 2026 arrive bientôt.</p>
            </div>
            <Link href="/contact?subject=Evenement" className="inline-flex items-center gap-2 text-sm font-bold text-accent group">
              Soyez informé des prochains Lives <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
