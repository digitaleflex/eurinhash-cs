'use client';

import { Send, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useContactForm } from './_hooks/useContactForm';

const FeedbackPopup = dynamic(() => import('./feedback-popup').then(mod => mod.FeedbackPopup), {
  ssr: false,
});

export function ContactForm() {
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    showFeedback,
    feedbackType,
    feedbackMessage,
    formRef,
    handleInputChange,
    handleSubmit,
    setShowFeedback,
  } = useContactForm();

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-4 sm:space-y-6"
    >
      {/* Piège anti-robot : invisible pour un humain, jamais rempli par un bot qui ignore le CSS */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
        <div className="relative group">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground/70 group-focus-within:text-accent transition-colors">
            <CheckCircle className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder=" "
            aria-required="true"
            aria-invalid={!!errors.name}
            className="peer w-full rounded-lg sm:rounded-xl border border-foreground/20 bg-background/50 pl-12 pr-4 py-3 sm:py-4 text-foreground placeholder-transparent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-background transition-all duration-300 hover:border-foreground/30 text-sm sm:text-base"
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
          />
          <label
            htmlFor="name"
            className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-foreground/70 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent bg-background px-1 rounded"
          >
            Nom *
          </label>
          {errors.name && (
            <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
              <AlertCircle className="h-4 w-4" /> {errors.name}
            </div>
          )}
        </div>

        <div className="relative group">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground/70 group-focus-within:text-accent transition-colors">
            <Send className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder=" "
            aria-required="true"
            aria-invalid={!!errors.email}
            className="peer w-full rounded-lg sm:rounded-xl border border-foreground/20 bg-background/50 pl-12 pr-4 py-3 sm:py-4 text-foreground placeholder-transparent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-background transition-all duration-300 hover:border-foreground/30 text-sm sm:text-base"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-foreground/70 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent bg-background px-1 rounded"
          >
            Email *
          </label>
          {errors.email && (
            <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
              <AlertCircle className="h-4 w-4" /> {errors.email}
            </div>
          )}
        </div>
      </div>

      <div className="relative group">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground/70 group-focus-within:text-accent transition-colors">
          <Send className="h-5 w-5" aria-hidden="true" />
        </div>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={e => handleInputChange('subject', e.target.value)}
          aria-label="Sujet"
          className="peer w-full appearance-none rounded-lg sm:rounded-xl border border-foreground/20 bg-background/50 pl-12 pr-10 py-3 sm:py-4 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-background transition-all duration-300 hover:border-foreground/30 text-sm sm:text-base"
        >
          <option value="">Sélectionnez un sujet</option>
          <option value="Audit de Résilience">Audit de Résilience</option>
          <option value="Architecture de Système">Architecture de Système</option>
          <option value="Accompagnement CTO">Accompagnement CTO</option>
          <option value="Formation & Communauté">Formation & Communauté</option>
          <option value="Support Technique">Support Technique</option>
          <option value="Autre demande">Autre demande</option>
        </select>
      </div>

      <div className="relative group">
        <div className="pointer-events-none absolute left-0 top-0 pl-4 pt-4 text-muted-foreground/70 group-focus-within:text-accent transition-colors">
          <Send className="h-5 w-5" aria-hidden="true" />
        </div>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder=" "
          aria-required={true}
          aria-invalid={!!errors.message}
          className="peer w-full rounded-lg sm:rounded-xl border border-foreground/20 bg-background/50 pl-12 pr-4 py-3 sm:py-4 text-foreground placeholder-transparent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-background transition-all duration-300 hover:border-foreground/30 resize-vertical text-sm sm:text-base"
          value={formData.message}
          onChange={e => handleInputChange('message', e.target.value)}
        />
        <label
          htmlFor="message"
          className="pointer-events-none absolute left-12 top-4 text-foreground/70 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent bg-background px-1 rounded"
        >
          Message *
        </label>
        {errors.message && (
          <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
            <AlertCircle className="h-4 w-4" /> {errors.message}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 rounded-full bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-accent/90 hover:shadow-[0_20px_40px_-10px] hover:shadow-accent/30 hover:scale-105 active:scale-95 disabled:opacity-70 touch-manipulation"
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        )}
        {isSubmitting
          ? 'Envoi...'
          : isSubmitted
            ? 'Envoyé !'
            : 'Envoyer le message'}
      </button>

      {/* Feedback Popup */}
      <FeedbackPopup
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        type={feedbackType}
        message={feedbackMessage}
      />
    </form>
  );
}
