'use client';

import { useState } from 'react';
import { NewsletterType, SubscriptionSource } from '@prisma/client';
import { FaEnvelope, FaRocket, FaShieldAlt, FaCloud, FaGraduationCap, FaBuilding, FaCode } from 'react-icons/fa';

interface NewsletterFormProps {
  source: SubscriptionSource;
  defaultNewsletters?: NewsletterType[];
  title?: string;
  description?: string;
  showPersonalInfo?: boolean;
  className?: string;
}

const newsletterOptions = [
  {
    type: NewsletterType.GENERAL,
    label: 'Newsletter Générale',
    description: 'Actualités et nouveautés EurinHash',
    icon: FaEnvelope,
    color: 'text-[#007CF0]'
  },
  {
    type: NewsletterType.EARLY_ACCESS,
    label: 'Accès Anticipé',
    description: 'Soyez les premiers informés des nouveautés',
    icon: FaRocket,
    color: 'text-[#00C48C]'
  },
  {
    type: NewsletterType.FORMATION,
    label: 'Formations & Certifications',
    description: 'Programmes de formation et masterclass',
    icon: FaGraduationCap,
    color: 'text-[#007CF0]'
  },
  {
    type: NewsletterType.CYBERSECURITY,
    label: 'Cybersécurité',
    description: 'Actualités et conseils sécurité',
    icon: FaShieldAlt,
    color: 'text-[#00C48C]'
  },
  {
    type: NewsletterType.CLOUD,
    label: 'Technologies Cloud',
    description: 'Solutions et architectures cloud',
    icon: FaCloud,
    color: 'text-[#007CF0]'
  },
  {
    type: NewsletterType.ENTERPRISE,
    label: 'Solutions Entreprise',
    description: 'Contenus dédiés aux entreprises',
    icon: FaBuilding,
    color: 'text-[#00C48C]'
  },
  {
    type: NewsletterType.DEVELOPER,
    label: 'Ressources Développeurs',
    description: 'Outils et guides techniques',
    icon: FaCode,
    color: 'text-[#007CF0]'
  }
];

export default function NewsletterForm({
  source,
  defaultNewsletters = [NewsletterType.GENERAL],
  title = "Restez informé",
  description = "Inscrivez-vous à nos newsletters pour recevoir les dernières actualités",
  showPersonalInfo = false,
  className = ""
}: NewsletterFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    jobTitle: '',
    newsletters: defaultNewsletters,
    gdprConsent: false,
    marketingConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source,
          ipAddress: '', // Sera rempli côté serveur
          userAgent: navigator.userAgent,
          referrer: document.referrer
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          company: '',
          jobTitle: '',
          newsletters: defaultNewsletters,
          gdprConsent: false,
          marketingConsent: false
        });
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Une erreur est survenue. Veuillez réessayer.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterToggle = (type: NewsletterType) => {
    setFormData(prev => ({
      ...prev,
      newsletters: prev.newsletters.includes(type)
        ? prev.newsletters.filter(t => t !== type)
        : [...prev.newsletters, type]
    }));
  };

  return (
    <div className={`bg-[#1A1F3C]/90 p-8 rounded-3xl shadow-2xl border border-[#007CF0]/20 ${className}`}>
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#007CF0] to-[#00C48C] bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-gray-300">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email obligatoire */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 bg-[#0A0F2C]/50 border border-[#007CF0]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#007CF0] focus:ring-2 focus:ring-[#007CF0]/20 transition-all duration-300"
            placeholder="votre@email.com"
          />
        </div>

        {/* Informations personnelles optionnelles */}
        {showPersonalInfo && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full px-4 py-3 bg-[#0A0F2C]/50 border border-[#007CF0]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#007CF0] focus:ring-2 focus:ring-[#007CF0]/20 transition-all duration-300"
                placeholder="Votre prénom"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-4 py-3 bg-[#0A0F2C]/50 border border-[#007CF0]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#007CF0] focus:ring-2 focus:ring-[#007CF0]/20 transition-all duration-300"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                Entreprise
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-4 py-3 bg-[#0A0F2C]/50 border border-[#007CF0]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#007CF0] focus:ring-2 focus:ring-[#007CF0]/20 transition-all duration-300"
                placeholder="Votre entreprise"
              />
            </div>
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-300 mb-2">
                Poste
              </label>
              <input
                type="text"
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                className="w-full px-4 py-3 bg-[#0A0F2C]/50 border border-[#007CF0]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#007CF0] focus:ring-2 focus:ring-[#007CF0]/20 transition-all duration-300"
                placeholder="Votre poste"
              />
            </div>
          </div>
        )}

        {/* Sélection des newsletters */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-4">
            Newsletters d'intérêt *
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {newsletterOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = formData.newsletters.includes(option.type);
              
              return (
                <div
                  key={option.type}
                  onClick={() => handleNewsletterToggle(option.type)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isSelected
                      ? 'border-[#007CF0] bg-[#007CF0]/10'
                      : 'border-gray-600 bg-[#0A0F2C]/30 hover:border-[#007CF0]/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleNewsletterToggle(option.type)}
                      className="mt-1 w-4 h-4 text-[#007CF0] bg-transparent border-gray-400 rounded focus:ring-[#007CF0] focus:ring-2"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`text-lg ${option.color}`} />
                        <span className="font-medium text-white">{option.label}</span>
                      </div>
                      <p className="text-sm text-gray-400">{option.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Consentements RGPD */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="gdprConsent"
              required
              checked={formData.gdprConsent}
              onChange={(e) => setFormData(prev => ({ ...prev, gdprConsent: e.target.checked }))}
              className="mt-1 w-4 h-4 text-[#007CF0] bg-transparent border-gray-400 rounded focus:ring-[#007CF0] focus:ring-2"
            />
            <label htmlFor="gdprConsent" className="text-sm text-gray-300">
              J'accepte le traitement de mes données personnelles conformément à la{' '}
              <a href="/pages/mentions-legales" className="text-[#007CF0] hover:underline">
                politique de confidentialité
              </a>{' '}
              *
            </label>
          </div>
          
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="marketingConsent"
              checked={formData.marketingConsent}
              onChange={(e) => setFormData(prev => ({ ...prev, marketingConsent: e.target.checked }))}
              className="mt-1 w-4 h-4 text-[#007CF0] bg-transparent border-gray-400 rounded focus:ring-[#007CF0] focus:ring-2"
            />
            <label htmlFor="marketingConsent" className="text-sm text-gray-300">
              J'accepte de recevoir des communications marketing personnalisées
            </label>
          </div>
        </div>

        {/* Message de retour */}
        {message && (
          <div className={`p-4 rounded-xl ${
            message.type === 'success' 
              ? 'bg-[#00C48C]/10 border border-[#00C48C]/30 text-[#00C48C]' 
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={isSubmitting || formData.newsletters.length === 0 || !formData.gdprConsent}
          className="w-full bg-gradient-to-r from-[#00C48C] to-[#007CF0] hover:from-[#00C48C]/80 hover:to-[#007CF0]/80 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Inscription en cours...
            </>
          ) : (
            <>
              <FaEnvelope className="text-lg" />
              S'inscrire aux newsletters
            </>
          )}
        </button>
      </form>
    </div>
  );
}