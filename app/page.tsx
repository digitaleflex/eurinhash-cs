import {
  Cloud,
  Shield,
  Code2,
  GraduationCap,
  Users,
  ArrowRight,
  CheckCircle,
  Building2,
  Network,
  Lightbulb,
  Target,
  Scale,
  FlaskConical,
  BookOpen,
  Calendar,
  TrendingUp,
  Globe,
  Database,
  Lock,
  Layers,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import InteractiveTimeline from '@/components/interactive-timeline';

export default function Home() {
  return (
    <main className="relative isolate">
      {/* === HERO — POSITIONNEMENT SYSTÉMIQUE === */}
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:64px_64px]" />
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] sm:h-[700px] sm:w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(59,130,246,0.18),transparent_60%)]" />
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/30 rounded-full animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent/40 rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-accent/20 rounded-full animate-pulse delay-2000" />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex flex-col items-start text-left gap-6 sm:gap-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                L'Afrique ne manque pas de développeurs.
                <span className="text-accent block mt-2">Elle manque d'architectures.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Je conçois des systèmes numériques souverains : infrastructure cloud, standards techniques, formation architecturale et écosystèmes interconnectés.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full max-w-lg">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-4 text-sm sm:text-base font-semibold transition hover:shadow-[0_10px_40px_-10px] hover:shadow-foreground/30 w-full sm:w-auto hover:scale-105 active:scale-95 touch-manipulation"
                >
                  Initier une collaboration stratégique
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/vision"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-6 py-4 text-sm sm:text-base font-medium text-foreground transition hover:border-accent hover:text-accent w-full sm:w-auto hover:scale-105 active:scale-95 touch-manipulation"
                >
                  Découvrir la vision
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            {/* Schéma abstrait - visible sur desktop */}
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-muted/50 rounded-3xl border border-accent/20 p-8">
                  {/* Schéma écosystème */}
                  <div className="relative w-full h-full">
                    {/* Centre */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                      <Layers className="w-10 h-10 text-accent" />
                    </div>
                    {/* Orbites */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-foreground/10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-foreground/5" />
                    {/* Noeuds */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Cloud className="w-6 h-6 text-blue-500" />
                      </div>
                      <span className="text-xs text-muted-foreground">Infrastructure</span>
                    </div>
                    <div className="absolute top-1/4 right-8 flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <Code2 className="w-6 h-6 text-purple-500" />
                      </div>
                      <span className="text-xs text-muted-foreground">Applications</span>
                    </div>
                    <div className="absolute bottom-1/4 right-8 flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-green-500" />
                      </div>
                      <span className="text-xs text-muted-foreground">Formation</span>
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-orange-500" />
                      </div>
                      <span className="text-xs text-muted-foreground">Gouvernance</span>
                    </div>
                    <div className="absolute bottom-1/4 left-8 flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center">
                        <Network className="w-6 h-6 text-pink-500" />
                      </div>
                      <span className="text-xs text-muted-foreground">Écosystème</span>
                    </div>
                    <div className="absolute top-1/4 left-8 flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-lg bg-teal-500/20 flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-teal-500" />
                      </div>
                      <span className="text-xs text-muted-foreground">Innovation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION PROBLÈME SYSTÉMIQUE === */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-muted">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Le problème n'est pas le code.<br />
              <span className="text-accent">C'est l'architecture.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Bloc 1 */}
            <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-foreground/10 bg-background hover:border-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Dépendance</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Infrastructure majoritairement étrangère. Données hébergées hors du continent.
              </p>
            </div>
            {/* Bloc 2 */}
            <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-foreground/10 bg-background hover:border-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Fragmentation</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Projets isolés, non interopérables. Absence de partage de ressources.
              </p>
            </div>
            {/* Bloc 3 */}
            <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-foreground/10 bg-background hover:border-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Absence de standards</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Pas de doctrine architecturale locale. Chaque projet réinvente la roue.
              </p>
            </div>
            {/* Bloc 4 */}
            <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-foreground/10 bg-background hover:border-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Vision court terme</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Orientation exécution plutôt que conception systémique durable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION THÈSE === */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Construire des écosystèmes numériques<span className="text-accent"> souverains</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
            La souveraineté numérique ne se décrète pas.<br />
            Elle se conçoit.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-10 text-left">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/5">
              <Cloud className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Des infrastructures maîtrisées</h4>
                <p className="text-sm text-muted-foreground">Hébergement local, cloud hybride, résilience</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/5">
              <Scale className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Des standards formalisés</h4>
                <p className="text-sm text-muted-foreground">Bonnes pratiques, documentation, gouvernance</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/5">
              <BookOpen className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Une culture architecturale forte</h4>
                <p className="text-sm text-muted-foreground">Formation, mentorship, transfert de compétences</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/5">
              <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Une gouvernance technique claire</h4>
                <p className="text-sm text-muted-foreground">Rôles, processus, décisions documentées</p>
              </div>
            </div>
          </div>
          <Link
            href="/vision"
            className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
          >
            Lire le manifeste <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* === SECTION LES 4 PILIERS === */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-muted">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Les 4 piliers de l'écosystème
            </h2>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Pilier 1 */}
            <Link href="/skills" className="group p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-foreground/10 bg-background hover:shadow-lg hover:border-accent/30 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <Cloud className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                Architecture Cloud
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Conception d'infrastructures scalables et hybrides adaptées au contexte africain.
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-accent font-medium">
                Découvrir <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            {/* Pilier 2 */}
            <Link href="/vision" className="group p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-foreground/10 bg-background hover:shadow-lg hover:border-accent/30 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <Scale className="w-7 h-7 text-purple-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                Standards & Doctrine
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Formalisation de bonnes pratiques adaptées au contexte local.
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-accent font-medium">
                Découvrir <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            {/* Pilier 3 */}
            <Link href="/projects" className="group p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-foreground/10 bg-background hover:shadow-lg hover:border-accent/30 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <FlaskConical className="w-7 h-7 text-green-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                Laboratoire & R&D
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Expérimentation, prototypage, IA et systèmes distribués.
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-accent font-medium">
                Découvrir <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            {/* Pilier 4 */}
            <Link href="/about" className="group p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-foreground/10 bg-background hover:shadow-lg hover:border-accent/30 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                <GraduationCap className="w-7 h-7 text-orange-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                Formation architecturale
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Former des profils orientés système, pas seulement développeurs.
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-accent font-medium">
                Découvrir <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* === SECTION ÉCOSYSTÈME EN CONSTRUCTION === */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Un écosystème en construction
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des initiatives concrètes pour structurer le numérique africain.
            </p>
          </div>

          {/* Projets écosystème */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <div className="p-6 rounded-xl border border-foreground/10 bg-muted/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Database className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold">FlexHOST</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Infrastructure cloud souveraine pour hébergement local.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-foreground/10 bg-muted/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-semibold">Hashcode</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Communauté technique pour former les talents locaux.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-foreground/10 bg-muted/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="font-semibold">Programmes</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Formations architecturales pour les équipes techniques.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-foreground/10 bg-muted/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="font-semibold">Outils SaaS</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Solutions logicielles en incubation pour le continent.
              </p>
            </div>
          </div>

          {/* Timeline interactive */}
          <InteractiveTimeline />
        </div>
      </section>

      {/* === SECTION RÉALISATIONS === */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-muted">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Architectures et systèmes réalisés
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des projets qui illustrent chaque pilier de l'écosystème.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Projet 1 - Cloud */}
            <div className="p-6 rounded-2xl border border-foreground/10 bg-background hover:shadow-lg transition hover:scale-[1.02]">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-full">Infrastructure</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">
                Infrastructure VPS E-Flex
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Architecture cloud hybride avec Docker, Traefik, monitoring.
              </p>
              <p className="text-xs text-accent font-medium">2024 – en cours</p>
            </div>

            {/* Projet 2 - Application */}
            <div className="p-6 rounded-2xl border border-foreground/10 bg-background hover:shadow-lg transition hover:scale-[1.02]">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-purple-500/10 text-purple-500 text-xs rounded-full">Application</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">
                Sainte Adoration
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Plateforme spirituelle avec IA, PWA et calendrier liturgique.
              </p>
              <p className="text-xs text-accent font-medium">2023 – 2024</p>
            </div>

            {/* Projet 3 - Outil */}
            <div className="p-6 rounded-2xl border border-foreground/10 bg-background hover:shadow-lg transition hover:scale-[1.02]">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">Outil</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">
                FlexPress Core
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                CMS WordPress conteneurisé et optimisé pour la production.
              </p>
              <p className="text-xs text-accent font-medium">2024</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
            >
              Voir toutes les réalisations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* === SECTION MÉTHODOLOGIE === */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Approche architecturale
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Étape 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-accent">1</span>
              </div>
              <h3 className="font-semibold mb-2">Analyse systémique</h3>
              <p className="text-sm text-muted-foreground">
                Comprendre l'existant et les contraintes
              </p>
            </div>
            {/* Flèche */}
            <div className="hidden lg:flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
            {/* Étape 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-accent">2</span>
              </div>
              <h3 className="font-semibold mb-2">Conception</h3>
              <p className="text-sm text-muted-foreground">
                Architecture adaptée et documentée
              </p>
            </div>
            {/* Flèche */}
            <div className="hidden lg:flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
            {/* Étape 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-accent">3</span>
              </div>
              <h3 className="font-semibold mb-2">Standardisation</h3>
              <p className="text-sm text-muted-foreground">
                Bonnes pratiques et gouvernance
              </p>
            </div>
            {/* Flèche */}
            <div className="hidden lg:flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
            {/* Étape 4 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-accent">4</span>
              </div>
              <h3 className="font-semibold mb-2">Implémentation</h3>
              <p className="text-sm text-muted-foreground">
                Développement et déploiement
              </p>
            </div>
            {/* Flèche */}
            <div className="hidden lg:flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
            {/* Étape 5 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-accent">5</span>
              </div>
              <h3 className="font-semibold mb-2">Évolutivité</h3>
              <p className="text-sm text-muted-foreground">
                Maintenance et croissance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION APPEL STRATÉGIQUE === */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-accent text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Construisons une infrastructure durable.
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Si vous souhaitez structurer une plateforme scalable, mettre en place une architecture cloud maîtrisée, ou participer à la construction d'un écosystème numérique souverain…
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-accent px-8 py-4 text-base font-semibold transition hover:scale-105 active:scale-95 shadow-lg"
          >
            Planifier une discussion stratégique
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
