'use client';

import { motion } from 'framer-motion';
import { WizardData } from '@/lib/collaboration-data';
import { usePhoneInput } from '../_hooks/usePhoneInput';
import { ChevronDown, AlertCircle, Search, X } from 'lucide-react';
import { Country, countries } from '@/lib/countries';

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
    const {
        selectedCountry,
        handlePhoneChange,
        handleCountryChange,
        countrySearchQuery,
        setCountrySearchQuery,
        filteredCountries,
    } = usePhoneInput(data.country);

    // Sync avec le parent
    const syncPhone = (value: string) => {
        handlePhoneChange(value);
        updateData('phone', value);
    };

    const syncCountry = (code: string) => {
        handleCountryChange(code);
        updateData('country', code);
    };

    return (
        <motion.div 
            key="step1" 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.98 }} 
            className="space-y-10"
        >
            <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Votre contexte</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">Dites-nous qui vous êtes et dans quel cadre vous travaillez.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className={labelClass}>Organisation *</label>
                    <input 
                        type="text" 
                        value={data.organization} 
                        onChange={e => updateData('organization', e.target.value)} 
                        className={inputClass} 
                        placeholder="Nom de votre structure" 
                    />
                </div>
                <div className="space-y-2">
                    <label className={labelClass}>Votre rôle *</label>
                    <input 
                        type="text" 
                        value={data.role} 
                        onChange={e => updateData('role', e.target.value)} 
                        className={inputClass} 
                        placeholder="Direction, Architecture, Lead Tech..." 
                    />
                </div>
                <div className="space-y-2">
                    <label className={labelClass}>Email de contact *</label>
                    <input 
                        type="email" 
                        value={data.email} 
                        onChange={e => updateData('email', e.target.value)} 
                        className={`${inputClass} font-mono`} 
                        placeholder="vous@domaine.com" 
                    />
                </div>
                <div className="space-y-2">
                    <label className={labelClass}>
                        Téléphone (optionnel)
                        {selectedCountry.exampleNumber && (
                            <span className="ml-2 text-[10px] text-muted-foreground font-normal">
                                (ex: {selectedCountry.exampleNumber})
                            </span>
                        )}
                    </label>
                    <div className="flex gap-2 items-stretch">
                        <div className="relative shrink-0">
                            <button
                                type="button"
                                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                className="flex items-center gap-2 px-4 h-[46px] border border-foreground/10 bg-foreground/[0.02] hover:border-accent transition-all rounded-lg"
                            >
                                <span className="font-mono text-sm font-medium">{selectedCountry.phoneCode}</span>
                                <ChevronDown className={`w-4 h-4 text-foreground/50 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isCountryDropdownOpen && (
                                <>
                                    <div 
                                        className="fixed inset-0 z-40" 
                                        onClick={() => setIsCountryDropdownOpen(false)}
                                    />
                                    <div className="absolute top-full left-0 z-50 mt-2 w-[340px] bg-popover border border-foreground/10 rounded-xl shadow-2xl max-h-[400px] flex flex-col overflow-hidden">
                                        {/* Barre de recherche */}
                                        <div className="p-3 border-b border-foreground/10 bg-popover">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                    type="text"
                                                    value={countrySearchQuery}
                                                    onChange={e => setCountrySearchQuery(e.target.value)}
                                                    placeholder="Rechercher un pays..."
                                                    className="w-full pl-10 pr-8 py-2.5 text-sm border border-foreground/10 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-background outline-none"
                                                    autoFocus
                                                />
                                                {countrySearchQuery && (
                                                    <button
                                                        onClick={() => setCountrySearchQuery('')}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Liste des pays */}
                                        <div className="overflow-y-auto flex-1 max-h-[320px]">
                                            {filteredCountries.length === 0 ? (
                                                <div className="p-6 text-center text-sm text-muted-foreground">
                                                    Aucun pays trouvé
                                                </div>
                                            ) : (
                                                filteredCountries.map((country: Country) => (
                                                    <button
                                                        key={country.code}
                                                        type="button"
                                                        onClick={() => syncCountry(country.code)}
                                                        className={`w-full px-4 py-3 text-left hover:bg-foreground/5 transition-colors border-b border-foreground/10 last:border-b-0 flex items-center justify-between gap-3 ${
                                                            data.country === country.code ? 'bg-accent/10' : ''
                                                        }`}
                                                    >
                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-medium text-sm truncate">
                                                                {country.name}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {country.continent}
                                                            </div>
                                                        </div>
                                                        <span className="text-sm font-mono font-semibold text-foreground/70 shrink-0">
                                                            {country.phoneCode}
                                                        </span>
                                                    </button>
                                                ))
                                            )}
                                        </div>

                                        {/* Footer avec nombre de résultats */}
                                        <div className="p-2.5 border-t border-foreground/10 bg-muted/30 text-xs text-center text-muted-foreground">
                                            {filteredCountries.length} pays
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex-1 relative">
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={e => syncPhone(e.target.value)}
                                className={`w-full px-4 h-[46px] bg-foreground/[0.02] border font-mono text-sm rounded-lg outline-none transition-colors ${
                                    phoneError ? 'border-red-500' : 'border-foreground/10 focus:border-accent'
                                }`}
                                placeholder={selectedCountry.exampleNumber || 'Numéro de téléphone'}
                            />
                            {phoneError && (
                                <div className="absolute -bottom-5 left-0 flex items-center gap-1 text-red-500 text-[10px]">
                                    <AlertCircle className="w-3 h-3" />
                                    {phoneError}
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground -mt-1">
                        💡 Sélectionnez votre indicatif, puis entrez votre numéro
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
