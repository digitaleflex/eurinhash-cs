'use client';

import { ShieldCheck, Zap, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AuditServicePage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-40">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-6">Service · Stratégie</span>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9] mb-12">
            Audit de<br />
            <span className="text-foreground/20 font-light italic">Résilience.</span>
        </h1>
        
        <div className="grid gap-12 mt-20">
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed">
                Votre système est-il prêt à passer à l'échelle ? En 5 jours, nous identifions les points 
                de rupture critiques, les failles de sécurité et les poches de dette technique.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            {[
                { icon: Search, title: 'Diagnostic', desc: 'Scan profond de votre stack et de vos processus.' },
                { icon: ShieldCheck, title: 'Risques', desc: 'Identification des vulnérabilités de continuité.' },
                { icon: Zap, title: 'Plan d\'Action', desc: 'Livrable direct avec priorités d\'exécution.' }
            ].map((item, i) => (
                <div key={i} className="space-y-4">
                    <item.icon className="w-8 h-8 text-accent" />
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
            ))}
          </div>

          <div className="mt-16 p-10 bg-foreground text-background">
            <h2 className="text-2xl font-bold mb-6">Prêt pour un diagnostic ?</h2>
            <p className="mb-10 text-background/70">
                Ne construisez pas sur des sables mouvants. Sécurisez vos fondations techniques maintenant.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 text-sm font-bold hover:bg-white hover:text-black transition-all group">
                Réserver mon audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
