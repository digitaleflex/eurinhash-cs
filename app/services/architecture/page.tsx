import { ArrowRight, Layers, Server } from 'lucide-react';
import Link from 'next/link';

export default function ArchitectureServicePage() {
  return (
    <main className="min-h-screen bg-background pb-40 pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <span className="text-sm font-semibold text-accent">Service · Conception de projet</span>
        <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl">Construire sur de bonnes bases.</h1>
        <p className="mt-8 text-xl leading-relaxed text-muted-foreground">
          Avant de développer un logiciel ou de faire évoluer un système, il faut décider comment les différentes parties vont fonctionner ensemble. Je vous aide à faire ces choix en tenant compte de vos objectifs, de votre budget et des compétences disponibles.
        </p>
        <div className="mt-20 space-y-8">
          <section className="border border-foreground/10 p-8 sm:p-10">
            <Layers className="h-7 w-7 text-accent" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-bold">Organiser le logiciel</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Définir les grandes parties de l’application, la façon dont elles échangent des informations et comment les données sont conservées. Les choix sont expliqués pour que l’équipe puisse les comprendre et les maintenir.</p>
          </section>
          <section className="border border-foreground/10 p-8 sm:p-10">
            <Server className="h-7 w-7 text-accent" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-bold">Préparer l’hébergement</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Choisir où le logiciel sera exécuté, comment il sera mis à jour, comment protéger les accès et comment repérer les problèmes lorsqu’ils surviennent.</p>
          </section>
        </div>
        <Link href="/contact?subject=Conception%20de%20projet" className="mt-10 inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-accent">Parler de mon projet <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </main>
  );
}
