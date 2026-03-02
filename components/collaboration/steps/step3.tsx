'use client';

import { motion } from 'framer-motion';
import { WizardData, engagementOptions, priorityLevels } from '@/lib/collaboration-data';

const inputClass = "w-full px-4 py-3.5 bg-foreground/[0.02] border border-foreground/10 text-sm font-normal focus:border-accent outline-none transition-colors";
const labelClass = "text-xs font-medium text-foreground/50 tracking-tight";

interface Step3Props {
    data: WizardData;
    updateData: (field: keyof WizardData, value: string | string[]) => void;
}

export function Step3({ data, updateData }: Step3Props) {
    return (
        <motion.div key="step3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-10">
            <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Enjeux & engagement</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">Quel niveau d'implication envisagez-vous pour ce projet ?</p>
            </div>

            <div className="space-y-10">
                {/* Niveau d'engagement */}
                <div className="space-y-4">
                    <label className="text-sm font-semibold tracking-tight">Niveau d'engagement *</label>
                    <div className="grid gap-3">
                        {engagementOptions.map(option => (
                            <button
                                key={option.value}
                                onClick={() => updateData('engagementLevel', option.value)}
                                className={`px-5 py-4 border-2 transition-all text-left text-sm font-medium ${data.engagementLevel === option.value ? 'border-accent bg-accent/[0.02] text-accent' : 'border-foreground/5 hover:border-foreground/20 text-foreground'}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Priorité */}
                <div className="space-y-4">
                    <label className="text-sm font-semibold tracking-tight">Niveau de priorité *</label>
                    <div className="grid gap-3 sm:grid-cols-3">
                        {priorityLevels.map(option => (
                            <button
                                key={option.value}
                                onClick={() => updateData('priority', option.value)}
                                className={`px-4 py-4 border-2 transition-all text-center flex flex-col items-center gap-2 ${data.priority === option.value ? 'border-accent bg-accent/[0.02] text-accent' : 'border-foreground/5 hover:border-foreground/20'}`}
                            >
                                <span className={`font-mono text-[10px] font-medium ${data.priority === option.value ? 'text-accent/70' : 'text-foreground/25'}`}>{option.value}</span>
                                <span className="text-sm font-medium leading-snug">{option.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                    <label className={labelClass}>Horizon temporel</label>
                    <input type="text" value={data.timeline} onChange={e => updateData('timeline', e.target.value)} className={inputClass} placeholder="Ex: Démarrage Q3 2026, Plan sur 12 mois..." />
                </div>
            </div>
        </motion.div>
    );
}
