/* eslint-disable react/no-unescaped-entities */
import {
  Building2,
  Factory,
  Cloud,
  Shield,
  TrendingUp,
  Zap,
  Globe,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative isolate">
      {/* === HERO === */}
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:64px_64px]" />
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] sm:h-[700px] sm:w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(59,130,246,0.18),transparent_60%)]" />
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/30 rounded-full animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent/40 rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-accent/20 rounded-full animate-pulse delay-2000" />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 lg:py-28">
          <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
            <svg
              className="h-12 w-12 sm:h-16 sm:w-16 text-foreground/80 transition duration-300 hover:rotate-3"
              viewBox="0 0 100 100"
              aria-hidden
            >
              <path d="M50 10 L90 85 H10 Z" fill="currentColor" />
            </svg>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
              Je résous votre problème.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed px-4 sm:px-0">
              Je crée une solution sur mesure pour vous, quelque chose qui vous
              ressemble.
              <span className="block mt-2 text-foreground/80 font-medium">
                Simple et efficace.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full max-w-lg px-4 sm:px-0">
              <a
                href="/start-project"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-4 text-sm sm:text-base font-semibold transition hover:shadow-[0_10px_40px_-10px] hover:shadow-foreground/30 w-full sm:w-auto hover:scale-105 active:scale-95 touch-manipulation"
              >
                Démarrer un projet
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-6 py-4 text-sm sm:text-base font-medium text-foreground transition hover:border-accent hover:text-accent w-full sm:w-auto hover:scale-105 active:scale-95 touch-manipulation"
              >
                Découvrir mes solutions
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === ABOUT === */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Qui suis-je ?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
              Je suis{' '}
              <span className="font-semibold text-foreground">Eurin Hash</span>,
              consultant IT et entrepreneur numérique. Je transforme vos défis
              techniques en solutions concrètes, durables et adaptées à votre
              réalité.
            </p>
            <a
              href="/about"
              className="inline-block rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
            >
              En savoir plus
            </a>
          </div>
          <div className="relative h-48 sm:h-64 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/eurin-photo.webp"
              alt="Eurin Hash - Consultant IT & Entrepreneur Numérique"
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
        </div>
      </section>

      {/* === SERVICES === */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-muted">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Mes expertises
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4 sm:px-0">
            Des solutions techniques robustes, conçues pour répondre précisément
            à vos besoins.
          </p>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {[
              {
                title: 'Cloud & Infrastructure',
                desc: "Migration sécurisée vers le cloud. Je transforme votre infrastructure pour plus d'agilité et de performance.",
                icon: Cloud,
              },
              {
                title: 'Développement Web',
                desc: 'Applications web modernes, rapides et parfaitement adaptées à vos usages.',
                icon: Globe,
              },
              {
                title: 'Formation & Transmission',
                desc: 'Accompagnement personnalisé pour maîtriser les technologies qui comptent.',
                icon: GraduationCap,
              },
            ].map(service => (
              <div
                key={service.title}
                className="p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-foreground/10 bg-background hover:shadow-lg transition hover:scale-105 active:scale-95"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 text-center sm:text-left">
                  <div className="w-12 h-12 sm:w-10 sm:h-10 bg-accent/10 rounded-lg flex items-center justify-center mx-auto sm:mx-0">
                    <service.icon className="w-6 h-6 sm:w-5 sm:h-5 text-accent" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground text-center sm:text-left">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === CLOUD EXPERTISE === */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Le cloud, c'est l'avenir
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Je vous accompagne dans votre transformation numérique avec des
              solutions cloud
              <span className="text-foreground font-semibold">
                {' '}
                sécurisées, performantes et évolutives
              </span>
              .
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 items-center">
            {/* Contenu principal */}
            <div className="space-y-6 sm:space-y-8">
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-accent/20 bg-accent/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-accent" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-accent">
                    Accélération de votre transformation
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Migrez vos infrastructures vers le cloud en toute sécurité. Je
                  vous guide pas à pas pour moderniser vos systèmes et gagner en
                  agilité.
                </p>
              </div>

              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-foreground/10 bg-muted/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-foreground/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Sécurité avant tout
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Vos données sont précieuses. Je mets en place des
                  architectures cloud robustes avec chiffrement, sauvegardes
                  automatiques et monitoring continu.
                </p>
              </div>

              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-foreground/10 bg-muted/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-foreground/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Évolutivité garantie
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Votre infrastructure s'adapte à votre croissance. Plus de
                  surdimensionnement ou de limitations techniques qui freinent
                  votre développement.
                </p>
              </div>
            </div>

            {/* Carte de valeur - masquée sur mobile */}
            <div className="relative hidden lg:block">
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-accent/10 via-background to-muted/50 border border-accent/20 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Cloud className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    Pourquoi le cloud maintenant ?
                  </h3>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Réduction des coûts
                      </span>{' '}
                      - Payez seulement ce que vous utilisez
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Accès global
                      </span>{' '}
                      - Vos équipes travaillent de partout
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Innovation continue
                      </span>{' '}
                      - Accès aux dernières technologies
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Résilience
                      </span>{' '}
                      - Vos données sont protégées et disponibles
                    </p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-foreground/10">
                  <p className="text-xs sm:text-sm text-center text-muted-foreground mb-4">
                    Prêt à transformer votre infrastructure ?
                  </p>
                  <a
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full bg-accent text-white py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition hover:bg-accent/90 hover:scale-105 active:scale-95 text-sm sm:text-base touch-manipulation"
                  >
                    Parlons de votre migration cloud
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === PROJECTS === */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
            Projets récents
          </h2>

          {/* Projets Clients */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <Building2 className="h-6 w-6 text-accent" />
              Projets Clients
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 rounded-2xl border border-foreground/10 bg-muted hover:shadow-lg transition hover:scale-105 active:scale-95">
                <h4 className="text-lg font-semibold mb-2">
                  Calendrier Divin – Sainte Adoration
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Application web spirituelle
                </p>
                <p className="text-sm mb-4">
                  Développement complet (backend Node.js, frontend React, PWA,
                  IA spirituelle, calendrier liturgique, système de temps divin)
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-accent font-medium">2024 – 2025</p>
                  <a
                    href="https://sainteadoration.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
                  >
                    Visiter le site
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-foreground/10 bg-muted hover:shadow-lg transition hover:scale-105 active:scale-95">
                <h4 className="text-lg font-semibold mb-2">
                  Plateforme d'attestations – Ferme St André
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Application Next.js pour gestion documentaire
                </p>
                <p className="text-sm mb-4">
                  Conception et déploiement d'une solution sécurisée de gestion
                  des attestations et certificats
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-accent font-medium">2024 – 2025</p>
                  <a
                    href="https://verifier.fermestandre.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
                  >
                    Visiter le site
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-foreground/10 bg-muted hover:shadow-lg transition hover:scale-105 active:scale-95">
                <h4 className="text-lg font-semibold mb-2">
                  Site web – Ferme agro-piscicole St André
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Site vitrine professionnel
                </p>
                <p className="text-sm mb-4">
                  Développement et mise en ligne du site institutionnel de la
                  ferme
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-accent font-medium">2024 – 2025</p>
                  <a
                    href="https://fermestandre.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
                  >
                    Visiter le site
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Projets Internes - masqués sur mobile */}
          <div className="mb-12 hidden md:block">
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <Factory className="h-6 w-6 text-accent" />
              Projets Internes E-FLEX
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-2xl border border-foreground/10 bg-muted hover:shadow-lg transition hover:scale-105 active:scale-95">
                <h4 className="text-lg font-semibold mb-2">
                  Infrastructure VPS interne E-Flex
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Infrastructure DevOps interne
                </p>
                <p className="text-sm mb-4">
                  Déploiement et gestion de serveurs VPS sécurisés,
                  containerisation Docker, routage Traefik, administration via
                  Portainer, CI/CD GitHub, monitoring via Uptime Kuma + alertes
                  Telegram
                </p>
                <p className="text-xs text-accent font-medium">2024 – 2025</p>
              </div>

              <div className="p-6 rounded-2xl border border-foreground/10 bg-muted hover:shadow-lg transition hover:scale-105 active:scale-95">
                <h4 className="text-lg font-semibold mb-2">FlexPress Core</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Projet open-source, CMS conteneurisé
                </p>
                <p className="text-sm mb-4">
                  Développement d'un socle WordPress open-source, optimisé pour
                  la production et modulaire
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-accent font-medium">2024 – 2025</p>
                  <a
                    href="https://github.com/eurinhash/flexpress-core"
                    className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir sur GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent hover:scale-105 active:scale-95"
            >
              <span className="md:hidden">Voir plus de projets</span>
              <span className="hidden md:inline">Voir tous les projets</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* === CLOUD STATS === */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-muted">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Votre transformation numérique en chiffres
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des résultats concrets pour votre entreprise
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Stats principales - toujours visibles */}
            <div className="text-center p-4 sm:p-6 rounded-2xl bg-background border border-foreground/10">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">
                -60%
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Réduction des coûts
              </p>
            </div>

            <div className="text-center p-4 sm:p-6 rounded-2xl bg-background border border-foreground/10">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">
                99.9%
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Disponibilité
              </p>
            </div>

            {/* Stats secondaires - masquées sur mobile */}
            <div className="hidden md:block text-center p-6 rounded-2xl bg-background border border-foreground/10">
              <div className="text-3xl font-bold text-accent mb-2">3x</div>
              <p className="text-sm text-muted-foreground">
                Plus rapide à déployer
              </p>
            </div>

            <div className="hidden md:block text-center p-6 rounded-2xl bg-background border border-foreground/10">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">
                Monitoring et sécurité
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Prêt à obtenir ces résultats pour votre entreprise ?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent text-white px-8 py-4 text-base font-semibold transition hover:bg-accent/90 hover:scale-105 active:scale-95"
            >
              Démarrer ma transformation cloud
            </a>
          </div>
        </div>
      </section>

      {/* === APPROACH === */}
      <section className="hidden md:block py-16 sm:py-20 md:py-28 bg-muted">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Mon approche
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chaque projet est unique. Voici comment je transforme vos défis en
              succès.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Écouter</h3>
              <p className="text-muted-foreground">
                Je comprends vos besoins, vos contraintes et vos objectifs pour
                définir la solution parfaite.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Concevoir</h3>
              <p className="text-muted-foreground">
                Je crée une solution sur mesure, simple et efficace,
                parfaitement adaptée à votre contexte.
              </p>
            </div>

            <div className="text-center p-6 md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Livrer</h3>
              <p className="text-muted-foreground">
                Je déploie votre solution et vous accompagne pour en tirer le
                meilleur parti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === CONTACT === */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-4xl px-6 md:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Discutons de votre projet
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Vous avez un défi technique, une idée à concrétiser ou un projet à
            réaliser ?
            <span className="block mt-2 text-foreground/80 font-medium">
              Parlons de votre transformation numérique.
            </span>
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-8 py-4 text-base font-semibold transition hover:shadow-[0_10px_40px_-10px] hover:shadow-foreground/30 hover:scale-105 active:scale-95"
          >
            Créons votre solution
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
