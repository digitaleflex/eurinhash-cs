'use client';

import { ArrowRight, Quote } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Bio() {
  return (
    <section className="py-24 sm:py-40 bg-background border-b border-foreground/5 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Photo Professionnelle stylisée */}
          <div className="relative aspect-square bg-foreground/[0.03] group overflow-hidden">
            <Image 
              src="/eurin-photo.webp" 
              alt="Eurin Hash - Architecte Digital" 
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay Gradient subtil */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            
            {/* Badge flottant technique */}
            <div className="absolute bottom-8 left-8 bg-foreground text-background p-4 sm:p-6 shadow-2xl flex flex-col gap-1">
                <span className="text-[9px] font-mono text-background/40 uppercase tracking-widest">Poste</span>
                <span className="text-sm font-bold tracking-tight">Lead Architect · Eurin Hash</span>
            </div>
          </div>

          {/* Contenu Bio */}
          <div className="space-y-10">
            <div className="space-y-5">
                <span className="font-mono text-xs text-accent tracking-widest uppercase block font-medium">Vision & Identité</span>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-tight text-foreground">
                    Une approche<br />
                    <span className="text-foreground/25 font-light">systémique.</span>
                </h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-normal">
                <p>
                    Mon parcours est né d’un déclic : le constat que beaucoup d’entreprises échouent car leurs fondations 
                    techniques sont trop fragiles. Ma vision dépasse le simple code ; je bâtis les structures robustes 
                    qui permettent à vos ambitions de se concrétiser sans limites techniques.
                </p>
                <p className="text-foreground font-medium">
                    Fiabilité, Croissance et Sécurité au service de votre vision.
                </p>
            </div>

            <blockquote className="relative p-8 border-l border-accent bg-foreground/[0.02] mt-8 group">
                <Quote className="absolute top-4 right-4 w-6 h-6 text-accent/20 group-hover:text-accent transition-colors" />
                <p className="text-sm italic font-medium leading-relaxed text-foreground">
                    "On n'achète pas un site web, on achète un système de vente. 
                    On ne loue pas un cloud, on maîtrise sa souveraineté."
                </p>
            </blockquote>

            <div className="pt-8 flex">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-3 text-sm font-bold text-foreground hover:text-accent transition-all group"
                >
                    Découvrir comment je peux vous aider
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
