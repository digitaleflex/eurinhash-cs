import { ArrowRight, Search, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { icon: Search, title: 'Diagnostic', desc: 'Analyse ciblée de l’architecture, des flux, de l’infrastructure et des points de risque pertinents.' },
  { icon: ShieldCheck, title: 'Risques', desc: 'Constats priorisés selon leur impact, leur probabilité et les contraintes du système.' },
  { icon: Zap, title: 'Plan d’action', desc: 'Recommandations concrètes, ordonnées par priorité et reliées aux éléments observés.' },
];

export default function AuditServicePage() {
  return (
    <main className="min-h-screen bg-background pb-40 pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <span className="font-mono text-xs tracking-[0.16em] text-accent uppercase">Service · Audit</span>
        <h1 className="mt-6 text-5xl font-black leading-[0.94] tracking-tight sm:text-7xl">Clarifier un système existant.</h1>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground">
          Une intervention d’analyse pour comprendre les points de fragilité, les risques et les priorités avant d’engager des changements importants.
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
          <p className="mt-4 leading-relaxed text-muted-foreground">Un état des lieux documenté, les risques identifiés, les priorités de correction et les recommandations nécessaires au contexte. Aucun résultat n’est présenté comme garanti avant vérification.</p>
          <Link href="/contact?subject=Audit" className="mt-8 inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-accent">Discuter d’un audit <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </main>
  );
}
