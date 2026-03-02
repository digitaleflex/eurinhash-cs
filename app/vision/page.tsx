'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
};

const itemsAmbition = [
  {
    id: 'CORE-01',
    title: 'Concevoir des architectures numériques maîtrisées',
    desc: 'Des systèmes clairs, documentés, scalables, observables et résilients.'
  },
  {
    id: 'CORE-02',
    title: 'Formaliser des standards reproductibles',
    desc: 'Un ensemble de bonnes pratiques applicables à tous types d’organisations — startups, entreprises et institutions.'
  },
  {
    id: 'CORE-03',
    title: 'Construire des cadres d’intégration systémique',
    desc: 'Capables de connecter les architectures entre elles, sans duplication de dépendances, avec une maîtrise intégrale.'
  },
  {
    id: 'CORE-04',
    title: 'Réduire la dépendance technologique non maîtrisée',
    desc: 'Pour que chaque organisation reste autonome dans ses choix, sans dépendance opaque à des fournisseurs externes.'
  }
];

const principes = [
  { label: 'Clarté conceptuelle', desc: 'Toute architecture doit être compréhensible et documentée.' },
  { label: 'Séparation des responsabilités', desc: 'Chaque composant est conçu avec un objectif précis.' },
  { label: 'Scalabilité vérifiable', desc: 'Chaque architecture doit être pensée pour croître sans perdre en cohérence.' },
  { label: 'Résilience intégrée', desc: 'La capacité de tolérer les défaillances est un critère premier.' },
  { label: 'Neutralité technologique', desc: 'Les choix techniques sont guidés par la structure, pas par la mode.' }
];

