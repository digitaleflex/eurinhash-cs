'use client';

import { Users, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTOServicePage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-40">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-6">Service · Accompagnement</span>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9] mb-12">
            Accompagnement<br />
            <span className="text-foreground/20 font-light italic">CTO On-Demand.</span>
        </h1>
        
        <div className="grid gap-12 mt-20">
          <p className="text-xl text-muted-foreground leading-relaxed">
              Un partenaire stratégique pour guider votre direction technique. 
              Prise de décision, recrutement ciblé et culture de l'ingénierie.
          </p>

          <div className="grid sm:grid-cols-2 gap-8 mt-12 text-background">
            <div className="p-8 bg-foreground">
                <Target className="w-8 h-8 mb-6 text-accent" />
                <h3 className="text-lg font-bold mb-2">Vision Tech</h3>
                <p className="text-sm opacity-70">Alignement de votre roadmap technique avec vos objectifs business.</p>
            </div>
            <div className="p-8 bg-accent">
                <Users className="w-8 h-8 mb-6 text-white" />
                <h3 className="text-lg font-bold mb-2 text-white">Scale Culture</h3>
                <p className="text-sm text-white/80">Mise en place de standards de qualité et mentorat des leads.</p>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-foreground/5">
            <Link href="/contact" className="inline-flex items-center gap-3 text-sm font-bold text-foreground hover:text-accent transition-colors group">
                Demander un échange <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
