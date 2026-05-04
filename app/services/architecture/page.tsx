'use client';

import { Layers, Server, ArrowRight } from 'lucide-react';

import Link from 'next/link';

export default function ArchitectureServicePage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-40">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-6">Service · Ingénierie</span>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9] mb-12">
            Architecture de<br />
            <span className="text-foreground/20 font-light italic">Système.</span>
        </h1>
        
        <div className="grid gap-12 mt-20">
          <p className="text-xl text-muted-foreground leading-relaxed">
              Nous concevons des architectures logicielles et cloud sur-mesure. 
              Du design system technique à l'infrastructure as code.
          </p>

          <div className="space-y-12 mt-12">
            <div className="flex gap-8 items-start border-l border-foreground/5 pl-8">
                <Layers className="w-6 h-6 text-accent shrink-0" />
                <div>
                    <h3 className="text-xl font-bold mb-2">Multi-tenant & Évolutif</h3>
                    <p className="text-muted-foreground">Design de plateformes SaaS capables de gérer des millions d'utilisateurs avec isolation totale.</p>
                </div>
            </div>
            <div className="flex gap-8 items-start border-l border-foreground/5 pl-8">
                <Server className="w-6 h-6 text-accent shrink-0" />
                <div>
                    <h3 className="text-xl font-bold mb-2">Cloud Hybride & Souverain</h3>
                    <p className="text-muted-foreground">Déploiement sur infrastructures mixtes pour garantir la sécurité et la localité des données.</p>
                </div>
            </div>
          </div>

          <Link href="/contact" className="mt-16 inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 text-sm font-bold hover:bg-accent hover:text-white transition-all group">
                Discuter de votre architecture <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  );
}
