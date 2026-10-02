import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Bio() {
  return (
    <section className="overflow-hidden border-b border-foreground/5 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <div className="relative aspect-square overflow-hidden bg-foreground/[0.03]">
            <Image
              src="/eurin-photo.webp"
              alt="Eurin Hash, software architect et entrepreneur numérique"
              fill
              className="object-cover grayscale"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bottom-6 left-6 bg-foreground px-5 py-4 text-background">
              <span className="block font-mono text-[9px] tracking-widest text-background/50 uppercase">Positionnement</span>
              <span className="mt-1 block text-sm font-bold">Software Architect · Digital Entrepreneur</span>
            </div>
          </div>

          <div>
            <span className="font-mono text-xs tracking-[0.16em] text-accent uppercase">À propos</span>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Un profil d’ingénieur entre architecture, produit et sécurité.
            </h2>

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Je travaille à l’intersection de l’architecture logicielle, de l’ingénierie produit et de la sécurité. Mon travail consiste à comprendre un problème, clarifier les contraintes et construire la solution nécessaire — pas la complexité autour.
              </p>
              <p>
                Je m’intéresse particulièrement aux systèmes numériques qui doivent rester compréhensibles, fiables et évolutifs après leur première mise en production.
              </p>
            </div>

            <Link href="/a-propos" className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-foreground hover:text-accent">
              Découvrir mon parcours
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
