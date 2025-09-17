export interface FormationProgram {
  id: string;
  title: string;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  price: number;
  description: string;
  skills: string[];
  certification: string;
  career: string[];
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  prerequisites: string[];
  schedule: string;
  nextStart: string;
}

export const FORMATION_PROGRAMS: FormationProgram[] = [
  {
    id: 'programmation',
    title: 'Développement Web & Mobile',
    duration: '6 mois',
    level: 'Débutant',
    price: 450000,
    description: 'Maîtrisez les langages modernes et créez des applications complètes du front-end au back-end.',
    skills: [
      'HTML/CSS/JavaScript',
      'React/Next.js',
      'Node.js/Express',
      'Python/Django',
      'React Native',
      'Bases de données',
      'API REST',
      'Git/GitHub'
    ],
    certification: 'Certificat EurinHash Développeur Full-Stack + Portfolio de 5 projets',
    career: [
      'Développeur Web Front-end',
      'Développeur Web Back-end',
      'Développeur Full-Stack',
      'Développeur Mobile',
      'Freelance Développeur'
    ],
    icon: '💻',
    color: 'blue',
    prerequisites: ['Bases en informatique', 'Logique de base', 'Motivation'],
    schedule: 'Lun-Mer-Ven 18h-21h + Samedi 9h-17h',
    nextStart: '15 Mars 2025'
  },
  {
    id: 'reseaux',
    title: 'Réseaux & Infrastructure',
    duration: '4 mois',
    level: 'Intermédiaire',
    price: 380000,
    description: 'Devenez expert en administration systèmes et réseaux avec les certifications CCNA.',
    skills: [
      'Configuration Cisco',
      'Administration Linux',
      'Windows Server',
      'Sécurité réseau',
      'Virtualisation',
      'Monitoring',
      'Troubleshooting',
      'VPN/VLAN'
    ],
    certification: 'Préparation CCNA + Certificat EurinHash Admin Réseau',
    career: [
      'Administrateur Réseau',
      'Technicien Infrastructure',
      'Support Technique Senior',
      'Consultant IT',
      'Responsable Informatique PME'
    ],
    icon: '🌐',
    color: 'green',
    prerequisites: ['Bases réseaux', 'Expérience Windows/Linux', 'Anglais technique'],
    schedule: 'Mar-Jeu 18h-21h + Samedi 9h-17h',
    nextStart: '1er Avril 2025'
  },
  {
    id: 'cybersecurite',
    title: 'Cybersécurité & Ethical Hacking',
    duration: '8 mois',
    level: 'Avancé',
    price: 650000,
    description: 'Formation complète en sécurité informatique, tests de pénétration et forensic numérique.',
    skills: [
      'Ethical Hacking',
      'Tests de pénétration',
      'Forensic numérique',
      'Analyse malware',
      'Sécurité web',
      'Cryptographie',
      'Conformité RGPD',
      'Incident Response'
    ],
    certification: 'Préparation CEH/CISSP + Certificat EurinHash Expert Cybersécurité',
    career: [
      'Expert en Cybersécurité',
      'Pentester',
      'Analyste SOC',
      'Consultant Sécurité',
      'RSSI (Responsable Sécurité)'
    ],
    icon: '🛡️',
    color: 'red',
    prerequisites: ['Solides bases réseaux', 'Programmation', 'Expérience IT 2+ ans'],
    schedule: 'Lun-Mer-Ven 18h-21h + Samedi 9h-17h',
    nextStart: '15 Février 2025'
  },
  {
    id: 'cloud',
    title: 'Cloud Computing & DevOps',
    duration: '5 mois',
    level: 'Intermédiaire',
    price: 520000,
    description: 'Maîtrisez AWS, Azure, Docker, Kubernetes et les pratiques DevOps modernes.',
    skills: [
      'AWS/Azure',
      'Docker/Kubernetes',
      'Terraform',
      'CI/CD Jenkins',
      'Monitoring',
      'Infrastructure as Code',
      'Microservices',
      'Automatisation'
    ],
    certification: 'Préparation AWS Solutions Architect + Certificat EurinHash Cloud Expert',
    career: [
      'Ingénieur Cloud',
      'DevOps Engineer',
      'Architecte Solutions',
      'Consultant Cloud',
      'Site Reliability Engineer'
    ],
    icon: '☁️',
    color: 'purple',
    prerequisites: ['Administration systèmes', 'Bases programmation', 'Réseaux'],
    schedule: 'Mar-Jeu-Sam 18h-21h + Dimanche 9h-17h',
    nextStart: '1er Mars 2025'
  },
  {
    id: 'ia',
    title: 'Intelligence Artificielle & Data Science',
    duration: '7 mois',
    level: 'Avancé',
    price: 580000,
    description: 'Plongez dans le machine learning, deep learning et créez des solutions IA concrètes.',
    skills: [
      'Python/TensorFlow',
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'NLP',
      'Data Analysis',
      'Jupyter/Pandas',
      'Déploiement IA'
    ],
    certification: 'Certificat EurinHash Expert IA + Portfolio projets IA',
    career: [
      'Data Scientist',
      'Ingénieur IA',
      'Machine Learning Engineer',
      'Consultant IA',
      'Chercheur en IA'
    ],
    icon: '🤖',
    color: 'orange',
    prerequisites: ['Mathématiques niveau Bac+2', 'Programmation Python', 'Statistiques'],
    schedule: 'Lun-Mer-Ven 18h-21h + Samedi 9h-17h',
    nextStart: '15 Avril 2025'
  }
];

