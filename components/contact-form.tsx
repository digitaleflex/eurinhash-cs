"use client"

import { useState, useRef } from "react";
import { Send, AlertCircle, Loader2, CheckCircle } from "lucide-react";

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
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormDataShape>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrorsShape>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Le nom est requis";
        if (value.trim().length < 2) return "Le nom doit contenir au moins 2 caractères";
        break;
      case "email":
        if (!value.trim()) return "L'email est requis";
        // simplified email regex
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format d'email invalide";
        break;
      case "message":
        if (!value.trim()) return "Le message est requis";
        if (value.trim().length < 10) return "Le message doit contenir au moins 10 caractères";
        break;
    }
    return undefined;
  };

  const handleInputChange = (name: keyof FormDataShape, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrorsShape = {};
    (Object.keys(formData) as (keyof FormDataShape)[]).forEach((key) => {
      if (key !== "subject") {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as any)?.error || "Erreur serveur");
      }
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      if (formRef.current) {
        formRef.current.classList.add("animate-pulse");
        setTimeout(() => {
          formRef.current?.classList.remove("animate-pulse");
        }, 1000);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
            aria-required="true"
            aria-invalid={!!errors.name}
            className="peer w-full rounded-xl border border-foreground/20 bg-background/50 pl-12 pr-4 py-4 text-foreground placeholder-transparent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-background transition-all duration-300 hover:border-foreground/30"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <label htmlFor="name" className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-foreground/70 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent bg-background px-1 rounded">
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
            className="peer w-full rounded-xl border border-foreground/20 bg-background/50 pl-12 pr-4 py-4 text-foreground placeholder-transparent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-background transition-all duration-300 hover:border-foreground/30"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          <label htmlFor="email" className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-foreground/70 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent bg-background px-1 rounded">
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
          defaultValue={formData.subject}
          onChange={(e) => handleInputChange("subject", e.target.value)}
          aria-label="Sujet"
          className="peer w-full appearance-none rounded-xl border border-foreground/20 bg-background/50 pl-12 pr-10 py-4 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-background transition-all duration-300 hover:border-foreground/30"
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
          aria-required={true}
          aria-invalid={!!errors.message}
          className="peer w-full rounded-xl border border-foreground/20 bg-background/50 pl-12 pr-4 py-4 text-foreground placeholder-transparent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-background transition-all duration-300 hover:border-foreground/30 resize-vertical"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
        />
        <label htmlFor="message" className="pointer-events-none absolute left-12 top-4 text-foreground/70 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent bg-background px-1 rounded">
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
        className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-accent text-white px-8 py-4 font-semibold text-lg transition-all duration-300 hover:bg-accent/90 hover:shadow-[0_20px_40px_-10px] hover:shadow-accent/30 hover:scale-105 active:scale-95 disabled:opacity-70"
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        )}
        {isSubmitting ? "Envoi..." : isSubmitted ? "Envoyé !" : "Envoyer le message"}
      </button>
    </form>
  );
}
