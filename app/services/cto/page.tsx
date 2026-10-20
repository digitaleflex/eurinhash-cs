'use client';

import { Users, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTOServicePage() {
  return (
    <main className="min-h-screen bg-background pb-40 pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <span className="mb-6 block text-sm font-semibold text-accent">Service · Conseil technique</span>
        <h1 className="mb-8 text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl">
          Prendre de meilleures
          <br />
          <span className="text-foreground/30">décisions techniques.</span>
        </h1>
        <div className="mt-12 grid gap-8">
          <p className="text-xl leading-relaxed text-muted-foreground">
            Vous dirigez un projet ou une équipe et devez faire des choix techniques importants ? Je peux vous aider à comparer les options, anticiper les difficultés et établir un plan réaliste, sans devoir recruter immédiatement un responsable technique à temps plein.
          </p>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div className="bg-foreground p-8 text-background">
              <Target className="mb-6 h-8 w-8 text-accent" aria-hidden="true" />
              <h2 className="mb-2 text-lg font-bold">Choisir une direction</h2>
              <p className="text-sm leading-relaxed text-background/70">Relier les décisions techniques aux objectifs du projet, aux délais et au budget disponible.</p>
            </div>
            <div className="bg-accent p-8 text-white">
              <Users className="mb-6 h-8 w-8" aria-hidden="true" />
              <h2 className="mb-2 text-lg font-bold">Aider l’équipe à avancer</h2>
              <p className="text-sm leading-relaxed text-white/85">Clarifier les priorités, améliorer les pratiques de travail et accompagner les personnes qui construisent le produit.</p>
            </div>
          </div>
          <div className="mt-8 border-t border-foreground/5 pt-10">
            <Link href="/contact?subject=Conseil%20technique" className="group inline-flex items-center gap-3 text-sm font-bold text-foreground transition-colors hover:text-accent">
              Discuter de votre situation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
