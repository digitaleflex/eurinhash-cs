import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Bio() {
  return (
    <section className="overflow-hidden border-b border-foreground/5 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <div className="relative aspect-square overflow-hidden bg-foreground/[0.03]">
            <Image src="/eurin-photo.webp" alt="Eurin Hash" fill className="object-cover grayscale" sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="absolute bottom-6 left-6 bg-foreground px-5 py-4 text-background">
              <span className="block text-xs text-background/60">Mon rôle</span>
              <span className="mt-1 block text-sm font-bold">Concevoir et construire des solutions numériques</span>
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold text-accent">À propos</span>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              J’aime rendre les problèmes complexes plus faciles à résoudre.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Je suis Eurin Hash. Je conçois des logiciels, travaille sur des infrastructures cloud et m’intéresse à la sécurité des systèmes numériques.
              </p>
              <p>
                Ma méthode est simple : comprendre le besoin, expliquer les choix, construire ce qui est nécessaire et documenter le travail pour qu’il puisse être repris et amélioré.
              </p>
            </div>
            <Link href="/a-propos" className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-foreground hover:text-accent">
              En savoir plus sur mon parcours <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
