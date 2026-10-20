import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'À propos | Eurin Hash',
  description: 'Découvrez le parcours d’Eurin Hash, son approche des logiciels, du cloud et de la cybersécurité.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pb-40 pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <header className="max-w-3xl">
          <span className="text-sm font-semibold text-accent">À propos</span>
          <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl">
            J’aime comprendre,
            <br />
            <span className="text-foreground/30">simplifier et construire.</span>
          </h1>
          <p className="mt-8 text-xl leading-relaxed text-muted-foreground">
            Je suis Eurin Hash, entrepreneur numérique et architecte logiciel. Je conçois des applications, travaille sur des infrastructures cloud et m’intéresse à la sécurité des systèmes.
          </p>
        </header>

        <div className="mt-20 grid items-start gap-16 md:grid-cols-[0.8fr_1.2fr]">
          <div className="relative aspect-square overflow-hidden bg-foreground/[0.03]">
            <Image src="/eurin-photo.webp" alt="Eurin Hash" fill className="object-cover grayscale" sizes="(max-width: 768px) 100vw, 40vw" />
          </div>
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold tracking-tight">Les problèmes que j’aime résoudre</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Un logiciel devenu difficile à modifier, un projet qui hésite sur ses choix techniques, une infrastructure compliquée à gérer ou un système qui doit être mieux protégé : j’aime rendre ces situations plus claires et proposer des étapes concrètes.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold tracking-tight">Ma façon de travailler</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Je commence par écouter et comprendre le besoin. Ensuite, je regarde les contraintes, j’explique les options possibles et leurs compromis, puis je construis ou recommande une solution adaptée. Je documente les décisions pour que le travail reste compréhensible.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {['Comprendre le besoin', 'Expliquer les options', 'Construire la solution', 'Vérifier le résultat'].map((step, index) => (
                  <div key={step} className="border border-foreground/5 p-5">
                    <span className="text-xs font-semibold text-accent">Étape {index + 1}</span>
                    <p className="mt-2 font-semibold">{step}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold tracking-tight">Ce qui compte pour moi</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Construire des systèmes fiables, faciles à comprendre et assez bien documentés pour être maintenus et améliorés dans le temps. La technologie est un moyen de résoudre un problème, pas une fin en soi.
              </p>
            </section>
            <div className="flex flex-wrap gap-5">
              <Link href="/realisations" className="inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-accent">
                Voir mes projets <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-foreground/10 px-6 py-3 text-sm font-bold hover:border-foreground/20">
                Parlons de votre besoin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
