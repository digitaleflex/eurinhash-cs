import {
  FaCogs,
  FaEnvelope,
  FaUserShield,
  FaLightbulb,
  FaRocket,
  FaLinkedin,
  FaGithub,
  FaUsers,
  FaAward,
  FaCode,
  FaChartLine,
  FaShieldAlt,
  FaCloud,
  FaGraduationCap,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Metadata } from "next";
import NewsletterForm from "@/app/components/NewsletterForm";
import { NewsletterType, SubscriptionSource } from "@prisma/client";

export const metadata: Metadata = {
  title:
    "À propos d'EurinHash | Expert Cloud & Cybersécurité | Formation Digitale",
  description:
    "Découvrez EurinHash, votre partenaire expert en architecture cloud, cybersécurité et transformation digitale. Plus de 10 ans d'expérience, 500+ clients accompagnés, 98% de satisfaction.",
  keywords:
    "EurinHash, expert cloud, cybersécurité, formation digitale, architecture solutions, consulting IT, transformation numérique",
  openGraph: {
    title:
      "EurinHash - Le Hub Central du Digital | Expert Cloud & Cybersécurité",
    description:
      "Plateforme d'excellence numérique où convergent expertise cloud, cybersécurité de pointe et innovation technologique. Rejoignez 500+ clients satisfaits.",
    type: "website",
  },
};

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0] px-4 py-16">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto mb-20 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00C48C]/10 via-transparent to-[#007CF0]/10 rounded-3xl blur-3xl"></div>
        <div className="relative bg-[#1A1F3C]/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-[#00C48C]/20 hover:border-[#00C48C]/40 transition-all duration-500">
          <div className="bg-gradient-to-r from-[#00C48C] to-[#007CF0] p-6 rounded-full mb-8 w-fit mx-auto animate-pulse">
            <FaLightbulb className="text-4xl text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#00C48C] via-white to-[#007CF0] bg-clip-text text-transparent leading-tight">
            EurinHash
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-6 text-gray-300">
            Votre Partenaire d'Excellence Numérique
          </p>
          <p className="text-xl text-gray-200 mb-4 max-w-4xl mx-auto leading-relaxed">
            <strong>Transformez votre vision digitale en réalité</strong> avec
            notre expertise reconnue en cybersécurité avancée, architecture
            cloud souveraine et solutions d'innovation technologique.
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Rejoignez{" "}
            <span className="text-[#00C48C] font-semibold">
              500+ entreprises
            </span>{" "}
            qui nous font confiance pour construire leur avenir numérique avec
            des architectures <em>sécurisées, performantes et évolutives</em>.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-[#1A1F3C]/80 p-6 rounded-2xl text-center border border-[#00C48C]/20 hover:border-[#00C48C]/40 transition-all duration-300 hover:scale-105">
            <FaCode className="text-3xl text-[#00C48C] mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">10+</div>
            <div className="text-gray-400 text-sm">Années d'expérience</div>
          </div>
          <div className="bg-[#1A1F3C]/80 p-6 rounded-2xl text-center border border-[#007CF0]/20 hover:border-[#007CF0]/40 transition-all duration-300 hover:scale-105">
            <FaUsers className="text-3xl text-[#007CF0] mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">500+</div>
            <div className="text-gray-400 text-sm">Clients accompagnés</div>
          </div>
          <div className="bg-[#1A1F3C]/80 p-6 rounded-2xl text-center border border-[#00C48C]/20 hover:border-[#00C48C]/40 transition-all duration-300 hover:scale-105">
            <FaAward className="text-3xl text-[#00C48C] mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">15+</div>
            <div className="text-gray-400 text-sm">Certifications</div>
          </div>
          <div className="bg-[#1A1F3C]/80 p-6 rounded-2xl text-center border border-[#007CF0]/20 hover:border-[#007CF0]/40 transition-all duration-300 hover:scale-105">
            <FaChartLine className="text-3xl text-[#007CF0] mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">98%</div>
            <div className="text-gray-400 text-sm">Satisfaction client</div>
          </div>
        </div>
      </section>
      {/* Mission Section - Layout asymétrique */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <section className="bg-[#1A1F3C]/90 p-10 rounded-3xl shadow-2xl border border-[#007CF0]/20 hover:border-[#007CF0]/40 transition-all duration-500 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-[#007CF0] to-[#00C48C] p-4 rounded-2xl">
                  <FaCogs className="text-3xl text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#007CF0] to-[#00C48C] bg-clip-text text-transparent">
                  Notre Mission
                </h2>
              </div>
              <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                <strong>Accélérer votre transformation digitale</strong> grâce à
                notre expertise reconnue en architecture de solutions, cloud
                computing avancé et cybersécurité de niveau entreprise.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#007CF0]/10 p-4 rounded-xl border border-[#007CF0]/20 hover:bg-[#007CF0]/20 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <FaGraduationCap className="text-[#007CF0]" />
                    <h3 className="font-semibold text-[#007CF0]">
                      Formation Premium
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Certifications reconnues + méthodes éprouvées sur le terrain
                  </p>
                </div>
                <div className="bg-[#00C48C]/10 p-4 rounded-xl border border-[#00C48C]/20 hover:bg-[#00C48C]/20 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <FaUserShield className="text-[#00C48C]" />
                    <h3 className="font-semibold text-[#00C48C]">
                      Consulting Expert
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Accompagnement stratégique sur-mesure pour vos défis
                    techniques
                  </p>
                </div>
                <div className="bg-[#007CF0]/10 p-4 rounded-xl border border-[#007CF0]/20 hover:bg-[#007CF0]/20 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCloud className="text-[#007CF0]" />
                    <h3 className="font-semibold text-[#007CF0]">
                      Cloud Souverain
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Architectures cloud sécurisées et conformes aux
                    réglementations
                  </p>
                </div>
                <div className="bg-[#00C48C]/10 p-4 rounded-xl border border-[#00C48C]/20 hover:bg-[#00C48C]/20 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <FaShieldAlt className="text-[#00C48C]" />
                    <h3 className="font-semibold text-[#00C48C]">
                      Ressources VIP
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Templates, guides et outils exclusifs pour vos projets
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#00C48C]/20 to-[#007CF0]/20 p-6 rounded-2xl border border-[#00C48C]/30">
              <blockquote className="text-lg italic text-gray-200 leading-relaxed">
                "Dans un monde où 95% des cyberattaques réussissent par erreur
                humaine, la formation et l'expertise technique ne sont plus un
                luxe, mais une nécessité vitale."
              </blockquote>
              <cite className="text-[#00C48C] font-semibold mt-3 block">
                — Eurin Hash, Fondateur
              </cite>
            </div>
          </div>
        </div>
      </div>
      {/* Vision Section - Layout inversé */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="bg-gradient-to-br from-[#00C48C]/10 to-[#007CF0]/10 p-8 rounded-3xl border border-[#00C48C]/20">
            <div className="bg-gradient-to-r from-[#00C48C] to-[#007CF0] p-6 rounded-2xl mb-6 w-fit">
              <FaRocket className="text-4xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#00C48C] mb-4">
              Excellence
            </h3>
            <p className="text-gray-300">
              Construire le futur numérique avec les plus hauts standards de
              qualité.
            </p>
          </div>
          <div className="md:col-span-2">
            <section className="bg-[#1A1F3C]/90 p-10 rounded-3xl shadow-2xl border border-[#00C48C]/20 hover:border-[#00C48C]/40 transition-all duration-500">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#00C48C] to-[#007CF0] bg-clip-text text-transparent">
                Notre Vision
              </h2>
              <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                <strong>Construire l'avenir numérique français</strong> avec des
                solutions souveraines, sécurisées et performantes. Parce que
                votre indépendance technologique détermine votre compétitivité
                de demain.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-[#007CF0]/10 rounded-xl hover:bg-[#007CF0]/20 transition-all duration-300">
                  <div className="w-2 h-2 bg-[#007CF0] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <strong>Innovation responsable :</strong> La technologie au
                    service de l'humain et de la performance durable
                  </p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-[#00C48C]/10 rounded-xl hover:bg-[#00C48C]/20 transition-all duration-300">
                  <div className="w-2 h-2 bg-[#00C48C] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <strong>Sécurité by design :</strong> Chaque architecture
                    intègre la cybersécurité dès sa conception
                  </p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-[#007CF0]/10 rounded-xl hover:bg-[#007CF0]/20 transition-all duration-300">
                  <div className="w-2 h-2 bg-[#007CF0] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <strong>Excellence continue :</strong> L'apprentissage
                    permanent comme bouclier contre l'obsolescence
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Founder Section - Design centré */}
      <section className="max-w-4xl mx-auto mb-20">
        <div className="bg-[#1A1F3C]/90 p-12 rounded-3xl shadow-2xl border border-[#007CF0]/20 hover:border-[#007CF0]/40 transition-all duration-500 text-center">
          <div className="bg-gradient-to-r from-[#007CF0] to-[#00C48C] p-6 rounded-full mb-8 w-fit mx-auto">
            <FaUserShield className="text-4xl text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#007CF0] to-[#00C48C] bg-clip-text text-transparent">
            Eurin HASH
          </h2>
          <p className="text-2xl text-gray-300 mb-8 font-light">
            Expert Cloud & Cybersécurité • Architecte Solutions • Formateur
            Certifié • Entrepreneur Tech
          </p>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              <strong>Plus de 10 ans d'expertise</strong> au service de la
              transformation digitale. J'ai créé EurinHash pour démocratiser
              l'accès aux technologies de pointe et accompagner les
              organisations vers l'excellence numérique.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#007CF0]/10 p-6 rounded-2xl border border-[#007CF0]/20 hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-[#007CF0] mb-3">
                  🎯 Impact Mesurable
                </h3>
                <p className="text-gray-300 text-sm">
                  Transformer l'expertise technique en résultats concrets pour
                  vos projets
                </p>
              </div>
              <div className="bg-[#00C48C]/10 p-6 rounded-2xl border border-[#00C48C]/20 hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-[#00C48C] mb-3">
                  🤝 Partenariat Durable
                </h3>
                <p className="text-gray-300 text-sm">
                  Accompagner votre croissance avec des solutions évolutives et
                  pérennes
                </p>
              </div>
              <div className="bg-[#007CF0]/10 p-6 rounded-2xl border border-[#007CF0]/20 hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-[#007CF0] mb-3">
                  🔒 Sécurité Garantie
                </h3>
                <p className="text-gray-300 text-sm">
                  Votre confiance protégée par les plus hauts standards de
                  cybersécurité
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#007CF0]/10 to-[#00C48C]/10 p-6 rounded-2xl border border-[#007CF0]/20 mb-6">
              <p className="text-lg text-gray-200 italic text-center">
                "J'ai accompagné des startups vers leur première levée de fonds,
                des PME dans leur transformation cloud, et des grands groupes
                dans leur stratégie cybersécurité.{" "}
                <strong>Votre réussite est ma priorité.</strong>"
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Roadmap Section - Cards interactives */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-[#00C48C] to-[#007CF0] p-4 rounded-2xl mb-6 w-fit mx-auto animate-pulse">
            <FaRocket className="text-3xl text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#00C48C] to-[#007CF0] bg-clip-text text-transparent">
            Votre Avantage Concurrentiel Arrive
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            <strong>Accès anticipé exclusif</strong> aux outils et formations
            qui transformeront votre approche du digital.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#1A1F3C]/90 p-8 rounded-2xl border border-[#007CF0]/20 hover:border-[#007CF0]/40 hover:scale-105 transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              🛠️
            </div>
            <h3 className="text-xl font-bold text-[#007CF0] mb-3">
              Toolkit Professionnel
            </h3>
            <p className="text-gray-300">
              Templates, scripts et frameworks éprouvés en production
            </p>
            <div className="text-xs text-[#007CF0] mt-2 font-semibold">
              Économisez 80% de votre temps de dev
            </div>
          </div>
          <div className="bg-[#1A1F3C]/90 p-8 rounded-2xl border border-[#00C48C]/20 hover:border-[#00C48C]/40 hover:scale-105 transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              🔐
            </div>
            <h3 className="text-xl font-bold text-[#00C48C] mb-3">
              Vault Sécurisé
            </h3>
            <p className="text-gray-300">
              Accès privilégié aux projets et données sensibles
            </p>
            <div className="text-xs text-[#00C48C] mt-2 font-semibold">
              Chiffrement militaire inclus
            </div>
          </div>
          <div className="bg-[#1A1F3C]/90 p-8 rounded-2xl border border-[#007CF0]/20 hover:border-[#007CF0]/40 hover:scale-105 transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              📘
            </div>
            <h3 className="text-xl font-bold text-[#007CF0] mb-3">
              Bibliothèque Premium
            </h3>
            <p className="text-gray-300">
              Guides techniques, cas d'usage et retours d'expérience
            </p>
            <div className="text-xs text-[#007CF0] mt-2 font-semibold">
              Mise à jour hebdomadaire
            </div>
          </div>
          <div className="bg-[#1A1F3C]/90 p-8 rounded-2xl border border-[#00C48C]/20 hover:border-[#00C48C]/40 hover:scale-105 transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              📅
            </div>
            <h3 className="text-xl font-bold text-[#00C48C] mb-3">
              Masterclass Live
            </h3>
            <p className="text-gray-300">
              Sessions interactives avec certification reconnue
            </p>
            <div className="text-xs text-[#00C48C] mt-2 font-semibold">
              Prochaine session : Novembre 2025
            </div>
          </div>
          <div className="bg-[#1A1F3C]/90 p-8 rounded-2xl border border-[#007CF0]/20 hover:border-[#007CF0]/40 hover:scale-105 transition-all duration-300 md:col-span-2 lg:col-span-1 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              🤝
            </div>
            <h3 className="text-xl font-bold text-[#007CF0] mb-3">
              Réseau d'Excellence
            </h3>
            <p className="text-gray-300">
              Communauté privée d'experts et décideurs tech
            </p>
            <div className="text-xs text-[#007CF0] mt-2 font-semibold">
              Accès sur invitation uniquement
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section - CTA final */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="bg-gradient-to-r from-[#1A1F3C]/90 to-[#0A0F2C]/90 p-12 rounded-3xl shadow-2xl border border-[#00C48C]/30 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00C48C]/5 to-[#007CF0]/5 rounded-3xl"></div>
          <div className="relative">
            <div className="bg-gradient-to-r from-[#007CF0] to-[#00C48C] p-6 rounded-2xl mb-8 w-fit mx-auto">
              <FaEnvelope className="text-4xl text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#007CF0] to-[#00C48C] bg-clip-text text-transparent">
              Entrons en contact
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              <strong>
                Votre projet mérite une expertise de niveau entreprise.
              </strong>
              <br />
              Discutons de vos défis techniques et construisons ensemble des
              solutions qui marquent la différence.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <a
                href="https://www.linkedin.com/in/eurindalemeida/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#007CF0]/20 hover:bg-[#007CF0]/30 px-6 py-3 rounded-xl border border-[#007CF0]/30 hover:border-[#007CF0]/50 transition-all duration-300 hover:scale-105"
              >
                <FaLinkedin className="text-xl text-[#007CF0]" />
                <span className="text-white font-medium">LinkedIn</span>
              </a>
              <a
                href="https://github.com/digitaleflex"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#00C48C]/20 hover:bg-[#00C48C]/30 px-6 py-3 rounded-xl border border-[#00C48C]/30 hover:border-[#00C48C]/50 transition-all duration-300 hover:scale-105"
              >
                <FaGithub className="text-xl text-[#00C48C]" />
                <span className="text-white font-medium">GitHub</span>
              </a>
              <a
                href="https://x.com/digitaleflex"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#007CF0]/20 hover:bg-[#007CF0]/30 px-6 py-3 rounded-xl border border-[#007CF0]/30 hover:border-[#007CF0]/50 transition-all duration-300 hover:scale-105"
              >
                <FaXTwitter className="text-xl text-[#007CF0]" />
                <span className="text-white font-medium">X (Twitter)</span>
              </a>
            </div>
            <div className="bg-gradient-to-r from-[#00C48C]/10 to-[#007CF0]/10 p-6 rounded-2xl border border-[#00C48C]/20 mb-8">
              <p className="text-lg text-gray-200 text-center">
                🚀 <strong>Accès anticipé gratuit</strong> : Soyez parmi les
                premiers à découvrir nos outils exclusifs et bénéficiez de{" "}
                <span className="text-[#00C48C] font-bold">
                  30% de réduction
                </span>{" "}
                sur nos formations premium.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/pages/contact"
                className="bg-gradient-to-r from-[#00C48C] to-[#007CF0] hover:from-[#00C48C]/80 hover:to-[#007CF0]/80 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <FaEnvelope className="text-lg" />
                Démarrer mon projet
              </a>
              <a
                href="/"
                className="bg-transparent border-2 border-[#007CF0] hover:bg-[#007CF0]/10 px-8 py-4 rounded-xl font-bold text-[#007CF0] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <FaRocket className="text-lg" />
                Accès anticipé gratuit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-4xl mx-auto mb-16">
        <NewsletterForm
          source={SubscriptionSource.ABOUT_PAGE}
          defaultNewsletters={[
            NewsletterType.EARLY_ACCESS,
            NewsletterType.GENERAL,
          ]}
          title="Rejoignez la Communauté EurinHash"
          description="Soyez les premiers informés de nos nouveautés, formations exclusives et contenus premium"
          showPersonalInfo={true}
          className="border-[#00C48C]/30"
        />
      </section>
    </main>
  );
}
