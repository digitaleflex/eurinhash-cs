"use client";
import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { PageLayout, PageHeader, ContentSection } from '../components/layout';
import { CTASection } from '../components/common';
import { Button, Grid, Card, Heading, Text, Badge } from '../components/ui';
import ProgramCard from '../components/ProgramCard';
import { FORMATION_PROGRAMS, FORMATION_TESTIMONIALS, FORMATION_FAQ } from '../lib/formationData';

// Lazy load non-critical components
const ProgramComparison = dynamic(() => import('../components/ProgramComparison'), {
  loading: () => (
    <div className="py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-8"></div>
        <div className="h-96 bg-gray-700 rounded"></div>
      </div>
    </div>
  ),
  ssr: false
});

const FormationRegistrationForm = dynamic(() => import('../components/FormationRegistrationForm'), {
  loading: () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1A1F3C] rounded-2xl p-8 max-w-md w-full">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-48 mx-auto mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false
});

const TestimonialsSection = dynamic(() => import('../components/TestimonialsSection'), {
  loading: () => (
    <div className="py-20 bg-[#1A1F3C]">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-8"></div>
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false
});

const FAQSection = dynamic(() => import('../components/FAQSection'), {
  loading: () => (
    <div className="py-20 bg-[#0A0F2C]">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-8"></div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false
});

export default function FormationPage() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>('');

  const handleProgramRegistration = (programTitle: string) => {
    setSelectedProgram(programTitle);
    setShowRegistrationForm(true);
  };

  const formationStats = [
    { value: "85%", label: "Taux de placement", color: "green" as const },
    { value: "50+", label: "Entreprises partenaires", color: "blue" as const },
    { value: "200+", label: "Diplômés formés", color: "green" as const },
    { value: "4.8/5", label: "Satisfaction moyenne", color: "blue" as const }
  ];

  return (
    <PageLayout>
      {/* Registration Form Modal */}
      <FormationRegistrationForm
        isOpen={showRegistrationForm}
        onClose={() => setShowRegistrationForm(false)}
        selectedProgram={selectedProgram}
      />

      {/* Hero Section */}
      <PageHeader
        title={
          <>
            Transformez votre <span className="text-[#00C48C]">carrière</span>
            <br />
            avec nos formations <span className="text-[#007CF0]">tech</span>
          </>
        }
        subtitle="🚀 Formations certifiantes • 💼 Accompagnement carrière • 🎯 85% de placement • 💰 Financement possible"
        description="Rejoignez nos programmes intensifs et devenez expert en 4 à 8 mois. Nos anciens étudiants travaillent chez les meilleures entreprises tech d'Afrique."
        badges={[
          { text: "Certifications reconnues", variant: "success" },
          { text: "Projets concrets", variant: "info" },
          { text: "Mentorat inclus", variant: "success" }
        ]}
        centered
      />

      {/* Quick Stats */}
      <ContentSection background="gradient" className="py-12">
        <Grid cols={4} className="text-center">
          {formationStats.map((stat, index) => (
            <Card key={index} variant="glass" className="p-6">
              <Text size="2xl" weight="bold" color={stat.color === 'green' ? 'success' : 'primary'} className="mb-2">
                {stat.value}
              </Text>
              <Text size="sm" color="muted">{stat.label}</Text>
            </Card>
          ))}
        </Grid>
      </ContentSection>

      {/* Programs Section */}
      <ContentSection 
        title="Nos programmes de formation"
        subtitle="5 parcours intensifs pour maîtriser les technologies les plus demandées"
        centered
      >
        <Grid cols={2} className="lg:grid-cols-3">
          {FORMATION_PROGRAMS.map((program) => (
            <ProgramCard
              key={program.id}
              {...program}
            />
          ))}
        </Grid>

        {/* CTA after programs */}
        <div className="mt-16 text-center">
          <Card variant="primary" padding="xl" className="max-w-3xl mx-auto">
            <Heading level={3} className="mb-4">
              🎯 Pas sûr de votre choix ?
            </Heading>
            <Text className="mb-6">
              Réservez un entretien gratuit avec nos conseillers pour identifier 
              le programme qui correspond le mieux à vos objectifs.
            </Text>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowRegistrationForm(true)}
              icon={<span>📞</span>}
            >
              Entretien gratuit
            </Button>
          </Card>
        </div>
      </ContentSection>

      {/* Program Comparison */}
      <ContentSection background="dark">
        <ProgramComparison />
      </ContentSection>

      {/* Success Stories */}
      <ContentSection 
        title="Nos success stories"
        subtitle="Découvrez les parcours inspirants de nos anciens étudiants"
        centered
      >
        <TestimonialsSection testimonials={FORMATION_TESTIMONIALS} />
      </ContentSection>

      {/* Learning Method */}
      <ContentSection background="gradient">
        <div className="text-center mb-12">
          <Heading level={2} gradient className="mb-4">
            Notre méthode d'apprentissage
          </Heading>
          <Text size="lg" color="muted" className="max-w-3xl mx-auto">
            Une approche pratique et personnalisée pour garantir votre réussite
          </Text>
        </div>

        <Grid cols={2} className="lg:grid-cols-4">
          <Card hover className="text-center p-6">
            <div className="text-4xl mb-4">📚</div>
            <Heading level={4} className="mb-3 text-[#007CF0]">
              Théorie solide
            </Heading>
            <Text size="sm" color="muted">
              Concepts fondamentaux expliqués clairement par nos experts
            </Text>
          </Card>

          <Card hover className="text-center p-6">
            <div className="text-4xl mb-4">🛠️</div>
            <Heading level={4} className="mb-3 text-[#00C48C]">
              Pratique intensive
            </Heading>
            <Text size="sm" color="muted">
              70% du temps consacré à des projets concrets et réels
            </Text>
          </Card>

          <Card hover className="text-center p-6">
            <div className="text-4xl mb-4">👥</div>
            <Heading level={4} className="mb-3 text-[#007CF0]">
              Mentorat personnalisé
            </Heading>
            <Text size="sm" color="muted">
              Accompagnement individuel par des professionnels expérimentés
            </Text>
          </Card>

          <Card hover className="text-center p-6">
            <div className="text-4xl mb-4">🚀</div>
            <Heading level={4} className="mb-3 text-[#00C48C]">
              Insertion professionnelle
            </Heading>
            <Text size="sm" color="muted">
              Aide à la recherche d'emploi et réseau d'entreprises partenaires
            </Text>
          </Card>
        </Grid>
      </ContentSection>

      {/* FAQ Section */}
      <ContentSection 
        title="Questions fréquentes"
        subtitle="Tout ce que vous devez savoir sur nos formations"
        centered
      >
        <FAQSection faqs={FORMATION_FAQ} />
      </ContentSection>

      {/* Final CTA */}
      <CTASection
        title="Prêt à changer de vie ?"
        description="Rejoignez la prochaine promotion et donnez un nouvel élan à votre carrière. Places limitées !"
        primaryButton={{
          text: "Commencer mon inscription",
          onClick: () => setShowRegistrationForm(true),
          icon: <span>🎓</span>
        }}
        secondaryButton={{
          text: "Télécharger la brochure",
          onClick: () => console.log("Download brochure")
        }}
        variant="gradient"
      />
    </PageLayout>
  );
}