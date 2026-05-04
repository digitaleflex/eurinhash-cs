'use client';

import { Newspaper, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const posts = [
  {
    category: 'Souveraineté Cloud',
    title: 'Pourquoi dockeriser son infrastructure est devenu vital.',
    desc: 'Une analyse complète sur la modularité et la survie des systèmes modernes.',
    date: '15 Mars 2026'
  },
  {
    category: 'Cybersécurité',
    title: '5 failles critiques découvertes lors d\'un audit d\'intrusion.',
    desc: 'Retour d\'expérience sur les vulnérabilités les plus communes en 2024.',
    date: '10 Mars 2026'
  }
];

export function BlogSection() {
  return (
    <section className="py-32 bg-background border-y border-foreground/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-20">
          <header className="lg:w-1/3 space-y-8">
            <div className="inline-flex items-center gap-3 text-accent border-b border-accent/20 pb-2">
              <Newspaper className="w-5 h-5" />
              <span className="font-mono text-xs font-bold tracking-widest uppercase">Expertise & Veille</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-[0.9]">
              Blog &<br />
              <span className="text-foreground/20 font-light italic">Analyses.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Analyses techniques approfondies et points de veille pour les décideurs et ingénieurs.
            </p>
            <Link href="/blog" className="inline-flex items-center gap-3 font-bold text-sm group">
              Toute la veille <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </header>

          <div className="lg:w-2/3 grid gap-12">
            {posts.map((post, i) => (
              <article key={i} className="group border-b border-foreground/5 pb-12 last:border-0 last:pb-0 relative">
                <div className="flex items-center gap-6 mb-6">
                  <div className="font-mono text-[9px] text-foreground/20 tracking-tighter">
                    Réf. : 00{i+1}
                  </div>
                  <div className="h-px w-8 bg-foreground/10" />
                  <span className="text-[10px] font-mono font-black text-accent uppercase tracking-[0.2em]">{post.category}</span>
                  <span className="text-[10px] font-mono text-muted-foreground/40 italic ml-auto">{post.date}</span>
                </div>
                
                <h3 className="text-2xl sm:text-4xl font-black tracking-tighter mb-4 group-hover:text-accent transition-colors leading-[1.1]">
                  <Link href="/blog">{post.title}</Link>
                </h3>
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
                  <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
                    {post.desc}
                  </p>
                  <Link 
                    href="/blog" 
                    className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-widest border border-foreground/10 px-4 py-2 hover:bg-accent hover:text-white hover:border-accent transition-all flex items-center gap-2 group/btn"
                  >
                    Ouvrir_Dossier 
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Decorative architectural detail */}
                <div className="absolute right-0 top-0 w-px h-0 bg-accent group-hover:h-full transition-all duration-700 opacity-20" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
