'use client';

import { ArrowRight, Search, Layers, Users, GraduationCap } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Audit de Résilience',
    href: '/services/audit',
    icon: Search,
    description: 'Une analyse profonde de 5 jours pour identifier vos goulots d\'étranglement techniques et vos risques stratégiques.',
  },
  {
    title: 'Architecture de Système',
    href: '/services/architecture',
    icon: Layers,
    description: 'Conception d\'infrastructures cloud et logicielles haute performance, scalables et souveraines.',
  },
  {
    title: 'Accompagnement CTO',
    href: '/services/cto',
    icon: Users,
    description: 'Un partenaire stratégique pour diriger votre vision technique, recruter vos talents et instaurer une culture d\'excellence.',
  },
  {
    title: 'Programme de Mentorat',
    href: '/services/mentorat',
    icon: GraduationCap,
    description: 'Formation d\'élite et mentorat pratique en programmation, cybersécurité et cloud computing pour les talents émergents.',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <header className="mb-24">
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-6">Expertise & Solutions</span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
            Nos Services<br />
            <span className="text-foreground/20 font-light italic">Stratégiques.</span>
          </h1>
        </header>

        <div className="grid md:grid-cols-3 gap-px bg-foreground/5 border border-foreground/5">
          {services.map((service, i) => (
            <Link 
              key={i} 
              href={service.href}
              className="group bg-background p-10 sm:p-12 flex flex-col gap-8 hover:bg-foreground/[0.02] transition-all duration-500"
            >
              <service.icon className="w-10 h-10 text-accent" />
              <div className="space-y-4 flex-1">
                <h2 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors">{service.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-accent pt-6 border-t border-foreground/5">
                Découvrir le service <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-24 p-12 border border-accent/20 bg-accent/[0.02] text-center">
            <h3 className="text-xl font-bold mb-4">Besoin d'une approche sur-mesure ?</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Chaque organisation est unique. Discutons de votre contexte spécifique pour définir 
                l'accompagnement le plus adapté.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 text-sm font-bold hover:bg-accent hover:text-white transition-all">
                Planifier un échange <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
      </div>
    </main>
  );
}
