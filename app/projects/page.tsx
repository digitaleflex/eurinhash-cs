import { Building2, Factory, Calendar, FileText, Globe, Rocket, Package } from "lucide-react";

export default function ProjectsPage() {
  return (
    <main className="relative isolate">
      <section className="mx-auto max-w-6xl px-6 md:px-8 py-24 md:py-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Mes Projets
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez une sélection de projets qui illustrent mon approche : 
            innovation technologique, solutions sur mesure et impact concret.
          </p>
        </div>
        
        {/* Projets Clients */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold tracking-tight mb-12 flex items-center gap-3">
            <Building2 className="h-8 w-8 text-accent" />
            Projets Clients
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-2xl border border-foreground/10 bg-background p-6 transition hover:shadow-lg hover:shadow-accent/10">
              <div className="h-48 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-6 flex items-center justify-center">
                <Calendar className="h-16 w-16 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Calendrier Divin – Sainte Adoration</h3>
              <p className="text-sm text-accent font-medium mb-2">Application web spirituelle</p>
              <p className="text-muted-foreground mb-4">
                Développement complet d'une plateforme spirituelle innovante combinant calendrier liturgique, 
                système de temps divin, PWA et intelligence artificielle spirituelle.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">Node.js</span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">React</span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">PWA</span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">IA</span>
              </div>
              <p className="text-xs text-muted-foreground">2023 – 2024</p>
            </div>
            
            <div className="group rounded-2xl border border-foreground/10 bg-background p-6 transition hover:shadow-lg hover:shadow-accent/10">
              <div className="h-48 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20 mb-6 flex items-center justify-center">
                <FileText className="h-16 w-16 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Plateforme d'attestations – Ferme St André</h3>
              <p className="text-sm text-accent font-medium mb-2">Application Next.js sécurisée</p>
              <p className="text-muted-foreground mb-4">
                Conception et déploiement d'une solution sécurisée de gestion des attestations et certificats 
                pour une ferme agro-piscicole.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">Next.js</span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">TypeScript</span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">Sécurité</span>
              </div>
              <p className="text-xs text-muted-foreground">2024</p>
            </div>
            
            <div className="group rounded-2xl border border-foreground/10 bg-background p-6 transition hover:shadow-lg hover:shadow-accent/10">
              <div className="h-48 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 mb-6 flex items-center justify-center">
                <Globe className="h-16 w-16 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Site web – Ferme agro-piscicole St André</h3>
              <p className="text-sm text-accent font-medium mb-2">Site vitrine professionnel</p>
              <p className="text-muted-foreground mb-4">
                Développement et mise en ligne du site institutionnel de la ferme, 
                optimisé pour la performance et le référencement.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">Web Design</span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">SEO</span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">Performance</span>
              </div>
              <p className="text-xs text-muted-foreground">2024</p>
            </div>
          </div>
        </div>

        {/* Projets Internes */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold tracking-tight mb-12 flex items-center gap-3">
            <Factory className="h-8 w-8 text-accent" />
            Projets Internes E-FLEX
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="group rounded-2xl border border-foreground/10 bg-background p-6 transition hover:shadow-lg hover:shadow-accent/10">
              <div className="h-48 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 mb-6 flex items-center justify-center">
                <Rocket className="h-16 w-16 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Infrastructure VPS interne E-Flex</h3>
              <p className="text-sm text-accent font-medium mb-2">Infrastructure DevOps complète</p>
              <p className="text-muted-foreground mb-4">
                Déploiement et gestion de serveurs VPS sécurisés avec containerisation Docker, 
                routage Traefik, administration Portainer, CI/CD GitHub et monitoring Uptime Kuma 
                avec alertes Telegram.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">Docker</span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">Traefik</span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">CI/CD</span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">Monitoring</span>
              </div>
              <p className="text-xs text-muted-foreground">Début 20/01/2024 – en cours</p>
            </div>
            
            <div className="group rounded-2xl border border-foreground/10 bg-background p-6 transition hover:shadow-lg hover:shadow-accent/10">
              <div className="h-48 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-6 flex items-center justify-center">
                <Package className="h-16 w-16 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">FlexPress Core</h3>
              <p className="text-sm text-accent font-medium mb-2">CMS WordPress conteneurisé open-source</p>
              <p className="text-muted-foreground mb-4">
                Développement d'un socle WordPress open-source, optimisé pour la production, 
                modulaire et entièrement conteneurisé pour un déploiement simplifié.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">WordPress</span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">Docker</span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">Open Source</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Début 15/06/2025 – en cours</p>
                <a 
                  href="https://github.com/eurinhash/flexpress-core" 
                  className="text-sm text-accent hover:underline font-medium"
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
          <h2 className="text-3xl font-bold tracking-tight mb-6">Et bien d'autres à venir...</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Chaque projet est une opportunité d'innover et de créer des solutions 
            qui font la différence. Parlons de votre prochain défi !
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium transition hover:shadow-[0_10px_40px_-10px] hover:shadow-foreground/30"
          >
            Démarrer un projet
          </a>
        </div>
      </section>
    </main>
  );
}