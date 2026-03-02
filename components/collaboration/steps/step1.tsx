'use client';

import { motion } from 'framer-motion';
import { WizardData } from '@/lib/collaboration-data';
import { countries, defaultCountry, formatPhoneNumber } from '@/lib/countries';
import { ChevronDown } from 'lucide-react';

const inputClass = "w-full px-4 py-3.5 bg-foreground/[0.02] border border-foreground/10 text-sm font-normal focus:border-accent outline-none transition-colors";
const labelClass = "text-xs font-medium text-foreground/50 tracking-tight";

interface Step1Props {
    data: WizardData;
    updateData: (field: keyof WizardData, value: string | string[]) => void;
    phoneError: string;
    isCountryDropdownOpen: boolean;
    setIsCountryDropdownOpen: (open: boolean) => void;
}

export function Step1({ data, updateData, phoneError, isCountryDropdownOpen, setIsCountryDropdownOpen }: Step1Props) {
    const handlePhoneChange = (value: string) => {
        const formatted = formatPhoneNumber(value, data.country);
        updateData('phone', formatted);
    };

    return (
        <motion.div key="step1" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-10">
            <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Votre contexte</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">Dites-nous qui vous êtes et dans quel cadre vous travaillez.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className={labelClass}>Organisation *</label>
                    <input type="text" value={data.organization} onChange={e => updateData('organization', e.target.value)} className={inputClass} placeholder="Nom de votre structure" />
                </div>
                <div className="space-y-2">
                    <label className={labelClass}>Votre rôle *</label>
                    <input type="text" value={data.role} onChange={e => updateData('role', e.target.value)} className={inputClass} placeholder="Direction, Architecture, Lead Tech..." />
                </div>
                <div className="space-y-2">
                    <label className={labelClass}>Email de contact *</label>
                    <input type="email" value={data.email} onChange={e => updateData('email', e.target.value)} className={`${inputClass} font-mono`} placeholder="vous@domaine.com" />
                </div>
                <div className="space-y-2">
                    <label className={labelClass}>Téléphone (optionnel)</label>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                            className="flex items-center gap-2 px-3 border border-foreground/10 bg-foreground/[0.02] hover:border-accent transition-all min-w-[90px]"
                        >
                            <span className="font-mono text-xs">{countries.find(c => c.code === data.country)?.phoneCode || defaultCountry.phoneCode}</span>
                            <ChevronDown className="w-3 h-3 text-foreground/30" />
                        </button>
                        <input
                            type="tel"
                            value={data.phone}
                            onChange={e => handlePhoneChange(e.target.value)}
                            className={`flex-1 px-4 py-3.5 bg-foreground/[0.02] border font-mono text-sm outline-none transition-colors ${phoneError ? 'border-red-500' : 'border-foreground/10 focus:border-accent'}`}
                            placeholder="Numéro de contact"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
