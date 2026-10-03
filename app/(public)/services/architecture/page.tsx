import { ArrowRight, Layers, Server } from 'lucide-react';
import Link from 'next/link';

export default function ArchitectureServicePage() {
  return (
    <main className="min-h-screen bg-background pb-40 pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <span className="font-mono text-xs tracking-[0.16em] text-accent uppercase">Service · Architecture</span>
        <h1 className="mt-6 text-5xl font-black leading-[0.94] tracking-tight sm:text-7xl">Concevoir une architecture adaptée au produit.</h1>
        <p className="mt-8 text-xl leading-relaxed text-muted-foreground">Définir les frontières, les responsabilités, la persistance, les flux et l’infrastructure à partir des contraintes réelles du système.</p>

        <div className="mt-20 space-y-8">
          <section className="border border-foreground/10 p-8 sm:p-10">
            <Layers className="h-7 w-7 text-accent" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-bold">Architecture logicielle</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Découpage du domaine, contrats entre composants, choix de persistance, frontières serveur/client et décisions nécessaires à la maintenabilité.</p>
          </section>
          <section className="border border-foreground/10 p-8 sm:p-10">
            <Server className="h-7 w-7 text-accent" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-bold">Infrastructure</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Déploiement, réseau, secrets, observabilité et automatisation proportionnés au niveau de maturité et aux contraintes du produit.</p>
          </section>
        </div>

        <Link href="/contact?subject=Architecture" className="mt-10 inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-accent">Discuter d’une architecture <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </main>
  );
}
