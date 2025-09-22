import { Target, Shield, Leaf, Zap, ShieldCheck, Smartphone, Users, RotateCcw, Handshake } from "lucide-react";

export default function VisionPage() {
  return (
    <main className="relative isolate">
      {/* Hero Quote */}
      <section className="mx-auto max-w-4xl px-6 md:px-8 py-24 md:py-32 text-center">
        <blockquote className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
          « La technologie doit se faire oublier : puissante, rapide, fluide. »
        </blockquote>
        <p className="text-xl text-muted-foreground">
          Ma philosophie du développement et de l'innovation
        </p>
      </section>

      {/* Vision détaillée */}
      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Ma Vision</h2>
          
          <div className="space-y-12">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Simplicité & Efficacité</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                La meilleure technologie est celle qu'on ne remarque pas. Elle doit être intuitive, 
                performante et résoudre des problèmes réels sans créer de complexité inutile. 
                Mon objectif : des solutions élégantes qui simplifient la vie des utilisateurs.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Souveraineté Numérique</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dans un monde hyperconnecté, il est crucial de maîtriser ses outils et ses données. 
                Je privilégie les solutions qui offrent autonomie, contrôle et indépendance technologique, 
                tout en respectant la vie privée et la sécurité des utilisateurs.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Durabilité & Pérennité</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Concevoir pour durer, c'est penser à long terme. Technologies éprouvées, 
                code maintenable, architecture évolutive : chaque choix technique doit servir 
                la durabilité du projet et minimiser son impact environnemental.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principes */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Mes Principes</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-foreground/10 bg-muted">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                Performance First
              </h3>
              <p className="text-muted-foreground">
                Chaque milliseconde compte. Optimisation continue pour des expériences fluides et rapides.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-foreground/10 bg-muted">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-accent" />
                Sécurité by Design
              </h3>
              <p className="text-muted-foreground">
                La sécurité n'est pas une option, c'est un prérequis intégré dès la conception.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-foreground/10 bg-muted">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-accent" />
                Mobile First
              </h3>
              <p className="text-muted-foreground">
                Concevoir d'abord pour mobile garantit une expérience optimale sur tous les appareils.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-foreground/10 bg-muted">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Accessibilité
              </h3>
              <p className="text-muted-foreground">
                La technologie doit être accessible à tous, sans exception ni discrimination.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-foreground/10 bg-muted">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-accent" />
                Amélioration Continue
              </h3>
              <p className="text-muted-foreground">
                Itération constante, feedback utilisateur et optimisation permanente des solutions.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-foreground/10 bg-muted">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Handshake className="h-5 w-5 text-accent" />
                Collaboration
              </h3>
              <p className="text-muted-foreground">
                Les meilleures solutions naissent de la collaboration et du partage de connaissances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-4xl px-6 md:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-8">L'Impact que je veux créer</h2>
          
          <div className="space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mon ambition va au-delà du simple développement technique. Je veux contribuer à 
              <strong className="text-foreground"> former la prochaine génération de talents IT</strong>, 
              partager les connaissances et démocratiser l'accès aux technologies modernes.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Chaque projet est une opportunité de créer de la valeur durable, 
              d'innover de manière responsable et de construire un écosystème technologique 
              plus humain et plus accessible.
            </p>
            
            <div className="pt-8">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium transition hover:shadow-[0_10px_40px_-10px] hover:shadow-foreground/30"
              >
                Construisons ensemble l'avenir
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}