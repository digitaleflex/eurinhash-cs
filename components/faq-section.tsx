'use client'

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  items: FAQItem[];
  className?: string;
  variant?: 'default' | 'compact' | 'expanded';
}

export function FAQSection({ 
  title = "Questions fréquentes", 
  items, 
  className = "",
  variant = 'default'
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const isExpanded = (id: string) => openItems.has(id);

  if (variant === 'compact') {
    return (
      <div className={`space-y-4 ${className}`}>
        {title && (
          <h3 className="text-xl font-semibold mb-4">{title}</h3>
        )}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="border-b border-foreground/10 pb-3">
              <button
                onClick={() => toggleItem(item.id)}
                className="flex items-center justify-between w-full text-left group"
              >
                <span className="font-medium group-hover:text-accent transition-colors">
                  {item.question}
                </span>
                {isExpanded(item.id) ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              {isExpanded(item.id) && (
                <div className="mt-2 text-sm text-muted-foreground animate-in slide-in-from-top-2 duration-200">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'expanded') {
    return (
      <div className={`space-y-6 ${className}`}>
        {title && (
          <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        )}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border border-foreground/10 rounded-xl p-6 bg-background/50">
              <button
                onClick={() => toggleItem(item.id)}
                className="flex items-center justify-between w-full text-left group"
              >
                <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                  {item.question}
                </h3>
                {isExpanded(item.id) ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              {isExpanded(item.id) && (
                <div className="mt-4 text-muted-foreground animate-in slide-in-from-top-2 duration-200">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Variant par défaut (grid)
  return (
    <section className={`py-20 bg-muted/50 ${className}`}>
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item.id} className="p-6 rounded-2xl bg-background border border-foreground/10 hover:shadow-lg transition-all duration-300">
              <button
                onClick={() => toggleItem(item.id)}
                className="flex items-start justify-between w-full text-left group"
              >
                <h3 className="font-semibold mb-3 group-hover:text-accent transition-colors">
                  {item.question}
                </h3>
                {isExpanded(item.id) ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-2" />
                )}
              </button>
              {isExpanded(item.id) && (
                <div className="text-sm text-muted-foreground animate-in slide-in-from-top-2 duration-200">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Données FAQ par défaut pour le contact
export const contactFAQData: FAQItem[] = [
  {
    id: 'process',
    question: 'Quel est votre processus de travail ?',
    answer: 'Consultation gratuite → Devis détaillé → Développement agile → Livraison et formation → Support continu.'
  },
  {
    id: 'pricing',
    question: 'Quels sont vos tarifs ?',
    answer: 'Tarifs adaptés à chaque projet. Devis gratuit et transparent après analyse de vos besoins.'
  },
  {
    id: 'remote',
    question: 'Travaillez-vous à distance ?',
    answer: 'Oui, je travaille principalement à distance avec des outils collaboratifs modernes. Rencontres possibles si nécessaire.'
  },
  {
    id: 'maintenance',
    question: 'Proposez-vous de la maintenance ?',
    answer: 'Absolument ! Support technique, mises à jour de sécurité et évolutions fonctionnelles inclus dans mes services.'
  },
  {
    id: 'location',
    question: 'Où êtes-vous basé ?',
    answer: 'Je suis basé à Abomey-Calavi au Bénin. Je travaille avec des clients locaux et internationaux via WhatsApp et visioconférence.'
  },
  {
    id: 'contact-method',
    question: 'Comment me contacter rapidement ?',
    answer: 'WhatsApp est le moyen le plus rapide ! Envoyez-moi un message au +229 01 62 26 52 46 pour une réponse immédiate.'
  }
];
