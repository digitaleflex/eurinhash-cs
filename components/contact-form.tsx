"use client"

import { useState, useRef, useCallback } from "react";
import { Send, AlertCircle, Loader2, CheckCircle, XCircle } from "lucide-react";

interface FormDataShape {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrorsShape {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [formData, setFormData] = useState<FormDataShape>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrorsShape>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [retryAfter, setRetryAfter] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const announcerRef = useRef<HTMLDivElement>(null);

  // Announce status changes for screen readers
  const announceStatus = useCallback((message: string) => {
    if (announcerRef.current) {
      announcerRef.current.textContent = message;
    }
  }, []);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Le nom est requis";
        if (value.trim().length < 2) return "Le nom doit contenir au moins 2 caractères";
        if (value.trim().length > 100) return "Le nom ne peut pas dépasser 100 caractères";
        break;
      case "email":
        if (!value.trim()) return "L'email est requis";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format d'email invalide";
        if (value.length > 255) return "L'email ne peut pas dépasser 255 caractères";
        break;
      case "message":
        if (!value.trim()) return "Le message est requis";
        if (value.trim().length < 10) return "Le message doit contenir au moins 10 caractères";
        if (value.trim().length > 5000) return "Le message ne peut pas dépasser 5000 caractères";
        break;
    }
    return undefined;
  };

  const handleInputChange = (name: keyof FormDataShape, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear general error when user starts typing
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrorsShape = {};
    (Object.keys(formData) as (keyof FormDataShape)[]).forEach((key) => {
      if (key !== "subject") {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      announceStatus("Le formulaire contient des erreurs. Veuillez les corriger.");
      // Focus first error field
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      element?.focus();
      return;
    }
    
    setSubmitStatus('submitting');
    setErrors({});
    announceStatus("Envoi du message en cours...");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json().catch(() => ({}));
      
      if (!res.ok) {
        // Handle rate limiting
        if (res.status === 429) {
          const retryTime = data.retryAfter || 60;
          setRetryAfter(retryTime);
          throw new Error(`Trop de requêtes. Réessayez dans ${retryTime} secondes.`);
        }
        
        // Handle validation errors from server
        if (data.details && Array.isArray(data.details)) {
          const serverErrors: FormErrorsShape = {};
          data.details.forEach((err: { field: string; message: string }) => {
            if (err.field in formData) {
              serverErrors[err.field as keyof FormErrorsShape] = err.message;
            }
          });
          setErrors(serverErrors);
          throw new Error("Validation échouée côté serveur");
        }
        
        throw new Error(data.error || "Une erreur est survenue");
      }
      
      setSubmitStatus('success');
      setFormData({ name: "", email: "", subject: "", message: "" });
      setRetryAfter(null);
      announceStatus("Message envoyé avec succès!");
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setSubmitStatus('error');
      setErrors((prev) => ({
        ...prev,
        general: error instanceof Error ? error.message : "Une erreur inattendue s'est produite"
      }));
      announceStatus("Erreur lors de l'envoi du message.");
    }
  };

  const isSubmitting = submitStatus === 'submitting';
  const isSuccess = submitStatus === 'success';
  const isError = submitStatus === 'error';

  return (
    <>
      {/* Screen reader announcer for status updates */}
      <div
        ref={announcerRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* General error message */}
        {errors.general && (
          <div
            className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 flex items-start gap-3"
            role="alert"
          >
            <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-500">{errors.general}</p>
              {retryAfter && (
                <p className="text-xs text-red-400 mt-1">
                  Veuillez patienter {retryAfter} secondes avant de réessayer.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Success message */}
        {isSuccess && (
          <div
            className="p-4 rounded-xl border border-green-500/30 bg-green-500/10 flex items-center gap-3"
            role="alert"
          >
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            <p className="text-sm font-medium text-green-500">
              Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              disabled={isSubmitting}
              className="peer w-full rounded-xl border border-foreground/20 bg-background/50 pl-12 pr-4 py-4 text-foreground placeholder-transparent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-background transition-all duration-300 hover:border-foreground/30 disabled:opacity-50 disabled:cursor-not-allowed"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            <label htmlFor="name" className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-foreground/70 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent bg-background px-1 rounded">
              Nom *
            </label>
            {errors.name && (
              <div id="name-error" className="mt-2 flex items-center gap-2 text-sm text-red-500" role="alert">
                <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" /> {errors.name}
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
              aria-describedby={errors.email ? "email-error" : undefined}
              disabled={isSubmitting}
              className="peer w-full rounded-xl border border-foreground/20 bg-background/50 pl-12 pr-4 py-4 text-foreground placeholder-transparent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-background transition-all duration-300 hover:border-foreground/30 disabled:opacity-50 disabled:cursor-not-allowed"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <label htmlFor="email" className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-foreground/70 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent bg-background px-1 rounded">
              Email *
            </label>
            {errors.email && (
              <div id="email-error" className="mt-2 flex items-center gap-2 text-sm text-red-500" role="alert">
                <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" /> {errors.email}
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
            onChange={(e) => handleInputChange("subject", e.target.value)}
            aria-label="Sujet du message"
            disabled={isSubmitting}
            className="peer w-full appearance-none rounded-xl border border-foreground/20 bg-background/50 pl-12 pr-10 py-4 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-background transition-all duration-300 hover:border-foreground/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Sélectionnez un sujet</option>
            <option value="nouveau-projet">Nouveau projet web</option>
            <option value="infrastructure">Infrastructure cloud</option>
            <option value="consultation">Consultation technique</option>
            <option value="formation">Formation équipe</option>
            <option value="maintenance">Maintenance/Support</option>
            <option value="autre">Autre</option>
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
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            disabled={isSubmitting}
            className="peer w-full rounded-xl border border-foreground/20 bg-background/50 pl-12 pr-4 py-4 text-foreground placeholder-transparent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-background transition-all duration-300 hover:border-foreground/30 resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
          />
          <label htmlFor="message" className="pointer-events-none absolute left-12 top-4 text-foreground/70 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent bg-background px-1 rounded">
            Message *
          </label>
          <div className="flex justify-between items-center mt-1">
            {errors.message ? (
              <div id="message-error" className="flex items-center gap-2 text-sm text-red-500" role="alert">
                <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" /> {errors.message}
              </div>
            ) : (
              <span />
            )}
            <span className="text-xs text-muted-foreground">
              {formData.message.length}/5000
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-accent text-white px-8 py-4 font-semibold text-lg transition-all duration-300 hover:bg-accent/90 hover:shadow-[0_20px_40px_-10px] hover:shadow-accent/30 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isSuccess ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            )}
            {isSubmitting ? "Envoi en cours..." : isSuccess ? "Message envoyé !" : "Envoyer le message"}
          </button>
          
          {isError && (
            <button
              type="button"
              onClick={() => setSubmitStatus('idle')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Réessayer
            </button>
          )}
        </div>
      </form>
    </>
  );
}
