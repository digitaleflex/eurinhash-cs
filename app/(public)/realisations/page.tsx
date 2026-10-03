import { ArrowRight, Globe, ShieldCheck, Layers3 } from 'lucide-react';
import Link from 'next/link';

const cases = [
  {
    icon: Globe,
    type: 'Architecture & Infrastructure',
    title: 'Structurer une infrastructure déployable',
    context: 'Un système devait gagner en clarté et en reproductibilité alors que plusieurs opérations restaient manuelles.',
    objective: 'Réduire la complexité opérationnelle et rendre les responsabilités techniques plus explicites.',
    constraints: 'Infrastructure existante, ressources limitées et nécessité de préserver les services en place.',
    decisions: 'Conteneurisation, reverse proxy, automatisation des déploiements et documentation des flux.',
    result: 'État documenté dans les livrables du projet ; les métriques de disponibilité ou de coût ne sont pas affichées lorsqu’elles n’ont pas été mesurées.',
    href: '/contact?subject=Architecture',
  },
  {
    icon: ShieldCheck,
    type: 'Cybersécurité',
    title: 'Analyser et corriger une surface d’exposition',
    context: 'Un système existant présentait des points de sécurité nécessitant une analyse et une remédiation.',
    objective: 'Identifier les vulnérabilités pertinentes, comprendre leur impact et prioriser leur correction.',
    constraints: 'Contexte réel, périmètre d’audit défini et nécessité de distinguer les constats vérifiés des hypothèses.',
    decisions: 'Analyse ciblée, validation des constats, correction des faiblesses pertinentes et vérification post-remédiation.',
    result: 'Les résultats sont présentés selon les éléments effectivement vérifiés, sans promesse de risque nul.',
    href: '/contact?subject=Cybersécurité',
  },
  {
    icon: Layers3,
    type: 'Produit & Systèmes',
    title: 'Passer d’un besoin métier à une architecture',
    context: 'Un produit numérique devait transformer plusieurs besoins fonctionnels en un système cohérent.',
    objective: 'Définir une structure capable d’évoluer sans multiplier prématurément les abstractions.',
    constraints: 'Périmètre évolutif, priorités produit et nécessité de garder une base maintenable.',
    decisions: 'Découpage du domaine, choix de la persistance, frontières serveur/client et validation des flux critiques.',
    result: 'Architecture et décisions documentées ; les résultats quantitatifs sont réservés aux données réellement disponibles.',
    href: '/contact?subject=Produit%20numérique',
  },
];

export default function RealisationsPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <header className="mb-20 max-w-3xl">
          <span className="mb-6 block font-mono text-xs tracking-[0.16em] text-accent uppercase">Réalisations</span>
          <h1 className="text-5xl font-black leading-[0.94] tracking-tight sm:text-7xl">
            Voir comment les décisions
            <br />
            <span className="text-foreground/25">deviennent des systèmes.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Les études de cas décrivent le contexte, les contraintes, les choix d’architecture et ce qui a réellement été livré. Les intentions ne sont pas présentées comme des résultats.
          </p>
        </header>

        <div className="space-y-8">
          {cases.map((item, index) => (
            <article key={item.title} className="border border-foreground/10 p-8 sm:p-12">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-accent">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase">{item.type}</span>
                </div>
                <span className="font-mono text-[9px] tracking-widest text-muted-foreground">CASE-0{index + 1}</span>
              </div>

              <h2 className="mt-8 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">{item.title}</h2>

              <div className="mt-10 grid gap-8 border-y border-foreground/5 py-8 sm:grid-cols-2 lg:grid-cols-3">
                <div><span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">Contexte</span><p className="mt-2 text-sm leading-relaxed">{item.context}</p></div>
                <div><span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">Objectif</span><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.objective}</p></div>
                <div><span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">Contraintes</span><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.constraints}</p></div>
                <div className="sm:col-span-2 lg:col-span-2"><span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">Décisions</span><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.decisions}</p></div>
                <div><span className="font-mono text-[9px] tracking-widest text-accent uppercase">Résultat / état</span><p className="mt-2 text-sm font-semibold leading-relaxed">{item.result}</p></div>
              </div>

              <Link href={item.href} className="inline-flex items-center gap-2 text-xs font-bold text-accent">
                Discuter d’un besoin similaire
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
