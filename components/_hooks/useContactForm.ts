'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { ContactSchema, type ContactFormData } from '@/lib/validation';

const WHATSAPP_NUMBER = '2290162265246';

export function useContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
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
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = ContactSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err: z.ZodIssue) => {
        if (err.path[0]) newErrors[err.path[0] as string] = err.message;
      });
      setErrors(newErrors);

      const firstErrorField = result.error.issues[0]?.path[0];
      if (firstErrorField) document.getElementById(firstErrorField as string)?.focus();
      return;
    }

    const { name, email, subject, message } = result.data;
    const whatsappMessage = [
      'Bonjour Eurin, je vous contacte depuis votre portfolio.',
      '',
      `Nom : ${name.trim()}`,
      `Email : ${email.trim()}`,
      `Sujet : ${subject?.trim() || 'Non précisé'}`,
      '',
      'Message :',
      message.trim(),
    ].join('\n');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp directly from the user's submit action; no server or database is involved.
    const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!whatsappWindow) {
      window.location.assign(whatsappUrl);
      return;
    }

    setIsSubmitted(true);
    setFeedbackType('success');
    setFeedbackMessage('WhatsApp s’est ouvert avec votre message prérempli. Relisez-le, puis appuyez sur Envoyer dans WhatsApp.');
    setShowFeedback(true);
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
