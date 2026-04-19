'use client';

import { ArrowRight, ShieldCheck, Users, Globe } from 'lucide-react';
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

        <div className="grid gap-20">
          {/* Projet 01 - Cloud */}
          <div className="border border-foreground/5 p-10 sm:p-16 hover:bg-foreground/[0.02] transition-all duration-500 relative group">
            <span className="absolute top-10 right-10 font-mono text-[10px] text-foreground/20">CASE-01</span>
            <div className="space-y-10 max-w-3xl">
              <div className="flex items-center gap-4 text-accent">
                <Globe className="w-5 h-5" />
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-accent/80">Architecture Cloud & DevOps</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">Infrastructure Cloud Souveraine & Automatisée</h2>
              
              <div className="grid sm:grid-cols-3 gap-10 py-10 border-y border-foreground/5">
                <div className="space-y-2">
                    <span className="block text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Le Problème</span>
                    <p className="text-sm font-medium leading-relaxed">Infrastructure monolithique fragile avec déploiements manuels et risques de coupure.</p>
                </div>
                <div className="space-y-2">
                    <span className="block text-[9px] font-mono text-muted-foreground uppercase tracking-widest">L'Intervention</span>
                    <p className="text-sm text-muted-foreground leading-relaxed font-mono">Docker + Traefik + Portainer + GitHub Actions.</p>
                </div>
                <div className="space-y-2">
                    <span className="block text-[9px] font-mono text-accent uppercase tracking-widest">Le Résultat</span>
                    <p className="text-sm font-bold leading-relaxed text-foreground">Système modulaire, automatisé et hautement disponible.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-12">
                <div>
                  <span className="block text-[9px] font-mono text-muted-foreground uppercase mb-2">Metrics</span>
                  <span className="text-2xl font-black tracking-tighter">99.99% Uptime</span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-muted-foreground uppercase mb-2">Efficacité</span>
                  <span className="text-2xl font-black tracking-tighter">-30% Coûts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Projet 02 - Sécurité */}
          <div className="border border-foreground/5 p-10 sm:p-16 hover:bg-foreground/[0.02] transition-all duration-500 relative group">
            <span className="absolute top-10 right-10 font-mono text-[10px] text-foreground/20">CASE-02</span>
            <div className="space-y-10 max-w-3xl">
              <div className="flex items-center gap-4 text-accent">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-accent/80">Audit & Cybersécurité</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">Sécurisation d'une Plateforme E-commerce</h2>
              
              <div className="grid sm:grid-cols-3 gap-10 py-10 border-y border-foreground/5">
                <div className="space-y-2">
                    <span className="block text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Le Problème</span>
                    <p className="text-sm font-medium leading-relaxed">Présence de failles critiques permettant l'injection de code et le vol de données.</p>
                </div>
                <div className="space-y-2">
                    <span className="block text-[9px] font-mono text-muted-foreground uppercase tracking-widest">L'Intervention</span>
                    <p className="text-sm text-muted-foreground leading-relaxed font-mono">Audit d'intrusion + Correction Zero-Day + Patching Kernel.</p>
                </div>
                <div className="space-y-2">
                    <span className="block text-[9px] font-mono text-accent uppercase tracking-widest">Le Résultat</span>
                    <p className="text-sm font-bold leading-relaxed text-foreground">Risques d'exploitation réduits à zéro et monitoring actif.</p>
                </div>
              </div>

              <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-bold text-accent group/link">
                Demander un audit similaire <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Projet 03 - Communauté */}
          <div className="border border-foreground/5 p-10 sm:p-16 hover:bg-foreground/[0.02] transition-all duration-500 relative group">
            <span className="absolute top-10 right-10 font-mono text-[10px] text-foreground/20">CASE-03</span>
            <div className="space-y-10 max-w-3xl">
              <div className="flex items-center gap-4 text-accent">
                <Users className="w-5 h-5" />
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-accent/80">Formation & Leadership Tech</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">Expansion de l'Écosystème Digital (WhatsApp/TikTok)</h2>
              
              <div className="grid sm:grid-cols-3 gap-10 py-10 border-y border-foreground/5">
                <div className="space-y-2">
                    <span className="block text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Le Problème</span>
                    <p className="text-sm font-medium leading-relaxed">Manque de structures d'échange et de formation technique de haut niveau en Afrique.</p>
                </div>
                <div className="space-y-2">
                    <span className="block text-[9px] font-mono text-muted-foreground uppercase tracking-widest">L'Intervention</span>
                    <p className="text-sm text-muted-foreground leading-relaxed font-mono">Masterclasses hebdomadaires + Blueprints Open-Source.</p>
                </div>
                <div className="space-y-2">
                    <span className="block text-[9px] font-mono text-accent uppercase tracking-widest">Le Résultat</span>
                    <p className="text-sm font-bold leading-relaxed text-foreground">+9000 abonnés et détection de talents pour projets stratégiques.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