export const FORMATION_TESTIMONIALS = [
  {
    name: "Aminata Diallo",
    program: "Développement Web & Mobile",
    role: "Développeuse Full-Stack chez TechCorp",
    content: "Grâce à EurinHash, j'ai décroché mon premier emploi de développeuse en seulement 3 mois après la formation. Le programme est très pratique et les projets m'ont donné une vraie expérience.",
    rating: 5,
    image: "👩🏾‍💻",
    salary: "Salaire : 350,000 FCFA/mois"
  },
  {
    name: "Moussa Traoré",
    program: "Cybersécurité & Ethical Hacking",
    role: "Expert Cybersécurité chez SecureBank",
    content: "Formation exceptionnelle ! J'ai pu passer ma certification CEH et doubler mon salaire. Les formateurs sont des vrais experts du terrain.",
    rating: 5,
    image: "👨🏿‍💼",
    salary: "Salaire : 650,000 FCFA/mois"
  },
  {
    name: "Fatou Sow",
    program: "Cloud Computing & DevOps",
    role: "Ingénieure Cloud chez CloudAfrica",
    content: "Reconversion réussie ! Après 8 ans dans la comptabilité, je suis maintenant ingénieure cloud. EurinHash m'a accompagnée à chaque étape.",
    rating: 5,
    image: "👩🏾‍🔬",
    salary: "Salaire : 480,000 FCFA/mois"
  }
];

export const FORMATION_FAQ = [
  {
    icon: "💰",
    question: "Quelles sont les options de financement ?",
    answer: "Nous proposons plusieurs options : paiement en 3 fois sans frais, bourses d'études pour les meilleurs profils, et partenariats avec des entreprises pour le financement. Contactez-nous pour étudier votre situation."
  },
  {
    icon: "⏰",
    question: "Puis-je suivre la formation en travaillant ?",
    answer: "Absolument ! Nos horaires sont adaptés aux actifs : cours en soirée et weekends. De plus, 70% du contenu est accessible en ligne pour réviser à votre rythme."
  },
  {
    icon: "🎯",
    question: "Quel est le taux de placement après formation ?",
    answer: "85% de nos diplômés trouvent un emploi dans les 6 mois. Nous avons un réseau de +50 entreprises partenaires et un service d'accompagnement carrière inclus."
  },
  {
    icon: "📚",
    question: "Faut-il avoir un niveau technique pour commencer ?",
    answer: "Cela dépend du programme. Les formations 'Débutant' ne nécessitent aucun prérequis technique. Pour les niveaux avancés, nous évaluons votre profil lors d'un entretien gratuit."
  },
  {
    icon: "🏆",
    question: "Les certifications sont-elles reconnues ?",
    answer: "Oui ! Nos certificats EurinHash sont reconnus par nos entreprises partenaires. De plus, nous préparons aux certifications internationales (CCNA, CEH, AWS, etc.)."
  },
  {
    icon: "🤝",
    question: "Y a-t-il un suivi après la formation ?",
    answer: "Oui, nous offrons 6 mois de mentorat post-formation, accès à notre communauté d'anciens, et aide à la recherche d'emploi. Vous n'êtes jamais seul !"
  }
];