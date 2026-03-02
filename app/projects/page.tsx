import {
  Building2,
  Factory,
  Calendar,
  FileText,
  Globe,
  Rocket,
  Package,
  Cloud,
  Code2,
  Users,
} from 'lucide-react';
import { Metadata } from 'next';
import CommunityProjects from '@/components/community-projects';

export const metadata: Metadata = {
  title: 'Projets - Eurin Hash | Portfolio de réalisations',
  description: 'Découvrez mes projets de développement web, cloud et infrastructure. Applications mobiles, plateformes web, solutions DevOps et projets open-source.',
  openGraph: {
    title: 'Projets - Eurin Hash | Portfolio de réalisations',
    description: 'Découvrez mes projets de développement web, cloud et infrastructure.',
    url: 'https://eurinhash.com/projects',
    type: 'website',
  },
};

export default function ProjectsPage() {
  return (
    <main className="relative isolate">
      <section className="mx-auto max-w-6xl px-6 md:px-8 py-16 sm:py-20 md:py-28">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Laboratoire
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez une sélection de projets qui illustrent mon approche :
            innovation technologique, solutions sur mesure et impact concret.
          </p>
        </div>

        {/* Applications & Plateformes */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold tracking-tight mb-12 flex items-center gap-3">
            <Globe className="h-8 w-8 text-accent" />
            Applications & Plateformes
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-2xl border border-foreground/10 bg-background p-6 transition hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-2">
              <div className="h-48 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Calendar className="h-16 w-16 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                Calendrier Divin – Sainte Adoration
              </h3>
              <p className="text-sm text-accent font-medium mb-2">
                Application web spirituelle
              </p>
              <p className="text-muted-foreground mb-4">
                Développement complet d'une plateforme spirituelle innovante
                combinant calendrier liturgique, système de temps divin, PWA et
                intelligence artificielle spirituelle.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  Node.js
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  React
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  PWA
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  IA
                </span>
              </div>
              <p className="text-xs text-muted-foreground">2023 – 2024</p>
            </div>

            <div className="group rounded-2xl border border-foreground/10 bg-background p-6 transition hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-2">
              <div className="h-48 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <FileText className="h-16 w-16 text-green-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                Plateforme d'attestations – Ferme St André
              </h3>
              <p className="text-sm text-accent font-medium mb-2">
                Application Next.js sécurisée
              </p>
              <p className="text-muted-foreground mb-4">
                Conception et déploiement d'une solution sécurisée de gestion
                des attestations et certificats pour une ferme agro-piscicole.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  Next.js
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  TypeScript
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  Sécurité
                </span>
              </div>
              <p className="text-xs text-muted-foreground">2024</p>
            </div>

            <div className="group rounded-2xl border border-foreground/10 bg-background p-6 transition hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-2">
              <div className="h-48 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Globe className="h-16 w-16 text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                Site web – Ferme agro-piscicole St André
              </h3>
              <p className="text-sm text-accent font-medium mb-2">
                Site vitrine professionnel
              </p>
              <p className="text-muted-foreground mb-4">
                Développement et mise en ligne du site institutionnel de la
                ferme, optimisé pour la performance et le référencement.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  Web Design
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  SEO
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  Performance
                </span>
              </div>
              <p className="text-xs text-muted-foreground">2024</p>
            </div>
          </div>
        </div>

        {/* Communauté & Formation */}
        <CommunityProjects />

        {/* Infrastructure & Cloud */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold tracking-tight mb-12 flex items-center gap-3">
            <Cloud className="h-8 w-8 text-accent" />
            Infrastructure & Cloud
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="group rounded-2xl border border-foreground/10 bg-background p-6 transition hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-2">
              <div className="h-48 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Rocket className="h-16 w-16 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                Infrastructure VPS interne E-Flex
              </h3>
              <p className="text-sm text-accent font-medium mb-2">
                Infrastructure DevOps complète
              </p>
              <p className="text-muted-foreground mb-4">
                Déploiement et gestion de serveurs VPS sécurisés avec
                containerisation Docker, routage Traefik, administration
                Portainer, CI/CD GitHub et monitoring Uptime Kuma avec alertes
                Telegram.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  Docker
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  Traefik
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  CI/CD
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  Monitoring
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Début 20/01/2024 – en cours
              </p>
            </div>

            <div className="group rounded-2xl border border-foreground/10 bg-background p-6 transition hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-2">
              <div className="h-48 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Package className="h-16 w-16 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                FlexPress Core
              </h3>
              <p className="text-sm text-accent font-medium mb-2">
                CMS WordPress conteneurisé open-source
              </p>
              <p className="text-muted-foreground mb-4">
                Développement d'un socle WordPress open-source, optimisé pour la
                production, modulaire et entièrement conteneurisé pour un
                déploiement simplifié.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  WordPress
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  Docker
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent hover:text-white transition-all duration-200">
                  Open Source
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Début 15/06/2025 – en cours
                </p>
                <a
                  href="https://github.com/eurinhash/flexpress-core"
                  className="text-sm text-accent hover:underline font-medium transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir sur GitHub →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Projets à venir */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Et bien d'autres à venir...
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Chaque projet est une opportunité d'innover et de créer des
            solutions qui font la différence. Parlons de votre prochain défi !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/start-project"
              className="inline-flex items-center gap-2 rounded-full bg-accent text-white px-6 py-3 text-sm font-medium transition hover:shadow-[0_10px_40px_-10px] hover:shadow-accent/30 hover:scale-105 active:scale-95"
            >
              Démarrer un projet
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent hover:scale-105 active:scale-95"
            >
              Me contacter
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
