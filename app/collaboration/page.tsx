'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';
import { FeedbackPopup } from '@/components/feedback-popup';
import { defaultCountry } from '@/lib/countries';
import { WizardData, steps } from '@/lib/collaboration-data';
import { Loader2, Send } from '@/components/collaboration/icons';
import { Step1, Step2, Step3, Step4, Step5 } from '@/components/collaboration/steps';
import { usePhoneInput } from '@/components/collaboration/_hooks/usePhoneInput';

export default function CollaborationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const [data, setData] = useState<WizardData>({
    organization: '', role: '', location: '', email: '', phone: '', country: defaultCountry.code,
    initiativeType: '', initiativeName: '', vision: '', context: '',
    engagementLevel: '', priority: '', timeline: '', dataSensitivity: '', existingInfrastructure: '',
    regulatoryRequirements: '', technologies: [],
  });

  const updateData = (field: keyof WizardData, value: string | string[]) => {
    setData(prev => ({ ...prev, [field]: value }));
    // Clear phone error when phone changes
    if (field === 'phone') {
      setPhoneError('');
    }
  };

  const toggleTechnology = (tech: string) => {
    setData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech) ? prev.technologies.filter(t => t !== tech) : [...prev.technologies, tech],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/project-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur lors de l'envoi de l'initiative.");
      setFeedbackType('success');
      setFeedbackMessage('Initiative soumise. Analyse structurelle en cours (48h).');
      setShowFeedback(true);
    } catch (error) {
      setFeedbackType('error');
      setFeedbackMessage(error instanceof Error ? error.message : 'Une erreur est survenue');
      setShowFeedback(true);
    } finally { setIsSubmitting(false); }
  };

  const isStepValid = (step: number) => {
    if (step === 1) return data.organization && data.email && data.role;
    if (step === 2) return data.initiativeType && data.initiativeName && data.vision;
    if (step === 3) return data.engagementLevel && data.priority;
    return true;
  };

  const ProgressBar = () => (
    <div className="bg-foreground/[0.02] border-b border-foreground/5">
      <div className="mx-auto max-w-4xl px-4 sm:px-8 py-8">
        <div className="flex items-center justify-between overflow-x-auto gap-8 no-scrollbar">
          {steps.map(step => (
            <div key={step.id} className="flex items-center flex-shrink-0">
              <div className={`w-10 h-10 flex items-center justify-center text-xs font-mono font-black border transition-all ${currentStep >= step.id ? 'bg-foreground text-background border-foreground' : 'bg-background border-foreground/10 text-foreground/20'}`}>
                {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
              </div>
              {step.id < 5 && <div className={`w-12 h-px mx-4 ${currentStep > step.id ? 'bg-accent' : 'bg-foreground/10'}`} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="border-b border-foreground/5 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-foreground/40 hover:text-accent transition-colors">
            <Home className="w-4 h-4" /> Retour
          </Link>
          <div className="text-center absolute left-1/2 -translate-x-1/2">
            <h1 className="text-base font-bold tracking-tight">Votre projet</h1>
            <span className="text-[10px] font-mono text-muted-foreground tracking-tight">Étape {currentStep} sur 5</span>
          </div>
          <div className="w-20" />
        </div>
      </header>
      <ProgressBar />
      <main className="mx-auto max-w-4xl px-4 sm:px-8 py-16">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <Step1 
              data={data} 
              updateData={updateData} 
              phoneError={phoneError} 
              isCountryDropdownOpen={isCountryDropdownOpen} 
              setIsCountryDropdownOpen={setIsCountryDropdownOpen} 
            />
          )}
          {currentStep === 2 && <Step2 data={data} updateData={updateData} />}
          {currentStep === 3 && <Step3 data={data} updateData={updateData} />}
          {currentStep === 4 && <Step4 data={data} updateData={updateData} toggleTechnology={toggleTechnology} />}
          {currentStep === 5 && <Step5 data={data} />}
        </AnimatePresence>
        <nav className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-8 pt-12 border-t border-foreground/5">
          <button onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)} disabled={currentStep === 1 || isSubmitting} className={`flex items-center gap-2 text-sm font-medium ${currentStep === 1 ? 'opacity-0' : 'text-muted-foreground hover:text-foreground transition-colors'}`}>
            <ArrowLeft className="w-4 h-4" />  Étape précédente
          </button>
          {currentStep < 5 ? (
            <button onClick={() => setCurrentStep(currentStep + 1)} disabled={!isStepValid(currentStep)} className={`flex items-center gap-3 px-8 py-3.5 text-sm font-semibold tracking-tight transition-all ${isStepValid(currentStep) ? 'bg-foreground text-background hover:bg-accent' : 'bg-foreground/5 text-foreground/25 cursor-not-allowed'}`}>
              Étape suivante <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center gap-3 px-8 py-3.5 bg-accent text-white text-sm font-semibold tracking-tight hover:bg-foreground disabled:opacity-50 transition-all">
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />Envoi en cours...</> : <>Envoyer la demande <Send className="w-4 h-4" /></>}
            </button>
          )}
        </nav>
      </main>
      {showFeedback && <FeedbackPopup isOpen={showFeedback} type={feedbackType} message={feedbackMessage} onClose={() => { setShowFeedback(false); if (feedbackType === 'success') window.location.href = '/'; }} />}
    </div>
  );
}
