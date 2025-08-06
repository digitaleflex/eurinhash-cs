"use client";
import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import HeroSection from "../components/HeroSection";
import PageLayout from "../components/layout/PageLayout";
import ContentSection from "../components/layout/ContentSection";
import CTASection from "../components/common/CTASection";
import FeatureList from "../components/common/FeatureList";
import StatsList from "../components/common/StatsList";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Heading from "../components/ui/Heading";
import Text from "../components/ui/Text";
import Badge from "../components/ui/Badge";
import Flex from "../components/ui/Flex";

// Lazy load non-critical components
const SuccessAlert = dynamic(() => import("../components/SuccessAlert"), {
  ssr: false
});

const ErrorAlert = dynamic(() => import("../components/ErrorAlert"), {
  ssr: false
});

const FAQSection = dynamic(() => import("../components/FAQSection"), {
  loading: () => (
    <div className="py-20 bg-[#0A0F2C]">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-8"></div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false
});

const TestimonialsSection = dynamic(() => import("../components/TestimonialsSection"), {
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

export default function EntreprisePage() {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Performance monitoring
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('../lib/performanceMonitoring').then(({ performanceMonitor }) => {
        if (performanceMonitor) {
          // Report metrics after page is fully loaded
          setTimeout(() => {
            performanceMonitor.reportMetrics();
          }, 3000);
        }
      });
    }
  }, []);

  // Date de référence : 5 juin 2025
  const baseDate = new Date("2025-06-05T00:00:00Z");

  // Date de lancement officielle : 90 jours après la date de référence
  const launchDate = new Date(baseDate);
  launchDate.setDate(baseDate.getDate() + 90);

  // Fonction pour calculer le temps restant
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = launchDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Fix hydration issue by only calculating time on client
    setIsClient(true);
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          interest: formData.get("interest"),
          consent: formData.get("consent") === "on",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setShowNewsletter(false);
        setErrorMessage(data.error || "Une erreur est survenue");
        setShowError(true);
        return;
      }
      setShowNewsletter(false);
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Une erreur est survenue"
      );
      setShowError(true);
    }
  };

  // Données pour les composants réutilisables
  const enterpriseFeatures = [
    {
      icon: "🔐",
      title: "Sécurité Militaire",
      description: "Chiffrement AES-256, authentification multi-facteurs, conformité RGPD garantie.",
      badge: "Certifié ISO 27001"
    },
    {
      icon: "☁️",
      title: "Cloud Intelligent",
      description: "Infrastructure auto-scalable, déploiement en 1-clic, monitoring 24/7.",
      badge: "99.9% de disponibilité"
    },
    {
      icon: "🎓",
      title: "Formation Expert",
      description: "Programmes certifiants, mentorat personnalisé, mise en pratique immédiate.",
      badge: "Certification reconnue"
    },
    {
      icon: "🤖",
      title: "IA Intégrée",
      description: "Automatisation intelligente, analyse prédictive, optimisation continue.",
      stats: "Gain de 70% de temps"
    },
    {
      icon: "⚡",
      title: "Performance Max",
      description: "Temps de réponse ultra-rapide, CDN global, optimisation automatique.",
      stats: "10x plus rapide"
    },
    {
      icon: "🎯",
      title: "Solutions Sur-Mesure",
      description: "Analyse de vos besoins, développement personnalisé, accompagnement complet.",
      badge: "ROI garanti"
    }
  ];

  const enterpriseStats = [
    {
      value: "5+",
      label: "Années d'expérience",
      color: "blue" as const,
      trend: "+20% cette année"
    },
    {
      value: "50+",
      label: "Projets réalisés",
      color: "green" as const,
      trend: "Croissance continue"
    },
    {
      value: "24/7",
      label: "Support disponible",
      color: "blue" as const
    },
    {
      value: "100%",
      label: "Satisfaction client",
      color: "green" as const,
      trend: "Depuis 2019"
    }
  ];

  return (
    <PageLayout withNavigation={false}>
      {/* Popups d'alerte */}
      {showSuccess && (
        <SuccessAlert message="" onClose={() => setShowSuccess(false)} />
      )}
      {showError && (
        <ErrorAlert
          message={errorMessage}
          onClose={() => setShowError(false)}
        />
      )}
      
{/* Newsletter Popup */}
      {showNewsletter && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1F3C] rounded-2xl p-8 max-w-md w-full relative transform transition-all duration-300 scale-100">
            <button
              onClick={() => setShowNewsletter(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-2xl font-bold mb-2 hero-title text-[#00C48C]">
                AUDIT SÉCURITÉ GRATUIT
              </h3>
              <p className="text-gray-300 mb-2">
                <strong>Découvrez vos failles</strong> avant les hackers
              </p>
              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 mb-4">
                <div className="flex justify-center items-center gap-2 text-sm text-red-300">
                  <span>⚠️</span>
                  <span className="font-semibold">
                    Votre entreprise est-elle protégée à 100% ?
                  </span>
                  <span>⚠️</span>
                </div>
              </div>
              <div className="text-xs text-[#00C48C] flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Réponse garantie sous 24h • 100% confidentiel</span>
              </div>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="📧 Votre email professionnel"
                  required
                  className="w-full px-6 py-4 bg-[#0A0F2C]/50 border border-[#007CF0]/30 rounded-lg focus:outline-none focus:border-[#007CF0] focus:ring-2 focus:ring-[#007CF0]/20 text-white placeholder-gray-400 text-lg"
                />
              </div>

              <input type="hidden" name="interest" value="security" />
              <input type="hidden" name="consent" value="on" />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00C48C] to-[#007CF0] hover:from-[#007CF0] hover:to-[#00C48C] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-xl shadow-lg hover:shadow-xl"
              >
                🛡️ AUDIT GRATUIT EN 24H
              </button>

              <p className="text-xs text-gray-400 text-center">
                En cliquant, vous acceptez notre politique de confidentialité.
                <br />
                <strong>Aucun spam</strong> • Désabonnement en 1 clic
              </p>
            </form>

            <div className="mt-6 p-4 bg-[#0A0F2C]/50 rounded-lg border border-[#007CF0]/20">
              <h4 className="text-sm font-semibold mb-2 text-[#00C48C]">
                🔒 Protection de vos données
              </h4>
              <ul className="text-xs text-gray-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#007CF0]">•</span>
                  <span>
                    Vos données sont chiffrées et stockées de manière sécurisée
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#007CF0]">•</span>
                  <span>Conformité RGPD et CNIL garantie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#007CF0]">•</span>
                  <span>
                    Droit de modification et suppression à tout moment
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#007CF0]">•</span>
                  <span>Aucun partage avec des tiers</span>
                </li>
              </ul>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Vos données sont protégées et ne seront jamais partagées.
            </p>
          </div>
        </div>
      )} 
     {/* Hero Section */}
      <HeroSection
        title={
          <>
            Arrêtez de subir les{" "}
            <span className="text-red-400">cyberattaques</span>
            <br />
            Devenez <span className="text-[#007CF0]">invincible</span> avec
            EurinHash
          </>
        }
        subtitle="🛡️ Sécurité Militaire • ☁️ Cloud Intelligent • 🤖 IA Prédictive • 🎯 ROI Garanti"
        description="En 90 jours, transformez votre PME en forteresse digitale. Nos clients économisent 40% de leurs coûts IT et dorment tranquilles. Garantie satisfait ou remboursé."
        onCTAClick={() => setShowNewsletter(true)}
        socialProof="🔥 247 dirigeants nous font déjà confiance"
        badges={["Certifié ISO 27001", "99.9% Disponibilité", "Support 24/7"]}
      />

      {/* Stats Section - Immédiatement après le hero pour crédibilité */}
      <ContentSection background="gradient" className="py-16">
        <StatsList stats={enterpriseStats} columns={4} />
      </ContentSection>

      {/* Features */}
      <ContentSection 
        title="Pourquoi choisir EurinHash ?"
        centered
      >
        <FeatureList features={enterpriseFeatures} columns={3} />

        
        {/* CTA de rappel après les features */}
        <CTASection
          title="⚠️ Votre entreprise est-elle vulnérable ?"
          description="83% des PME subissent une cyberattaque dans les 12 mois. Ne soyez pas la prochaine victime."
          primaryButton={{
            text: "Audit Sécurité GRATUIT",
            onClick: () => setShowNewsletter(true),
            icon: <span>🛡️</span>
          }}
          variant="gradient"
          className="mt-16"
        />
      </ContentSection>    
  {/* FAQ Section - Traiter les objections tôt */}
      <FAQSection
        faqs={[
          {
            icon: "🤔",
            question: "Qu'est-ce qui rend EurinHash différent ?",
            answer:
              "Nous combinons expertise technique, approche personnalisée et technologies de pointe. Chaque solution est conçue sur-mesure pour maximiser votre ROI.",
          },
          {
            icon: "⏱️",
            question: "Combien de temps pour voir les résultats ?",
            answer:
              "Nos clients constatent des améliorations dès les premières semaines. Pour une transformation complète, comptez 2-3 mois selon la complexité de votre projet.",
          },
          {
            icon: "💰",
            question: "Quel est l'investissement nécessaire ?",
            answer:
              "Nos solutions s'adaptent à tous les budgets (à partir de 150,000 FCFA/mois). Audit gratuit inclus, puis tarification transparente basée sur vos besoins réels. ROI garanti sous 6 mois.",
          },
          {
            icon: "🛡️",
            question: "Mes données sont-elles vraiment sécurisées ?",
            answer:
              "Absolument. Chiffrement militaire, conformité RGPD, certifications ISO 27001. Vos données restent sous votre contrôle total, toujours.",
          },
        ]}
      />

      {/* Countdown - Maintenant après FAQ pour créer urgence */}
      <ContentSection background="dark" centered>
        <Heading level={2} className="mb-4">⏰ Plus que quelques jours !</Heading>
        <Text size="lg" color="muted" className="mb-8 max-w-2xl mx-auto">
          Ne manquez pas le lancement officiel d'EurinHash
        </Text>
        
        <Flex justify="center" gap="lg" className="mb-8">
          <Card variant="primary" padding="md" className="text-center">
            <Text size="2xl" weight="bold" color="primary" className="mb-1">
              {isClient ? timeLeft.days : '--'}
            </Text>
            <Text size="sm" color="muted">Jours</Text>
          </Card>
          <Card variant="success" padding="md" className="text-center">
            <Text size="2xl" weight="bold" color="success" className="mb-1">
              {isClient ? timeLeft.hours : '--'}
            </Text>
            <Text size="sm" color="muted">Heures</Text>
          </Card>
          <Card variant="primary" padding="md" className="text-center">
            <Text size="2xl" weight="bold" color="primary" className="mb-1">
              {isClient ? timeLeft.minutes : '--'}
            </Text>
            <Text size="sm" color="muted">Minutes</Text>
          </Card>
          <Card variant="success" padding="md" className="text-center">
            <Text size="2xl" weight="bold" color="success" className="mb-1">
              {isClient ? timeLeft.seconds : '--'}
            </Text>
            <Text size="sm" color="muted">Secondes</Text>
          </Card>
        </Flex>
        
        <Card variant="primary" padding="lg" className="inline-block">
          <Badge variant="info" className="mb-2">
            🚀 Lancement officiel
          </Badge>
          <Text size="xl" weight="bold">
            {launchDate.toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
        </Card>
      </ContentSection>      {/*
 Urgency Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/20 to-orange-900/20 border-t border-red-500/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title mb-4 text-red-400">
            🚨 ALERTE SÉCURITÉ
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            <strong>Chaque minute qui passe</strong>, votre entreprise est
            exposée. Les hackers ne prennent pas de vacances.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/50 transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-3">💀</div>
              <h3 className="text-xl font-bold mb-3 text-red-400">
                60% des PME ferment
              </h3>
              <p className="text-gray-300">
                après une cyberattaque majeure.
                <br />
                <strong>Voulez-vous prendre ce risque ?</strong>
              </p>
            </div>
            <div className="bg-orange-900/20 p-6 rounded-xl border border-orange-500/50 transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-3">⏰</div>
              <h3 className="text-xl font-bold mb-3 text-orange-400">
                287 jours en moyenne
              </h3>
              <p className="text-gray-300">
                pour détecter une intrusion.
                <br />
                <strong>Trop tard pour réagir.</strong>
              </p>
            </div>
            <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/50 transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-xl font-bold mb-3 text-green-400">
                0 incident
              </h3>
              <p className="text-gray-300">
                chez nos clients protégés.
                <br />
                <strong>Rejoignez-les maintenant.</strong>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#007CF0]/20 to-[#00C48C]/20 p-8 rounded-2xl border border-[#007CF0]/50 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🎁</span>
              <h3 className="text-2xl font-bold text-[#00C48C]">
                OFFRE LIMITÉE - 72H SEULEMENT
              </h3>
              <span className="text-2xl">🎁</span>
            </div>

            <div className="bg-[#0A0F2C]/80 p-6 rounded-xl mb-6">
              <div className="text-4xl font-bold text-[#00C48C] mb-2">
                1,637,500 FCFA d'économies
              </div>
              <p className="text-gray-300 mb-4">
                pour les 50 premiers inscrits :
              </p>

              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[#00C48C] text-xl">✓</span>
                    <span className="text-gray-300">
                      <strong>Audit complet GRATUIT</strong> (valeur 327,500
                      FCFA)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#00C48C] text-xl">✓</span>
                    <span className="text-gray-300">
                      <strong>6 mois support premium</strong> (valeur 786,000
                      FCFA)
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[#00C48C] text-xl">✓</span>
                    <span className="text-gray-300">
                      <strong>Formation équipe</strong> (valeur 524,000 FCFA)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#00C48C] text-xl">✓</span>
                    <span className="text-gray-300">
                      <strong>Garantie 100%</strong> satisfait ou remboursé
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowNewsletter(true)}
                className="text-xl px-12 py-4 animate-pulse"
                icon={<span>🚀</span>}
              >
                SÉCURISER MON ENTREPRISE
              </Button>
              <div className="text-sm text-red-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <span>
                  <strong>Plus que 23 places disponibles</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>      {
/* Testimonials */}
      <TestimonialsSection
        testimonials={[
          {
            name: "Marie Dubois",
            company: "TechStart SAS",
            role: "Directrice IT",
            content:
              "Depuis qu'EurinHash sécurise notre infrastructure, je dors tranquille. Zéro incident en 18 mois, équipe ultra-réactive. Un investissement qui nous a sauvés !",
            rating: 5,
          },
          {
            name: "Pierre Martin",
            company: "Innov Solutions",
            role: "CEO",
            content:
              "40% d'économies sur nos coûts IT et une sécurité de niveau bancaire. EurinHash a transformé notre PME en forteresse digitale. Recommandé les yeux fermés !",
            rating: 5,
          },
          {
            name: "Sophie Laurent",
            company: "Digital Corp",
            role: "CTO",
            content:
              "L'audit gratuit a révélé 12 failles critiques que nous ignorions. En 30 jours, tout était sécurisé. Professionnalisme et expertise au top niveau.",
            rating: 5,
          },
        ]}
      />

      {/* Quote */}
      <section className="py-20 bg-[#1A1F3C]">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="max-w-3xl mx-auto">
            <p className="text-2xl italic mb-4">
              "Dans un monde digital en constante évolution, la sécurité et
              l'innovation ne sont plus des options, mais des nécessités.
              EurinHash vous accompagne vers l'excellence digitale."
            </p>
            <footer className="text-[#007CF0] font-bold">
              — Eurin Hash, Expert en Solutions Digitales
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title">Connectez-vous avec nous</h2>
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:space-x-8 md:gap-0 max-w-full overflow-x-auto py-4">
            <a
              href="https://www.linkedin.com/in/eurindalemeida/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-2xl hover:text-[#007CF0] transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 10.268h-3v-4.604c0-1.099-.021-2.513-1.531-2.513-1.531 0-1.767 1.197-1.767 2.434v4.683h-3v-9h2.881v1.233h.041c.401-.761 1.381-1.563 2.845-1.563 3.042 0 3.604 2.003 3.604 4.605v4.725z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/digitaleflex"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-2xl hover:text-[#007CF0] transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576 4.765-1.588 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://wa.me/22962265246"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-2xl hover:text-[#007CF0] transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.26-1.64A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.26-1.44l-.38-.22-3.72.98.99-3.62-.25-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43s1.02 2.82 1.16 3.02c.14.2 2.01 3.07 4.88 4.19.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="mailto:eurinhash@gmail.com"
              className="flex items-center gap-2 text-2xl hover:text-[#007CF0] transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
              </svg>
              Email
            </a>
            <a
              href="https://www.facebook.com/eurincode"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-2xl hover:text-[#007CF0] transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.592 1.325-1.326V1.326C24 .592 23.405 0 22.675 0" />
              </svg>
              Facebook
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}