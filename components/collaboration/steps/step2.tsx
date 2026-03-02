'use client';

import { motion } from 'framer-motion';
import { WizardData, initiativeTypes } from '@/lib/collaboration-data';

const inputClass = "w-full px-4 py-3.5 bg-foreground/[0.02] border border-foreground/10 text-sm font-normal focus:border-accent outline-none transition-colors";
const labelClass = "text-xs font-medium text-foreground/50 tracking-tight";

interface Step2Props {
    data: WizardData;
    updateData: (field: keyof WizardData, value: string | string[]) => void;
}

export function Step2({ data, updateData }: Step2Props) {
    return (
        <motion.div key="step2" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-10">
            <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Votre projet</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">Quel type de projet souhaitez-vous mettre en place ?</p>
            </div>

            {/* Types d'initiative */}
            <div className="grid gap-3 md:grid-cols-2">
                {initiativeTypes.map(type => (
                    <button
                        key={type.value}
                        onClick={() => updateData('initiativeType', type.value)}
                        className={`px-5 py-4 border-2 transition-all text-left flex items-center gap-4 group ${data.initiativeType === type.value ? 'border-accent bg-accent/[0.02]' : 'border-foreground/5 hover:border-foreground/20'}`}
                    >
                        <type.icon className={`w-5 h-5 shrink-0 ${data.initiativeType === type.value ? 'text-accent' : 'text-foreground/25'}`} />
                        <span className={`text-sm font-medium ${data.initiativeType === type.value ? 'text-accent' : 'text-foreground'}`}>{type.label}</span>
                    </button>
                ))}
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className={labelClass}>Nom du projet *</label>
                    <input type="text" value={data.initiativeName} onChange={e => updateData('initiativeName', e.target.value)} className={inputClass} placeholder="Ex : Refonte infrastructure cloud" />
                </div>
                <div className="space-y-2">
                    <label className={labelClass}>Vision & objectifs *</label>
                    <textarea
                        value={data.vision}
                        onChange={e => updateData('vision', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3.5 bg-foreground/[0.02] border border-foreground/10 text-sm font-normal focus:border-accent outline-none resize-none transition-colors leading-relaxed"
                        placeholder="Décrivez ce que vous souhaitez construire et pourquoi c'est important maintenant."
                    />
                </div>
            </div>
        </motion.div>
    );
}
