'use client';

import { ArrowRight, Globe, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    icon: Globe,
    title: 'Architecture Cloud',
    contexte: 'Infrastructure critique pour une plateforme en croissance.',
    interventions: 'Docker + Traefik + Portainer + GitHub Actions.',
    resultat: 'Système automatisé, modulaire et hautement sécurisé.',
    ref: 'CASE-01'
  },
  {
    icon: ShieldCheck,
    title: 'Audit & Sécurité Web',
    contexte: 'Site e-commerce présentant des failles critiques.',
    interventions: 'Audit d’intrusion + Correction des vulnérabilités.',
    resultat: 'Sécurité renforcée et risques d’exploitation réduits à zéro.',
    ref: 'CASE-02'
  },
  {
    icon: Users,
    title: 'Mentorat d’Élite (EHAF)',
    contexte: 'Détection et formation des hauts potentiels (WhatsApp/TikTok).',
    interventions: 'Architecture, Cybersécurité, Cloud Computing & Mentorat.',
    resultat: 'Jeunes talents formés et capables de déployer des systèmes réels.',
    ref: 'CASE-03'
  }
];

export default function Results() {
  return (
    <section className="py-24 sm:py-40 bg-foreground text-background overflow-hidden relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        
        <div className="max-w-4xl mb-24">
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-8 opacity-80">
            Impact Réel
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter leading-tight text-background">
            Résultats<br />
            <span className="text-background/20 italic">tangibles.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-background/5 border border-background/5">
          {projects.map((project, i) => (
            <div 
              key={i} 
              className="group bg-foreground p-10 flex flex-col gap-10 hover:bg-background/[0.03] transition-all duration-500 relative"
            >
                <span className="absolute top-10 right-10 font-mono text-[9px] text-background/20">{project.ref}</span>
                <project.icon className="w-10 h-10 text-accent" />
                
                <div className="space-y-6 flex-1">
                    <h3 className="text-2xl font-bold tracking-tight text-background group-hover:text-accent transition-colors">
                        {project.title}
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <span className="text-[9px] font-mono text-background/40 uppercase tracking-widest">Contexte</span>
                            <p className="text-sm text-background/80 leading-relaxed font-medium">{project.contexte}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[9px] font-mono text-background/40 uppercase tracking-widest">Intervention</span>
                            <p className="text-sm text-background/60 leading-relaxed">{project.interventions}</p>
                        </div>
                        <div className="space-y-1 pt-4 border-t border-background/5">
                            <span className="text-[9px] font-mono text-accent uppercase tracking-widest">Résultat</span>
                            <p className="text-sm text-background font-bold tracking-tight">{project.resultat}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-bold text-accent pt-6 opacity-0 group-hover:opacity-100 transition-all">
                    Détails techniques <ArrowRight className="w-3 h-3" />
                </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
            <Link 
              href="/realisations" 
              className="inline-flex items-center gap-3 text-sm font-semibold text-background/40 hover:text-accent transition-colors group"
            >
                Voir tous les projets 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </section>
  );
}
