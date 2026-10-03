import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'À propos',
  description: 'Parcours et positionnement professionnel d’Eurin Hash, software architect et entrepreneur numérique.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pb-40 pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <header className="max-w-3xl">
          <span className="font-mono text-xs tracking-[0.16em] text-accent uppercase">À propos</span>
          <h1 className="mt-6 text-5xl font-black leading-[0.94] tracking-tight sm:text-7xl">
            Construire avec méthode,
            <br />
            <span className="text-foreground/25">pas avec du bruit.</span>
          </h1>
          <p className="mt-8 text-xl leading-relaxed text-muted-foreground">
            Je suis Eurin Hash, software architect et entrepreneur numérique. Je travaille à l’intersection de l’architecture logicielle, de l’IA appliquée, de la cybersécurité et du cloud.
          </p>
        </header>

        <div className="mt-20 grid items-start gap-16 md:grid-cols-[0.8fr_1.2fr]">
          <div className="relative aspect-square overflow-hidden bg-foreground/[0.03]">
            <Image src="/eurin-photo.webp" alt="Eurin Hash" fill className="object-cover grayscale" sizes="(max-width: 768px) 100vw, 40vw" />
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold tracking-tight">Les problèmes qui m’intéressent</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Les systèmes devenus difficiles à comprendre, les produits qui doivent évoluer sans perdre leur cohérence, les infrastructures qui accumulent de la complexité et les cas où la sécurité doit être pensée comme une propriété du système.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight">Ma manière de travailler</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {['Comprendre', 'Simplifier', 'Concevoir', 'Construire', 'Sécuriser', 'Valider'].map((step, index) => (
                  <div key={step} className="border border-foreground/5 p-5">
                    <span className="font-mono text-[9px] text-accent">0{index + 1}</span>
                    <p className="mt-2 font-semibold">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight">Ce que je cherche à produire</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Des systèmes suffisamment simples pour être compris, suffisamment solides pour être exploités et suffisamment documentés pour continuer à évoluer après leur première version.
              </p>
            </section>

            <div className="flex flex-wrap gap-5">
              <Link href="/realisations" className="inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-accent">
                Voir les réalisations <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-foreground/10 px-6 py-3 text-sm font-bold hover:border-foreground/20">
                Discuter d’un projet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
