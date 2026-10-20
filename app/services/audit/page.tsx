import { ArrowRight, Search, ShieldCheck, ListChecks } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { icon: Search, title: 'Comprendre', desc: 'Nous regardons comment le système fonctionne, ce qui pose problème et dans quelles conditions il est utilisé.' },
  { icon: ShieldCheck, title: 'Repérer les risques', desc: 'Je distingue les problèmes urgents des améliorations qui peuvent attendre, en expliquant pourquoi.' },
  { icon: ListChecks, title: 'Décider quoi faire', desc: 'Vous recevez des actions concrètes, classées par priorité et adaptées à vos moyens.' },
];

export default function AuditServicePage() {
  return (
    <main className="min-h-screen bg-background pb-40 pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <span className="text-sm font-semibold text-accent">Service · Diagnostic technique</span>
        <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl">Comprendre ce qui bloque.</h1>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground">
          Quand une application est fragile, lente, difficile à faire évoluer ou mal protégée, il faut d’abord comprendre la situation. Cette analyse vous aide à voir les problèmes et à choisir les prochaines étapes.
        </p>
        <div className="mt-20 grid gap-10 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="border-t border-foreground/10 pt-6">
              <step.icon className="h-7 w-7 text-accent" aria-hidden="true" />
              <h2 className="mt-6 font-bold">{step.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 border border-foreground/10 p-8 sm:p-10">
          <h2 className="text-2xl font-bold">Ce que vous recevez</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">Un état des lieux, les problèmes observés, les risques à traiter et un plan d’action. Les conclusions sont limitées à ce qui a réellement pu être vérifié.</p>
          <Link href="/contact?subject=Diagnostic%20technique" className="mt-8 inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-accent">Parler de mon besoin <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </main>
  );
}
