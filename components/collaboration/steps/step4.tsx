'use client';

import { motion } from 'framer-motion';
import { WizardData, technologyOptions } from '@/lib/collaboration-data';

const inputClass = "w-full px-4 py-3.5 bg-foreground/[0.02] border border-foreground/10 text-sm font-normal focus:border-accent outline-none transition-colors";
const labelClass = "text-xs font-medium text-foreground/50 tracking-tight";

interface Step4Props {
    data: WizardData;
    updateData: (field: keyof WizardData, value: string | string[]) => void;
    toggleTechnology: (tech: string) => void;
}

export function Step4({ data, updateData, toggleTechnology }: Step4Props) {
    return (
        <motion.div key="step4" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-10">
            <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Contraintes techniques</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">Aidez-nous à comprendre votre environnement et vos exigences.</p>
            </div>

            <div className="grid gap-6">
                {/* Sensibilité des données */}
                <div className="space-y-2">
                    <label className={labelClass}>Sensibilité des données (RGPD / Confidentialité)</label>
                    <select
                        value={data.dataSensitivity}
                        onChange={e => updateData('dataSensitivity', e.target.value)}
                        className={`${inputClass} appearance-none cursor-pointer`}
                    >
                        <option value="">Sélectionner un niveau</option>
                        <option value="standard">Standard — Données publiques ou internes</option>
                        <option value="sensitive">Sensible — Données utilisateurs ou métier</option>
                        <option value="critical">Critique — Données souveraines ou légalement réglementées</option>
                    </select>
                </div>

                {/* Exigences réglementaires */}
                <div className="space-y-2">
                    <label className={labelClass}>Exigences réglementaires ou contraintes spécifiques</label>
                    <textarea
                        value={data.regulatoryRequirements}
                        onChange={e => updateData('regulatoryRequirements', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3.5 bg-foreground/[0.02] border border-foreground/10 text-sm font-normal focus:border-accent outline-none resize-none transition-colors leading-relaxed"
                        placeholder="ISO 27001, localisation des serveurs, audits de conformité..."
                    />
                </div>

                {/* Stack technologique */}
                <div className="space-y-4">
                    <label className={labelClass}>Technologies concernées (sélection multiple)</label>
                    <div className="grid grid-cols-2 gap-2">
                        {technologyOptions.map(tech => (
                            <button
                                key={tech}
                                onClick={() => toggleTechnology(tech)}
                                className={`px-4 py-3 border transition-all text-left text-sm font-medium ${data.technologies.includes(tech) ? 'bg-foreground text-background border-foreground' : 'border-foreground/10 hover:border-foreground/30 text-foreground'}`}
                            >
                                {tech}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
