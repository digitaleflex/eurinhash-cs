"use client";
import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { PageLayout, PageHeader, ContentSection } from '../components/layout';
import { CTASection } from '../components/common';
import { Button, Grid, Card, Heading, Text, Badge } from '../components/ui';
import ServiceCard from '../components/ServiceCard';
import { SERVICES_PARTICULIERS, SERVICES_TESTIMONIALS, SERVICES_FAQ, SERVICE_CATEGORIES } from '../lib/servicesData';

// Lazy load non-critical components
const QuoteRequestForm = dynamic(() => import('../components/QuoteRequestForm'), {
  loading: () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1A1F3C] rounded-2xl p-8 max-w-md w-full">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-48 mx-auto mb-6"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
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
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false
});

export default function ParticuliersPage() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleQuoteRequest = (serviceId: string, serviceTitle: string) => {
    setSelectedService(serviceId);
    setSelectedServiceTitle(serviceTitle);
    setShowQuoteForm(true);
  };

  const filteredServices = activeCategory === 'all' 
    ? SERVICES_PARTICULIERS 
    : SERVICES_PARTICULIERS.filter(service => service.category === activeCategory);

  const serviceStats = [
    { value: "2h", label: "Temps de réponse", color: "green" as const },
    { value: "500+", label: "Clients satisfaits", color: "blue" as const },
    { value: "98%", label: "Problèmes résolus", color: "green" as const },
    { value: "24/7", label: "Support disponible", color: "blue" as const }
  ];

  return (
    <PageLayout>
      {/* Quote Request Form Modal */}
      <QuoteRequestForm
        isOpen={showQuoteForm}
        onClose={() => setShowQuoteForm(false)}
        selectedService={selectedService}
        serviceTitle={selectedServiceTitle}
      />

      {/* Hero Section */}
      <PageHeader
        title={
          <>
            Services <span className="text-[#FF6B6B]">informatiques</span>
            <br />
            pour <span className="text-[#00C48C]">particuliers</span>
          </>
        }
        subtitle="🏠 À domicile ou à distance • 💰 Tarifs accessibles • ⚡ Intervention rapide • 🛡️ Satisfaction garantie"
        description="Dépannage, création de sites web, formations personnalisées... Tous nos services tech à portée de main avec des prix adaptés aux particuliers."
        badges={[
          { text: "Devis gratuit", variant: "success" },
          { text: "Paiement flexible", variant: "info" },
          { text: "Garantie incluse", variant: "success" }
        ]}
        centered
      />

      {/* Quick Stats */}
      <ContentSection background="gradient" className="py-12">
        <Grid cols={4} className="text-center">
          {serviceStats.map((stat, index) => (
            <Card key={index} variant="glass" className="p-6">
              <Text size="2xl" weight="bold" color={stat.color === 'green' ? 'success' : 'primary'} className="mb-2">
                {stat.value}
              </Text>
              <Text size="sm" color="muted">{stat.label}</Text>
            </Card>
          ))}
        </Grid>
      </ContentSection>

      {/* Service Categories Filter */}
      <ContentSection>
        <div className="text-center mb-8">
          <Heading level={2} gradient className="mb-4">
            Nos services pour particuliers
          </Heading>
          <Text size="lg" color="muted" className="mb-8">
            Des solutions simples et abordables pour tous vos besoins informatiques
          </Text>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              variant={activeCategory === 'all' ? 'primary' : 'secondary'}
              onClick={() => setActiveCategory('all')}
            >
              Tous les services
            </Button>
            {SERVICE_CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'primary' : 'secondary'}
                onClick={() => setActiveCategory(category.id)}
                icon={<span>{category.icon}</span>}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <Grid cols={2} className="lg:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              onRequestQuote={handleQuoteRequest}
            />
          ))}
        </Grid>

        {/* Emergency CTA */}
        <div className="mt-16 text-center">
          <Card variant="primary" padding="xl" className="max-w-3xl mx-auto">
            <div className="text-4xl mb-4">🚨</div>
            <Heading level={3} className="mb-4 text-red-400">
              Problème urgent ?
            </Heading>
            <Text className="mb-6">
              Votre ordinateur ne démarre plus ? Virus détecté ? Données perdues ?
              <br />
              Appelez-nous maintenant pour une intervention d'urgence !
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowQuoteForm(true)}
                icon={<span>📞</span>}
                className="animate-pulse"
              >
                Appel d'urgence
              </Button>
              <div className="flex items-center gap-2 text-sm text-[#00C48C]">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                <span>Disponible 7j/7 • Intervention sous 2h</span>
              </div>
            </div>
          </Card>
        </div>
      </ContentSection>

      {/* How it works */}
      <ContentSection background="dark">
        <div className="text-center mb-12">
          <Heading level={2} gradient className="mb-4">
            Comment ça marche ?
          </Heading>
          <Text size="lg" color="muted">
            Un processus simple en 4 étapes
          </Text>
        </div>

        <Grid cols={2} className="lg:grid-cols-4">
          <Card hover className="text-center p-6">
            <div className="text-4xl mb-4">📞</div>
            <Heading level={4} className="mb-3 text-[#007CF0]">
              1. Contact
            </Heading>
            <Text size="sm" color="muted">
              Appelez-nous ou remplissez le formulaire en ligne
            </Text>
          </Card>

          <Card hover className="text-center p-6">
            <div className="text-4xl mb-4">🔍</div>
            <Heading level={4} className="mb-3 text-[#00C48C]">
              2. Diagnostic
            </Heading>
            <Text size="sm" color="muted">
              Diagnostic gratuit de votre problème ou besoin
            </Text>
          </Card>

          <Card hover className="text-center p-6">
            <div className="text-4xl mb-4">💰</div>
            <Heading level={4} className="mb-3 text-[#007CF0]">
              3. Devis
            </Heading>
            <Text size="sm" color="muted">
              Devis transparent et détaillé sans surprise
            </Text>
          </Card>

          <Card hover className="text-center p-6">
            <div className="text-4xl mb-4">✅</div>
            <Heading level={4} className="mb-3 text-[#00C48C]">
              4. Intervention
            </Heading>
            <Text size="sm" color="muted">
              Résolution rapide avec garantie incluse
            </Text>
          </Card>
        </Grid>
      </ContentSection>

      {/* Testimonials */}
      <ContentSection 
        title="Ce que disent nos clients"
        subtitle="Des particuliers satisfaits qui nous font confiance"
        centered
      >
        <TestimonialsSection testimonials={SERVICES_TESTIMONIALS} />
      </ContentSection>

      {/* Pricing transparency */}
      <ContentSection background="gradient">
        <div className="text-center mb-12">
          <Heading level={2} gradient className="mb-4">
            Tarifs transparents
          </Heading>
          <Text size="lg" color="muted" className="mb-8">
            Pas de surprise, des prix justes et adaptés aux particuliers
          </Text>
        </div>

        <div className="max-w-4xl mx-auto">
          <Grid cols={1} className="md:grid-cols-2 lg:grid-cols-3">
            <Card variant="success" className="p-6">
              <Heading level={4} className="mb-3 text-[#00C48C]">
                💡 Diagnostic
              </Heading>
              <Text size="2xl" weight="bold" className="mb-2">GRATUIT</Text>
              <Text size="sm" color="muted">
                Évaluation complète de votre problème sans engagement
              </Text>
            </Card>

            <Card variant="primary" className="p-6">
              <Heading level={4} className="mb-3 text-[#007CF0]">
                🔧 Dépannage
              </Heading>
              <Text size="2xl" weight="bold" className="mb-2">15,000 FCFA</Text>
              <Text size="sm" color="muted">
                À partir de • Intervention + réparation simple
              </Text>
            </Card>

            <Card variant="glass" className="p-6">
              <Heading level={4} className="mb-3">
                📚 Formation
              </Heading>
              <Text size="2xl" weight="bold" className="mb-2">8,000 FCFA</Text>
              <Text size="sm" color="muted">
                Par heure • Cours particulier à domicile
              </Text>
            </Card>
          </Grid>

          <div className="mt-8 text-center">
            <Card variant="primary" padding="lg" className="inline-block">
              <Text weight="semibold" className="mb-2">
                🎁 Offres spéciales :
              </Text>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Réduction 10% pour les seniors (+60 ans)</li>
                <li>• Forfait famille : 3 formations = 2 payées</li>
                <li>• Paiement en 3x sans frais ({'>'}100,000 FCFA)</li>
              </ul>
            </Card>
          </div>
        </div>
      </ContentSection>

      {/* FAQ Section */}
      <ContentSection 
        title="Questions fréquentes"
        subtitle="Tout ce que vous devez savoir sur nos services"
        centered
      >
        <FAQSection faqs={SERVICES_FAQ} />
      </ContentSection>

      {/* Final CTA */}
      <CTASection
        title="Besoin d'aide avec votre informatique ?"
        description="Ne restez pas bloqué ! Contactez-nous pour un diagnostic gratuit et une solution rapide à votre problème."
        primaryButton={{
          text: "Demander un devis gratuit",
          onClick: () => setShowQuoteForm(true),
          icon: <span>💬</span>
        }}
        secondaryButton={{
          text: "Appeler maintenant",
          onClick: () => window.open('tel:+221771234567', '_self')
        }}
        variant="gradient"
      />
    </PageLayout>
  );
}