'use client';

import { ArrowRight, MessageCircle, Video, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function Community() {
  return (
    <section className="py-24 sm:py-40 bg-background border-b border-foreground/5 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 items-start">
            
            <div className="space-y-8 sticky top-40">
                <span className="font-mono text-xs text-accent tracking-widest uppercase block font-medium">Impact Humain</span>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-tight text-foreground">
                    Formation &<br />
                    <span className="text-foreground/25 font-light italic">Influence Tech.</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Au-delà de l'architecture, je bâtis la prochaine génération de leaders techniques. 
                    Un programme rigoureux pour transformer la motivation en expertise réelle.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-foreground/5">
                    {[
                        { label: 'Programmation', desc: 'Savoir coder propre' },
                        { label: 'Cybersécurité', desc: 'Savoir protéger' },
                        { label: 'Cloud Computing', desc: 'Savoir déployer' }
                    ].map((theme, i) => (
                        <div key={i} className="space-y-1">
                            <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest">{theme.label}</span>
                            <p className="text-[11px] text-muted-foreground leading-tight">{theme.desc}</p>
                        </div>
                    ))}
                </div>
                
                <div className="flex flex-col gap-6 pt-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent/10 flex items-center justify-center text-accent">
                            <Video className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="block font-black text-xl tracking-tighter">+9000</span>
                            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Abonnés TikTok</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent/10 flex items-center justify-center text-accent">
                            <MessageCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="block font-black text-xl tracking-tighter">+200</span>
                            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Membres Actifs WhatsApp</span>
                        </div>
                    </div>
                </div>

                <Link 
                  href="/services/mentorat" 
                  className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-sm font-bold tracking-tight hover:bg-accent hover:text-white transition-all group"
                >
                    Rejoindre le programme de mentorat
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Visual Grid representing Community/Content */}
            <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`relative aspect-[9/16] bg-foreground/[0.03] border border-foreground/5 overflow-hidden group ${i % 2 === 0 ? 'mt-12' : ''}`}>
                        <div className="absolute inset-0 flex items-center justify-center text-foreground/5 font-mono text-8xl font-black select-none group-hover:text-accent/10 transition-colors">
                            0{i}
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                            <span className="text-[8px] font-mono text-accent uppercase tracking-widest">Session #0{i}</span>
                            <h3 className="text-xs font-bold leading-tight">Masterclass Architecture Cloud & VPS</h3>
                        </div>
                        <Smartphone className="absolute top-6 right-6 w-4 h-4 text-foreground/10" />
                    </div>
                ))}
            </div>

        </div>

      </div>
    </section>
  );
}
