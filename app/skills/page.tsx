import {
  Code2,
  Cloud,
  Brain,
  Database,
  Shield,
  Users,
  Lightbulb,
  BookOpen,
  Search,
  Award,
} from 'lucide-react';

export default function SkillsPage() {
  const technicalSkills = [
    {
      icon: Code2,
      title: 'Développement Web',
      skills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PHP', 'WordPress'],
      description:
        "Création d'applications web modernes, performantes et scalables",
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      skills: ['Docker', 'Traefik', 'CI/CD', 'VPS', 'Monitoring', 'Automation'],
      description: 'Infrastructure cloud sécurisée et déploiements automatisés',
    },
    {
      icon: Database,
      title: 'Bases de Données',
      skills: [
        'MySQL',
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'Backup',
        'Optimization',
      ],
      description: 'Conception et optimisation de systèmes de données robustes',
    },
    {
      icon: Shield,
      title: 'Sécurité',
      skills: [
        'SSL/TLS',
        'Authentification',
        'Chiffrement',
        'Audit',
        'RGPD',
        'Backup',
      ],
      description: 'Sécurisation complète des applications et infrastructures',
    },
  ];

  const softSkills = [
    {
      icon: Brain,
      title: 'Innovation',
      description:
        'Veille technologique constante et adoption des meilleures pratiques',
    },
    {
      icon: Users,
      title: 'Formation',
      description:
        'Transmission de connaissances et accompagnement des équipes',
    },
    {
      icon: Lightbulb,
      title: 'Conseil',
      description: 'Analyse des besoins et recommandations stratégiques',
    },
    {
      icon: Search,
      title: 'Résolution de problèmes',
      description:
        'Approche méthodique et créative pour surmonter les défis techniques',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: "Recherche constante de la qualité et de l'optimisation",
    },
    {
      icon: BookOpen,
      title: 'Apprentissage continu',
      description: 'Adaptation rapide aux nouvelles technologies et méthodes',
    },
  ];

  return (
    <main className="relative isolate">
      <section className="mx-auto max-w-6xl px-6 md:px-8 py-16 sm:py-20 md:py-28">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Mes Compétences
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un ensemble de compétences techniques et humaines au service de vos
            projets, acquises par la pratique et l&apos;expérience terrain.
          </p>
        </div>

        {/* Compétences Techniques */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
            Expertise Technique
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {technicalSkills.map(skill => (
              <div
                key={skill.title}
                className="group p-8 rounded-2xl border border-foreground/10 bg-background hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <skill.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-accent transition-colors duration-300">
                    {skill.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {skill.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skill.skills.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full hover:bg-accent hover:text-white transition-all duration-200 cursor-default"
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
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
            Compétences Humaines
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {softSkills.map(skill => (
              <div
                key={skill.title}
                className="group p-6 rounded-xl border border-foreground/10 bg-background hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <skill.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-accent transition-colors duration-300">
                    {skill.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
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
              Parlons de votre projet
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
