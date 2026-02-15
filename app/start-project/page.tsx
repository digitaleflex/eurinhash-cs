'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Briefcase,
  DollarSign,
  Code,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Building2,
  Target,
  Clock,
  Settings,
  Home,
  ChevronDown,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { FeedbackPopup } from '@/components/feedback-popup';
import {
  countries,
  defaultCountry,
  formatPhoneNumber,
  validatePhoneNumber,
} from '@/lib/countries';

interface WizardData {
  // Étape 1: Contact
  name: string;
  email: string;
  phone: string;
  country: string;
  company: string;
  position: string;

  // Étape 2: Projet
  projectType: string;
  projectName: string;
  description: string;
  objectives: string;

  // Étape 3: Budget & Timing
  budget: string;
  timeline: string;
  startDate: string;

  // Étape 4: Techniques
  technologies: string[];
  requirements: string;
  constraints: string;
}

const projectTypes = [
  { value: 'web', label: 'Développement Web', icon: Code },
  { value: 'cloud', label: 'Migration Cloud', icon: Building2 },
  { value: 'consulting', label: 'Conseil IT', icon: Target },
  { value: 'training', label: 'Formation', icon: Settings },
  { value: 'other', label: 'Autre', icon: Briefcase },
];

const budgetOptions = [
  { value: 'under-100k', label: 'Moins de 100 000 FCFA' },
  { value: '100k-300k', label: '100 000 - 300 000 FCFA' },
  { value: '300k-500k', label: '300 000 - 500 000 FCFA' },
  { value: '500k-1m', label: '500 000 - 1 000 000 FCFA' },
  { value: '1m-plus', label: 'Plus de 1 000 000 FCFA' },
  { value: 'discuss', label: 'À discuter' },
];

const timelineOptions = [
  { value: 'asap', label: 'Dès que possible' },
  { value: '1-month', label: 'Dans 1 mois' },
  { value: '3-months', label: 'Dans 3 mois' },
  { value: '6-months', label: 'Dans 6 mois' },
  { value: 'flexible', label: 'Flexible' },
];

const technologyOptions = [
  'React',
  'Next.js',
  'Node.js',
  'TypeScript',
  'Python',
  'Django',
  'AWS',
  'Azure',
  'Google Cloud',
  'Docker',
  'Kubernetes',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'GraphQL',
  'REST API',
  'Microservices',
  'DevOps',
];

const steps = [
  { id: 1, title: 'Contact', icon: User },
  { id: 2, title: 'Projet', icon: Briefcase },
  { id: 3, title: 'Budget', icon: DollarSign },
  { id: 4, title: 'Technique', icon: Code },
  { id: 5, title: 'Validation', icon: CheckCircle },
];

