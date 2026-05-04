'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { ContactSchema, type ContactFormData } from '@/lib/validation';

export function useContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Pre-fill subject from URL search params
  useEffect(() => {
    if (!searchParams) return;
    const subjectParam = searchParams.get('subject');
    if (subjectParam) {
      setFormData(prev => ({ ...prev, subject: subjectParam }));
    }
  }, [searchParams]);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (name: keyof ContactFormData, value: string) => {
    setFormData((prev: ContactFormData) => ({ ...prev, [name]: value }));

    // Validation en temps réel (optionnelle, mais ici on nettoie l'erreur si elle existe)
    if (errors[name]) {
      setErrors((prev: Record<string, string>) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validation avec Zod
      const result = ContactSchema.safeParse(formData);
      
      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.issues.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);

        // Focus sur le premier champ en erreur
        const firstErrorField = result.error.issues[0]?.path[0];
        if (firstErrorField) {
          document.getElementById(firstErrorField as string)?.focus();
        }
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Échec de l'envoi du message.");
      }

      // Succès
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFeedbackType('success');
      setFeedbackMessage('Message transmis avec succès au protocole EHAF.');
      setShowFeedback(true);

      // Animation subtile
      formRef.current?.classList.add('animate-pulse');
      setTimeout(() => formRef.current?.classList.remove('animate-pulse'), 1000);

    } catch (error) {
      console.error('Contact Form Error:', error);
      setFeedbackType('error');
      setFeedbackMessage(error instanceof Error ? error.message : "Une erreur système est survenue.");
      setShowFeedback(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}
