'use client';
import { useState } from 'react';
import Section from './ui/Section';

interface FAQItem {
  question: string;
  answer: string;
  icon?: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section background="dark">
      <h2 className="section-title text-center mb-12">Questions fréquentes</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="bg-[#0A0F2C]/50 rounded-xl border border-[#007CF0]/20 overflow-hidden transition-all duration-300 hover:border-[#007CF0]/40"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-[#007CF0]/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                {faq.icon && <span className="text-xl">{faq.icon}</span>}
                <h3 className="text-lg font-bold text-[#007CF0]">{faq.question}</h3>
              </div>
              <span className={`text-[#007CF0] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="px-6 pb-6">
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}