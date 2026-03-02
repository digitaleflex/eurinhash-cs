'use client';

import { motion } from 'framer-motion';
import { WizardData } from '@/lib/collaboration-data';
import { Shield } from 'lucide-react';

interface Step5Props {
    data: WizardData;
}

export function Step5({ data }: Step5Props) {
    return (
        <motion.div key="step5" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-10">
            <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Récapitulatif de votre demande</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">Vérifiez les informations avant d'envoyer.</p>
            </div>

            <div className="border border-foreground/5 p-8 sm:p-10 space-y-10">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <span className="font-mono text-xs text-accent tracking-tight font-medium">Organisation</span>
                        <div className="font-bold text-base">{data.organization}</div>
                        <div className="text-sm text-muted-foreground">{data.role} · {data.email}</div>
                    </div>
                    <div className="space-y-2">
                        <span className="font-mono text-xs text-accent tracking-tight font-medium">Initiative</span>
                        <div className="font-bold text-base">{data.initiativeName}</div>
                        <div className="text-sm text-muted-foreground">{data.initiativeType}</div>
                    </div>
                </div>

                <div className="space-y-4 pt-8 border-t border-foreground/5">
                    <span className="font-mono text-xs text-accent tracking-tight font-medium">Vision & engagement</span>
                    <p className="text-sm text-foreground/80 italic leading-relaxed">"{data.vision}"</p>
                    <div className="flex gap-3 pt-2">
                        <div className="px-3 py-1.5 bg-foreground text-background text-xs font-medium tracking-tight">{data.engagementLevel}</div>
                        <div className="px-3 py-1.5 border border-foreground/10 text-xs font-medium text-muted-foreground">{data.priority}</div>
                    </div>
                </div>

                {/* Confidentialité */}
                <div className="bg-foreground text-background p-7 space-y-3">
                    <h3 className="font-bold text-sm flex items-center gap-3 text-background">
                        <Shield className="w-4 h-4 text-accent" />
                        Confidentialité garantie
                    </h3>
                    <p className="text-sm text-background/60 leading-relaxed">
                        Chaque demande est traitée de façon confidentielle. Les collaborations sont sélectionnées
                        selon leur pertinence architecturale. Réponse garantie sous 48h.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
