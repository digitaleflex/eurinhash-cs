'use client';

import { Download, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const resources = [
  {
    title: 'Guide Audit de Résilience',
    format: 'PDF / 15 Pages',
    desc: 'Le protocole complet de vérification de vos infrastructures cloud.',
    category: 'Sécurité'
  },
  {
    title: 'Blueprint Architecture Docker',
    format: 'eBook / 25 Pages',
    desc: 'Comment structurer vos conteneurs pour la haute disponibilité.',
    category: 'Infrastructure'
  },
  {
    title: 'Checklist Cybersécurite Web',
    format: 'PDF / 5 Pages',
    desc: 'Les 10 points vitaux à vérifier avant une mise en production.',
    category: 'Sécurité'
  }
];

export function ResourcesSection() {
  return (
    <section className="py-32 bg-foreground/[0.02]">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <header className="mb-20 text-center space-y-6">
          <span className="font-mono text-xs text-accent tracking-widest font-bold block uppercase italic">Value First</span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-foreground decoration-accent/10 underline underline-offset-8">
              Ressources Gratuites.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Approfondissez vos compétences avec nos guides techniques et documents exclusifs.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
           {resources.map((res, i) => (
             <div key={i} className="group p-8 border border-foreground/5 bg-background space-y-8 hover:border-accent/40 transition-all relative overflow-hidden">
                {/* Archive Pattern Background */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.02] pointer-events-none translate-x-8 -translate-y-8">
                   <svg viewBox="0 0 100 100" fill="currentColor"><path d="M0 0h100v100H0z"/></svg>
                </div>

                <div className="flex items-center justify-between relative z-10">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent/5 rounded border border-accent/10">
                         <FileText className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[8px] font-mono text-muted-foreground/40 uppercase font-black">Archive_Node</span>
                         <span className="text-[10px] font-mono font-bold text-foreground">v2.0.{i}</span>
                      </div>
                   </div>
                   <span className="text-[9px] font-mono font-black text-accent/40 uppercase tracking-[0.2em]">{res.category}</span>
                </div>
                
                <div className="space-y-4 relative z-10">
                   <h3 className="text-xl font-black tracking-tighter leading-tight group-hover:text-accent transition-colors">{res.title}</h3>
                   <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full" />
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{res.format}</span>
                   </div>
                   <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                      {res.desc}
                   </p>
                </div>

                <Link href="/contact?subject=Ressource" className="flex items-center justify-between pt-6 border-t border-foreground/5 text-[10px] font-black uppercase tracking-widest group/link relative z-10">
                   <span className="flex items-center gap-2 group-hover/link:text-accent transition-colors">
                     Accès_Serveur <Download className="w-3 h-3 text-accent group-hover/link:animate-bounce" />
                   </span>
                   <div className="w-8 h-px bg-foreground/10 group-hover/link:w-12 group-hover/link:bg-accent transition-all" />
                </Link>
             </div>
           ))}
        </div>

        <div className="mt-20 text-center">
            <Link 
              href="/ressources" 
              className="inline-flex items-center gap-3 border border-foreground/10 px-8 py-4 text-sm font-bold tracking-tight hover:bg-foreground hover:text-white transition-all uppercase"
            >
                Accéder à la bibliothèque complète
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
      </div>
    </section>
  );
}
