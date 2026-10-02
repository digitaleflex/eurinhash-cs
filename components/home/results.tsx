import { ArrowRight, Globe, ShieldCheck, Layers3 } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    icon: Globe,
    title: 'Architecture & Infrastructure',
    contexte: 'Concevoir une base d’infrastructure plus claire pour des applications qui doivent être déployées et maintenues dans la durée.',
    interventions: 'Architecture, conteneurisation, reverse proxy, automatisation et documentation.',
    resultat: 'Une base technique structurée autour des contraintes réelles du projet.',
    ref: 'CASE-01',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersécurité',
    contexte: 'Identifier et traiter des faiblesses techniques sur des systèmes existants.',
    interventions: 'Analyse de surface, identification des vulnérabilités et remédiation ciblée.',
    resultat: 'Les résultats sont documentés selon ce qui a effectivement été vérifié.',
    ref: 'CASE-02',
  },
  {
    icon: Layers3,
    title: 'Produits & Systèmes',
    contexte: 'Transformer un besoin métier en produit numérique cohérent et maintenable.',
    interventions: 'Cadrage, architecture, développement, intégration et validation.',
    resultat: 'Des décisions techniques reliées à un objectif produit explicite.',
    ref: 'CASE-03',
  },
];

export default function Results() {
  return (
    <section className="overflow-hidden bg-foreground py-24 text-background sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mb-16 max-w-3xl">
          <span className="mb-6 block font-mono text-xs tracking-[0.16em] text-accent uppercase">
            Des problèmes réels. Des décisions techniques concrètes.
          </span>
          <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            Ce que je construis se vérifie dans les systèmes eux-mêmes.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-background/60 sm:text-lg">
            Chaque réalisation doit permettre de comprendre le problème, les contraintes, les choix d’architecture et ce qui a réellement été livré.
          </p>
        </div>

        <div className="grid border border-background/10 md:grid-cols-3">
          {projects.map((project) => (
            <article key={project.ref} className="group border-b border-background/10 p-8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 sm:p-10">
              <project.icon className="mb-10 h-9 w-9 text-accent" aria-hidden="true" />
              <div className="space-y-6">
                <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent">{project.title}</h3>
                <div className="space-y-5">
                  <div>
                    <span className="mb-1 block font-mono text-[9px] tracking-widest text-background/40 uppercase">Contexte</span>
                    <p className="text-sm leading-relaxed text-background/75">{project.contexte}</p>
                  </div>
                  <div>
                    <span className="mb-1 block font-mono text-[9px] tracking-widest text-background/40 uppercase">Intervention</span>
                    <p className="text-sm leading-relaxed text-background/55">{project.interventions}</p>
                  </div>
                  <div className="border-t border-background/10 pt-5">
                    <span className="mb-1 block font-mono text-[9px] tracking-widest text-accent uppercase">Résultat / état</span>
                    <p className="text-sm font-semibold leading-relaxed text-background">{project.resultat}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/realisations" className="inline-flex items-center gap-2 text-sm font-semibold text-background/60 hover:text-accent">
            Voir les réalisations documentées
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
