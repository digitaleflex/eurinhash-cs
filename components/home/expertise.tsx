import Link from 'next/link';
import { ArrowRight, BrainCircuit, Cloud, ShieldCheck } from 'lucide-react';

const items = [
  {
    id: '01',
    title: 'Concevoir des logiciels solides',
    description: 'Organiser un projet pour qu’il soit compréhensible, facile à faire évoluer et adapté aux besoins réels, sans ajouter de complexité inutile.',
    details: ['Architecture logicielle', 'Développement', 'Bases de données'],
    href: '/services/architecture',
    icon: Cloud,
  },
  {
    id: '02',
    title: 'Utiliser l’IA de façon utile',
    description: 'Trouver où l’intelligence artificielle peut faire gagner du temps ou améliorer un service, puis vérifier qu’elle apporte un résultat concret.',
    details: ['Automatisation', 'Assistants IA', 'Intégration'],
    href: '/services',
    icon: BrainCircuit,
  },
  {
    id: '03',
    title: 'Renforcer la sécurité et le cloud',
    description: 'Repérer les faiblesses, mieux protéger les systèmes et mettre en place des infrastructures que l’on peut surveiller et maintenir.',
    details: ['Cybersécurité', 'Infrastructure', 'Déploiement'],
    href: '/services/audit',
    icon: ShieldCheck,
  },
];

export default function Expertise() {
  return (
    <section className="border-t border-foreground/5 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mb-16 max-w-3xl">
          <span className="mb-6 block text-sm font-semibold text-accent">Ce que je fais</span>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Partir du besoin, puis choisir la bonne technologie.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Un bon choix technique commence par une bonne compréhension du problème. Voici les domaines dans lesquels je peux vous accompagner.
          </p>
        </div>
        <div className="grid border border-foreground/10 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="group relative flex flex-col border-b border-foreground/10 p-8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 sm:p-10">
              <div className="mb-10 flex items-center justify-between">
                <item.icon className="h-7 w-7 text-accent" aria-hidden="true" />
                <span className="font-mono text-xs text-muted-foreground">{item.id}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent">{item.title}</h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.description}</p>
              </div>
              <div className="mt-8 border-t border-foreground/5 pt-6">
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {item.details.map((detail) => (
                    <span key={detail} className="text-xs text-muted-foreground">{detail}</span>
                  ))}
                </div>
                <Link href={item.href} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent">
                  En savoir plus <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
