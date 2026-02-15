// Exemples d'utilisation du composant FAQ dans différentes variantes

import { FAQSection, contactFAQData } from './faq-section';

// Exemple 1: FAQ compacte pour sidebar
export function CompactFAQ() {
  return (
    <FAQSection
      title="FAQ Rapide"
      items={contactFAQData.slice(0, 3)} // Seulement 3 questions
      variant="compact"
      className="p-4"
    />
  );
}

// Exemple 2: FAQ étendue pour page dédiée
export function ExpandedFAQ() {
  return (
    <FAQSection
      title="Questions Fréquentes - Guide Complet"
      items={contactFAQData}
      variant="expanded"
      className="py-16"
    />
  );
}

// Exemple 3: FAQ personnalisée avec données spécifiques
const customFAQData = [
  {
    id: 'custom1',
    question: 'Comment puis-je personnaliser ce composant ?',
    answer:
      'Le composant FAQ accepte des props pour personnaliser le titre, les données et le style. Vous pouvez utiliser les variantes "default", "compact" ou "expanded".',
  },
  {
    id: 'custom2',
    question: 'Puis-je ajouter des animations ?',
    answer:
      "Oui ! Le composant inclut déjà des animations fluides avec Framer Motion pour l'ouverture/fermeture des questions.",
  },
];

export function CustomFAQ() {
  return (
    <FAQSection
      title="FAQ Personnalisée"
      items={customFAQData}
      variant="default"
      className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
    />
  );
}
