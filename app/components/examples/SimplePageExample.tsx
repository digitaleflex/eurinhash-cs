import { PageLayout, PageHeader, ContentSection } from '../layout';
import { FeatureList, StatsList, CTASection } from '../common';
import { Grid, Card, Heading, Text, Badge } from '../ui';

export default function SimplePageExample() {
  const features = [
    {
      icon: "🚀",
      title: "Performance",
      description: "Des solutions ultra-rapides et optimisées"
    },
    {
      icon: "🔒",
      title: "Sécurité",
      description: "Protection maximale de vos données"
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "Technologies de pointe et IA intégrée"
    }
  ];

  const stats = [
    { value: "99%", label: "Satisfaction client", color: "green" as const },
    { value: "24/7", label: "Support", color: "blue" as const },
    { value: "100+", label: "Projets", color: "green" as const }
  ];

  return (
    <PageLayout>
      <PageHeader
        title="Exemple de Page Simple"
        subtitle="Démonstration des composants réutilisables"
        description="Cette page montre comment utiliser efficacement nos composants modulaires"
        badges={[
          { text: "Réutilisable", variant: "success" },
          { text: "Modulaire", variant: "info" }
        ]}
      />

      <ContentSection title="Nos Fonctionnalités" centered>
        <FeatureList features={features} columns={3} />
      </ContentSection>

      <ContentSection background="dark">
        <StatsList stats={stats} columns={3} />
      </ContentSection>

      <CTASection
        title="Prêt à commencer ?"
        description="Découvrez comment nos solutions peuvent transformer votre entreprise"
        primaryButton={{
          text: "Démarrer maintenant",
          onClick: () => console.log("CTA clicked!")
        }}
        secondaryButton={{
          text: "En savoir plus",
          onClick: () => console.log("Secondary CTA clicked!")
        }}
        variant="gradient"
      />
    </PageLayout>
  );
}