export default function VisionPage() {
  return (
    <main className="bg-background text-foreground min-h-screen pb-32">
      {/* ── BACKGROUND ARCHITECTURAL ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: `
                            linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)
                        `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* ── SECTION 1: HERO & INTRO ── */}
      <section className="pt-32 pb-24 md:pt-48 md:pb-40 border-b border-foreground/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <motion.div {...fadeIn}>
            <div className="flex items-center gap-4 mb-10">
              <span className="font-mono text-[10px] text-accent uppercase tracking-[0.4em]">Vision · Doctrine</span>
              <div className="h-px w-24 bg-accent/20" />
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.9] mb-12">
              Structurer un nouveau <br />
              <span className="text-foreground/40">paradigme numérique.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mb-16">
              Une approche déterminée, cohérente et durable pour concevoir des systèmes numériques maîtrisés.
            </p>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="pt-20 border-t border-foreground/5">
            <div className="grid md:grid-cols-[1fr_2fr] gap-12">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em]">Positionnement</span>
              <div className="space-y-8">
                <p className="text-2xl sm:text-3xl font-bold leading-snug">
                  Les transformations numériques ne sont plus des réponses individuelles à des problèmes isolés.
                  Elles deviennent des <span className="text-accent">structures</span> — complexes, interdépendantes et critiques.
                </p>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Ce n’est pas une question de technologie. C’est une question d’organisation des systèmes.
                  La vision d’EurinHash est de faire émerger une discipline d’architecture numérique capable de penser,
                  concevoir, formaliser et structurer les systèmes de demain.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: LE DÉFI COLLECTIF ── */}
      <section className="py-24 sm:py-40 bg-foreground/[0.015] border-b border-foreground/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 sm:gap-24">
            <div>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em] block mb-6 px-3 py-1 border border-foreground/10 w-fit">Diagnostic</span>
              <h2 className="text-4xl font-black tracking-tight mb-8">Le défi collectif.</h2>
              <p className="text-muted-foreground leading-relaxed">
                Aujourd’hui, l’essentiel des organisations se contentent de consommer sans structurer.
              </p>
            </div>
            <div className="divide-y divide-foreground/5 bg-background border border-foreground/5">
              {[
                { id: '01', t: 'Développement sans structure', d: 'Produire des applications sans penser à l\'intégrité systémique.' },
                { id: '02', t: 'Consommation cloud opaque', d: 'Utiliser des services sans en maîtriser les implications réelles.' },
                { id: '03', t: 'Multiplication des silos', d: 'Lancer des projets sans aucune cohérence stratégique globale.' }
              ].map(item => (
                <div key={item.id} className="p-8 group hover:bg-foreground/[0.01] transition-colors">
                  <span className="font-mono text-xs text-accent mb-2 block">{item.id} —</span>
                  <h3 className="text-xl font-bold mb-2">{item.t}</h3>
                  <p className="text-muted-foreground text-sm">{item.d}</p>
                </div>
              ))}
              <div className="p-10 bg-accent text-white">
                <p className="text-xl font-bold leading-tight uppercase tracking-tight">
                  → Des dépendances invisibles, des systèmes fragiles, une dette technique massive.
                </p>
                <p className="mt-4 text-white/60 font-mono text-[10px] uppercase tracking-widest">Ce n’est pas une erreur individuelle. C’est une erreur structurelle.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: HYPOTHÈSE & AMBITION ── */}
      <section className="py-24 sm:py-40 border-b border-foreground/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <blockquote className="text-3xl sm:text-5xl font-black tracking-tight mb-32 leading-[1.1] max-w-4xl">
            "La transformation numérique ne se décrète pas. <br />
            <span className="text-accent underline decoration-4 underline-offset-8">Elle se conçoit.</span>"
          </blockquote>

          <div className="grid md:grid-cols-2 gap-px bg-foreground/5 border border-foreground/5">
            {itemsAmbition.map(item => (
              <div key={item.id} className="bg-background p-10 sm:p-16 hover:bg-foreground/[0.01] transition-colors">
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-6 block">{item.id}</span>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: LES TROIS AXIOMES ── */}
      <section className="py-24 sm:py-40 bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 text-center sm:text-left">
          <span className="font-mono text-[10px] opacity-40 uppercase tracking-[0.4em] block mb-12">Axiomes de la vision</span>
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { id: 'I', t: 'Une structure se conçoit avant de se développer', d: 'L’architecture précède le produit.', href: '/vision/ehaf', label: 'Voir EHAF' },
              { id: 'II', t: 'La maîtrise précède la performance', d: 'Un système sans maîtrise n’est jamais durable.', href: '/vision/doctrine', label: 'Lire la Doctrine' },
              { id: 'III', t: 'Les standards garantissent la stabilité', d: 'Le respect des protocoles est la clé de la pérennité.', href: '/vision/standards', label: 'Voir les Standards' }
            ].map(ax => (
              <div key={ax.id} className="space-y-6">
                <span className="text-6xl font-black text-accent/30 font-mono">{ax.id}</span>
                <h3 className="text-xl font-bold uppercase tracking-tight">{ax.t}</h3>
                <p className="text-background/60 leading-relaxed italic mb-8">"{ax.d}"</p>
                <Link href={ax.href} className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-accent hover:text-white transition-colors">
                  {ax.label} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: MISSION & PRINCIPES ── */}
      <section className="py-24 sm:py-40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="grid md:grid-cols-[1fr_2fr] gap-20 sm:gap-32">
            <div className="space-y-12">
              <div>
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em] block mb-6">Mission</span>
                <h2 className="text-3xl font-black tracking-tight mb-6">Action concrète.</h2>
                <p className="text-muted-foreground text-lg italic">"Nous ne faisons pas simplement du développement. Nous faisons de l’architecture systémique maîtrisée."</p>
              </div>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-foreground/40 divide-y divide-foreground/5">
                <li className="py-4">Cadres d'architecture adaptés</li>
                <li className="py-4">Méthodologies professionnelles</li>
                <li className="py-4">Frameworks & Standards</li>
                <li className="py-4">Accompagnement rigoureux</li>
              </ul>
            </div>
            <div>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em] block mb-12 leading-[1.0]">Principes directeurs</span>
              <div className="divide-y divide-foreground/5">
                {principes.map(p => (
                  <div key={p.label} className="py-10 grid sm:grid-cols-[200px_1fr] gap-4">
                    <h4 className="font-black text-sm uppercase tracking-tighter">{p.label}</h4>
                    <p className="text-muted-foreground">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: IMPACT & CONCLUSION ── */}
      <section className="py-24 sm:py-48 bg-background border-t border-foreground/5 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-12">Épilogue · Transformation</span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-12">
            Faire de l’architecture un <br className="hidden sm:block" />
            <span className="text-foreground/30 italic">actif stratégique.</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-20">
            La transformation numérique n’est pas une course à la vitesse. C’est une démarche architecturale qui exige pensée systémique, discernement et discipline.
          </p>
          <Link
            href="/start-project"
            className="inline-flex items-center justify-center gap-4 bg-foreground text-background px-12 py-6 text-sm font-bold uppercase tracking-[0.3em] transition hover:bg-accent hover:text-white"
          >
            Bâtir vos fondations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
