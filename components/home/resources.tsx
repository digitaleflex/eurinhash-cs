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
             <div key={i} className="group p-10 border border-foreground/5 bg-background space-y-8 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all">
                <div className="flex items-center justify-between">
                   <div className="p-3 bg-accent/5 rounded-lg group-hover:bg-accent transition-colors">
                      <FileText className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                   </div>
                   <span className="text-[9px] font-mono font-bold text-muted-foreground/30 uppercase tracking-widest">{res.category}</span>
                </div>
                
                <div className="space-y-3">
                   <h3 className="text-xl font-bold tracking-tight leading-tight">{res.title}</h3>
                   <span className="text-[10px] font-mono text-accent bg-accent/5 px-2 py-0.5 rounded">{res.format}</span>
                   <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                      {res.desc}
                   </p>
                </div>

                <Link href="/contact?subject=Ressource" className="flex items-center justify-between pt-4 border-t border-foreground/5 text-xs font-bold group/link">
                   <span className="flex items-center gap-2">
                     Télécharger <Download className="w-3 h-3 text-accent group-hover/link:animate-bounce" />
                   </span>
                   <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
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
