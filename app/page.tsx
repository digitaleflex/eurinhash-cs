import { Building2, Factory } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative isolate">
      {/* === HERO === */}
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(59,130,246,0.18),transparent_60%)]" />
        </div>
        <div className="mx-auto max-w-6xl px-6 md:px-8 py-16 sm:py-20 md:py-28">
          <div className="flex flex-col items-center text-center gap-8">
            <svg
              className="h-16 w-16 text-foreground/80 transition duration-300 hover:rotate-3"
              viewBox="0 0 100 100"
              aria-hidden
            >
              <path d="M50 10 L90 85 H10 Z" fill="currentColor" />
            </svg>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Concevoir et livrer avec clarté.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              J’apporte des outils et un savoir-faire cloud pour créer des expériences web
              rapides, sécurisées et personnalisées.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-md">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium transition hover:shadow-[0_10px_40px_-10px] hover:shadow-foreground/30 w-full sm:w-auto"
              >
                Démarrer un projet
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent w-full sm:w-auto"
              >
                Voir mes projets
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === ABOUT === */}
      <section className="py-16 sm:py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-5xl px-6 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Qui suis-je ?</h2>
            <p className="text-muted-foreground mb-6">
              Je suis <span className="font-semibold">Eurin Hash</span>, consultant IT et
              entrepreneur numérique. Je conçois des solutions cloud et web au croisement
              de performance et simplicité.
            </p>
            <a
              href="/about"
              className="inline-block rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
            >
              En savoir plus
            </a>
          </div>
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/eurin-photo.webp"
              alt="Eurin Hash - Consultant IT & Entrepreneur Numérique"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* === SERVICES === */}
      <section className="py-16 sm:py-20 md:py-28 bg-muted">
        <div className="mx-auto max-w-6xl px-6 md:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Mes expertises</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Cloud & Infrastructure",
                desc: "Déploiement souverain, scalable et performant.",
              },
              {
                title: "Développement Web",
                desc: "Sites et apps rapides, modernes et sur mesure.",
              },
              {
                title: "Formation & Transmission",
                desc: "Accompagner et former la prochaine génération IT.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="p-8 rounded-2xl border border-foreground/10 bg-background hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === PROJECTS === */}
      <section className="py-16 sm:py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Projets récents</h2>
          
          {/* Projets Clients */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <Building2 className="h-6 w-6 text-accent" />
              Projets Clients
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 rounded-2xl border border-foreground/10 bg-muted hover:shadow-lg transition">
                <h4 className="text-lg font-semibold mb-2">Calendrier Divin – Sainte Adoration</h4>
                <p className="text-sm text-muted-foreground mb-3">Application web spirituelle</p>
                <p className="text-sm mb-3">Développement complet (backend Node.js, frontend React, PWA, IA spirituelle, calendrier liturgique, système de temps divin)</p>
                <p className="text-xs text-accent font-medium">2023 – 2024</p>
              </div>
              
              <div className="p-6 rounded-2xl border border-foreground/10 bg-muted hover:shadow-lg transition">
                <h4 className="text-lg font-semibold mb-2">Plateforme d'attestations – Ferme St André</h4>
                <p className="text-sm text-muted-foreground mb-3">Application Next.js pour gestion documentaire</p>
                <p className="text-sm mb-3">Conception et déploiement d'une solution sécurisée de gestion des attestations et certificats</p>
                <p className="text-xs text-accent font-medium">2024</p>
              </div>
              
              <div className="p-6 rounded-2xl border border-foreground/10 bg-muted hover:shadow-lg transition">
                <h4 className="text-lg font-semibold mb-2">Site web – Ferme agro-piscicole St André</h4>
                <p className="text-sm text-muted-foreground mb-3">Site vitrine professionnel</p>
                <p className="text-sm mb-3">Développement et mise en ligne du site institutionnel de la ferme</p>
                <p className="text-xs text-accent font-medium">2024</p>
              </div>
            </div>
          </div>

          {/* Projets Internes */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <Factory className="h-6 w-6 text-accent" />
              Projets Internes E-FLEX
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-2xl border border-foreground/10 bg-muted hover:shadow-lg transition">
                <h4 className="text-lg font-semibold mb-2">Infrastructure VPS interne E-Flex</h4>
                <p className="text-sm text-muted-foreground mb-3">Infrastructure DevOps interne</p>
                <p className="text-sm mb-3">Déploiement et gestion de serveurs VPS sécurisés, containerisation Docker, routage Traefik, administration via Portainer, CI/CD GitHub, monitoring via Uptime Kuma + alertes Telegram</p>
                <p className="text-xs text-accent font-medium">Début 20/01/2024 – en cours</p>
              </div>
              
              <div className="p-6 rounded-2xl border border-foreground/10 bg-muted hover:shadow-lg transition">
                <h4 className="text-lg font-semibold mb-2">FlexPress Core</h4>
                <p className="text-sm text-muted-foreground mb-3">Projet open-source, CMS conteneurisé</p>
                <p className="text-sm mb-3">Développement d'un socle WordPress open-source, optimisé pour la production et modulaire</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-accent font-medium">Début 15/06/2025 – en cours</p>
                  <a 
                    href="https://github.com/eurinhash/flexpress-core" 
                    className="text-xs text-accent hover:underline"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    GitHub FlexPress Core
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/projects"
              className="inline-block rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
            >
              Voir tous les projets
            </a>
          </div>
        </div>
      </section>

      {/* === VISION === */}
      <section className="py-16 sm:py-20 md:py-28 bg-muted">
        <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Ma vision</h2>
          <p className="text-lg text-muted-foreground">
            Je crois à une technologie claire, accessible et souveraine, conçue pour
            durer. Mon but : allier innovation technologique et impact humain en
            formant la prochaine génération de talents IT.
          </p>
        </div>
      </section>

      {/* === CONTACT === */}
      <section className="py-16 sm:py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-4xl px-6 md:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Discutons de votre projet
          </h2>
          <p className="text-muted-foreground mb-8">
            Vous avez une idée, un besoin ou un challenge technique ? Parlons-en.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium transition hover:shadow-[0_10px_40px_-10px] hover:shadow-foreground/30"
          >
            Me contacter
          </a>
        </div>
      </section>
    </main>
  );
}

