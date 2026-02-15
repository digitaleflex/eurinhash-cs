import { Users, Brain, GraduationCap, BookOpen } from 'lucide-react';
import ProjectCard from './project-card';

export default function CommunityProjects() {
  const projects = [
    {
      title: 'Hashcode Informatique',
      type: 'Communauté IT',
      description:
        'Fédérer, former et accompagner des passionnés en cybersécurité, programmation, réseau et intelligence artificielle.',
      icon: Users,
      iconColor: 'text-blue-500',
      gradientFrom: 'from-blue-500/20',
      gradientTo: 'to-indigo-500/20',
      tags: ['Communauté', 'Formation', 'IT', 'Cybersécurité', 'IA'],
      date: '06 janvier 2021',
      link: {
        url: 'https://chat.whatsapp.com/K7q1wwQ7cUl9QlPx0lEabQ',
        text: 'Rejoindre WhatsApp',
      },
      activities: [
        'Organisation de formations gratuites (via Google Classroom)',
        'Ateliers pratiques sur les fondamentaux IT',
        "Détection et accompagnement des talents prometteurs pour constituer une équipe d'élite",
      ],
      impact:
        "Une véritable communauté numérique locale, ouverte et dynamique, qui forme la prochaine génération d'experts IT en Afrique.",
    },
    {
      title: 'Hashcode Profilage',
      type: 'Plateforme communautaire de profilage intelligent',
      description:
        "Identifier, orienter et accompagner chaque membre selon son profil, ses compétences et ses centres d'intérêt en informatique.",
      icon: Brain,
      iconColor: 'text-purple-500',
      gradientFrom: 'from-purple-500/20',
      gradientTo: 'to-pink-500/20',
      tags: ['Profiling', 'IA', 'Matching', 'Dashboard', 'Parcours'],
      date: '2025 – en cours',
      link: {
        url: 'https://hashcode.eurinhash.com',
        text: 'Accéder à la plateforme',
      },
      activities: [
        'Quiz de compétences (version bêta en ligne)',
        "Collecte d'informations personnelles (profil de base)",
        'Dashboard personnalisé (à venir)',
        'Matching mentor ↔ membre (à venir)',
        'Parcours individualisés (cyber, cloud, dev, réseau, IA) (à venir)',
      ],
      impact:
        'Orientation personnalisée et accompagnement ciblé pour maximiser le potentiel de chaque membre de la communauté.',
    },
    {
      title: 'Formations gratuites locales',
      type: 'Sessions de formation communautaire',
      description:
        "Donner l'accès à la formation IT gratuite à ceux qui n'ont pas les moyens financiers et détecter les profils les plus motivés et compétents.",
      icon: GraduationCap,
      iconColor: 'text-green-500',
      gradientFrom: 'from-green-500/20',
      gradientTo: 'to-emerald-500/20',
      tags: ['Formation', 'Gratuit', 'Présentiel', 'En ligne', 'Accessibilité'],
      date: '2021 – en cours',
      activities: [
        'Initiation à la programmation (logique, HTML/CSS, bases JavaScript)',
        'Introduction à la cybersécurité (bonnes pratiques, sensibilisation)',
        'Découverte du cloud computing (concepts de base, AWS/OCI)',
      ],
      impact:
        "Accessibilité accrue de la tech au Bénin et préparation d'un vivier de talents pour constituer l'équipe interne d'Hashcode.",
    },
    {
      title: 'Plateforme Code12 (Odoo)',
      type: 'Plateforme de formation communautaire',
      description:
        'Offrir des formations IT centralisées pour les membres Hashcode avec un système de gestion complet.',
      icon: BookOpen,
      iconColor: 'text-orange-500',
      gradientFrom: 'from-orange-500/20',
      gradientTo: 'to-red-500/20',
      tags: ['Odoo', 'Formation', 'Centralisé', 'Gestion', 'Communauté'],
      date: '2024 – en cours',
      link: {
        url: 'https://code12.odoo.com',
        text: 'Accéder à Code12',
      },
      activities: [
        'Formations IT centralisées',
        'Gestion des membres et des parcours',
        'Suivi des progressions',
        'Certifications communautaires',
      ],
      impact:
        "Centralisation et optimisation de l'offre de formation pour une meilleure expérience d'apprentissage.",
    },
  ];

  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold tracking-tight mb-12 flex items-center gap-3">
        <Users className="h-8 w-8 text-accent" />
        🌍 Projets Communautaires
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            type={project.type}
            description={project.description}
            icon={project.icon}
            iconColor={project.iconColor}
            gradientFrom={project.gradientFrom}
            gradientTo={project.gradientTo}
            tags={project.tags}
            date={project.date}
            link={project.link}
            activities={project.activities}
            impact={project.impact}
          />
        ))}
      </div>
    </div>
  );
}
