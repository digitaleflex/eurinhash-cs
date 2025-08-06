"use client";

import { useState } from "react";
import { FaEnvelope, FaRocket } from "react-icons/fa";
import { NewsletterType, SubscriptionSource } from "@prisma/client";

interface QuickNewsletterSignupProps {
  source: SubscriptionSource;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export default function QuickNewsletterSignup({
  source,
  placeholder = "Votre email pour l'accès anticipé",
  buttonText = "Accès gratuit",
  className = "",
}: QuickNewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newsletters: [NewsletterType.EARLY_ACCESS, NewsletterType.GENERAL],
          source,
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          gdprConsent: true, // Consentement implicite pour l'inscription rapide
          marketingConsent: true,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({
          type: "success",
          text: "Inscription réussie ! Vérifiez votre email.",
        });
        setEmail("");
      } else {
        setMessage({ type: "error", text: result.error });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-3 bg-[#0A0F2C]/50 border border-[#007CF0]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#007CF0] focus:ring-2 focus:ring-[#007CF0]/20 transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-[#00C48C] to-[#007CF0] hover:from-[#00C48C]/80 hover:to-[#007CF0]/80 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span className="hidden sm:inline">Inscription...</span>
              </>
            ) : (
              <>
                <FaRocket className="text-sm" />
                <span>{buttonText}</span>
              </>
            )}
          </button>
        </div>

        {message && (
          <div
            className={`p-3 rounded-xl text-sm ${
              message.type === "success"
                ? "bg-[#00C48C]/10 border border-[#00C48C]/30 text-[#00C48C]"
                : "bg-red-500/10 border border-red-500/30 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <p className="text-xs text-gray-400">
          En vous inscrivant, vous acceptez de recevoir nos newsletters et notre{" "}
          <a
            href="/pages/mentions-legales"
            className="text-[#007CF0] hover:underline"
          >
            politique de confidentialité
          </a>
          .
        </p>
      </form>
    </div>
  );
}
