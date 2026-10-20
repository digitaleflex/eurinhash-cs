import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Code2, ShieldAlert, Cloud, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mentorat technique | Eurin Hash',
  description: 'Un accompagnement individuel pour progresser en programmation, cybersécurité ou cloud grâce à la pratique et à des retours concrets.',
};

export default function MentoratPage() {
  const topics = [
    { icon: Code2, title: 'Programmation', desc: 'Mieux organiser son code, comprendre les bases et construire des projets utiles.' },
    { icon: ShieldAlert, title: 'Cybersécurité', desc: 'Apprendre les bonnes pratiques de sécurité dans des environnements autorisés.' },
    { icon: Cloud, title: 'Cloud et déploiement', desc: 'Comprendre comment publier, configurer et maintenir une application.' },
  ];

  return (
    <main className="min-h-screen bg-background pb-40 pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <span className="mb-6 block text-sm font-semibold text-accent">Service · Mentorat individuel</span>
        <h1 className="mb-8 text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl">
          Progresser avec
          <br />
          <span className="text-foreground/30">un accompagnement concret.</span>
        </h1>
        <p className="mt-8 text-xl leading-relaxed text-muted-foreground">
          Le mentorat permet de travailler sur vos objectifs, de débloquer des difficultés et de progresser à votre rythme. Nous partons de votre niveau actuel et de ce que vous souhaitez apprendre.
        </p>
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {topics.map((topic) => (
            <article key={topic.title} className="space-y-4 border border-foreground/10 p-7">
              <topic.icon className="h-8 w-8 text-accent" aria-hidden="true" />
              <h2 className="text-lg font-bold">{topic.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{topic.desc}</p>
            </article>
          ))}
        </div>
        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Comment se déroule le mentorat ?</h2>
          <ol className="space-y-4 text-muted-foreground">
            <li><strong className="text-foreground">1. Définir un objectif.</strong> Nous identifions ce que vous voulez savoir faire.</li>
            <li><strong className="text-foreground">2. Pratiquer.</strong> Vous avancez sur des exercices ou un projet adapté à votre niveau.</li>
            <li><strong className="text-foreground">3. Recevoir des retours.</strong> Nous examinons votre travail et décidons des prochaines étapes.</li>
          </ol>
        </section>
        <div className="relative mt-16 overflow-hidden bg-accent p-8 text-white sm:p-10">
          <GraduationCap className="mb-5 h-10 w-10" aria-hidden="true" />
          <h2 className="mb-4 text-2xl font-bold">Vous souhaitez progresser sur un sujet précis ?</h2>
          <p className="mb-8 max-w-lg text-white/85">
            Présentez votre niveau actuel, votre objectif et le temps que vous pouvez consacrer à l’apprentissage. Nous verrons si un accompagnement individuel est adapté.
          </p>
          <Link href="/contact?subject=Mentorat" className="inline-flex items-center gap-3 bg-white px-8 py-4 text-sm font-bold text-accent transition-colors hover:bg-foreground hover:text-white">
            Parler du mentorat <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
