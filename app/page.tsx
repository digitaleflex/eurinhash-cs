"use client";
import { useState, useEffect } from "react";
import SuccessAlert from "./components/SuccessAlert";
import ErrorAlert from "./components/ErrorAlert";
import HeroSection from "./components/HeroSection";
import Section from "./components/ui/Section";
import FeatureCard from "./components/FeatureCard";
import StatCard from "./components/StatCard";
import FAQSection from "./components/FAQSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Button from "./components/ui/Button";

export default function Home() {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Nettoyer l'intervalle lors du démontage du composant
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0]">
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
        subtitle="�️ Sécurité Militaire • ☁️ Cloud Intelligent • 🤖 IA Prédictive • 🎯 ROI Garanti"
        description="En 90 jours, transformez votre PME en forteresse digitale. Nos clients économisent 40% de leurs coûts IT et dorment tranquilles. Garantie satisfait ou remboursé."
        onCTAClick={() => setShowNewsletter(true)}
        socialProof="🔥 247 dirigeants nous font déjà confiance"
        badges={["Certifié ISO 27001", "99.9% Disponibilité", "Support 24/7"]}
      />

      {/* Stats Section - Immédiatement après le hero pour crédibilité */}
      <Section background="gradient" padding="md">
        <div className="grid md:grid-cols-4 gap-8">
          <StatCard
            value="5+"
            label="Années d'expérience"
            color="blue"
            trend="+20% cette année"
          />
          <StatCard
            value="50+"
            label="Projets réalisés"
            color="green"
            trend="Croissance continue"
          />
          <StatCard value="24/7" label="Support disponible" color="blue" />
          <StatCard
            value="100%"
            label="Satisfaction client"
            color="green"
            trend="Depuis 2019"
          />
        </div>
      </Section>

      {/* Features */}
      <Section>
        <h2 className="section-title text-center">
          Pourquoi choisir EurinHash ?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="🔐"
            title="Sécurité Militaire"
            description="Chiffrement AES-256, authentification multi-facteurs, conformité RGPD garantie."
            badge="Certifié ISO 27001"
          />
          <FeatureCard
            icon="☁️"
            title="Cloud Intelligent"
            description="Infrastructure auto-scalable, déploiement en 1-clic, monitoring 24/7."
            badge="99.9% de disponibilité"
          />
          <FeatureCard
            icon="🎓"
            title="Formation Expert"
            description="Programmes certifiants, mentorat personnalisé, mise en pratique immédiate."
            badge="Certification reconnue"
          />
          <FeatureCard
            icon="🤖"
            title="IA Intégrée"
            description="Automatisation intelligente, analyse prédictive, optimisation continue."
            stats="Gain de 70% de temps"
          />
          <FeatureCard
            icon="⚡"
            title="Performance Max"
            description="Temps de réponse ultra-rapide, CDN global, optimisation automatique."
            stats="10x plus rapide"
          />
          <FeatureCard
            icon="🎯"
            title="Solutions Sur-Mesure"
            description="Analyse de vos besoins, développement personnalisé, accompagnement complet."
            badge="ROI garanti"
          />
        </div>

        {/* CTA de rappel après les features */}
        <div className="text-center mt-16 bg-gradient-to-r from-[#007CF0]/10 to-[#00C48C]/10 p-8 rounded-2xl border border-[#007CF0]/30">
          <h3 className="text-3xl font-bold mb-4 text-white">
            ⚠️ Votre entreprise est-elle{" "}
            <span className="text-red-400">vulnérable</span> ?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-lg">
            <strong>83% des PME</strong> subissent une cyberattaque dans les 12
            mois.
            <br />
            Ne soyez pas la prochaine victime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowNewsletter(true)}
              icon={<span>🛡️</span>}
            >
              Audit Sécurité GRATUIT
            </Button>
            <div className="text-sm text-[#00C48C] flex items-center gap-2">
              <span>⏰</span>
              <span>Réponse sous 24h • Sans engagement</span>
            </div>
          </div>
        </div>
      </Section>

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
      <section className="py-20 bg-[#1A1F3C]">
        <div className="container mx-auto text-center">
          <h2 className="section-title">⏰ Plus que quelques jours !</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Ne manquez pas le lancement officiel d'EurinHash
          </p>
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center bg-[#0A0F2C]/50 p-4 rounded-xl border border-[#007CF0]/30">
              <div className="text-4xl font-bold text-[#007CF0]">
                {timeLeft.days}
              </div>
              <div className="text-sm text-gray-400">Jours</div>
            </div>
            <div className="text-center bg-[#0A0F2C]/50 p-4 rounded-xl border border-[#007CF0]/30">
              <div className="text-4xl font-bold text-[#00C48C]">
                {timeLeft.hours}
              </div>
              <div className="text-sm text-gray-400">Heures</div>
            </div>
            <div className="text-center bg-[#0A0F2C]/50 p-4 rounded-xl border border-[#007CF0]/30">
              <div className="text-4xl font-bold text-[#007CF0]">
                {timeLeft.minutes}
              </div>
              <div className="text-sm text-gray-400">Minutes</div>
            </div>
            <div className="text-center bg-[#0A0F2C]/50 p-4 rounded-xl border border-[#007CF0]/30">
              <div className="text-4xl font-bold text-[#00C48C]">
                {timeLeft.seconds}
              </div>
              <div className="text-sm text-gray-400">Secondes</div>
            </div>
          </div>
          <div className="p-6 bg-gradient-to-r from-[#007CF0]/20 to-[#00C48C]/20 rounded-2xl border border-[#007CF0]/30 inline-block">
            <div className="text-[#007CF0] font-semibold mb-2">
              🚀 Lancement officiel
            </div>
            <div className="text-2xl font-orbitron text-white">
              {launchDate.toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
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
      </section>

      {/* Testimonials */}
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
    </main>
  );
}
