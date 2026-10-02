import Link from 'next/link';
import { ArrowRight, BrainCircuit, Cloud, ShieldCheck } from 'lucide-react';

const items = [
  {
    id: '01',
    title: 'Architecture logicielle',
    description: 'Structurer un produit ou un système autour de contraintes explicites, de responsabilités claires et de choix techniques maintenables.',
    details: ['Architecture', 'TypeScript / Next.js', 'PostgreSQL'],
    href: '/services/architecture',
    icon: Cloud,
  },
  {
    id: '02',
    title: 'IA appliquée',
    description: 'Intégrer l’IA là où elle améliore réellement un produit, un processus ou une décision, sans ajouter une couche technologique inutile.',
    details: ['Agents', 'Automatisation', 'Intégration de modèles'],
    href: '/services',
    icon: BrainCircuit,
  },
  {
    id: '03',
    title: 'Cybersécurité & Cloud',
    description: 'Réduire les risques techniques et construire des environnements déployables, observables et plus simples à maintenir.',
    details: ['Sécurité', 'Infrastructure', 'DevOps'],
    href: '/services/audit',
    icon: ShieldCheck,
  },
];

export default function Expertise() {
  return (
    <section className="border-t border-foreground/5 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mb-16 max-w-3xl">
          <span className="mb-6 block font-mono text-[10px] font-bold tracking-[0.16em] text-accent uppercase">
            Expertise
          </span>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            L’architecture commence par le problème, pas par la technologie.
          </h2>
        </div>

        <div className="grid border border-foreground/10 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="group relative flex flex-col border-b border-foreground/10 p-8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 sm:p-10">
              <div className="mb-10 flex items-center justify-between">
                <item.icon className="h-7 w-7 text-accent" aria-hidden="true" />
                <span className="font-mono text-[9px] tracking-widest text-muted-foreground">0{item.id}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent">{item.title}</h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.description}</p>
              </div>
              <div className="mt-8 border-t border-foreground/5 pt-6">
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {item.details.map((detail) => (
                    <span key={detail} className="font-mono text-[9px] tracking-wide text-muted-foreground uppercase">{detail}</span>
                  ))}
                </div>
                <Link href={item.href} className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-accent">
                  Explorer
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
