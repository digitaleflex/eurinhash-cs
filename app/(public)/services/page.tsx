import { ArrowRight, Search, Layers, BrainCircuit, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Clarifier un système existant',
    href: '/services/audit',
    icon: Search,
    problem: 'Vous avez un système difficile à maintenir, des risques techniques mal compris ou des décisions qui se sont accumulées sans architecture claire.',
    intervention: 'Audit ciblé de l’architecture, des flux, de l’infrastructure et des points de risque.',
    deliverable: 'Constats documentés, priorités, risques, recommandations et plan d’action.',
    benefit: 'Savoir quoi corriger maintenant, quoi préserver et quoi ne pas complexifier.',
  },
  {
    title: 'Concevoir une architecture',
    href: '/services/architecture',
    icon: Layers,
    problem: 'Vous devez lancer, faire évoluer ou restructurer un produit numérique sans créer une dette technique disproportionnée.',
    intervention: 'Conception de l’architecture logicielle et infrastructurelle à partir des contraintes produit et opérationnelles.',
    deliverable: 'Architecture cible, décisions techniques, limites, choix d’outils et trajectoire d’implémentation.',
    benefit: 'Une base technique compréhensible et adaptée au stade réel du produit.',
  },
  {
    title: 'Intégrer l’IA avec discernement',
    href: '/services',
    icon: BrainCircuit,
    problem: 'Vous identifiez un potentiel d’automatisation ou d’IA mais ne savez pas où elle crée réellement de la valeur.',
    intervention: 'Cadrage du cas d’usage, choix du modèle ou de l’agent, intégration et validation.',
    deliverable: 'Prototype ou intégration ciblée, critères de validation et limites connues.',
    benefit: 'Une utilisation de l’IA reliée à un problème concret plutôt qu’à un effet de mode.',
  },
  {
    title: 'Sécuriser une infrastructure',
    href: '/services/audit',
    icon: ShieldCheck,
    problem: 'Vous devez réduire l’exposition d’un système et comprendre ses risques avant qu’ils ne deviennent des incidents.',
    intervention: 'Analyse de surface, configuration, accès, déploiement et mesures de protection pertinentes au contexte.',
    deliverable: 'Constats, priorisation des risques et recommandations de remédiation.',
    benefit: 'Une vision plus claire des risques et des actions réellement prioritaires.',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <header className="mb-20 max-w-3xl">
          <span className="mb-6 block font-mono text-xs tracking-[0.16em] text-accent uppercase">Services</span>
          <h1 className="text-5xl font-black leading-[0.94] tracking-tight sm:text-7xl">
            Résoudre le bon problème
            <br />
            <span className="text-foreground/25">avant de construire.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Chaque intervention part du contexte, des contraintes et du résultat attendu. La technologie vient ensuite, comme moyen d’exécution.
          </p>
        </header>

        <div className="grid border border-foreground/10 md:grid-cols-2">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="group border-b border-foreground/10 p-8 last:border-b-0 md:nth-[2n+1]:border-r sm:p-10">
              <div className="flex items-start justify-between gap-6">
                <service.icon className="h-8 w-8 text-accent" aria-hidden="true" />
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </div>
              <h2 className="mt-10 text-2xl font-bold tracking-tight group-hover:text-accent">{service.title}</h2>
              <div className="mt-8 space-y-6">
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">Pour quel problème</span>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.problem}</p>
                </div>
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">Intervention</span>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.intervention}</p>
                </div>
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">Livrable</span>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.deliverable}</p>
                </div>
                <div className="border-t border-foreground/5 pt-5">
                  <span className="font-mono text-[9px] tracking-widest text-accent uppercase">Valeur</span>
                  <p className="mt-2 text-sm font-semibold leading-relaxed">{service.benefit}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 border border-foreground/10 p-8 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight">Un besoin qui ne correspond pas exactement à ces formats ?</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Décrivez le contexte et l’objectif. Le premier échange sert à déterminer si une intervention est pertinente et sous quelle forme.
          </p>
          <Link href="/contact" className="mt-7 inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-accent">
            Discuter d’un besoin
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
