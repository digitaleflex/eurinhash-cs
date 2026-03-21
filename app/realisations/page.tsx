'use client';

import { ArrowRight, Trophy, BarChart3, Globe } from 'lucide-react';
import Link from 'next/link';

export default function RealisationsPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <header className="mb-24 space-y-6">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Preuves d'impact</span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
            Réalisations<br />
            <span className="text-foreground/20 font-light italic">en conditions réelles.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Nous ne construisons pas seulement du code. Nous construisons des systèmes qui résistent 
            à la croissance et à la complexité.
          </p>
        </header>

        <div className="grid gap-16">
          <div className="border border-foreground/5 p-10 sm:p-16 hover:bg-foreground/[0.02] transition-colors relative group">
            <span className="absolute top-10 right-10 font-mono text-xs text-foreground/20">CASE-01</span>
            <div className="space-y-8 max-w-2xl">
              <div className="flex items-center gap-4 text-accent">
                <Globe className="w-5 h-5" />
                <span className="font-mono text-xs font-bold tracking-widest uppercase">Infrastructure Cloud Souveraine</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Migration stratégique d'une Fintech Panafricaine</h2>
              <p className="text-muted-foreground leading-relaxed">
                Transformation d'une architecture monolithique fragile vers un système multi-régions distribué. 
                Focus sur la souveraineté des données et la haute disponibilité.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8 border-t border-foreground/5">
                <div>
                  <span className="block text-[10px] font-mono text-muted-foreground uppercase mb-1">Impact</span>
                  <span className="text-xl font-bold">99.99% Uptime</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-muted-foreground uppercase mb-1">Efficacité</span>
                  <span className="text-xl font-bold">-30% Coûts</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-muted-foreground uppercase mb-1">Sécurité</span>
                  <span className="text-xl font-bold">Zero-Trust</span>
                </div>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-accent group/link">
                Voir les détails techniques <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="border border-foreground/5 p-10 sm:p-16 opacity-50 relative group">
            <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px] z-10">
              <span className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-4 py-2">En rédaction</span>
            </div>
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-muted-foreground">
                <Trophy className="w-5 h-5" />
                <span className="font-mono text-xs font-bold tracking-widest uppercase">System Design</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Refonte Core Banking System</h2>
              <p className="text-muted-foreground leading-relaxed">
                Modernisation des flux de données critiques pour une institution financière majeure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
