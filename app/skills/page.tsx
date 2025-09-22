import { Code2, Cloud, Brain, Database, Shield, Zap, Users, Lightbulb, BookOpen, Search, Award } from "lucide-react";

export default function SkillsPage() {
  const technicalSkills = [
    {
      icon: Code2,
      title: "Développement Web",
      skills: ["Next.js", "React", "TypeScript", "Node.js", "PHP", "WordPress"],
      description: "Création d'applications web modernes, performantes et scalables"
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      skills: ["Docker", "Traefik", "CI/CD", "VPS", "Monitoring", "Automation"],
      description: "Infrastructure cloud sécurisée et déploiements automatisés"
    },
    {
      icon: Database,
      title: "Bases de Données",
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Backup", "Optimization"],
      description: "Conception et optimisation de systèmes de données robustes"
    },
    {
      icon: Shield,
      title: "Sécurité",
      skills: ["SSL/TLS", "Authentification", "Chiffrement", "Audit", "RGPD", "Backup"],
      description: "Sécurisation complète des applications et infrastructures"
    }
  ];

  const softSkills = [
    {
      icon: Brain,
      title: "Innovation",
      description: "Veille technologique constante et adoption des meilleures pratiques"
    },
    {
      icon: Users,
      title: "Formation",
      description: "Transmission de connaissances et accompagnement des équipes"
    },
    {
      icon: Lightbulb,
      title: "Conseil",
      description: "Analyse des besoins et recommandations stratégiques"
    },
    {
      icon: Zap,
      title: "Agilité",
      description: "Adaptation rapide aux nouvelles technologies et méthodes"
    }
  ];

  return (
    <main className="relative isolate">
      <section className="mx-auto max-w-6xl px-6 md:px-8 py-24 md:py-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Mes Compétences
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un ensemble de compétences techniques et humaines au service de vos projets,
            acquises par la pratique et l'expérience terrain.
          </p>
        </div>

        {/* Compétences Techniques */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Expertise Technique</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {technicalSkills.map((skill) => (
              <div
                key={skill.title}
                className="p-8 rounded-2xl border border-foreground/10 bg-background hover:shadow-lg hover:shadow-accent/10 transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <skill.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">{skill.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{skill.description}</p>
                <div className="flex flex-wrap gap-2">
                  {skill.skills.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compétences Humaines */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Compétences Humaines</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {softSkills.map((skill) => (
              <div
                key={skill.title}
                className="text-center p-6 rounded-2xl border border-foreground/10 bg-muted hover:shadow-lg hover:shadow-accent/10 transition"
              >
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <skill.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{skill.title}</h3>
                <p className="text-muted-foreground text-sm">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Formation */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Formation Continue</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center p-6 rounded-2xl border border-foreground/10 bg-background">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Autodidacte</h3>
              <p className="text-muted-foreground text-sm">
                Apprentissage continu par la pratique, la documentation et les projets concrets
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl border border-foreground/10 bg-background">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Search className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Veille Technologique</h3>
              <p className="text-muted-foreground text-sm">
                Suivi des évolutions technologiques et adoption des meilleures pratiques
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl border border-foreground/10 bg-background">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Expérience Terrain</h3>
              <p className="text-muted-foreground text-sm">
                Compétences forgées par des projets réels et des défis concrets
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Mettons ces compétences au service de votre projet
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Chaque compétence est un outil au service de votre réussite.
            Discutons de la façon dont je peux vous accompagner.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium transition hover:shadow-[0_10px_40px_-10px] hover:shadow-foreground/30"
          >
            Parlons de votre projet
          </a>
        </div>
      </section>
    </main>
  );
}