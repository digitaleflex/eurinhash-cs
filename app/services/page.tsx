import { ArrowRight, Search, Layers, BrainCircuit, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Comprendre ce qui bloque',
    href: '/services/audit',
    icon: Search,
    problem: 'Votre application est difficile à modifier, vous rencontrez des problèmes récurrents ou vous ne savez pas quelles améliorations traiter en premier.',
    intervention: 'J’examine le fonctionnement du système, son organisation, son hébergement et les principaux points de risque.',
    deliverable: 'Un rapport clair qui présente les constats, les priorités et les prochaines actions recommandées.',
    benefit: 'Vous savez quoi corriger, quoi garder et par où commencer.',
  },
  {
    title: 'Préparer ou améliorer un projet',
    href: '/services/architecture',
    icon: Layers,
    problem: 'Vous voulez créer un produit numérique ou faire évoluer un logiciel existant sans rendre sa maintenance trop difficile.',
    intervention: 'Nous clarifions les besoins et les contraintes avant de choisir comment organiser le logiciel, les données et l’infrastructure.',
    deliverable: 'Un plan technique, les principaux choix expliqués et des étapes concrètes pour avancer.',
    benefit: 'Une base adaptée à votre projet, sans complexité inutile.',
  },
  {
    title: 'Trouver un usage utile de l’IA',
    href: '/services',
    icon: BrainCircuit,
    problem: 'Vous souhaitez utiliser l’intelligence artificielle, mais vous ne savez pas quelle tâche elle pourrait réellement améliorer.',
    intervention: 'Nous choisissons un cas d’usage précis, construisons une première version si c’est pertinent, puis vérifions son utilité et ses limites.',
    deliverable: 'Une recommandation ou un prototype avec des critères pour juger le résultat.',
    benefit: 'Décider sur la base d’un besoin réel, pas d’un effet de mode.',
  },
  {
    title: 'Mieux protéger un système',
    href: '/services/audit',
    icon: ShieldCheck,
    problem: 'Vous voulez comprendre les faiblesses possibles de votre application ou de votre infrastructure et réduire les risques.',
    intervention: 'J’examine, dans un périmètre autorisé, les accès, les réglages importants et les points d’exposition pertinents.',
    deliverable: 'Des constats expliqués, classés par priorité, avec des mesures de correction proposées.',
    benefit: 'Vous comprenez les principaux risques et les actions à mener en premier.',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background pb-40 pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <header className="mb-16 max-w-3xl">
          <span className="mb-6 block text-sm font-semibold text-accent">Services</span>
          <h1 className="text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl">
            Des problèmes concrets.
            <br />
            <span className="text-foreground/30">Des solutions adaptées.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Je vous aide à comprendre ce qui ne fonctionne pas, à faire des choix éclairés et à avancer avec un plan clair. Vous n’avez pas besoin de connaître les termes techniques pour expliquer votre besoin.
          </p>
        </header>

        <div className="grid border border-foreground/10 md:grid-cols-2">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="group border-b border-foreground/10 p-8 last:border-b-0 md:nth-[2n+1]:border-r sm:p-10">
              <div className="flex items-start justify-between gap-6">
                <service.icon className="h-8 w-8 text-accent" aria-hidden="true" />
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
              </div>
              <h2 className="mt-8 text-2xl font-bold tracking-tight group-hover:text-accent">{service.title}</h2>
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold">Le problème</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.problem}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Comment je peux aider</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.intervention}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Ce que vous recevez</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.deliverable}</p>
                </div>
                <div className="border-t border-foreground/5 pt-5">
                  <h3 className="text-sm font-semibold text-accent">Le bénéfice</h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed">{service.benefit}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 border border-foreground/10 p-8 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight">Vous ne savez pas quelle offre choisir ?</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Décrivez simplement votre situation, ce que vous souhaitez obtenir et ce qui vous pose problème. Nous verrons ensemble si je peux vous aider et quelle serait la prochaine étape.
          </p>
          <Link href="/contact" className="mt-7 inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-accent">
            Expliquer mon besoin <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