export default function StartProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'success' | 'error'>(
    'success'
  );
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [serverErrors, setServerErrors] = useState<
    { field: string; message: string }[]
  >([]);

  const [data, setData] = useState<WizardData>({
    name: '',
    email: '',
    phone: '',
    country: defaultCountry.code,
    company: '',
    position: '',
    projectType: '',
    projectName: '',
    description: '',
    objectives: '',
    budget: '',
    timeline: '',
    startDate: '',
    technologies: [],
    requirements: '',
    constraints: '',
  });

  const updateData = (field: keyof WizardData, value: string | string[]) => {
    setData(prev => ({ ...prev, [field]: value }));
    // Effacer les erreurs serveur pour un champ lorsqu'il est modifié
    if (serverErrors.length > 0) {
      setServerErrors(prevErrors =>
        prevErrors.filter(err => err.field !== field)
      );
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value, data.country);
    setData(prev => ({ ...prev, phone: formatted }));

    // Validation en temps réel
    if (formatted) {
      const validation = validatePhoneNumber(formatted, data.country);
      setPhoneError(validation.isValid ? '' : validation.message || '');
    } else {
      setPhoneError('');
    }
  };

  const handleCountryChange = (countryCode: string) => {
    setData(prev => ({ ...prev, country: countryCode }));
    setIsCountryDropdownOpen(false);

    // Re-valider le téléphone avec le nouveau pays
    if (data.phone) {
      const validation = validatePhoneNumber(data.phone, countryCode);
      setPhoneError(validation.isValid ? '' : validation.message || '');
    }
  };

  const getSelectedCountry = () => {
    return countries.find(c => c.code === data.country) || defaultCountry;
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const toggleTechnology = (tech: string) => {
    setData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setServerErrors([]);
    try {
      const response = await fetch('/api/project-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 400 && result.details) {
          setServerErrors(result.details);
          throw new Error(
            'Certains champs sont invalides. Veuillez vérifier les erreurs ci-dessous.'
          );
        }
        throw new Error(
          result.error || "Erreur lors de l'envoi de la demande."
        );
      }

      setFeedbackType('success');
      setFeedbackMessage(
        'Demande envoyée avec succès ! Nous vous recontacterons bientôt.'
      );
      setShowFeedback(true);
    } catch (error) {
      setFeedbackType('error');
      setFeedbackMessage(
        error instanceof Error ? error.message : 'Une erreur est survenue'
      );
      setShowFeedback(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return data.name && data.email && (!data.phone || !phoneError);
      case 2:
        return data.projectType && data.projectName && data.description;
      case 3:
        return data.budget && data.timeline;
      case 4:
        return true; // Optionnel
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-2 text-foreground/60 hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="text-xs sm:text-sm hidden xs:inline">
                Retour à l&apos;accueil
              </span>
            </Link>
            <div className="text-center flex-1 mx-2">
              <h1 className="text-lg sm:text-xl font-bold text-foreground">
                Démarrer un projet
              </h1>
              <p className="text-xs sm:text-sm text-foreground/60">
                Étape {currentStep} sur 5
              </p>
            </div>
            <div className="w-16 sm:w-20" />{' '}
            {/* Spacer pour centrer le titre */}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between overflow-x-auto">
            {steps.map(step => (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300 ${
                    currentStep >= step.id
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-background border-2 border-foreground/20 text-foreground/60'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </div>
                {step.id < 5 && (
                  <div
                    className={`w-6 sm:w-12 h-1 mx-2 sm:mx-3 rounded-full transition-all duration-300 ${
                      currentStep > step.id ? 'bg-accent' : 'bg-foreground/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
                  <User className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                  <span className="break-words">
                    Vos informations de contact
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-foreground/60 max-w-2xl mx-auto px-4">
                  Commençons par faire connaissance. Ces informations nous
                  permettront de vous recontacter rapidement.
                </p>
              </div>

              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2 sm:mb-3">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={data.name}
                    onChange={e => updateData('name', e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-foreground/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent bg-background transition-all text-sm sm:text-base"
                    placeholder="Votre nom complet"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 sm:mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={e => updateData('email', e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-foreground/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent bg-background transition-all text-sm sm:text-base"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 sm:mb-3">
                    Téléphone
                    {getSelectedCountry().code === 'BJ' && (
                      <span className="ml-2 text-xs text-green-600 font-normal">
                        (WhatsApp préféré)
                      </span>
                    )}
                  </label>
                  <div className="flex gap-2">
                    {/* Sélecteur de pays */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setIsCountryDropdownOpen(!isCountryDropdownOpen)
                        }
                        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-3 sm:py-4 border border-foreground/20 rounded-xl bg-background hover:border-accent/50 transition-all min-w-[100px] sm:min-w-[120px]"
                      >
                        <span className="text-xs sm:text-sm font-medium">
                          {getSelectedCountry().phoneCode}
                        </span>
                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>

                      {isCountryDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-foreground/20 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                          {countries.map(country => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => handleCountryChange(country.code)}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-foreground/5 transition-colors border-b border-foreground/10 last:border-b-0"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium text-xs sm:text-sm">
                                    {country.name}
                                  </div>
                                  <div className="text-xs text-foreground/60">
                                    {country.continent}
                                  </div>
                                </div>
                                <span className="text-xs sm:text-sm font-mono">
                                  {country.phoneCode}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Champ téléphone */}
                    <div className="flex-1 relative">
                      <input
                        type="tel"
                        value={data.phone}
                        onChange={e => handlePhoneChange(e.target.value)}
                        className={`w-full px-3 sm:px-4 py-3 sm:py-4 border rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent bg-background transition-all text-sm sm:text-base ${
                          phoneError ? 'border-red-500' : 'border-foreground/20'
                        }`}
                        placeholder={
                          getSelectedCountry().code === 'BJ'
                            ? '01 51 07 05 55 (WhatsApp)'
                            : 'Numéro de téléphone'
                        }
                      />
                      {phoneError && (
                        <div className="absolute top-full left-0 right-0 mt-1 flex items-center gap-1 text-red-500 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {phoneError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 sm:mb-3">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    value={data.company}
                    onChange={e => updateData('company', e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-foreground/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent bg-background transition-all text-sm sm:text-base"
                    placeholder="Nom de votre entreprise"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 sm:mb-3">
                    Poste
                  </label>
                  <input
                    type="text"
                    value={data.position}
                    onChange={e => updateData('position', e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-foreground/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent bg-background transition-all text-sm sm:text-base"
                    placeholder="Votre fonction dans l'entreprise"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
                  <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                  <span className="break-words">Détails du projet</span>
                </h2>
                <p className="text-sm sm:text-base text-foreground/60 max-w-2xl mx-auto px-4">
                  Parlez-nous de votre projet. Plus vous serez précis, mieux
                  nous pourrons vous accompagner.
                </p>
              </div>

              <div className="mb-6 sm:mb-8">
                <label className="block text-base sm:text-lg font-medium mb-4 sm:mb-6">
                  Type de projet *
                </label>
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  {projectTypes.map(type => (
                    <button
                      key={type.value}
                      onClick={() => updateData('projectType', type.value)}
                      className={`p-4 sm:p-6 rounded-xl border-2 transition-all text-left group ${
                        data.projectType === type.value
                          ? 'border-accent bg-accent/5 shadow-lg'
                          : 'border-foreground/20 hover:border-accent/50 hover:bg-foreground/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <type.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                        <span className="font-semibold text-sm sm:text-lg">
                          {type.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 sm:mb-3">
                    Nom du projet *
                  </label>
                  <input
                    type="text"
                    value={data.projectName}
                    onChange={e => updateData('projectName', e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-foreground/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent bg-background transition-all text-sm sm:text-base"
                    placeholder="Ex: Site e-commerce, Migration cloud, Application mobile..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 sm:mb-3">
                    Description du projet *
                  </label>
                  <textarea
                    value={data.description}
                    onChange={e => updateData('description', e.target.value)}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-foreground/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent bg-background transition-all resize-none text-sm sm:text-base"
                    placeholder="Décrivez votre projet en détail. Quels sont vos objectifs ? Quel problème voulez-vous résoudre ?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 sm:mb-3">
                    Objectifs spécifiques
                  </label>
                  <textarea
                    value={data.objectives}
                    onChange={e => updateData('objectives', e.target.value)}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-foreground/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent bg-background transition-all resize-none text-sm sm:text-base"
                    placeholder="Quels résultats concrets attendez-vous de ce projet ?"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
                  <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                  <span className="break-words">Budget et timing</span>
                </h2>
                <p className="text-sm sm:text-base text-foreground/60 max-w-2xl mx-auto px-4">
                  Ces informations nous aident à vous proposer la solution la
                  plus adaptée à votre situation.
                </p>
              </div>

              <div className="mb-6 sm:mb-8">
                <label className="block text-base sm:text-lg font-medium mb-4 sm:mb-6">
                  Budget estimé *
                </label>
                <div className="grid gap-3 sm:gap-4">
                  {budgetOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateData('budget', option.value)}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-left ${
                        data.budget === option.value
                          ? 'border-accent bg-accent/5 shadow-lg'
                          : 'border-foreground/20 hover:border-accent/50 hover:bg-foreground/5'
                      }`}
                    >
                      <span className="font-semibold text-sm sm:text-lg">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <label className="block text-base sm:text-lg font-medium mb-4 sm:mb-6">
                  Timeline souhaitée *
                </label>
                <div className="grid gap-3 sm:gap-4">
                  {timelineOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateData('timeline', option.value)}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-left ${
                        data.timeline === option.value
                          ? 'border-accent bg-accent/5 shadow-lg'
                          : 'border-foreground/20 hover:border-accent/50 hover:bg-foreground/5'
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                        <span className="font-semibold text-sm sm:text-lg">
                          {option.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 sm:mb-3">
                  Date de début souhaitée
                </label>
                <input
                  type="date"
                  value={data.startDate}
                  onChange={e => updateData('startDate', e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-foreground/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent bg-background transition-all text-sm sm:text-base"
                />
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
                  <Code className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                  <span className="break-words">Spécifications techniques</span>
                </h2>
                <p className="text-sm sm:text-base text-foreground/60 max-w-2xl mx-auto px-4">
                  Aidez-nous à mieux comprendre vos besoins techniques et vos
                  contraintes.
                </p>
              </div>

              <div className="mb-6 sm:mb-8">
                <label className="block text-base sm:text-lg font-medium mb-4 sm:mb-6">
                  Technologies d&apos;intérêt
                </label>
                <div className="grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
                  {technologyOptions.map(tech => (
                    <button
                      key={tech}
                      onClick={() => toggleTechnology(tech)}
                      className={`p-2 sm:p-3 rounded-lg border-2 transition-all text-xs sm:text-sm font-medium ${
                        data.technologies.includes(tech)
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-foreground/20 hover:border-accent/50 hover:bg-foreground/5'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 sm:mb-3">
                    Exigences particulières
                  </label>
                  <textarea
                    value={data.requirements}
                    onChange={e => updateData('requirements', e.target.value)}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-foreground/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent bg-background transition-all resize-none text-sm sm:text-base"
                    placeholder="Sécurité, performance, intégrations, conformité..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 sm:mb-3">
                    Contraintes
                  </label>
                  <textarea
                    value={data.constraints}
                    onChange={e => updateData('constraints', e.target.value)}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-foreground/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent bg-background transition-all resize-none text-sm sm:text-base"
                    placeholder="Budget, délais, technologies existantes, équipe..."
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                  <span className="break-words">Récapitulatif</span>
                </h2>
                <p className="text-sm sm:text-base text-foreground/60 max-w-2xl mx-auto px-4">
                  Vérifiez les informations avant d&apos;envoyer votre demande.
                  Nous vous recontacterons dans les 24h.
                </p>
              </div>

              {serverErrors.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-700 rounded-xl p-4 sm:p-6 space-y-2">
                  <h3 className="font-bold flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Erreurs de validation
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                    {serverErrors.map((error, index) => (
                      <li key={index}>
                        <strong>{error.field}:</strong> {error.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-muted/50 rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    Contact
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <p className="text-sm sm:text-base text-foreground/80">
                      <strong>Nom:</strong> {data.name}
                    </p>
                    <p className="text-sm sm:text-base text-foreground/80">
                      <strong>Email:</strong> {data.email}
                    </p>
                    {data.phone && (
                      <p className="text-sm sm:text-base text-foreground/80">
                        <strong>Téléphone:</strong>{' '}
                        {getSelectedCountry().phoneCode} {data.phone}
                      </p>
                    )}
                    <p className="text-sm sm:text-base text-foreground/80">
                      <strong>Pays:</strong> {getSelectedCountry().name}
                    </p>
                    {data.company && (
                      <p className="text-sm sm:text-base text-foreground/80">
                        <strong>Entreprise:</strong> {data.company}
                      </p>
                    )}
                    {data.position && (
                      <p className="text-sm sm:text-base text-foreground/80">
                        <strong>Poste:</strong> {data.position}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    Projet
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base text-foreground/80">
                      <strong>Type:</strong>{' '}
                      {
                        projectTypes.find(t => t.value === data.projectType)
                          ?.label
                      }
                    </p>
                    <p className="text-sm sm:text-base text-foreground/80">
                      <strong>Nom:</strong> {data.projectName}
                    </p>
                    <p className="text-sm sm:text-base text-foreground/80">
                      <strong>Description:</strong> {data.description}
                    </p>
                    {data.objectives && (
                      <p className="text-sm sm:text-base text-foreground/80">
                        <strong>Objectifs:</strong> {data.objectives}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    Budget & Timing
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <p className="text-sm sm:text-base text-foreground/80">
                      <strong>Budget:</strong>{' '}
                      {budgetOptions.find(b => b.value === data.budget)?.label}
                    </p>
                    <p className="text-sm sm:text-base text-foreground/80">
                      <strong>Timeline:</strong>{' '}
                      {
                        timelineOptions.find(t => t.value === data.timeline)
                          ?.label
                      }
                    </p>
                    {data.startDate && (
                      <p className="text-sm sm:text-base text-foreground/80">
                        <strong>Début souhaité:</strong>{' '}
                        {new Date(data.startDate).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                </div>

                {data.technologies.length > 0 && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                      <Code className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                      Technologies
                    </h3>
                    <p className="text-sm sm:text-base text-foreground/80">
                      {data.technologies.join(', ')}
                    </p>
                  </div>
                )}

                {(data.requirements || data.constraints) && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
                      Détails supplémentaires
                    </h3>
                    {data.requirements && (
                      <p className="text-sm sm:text-base text-foreground/80 mb-2">
                        <strong>Exigences:</strong> {data.requirements}
                      </p>
                    )}
                    {data.constraints && (
                      <p className="text-sm sm:text-base text-foreground/80">
                        <strong>Contraintes:</strong> {data.constraints}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 text-foreground/60 hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Précédent</span>
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              {currentStep < 5 ? (
                <button
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                  className="flex items-center gap-1 sm:gap-2 px-4 sm:px-8 py-2 sm:py-3 bg-accent text-white rounded-xl font-semibold transition-all hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 text-sm sm:text-base"
                >
                  <span className="hidden xs:inline">Suivant</span>
                  <span className="xs:hidden">Suiv.</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-1 sm:gap-2 px-4 sm:px-8 py-2 sm:py-3 bg-accent text-white rounded-xl font-semibold transition-all hover:bg-accent/90 disabled:opacity-50 hover:scale-105 active:scale-95 text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                      <span className="hidden xs:inline">
                        Envoi en cours...
                      </span>
                      <span className="xs:hidden">Envoi...</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden xs:inline">
                        Envoyer la demande
                      </span>
                      <span className="xs:hidden">Envoyer</span>
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay pour fermer le dropdown */}
      {isCountryDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsCountryDropdownOpen(false)}
        />
      )}

      {/* Feedback Popup */}
      <FeedbackPopup
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        type={feedbackType}
        message={feedbackMessage}
      />
    </div>
  );
}
