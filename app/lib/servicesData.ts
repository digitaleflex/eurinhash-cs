export interface ServiceParticulier {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  includes: string[];
  icon: string;
  popular?: boolean;
  category: 'depannage' | 'creation' | 'formation' | 'consultation';
}

export const SERVICES_PARTICULIERS: ServiceParticulier[] = [
  {
    id: 'depannage-pc',
    title: 'Dépannage Informatique',
    description: 'Réparation et maintenance de votre ordinateur, suppression de virus, récupération de données.',
    price: 'À partir de 15,000 FCFA',
    duration: '1-3 heures',
    includes: [
      'Diagnostic complet gratuit',
      'Réparation sur place ou en atelier',
      'Suppression virus/malware',
      'Sauvegarde de vos données',
      'Conseils de prévention',
      'Garantie 30 jours'
    ],
    icon: '🔧',
    popular: true,
    category: 'depannage'
  },
  {
    id: 'site-web-personnel',
    title: 'Site Web Personnel',
    description: 'Création de votre site vitrine, blog personnel ou portfolio professionnel.',
    price: 'À partir de 75,000 FCFA',
    duration: '1-2 semaines',
    includes: [
      'Design personnalisé',
      'Site responsive (mobile/desktop)',
      'Hébergement 1 an inclus',
      'Nom de domaine inclus',
      'Formation à la gestion',
      'Support 6 mois'
    ],
    icon: '🌐',
    category: 'creation'
  },
  {
    id: 'formation-bureautique',
    title: 'Formation Bureautique',
    description: 'Cours particuliers Word, Excel, PowerPoint, navigation internet et email.',
    price: '8,000 FCFA/heure',
    duration: 'Flexible',
    includes: [
      'Cours à domicile ou en ligne',
      'Support de cours fourni',
      'Exercices pratiques',
      'Suivi personnalisé',
      'Certificat de formation',
      'Horaires flexibles'
    ],
    icon: '📚',
    category: 'formation'
  },
  {
    id: 'consultation-tech',
    title: 'Consultation Technologique',
    description: 'Conseils pour vos achats informatiques, choix de solutions digitales adaptées.',
    price: '25,000 FCFA/session',
    duration: '1-2 heures',
    includes: [
      'Analyse de vos besoins',
      'Recommandations personnalisées',
      'Comparatif produits/prix',
      'Guide d\'achat détaillé',
      'Suivi post-achat',
      'Support téléphonique 1 mois'
    ],
    icon: '💡',
    category: 'consultation'
  },
  {
    id: 'installation-logiciels',
    title: 'Installation & Configuration',
    description: 'Installation de logiciels, configuration système, mise en place de votre environnement de travail.',
    price: 'À partir de 10,000 FCFA',
    duration: '30min - 2h',
    includes: [
      'Installation logiciels essentiels',
      'Configuration optimale',
      'Mise à jour système',
      'Paramétrage sécurité',
      'Formation utilisation',
      'Documentation fournie'
    ],
    icon: '⚙️',
    category: 'depannage'
  },
  {
    id: 'sauvegarde-donnees',
    title: 'Sauvegarde & Sécurité',
    description: 'Mise en place de solutions de sauvegarde automatique et sécurisation de vos données.',
    price: 'À partir de 20,000 FCFA',
    duration: '1-3 heures',
    includes: [
      'Audit sécurité gratuit',
      'Solution de sauvegarde cloud',
      'Chiffrement des données',
      'Antivirus professionnel',
      'Formation aux bonnes pratiques',
      'Maintenance 3 mois'
    ],
    icon: '🔒',
    category: 'consultation'
  }
];

export const SERVICES_TESTIMONIALS = [
  {
    name: "Madame Diop",
    company: "Commerce Local",
    service: "Dépannage Informatique",
    role: "Commerçante",
    content: "Mon ordinateur était complètement bloqué avec des virus. En 2 heures, tout était réparé et mes photos de famille récupérées. Service rapide et prix honnête !",
    rating: 5,
    image: "👩🏾‍💼"
  },
  {
    name: "Ibrahima Ndiaye",
    company: "Atelier d'Art",
    service: "Site Web Personnel",
    role: "Artisan",
    content: "Grâce à mon nouveau site web, j'ai doublé ma clientèle ! Le site est beau, facile à utiliser et j'ai appris à le gérer moi-même.",
    rating: 5,
    image: "👨🏿‍🎨"
  },
  {
    name: "Awa Sarr",
    company: "Particulier",
    service: "Formation Bureautique",
    role: "Retraitée",
    content: "À 65 ans, j'ai enfin appris à utiliser Excel et internet ! Le formateur était très patient et s'adaptait à mon rythme. Maintenant je gère mes comptes facilement.",
    rating: 5,
    image: "👵🏾"
  }
];

export const SERVICES_FAQ = [
  {
    icon: "💰",
    question: "Comment sont calculés vos tarifs ?",
    answer: "Nos tarifs sont transparents et adaptés aux particuliers. Nous proposons un diagnostic gratuit, puis un devis détaillé avant toute intervention. Possibilité de paiement échelonné pour les gros montants."
  },
  {
    icon: "🏠",
    question: "Vous déplacez-vous à domicile ?",
    answer: "Oui ! Nous nous déplaçons dans tout Dakar et sa banlieue. Frais de déplacement : 5,000 FCFA (gratuit pour les interventions > 50,000 FCFA)."
  },
  {
    icon: "⏰",
    question: "Quels sont vos horaires d'intervention ?",
    answer: "Du lundi au samedi de 8h à 20h. Urgences le dimanche sur demande. Nous nous adaptons à vos disponibilités pour les formations et consultations."
  },
  {
    icon: "🛡️",
    question: "Avez-vous des garanties ?",
    answer: "Oui ! Garantie 30 jours sur toutes nos réparations, 6 mois de support sur les sites web, et satisfaction garantie ou remboursement sur nos formations."
  },
  {
    icon: "📱",
    question: "Comment prendre rendez-vous ?",
    answer: "Appelez-nous au 77 123 45 67, WhatsApp, ou remplissez notre formulaire en ligne. Nous vous rappelons sous 2h pour convenir d'un créneau."
  },
  {
    icon: "💳",
    question: "Quels moyens de paiement acceptez-vous ?",
    answer: "Espèces, virement bancaire, Orange Money, Wave. Possibilité de paiement en 2 ou 3 fois sans frais pour les montants > 100,000 FCFA."
  }
];

export const SERVICE_CATEGORIES = [
  {
    id: 'depannage',
    name: 'Dépannage & Réparation',
    icon: '🔧',
    description: 'Solutions rapides pour vos problèmes informatiques'
  },
  {
    id: 'creation',
    name: 'Création Web',
    icon: '🌐',
    description: 'Sites web et présence en ligne'
  },
  {
    id: 'formation',
    name: 'Formation',
    icon: '📚',
    description: 'Apprentissage personnalisé à votre rythme'
  },
  {
    id: 'consultation',
    name: 'Conseil & Sécurité',
    icon: '💡',
    description: 'Expertise et recommandations sur mesure'
  }
];