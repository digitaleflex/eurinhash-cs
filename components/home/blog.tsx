'use client';

import { Newspaper, ArrowRight, Tag } from 'lucide-react';
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
              <span className="text-foreground/20 font-light italic">Insights.</span>
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
              <article key={i} className="group border-b border-foreground/5 pb-12 last:border-0 last:pb-0">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest px-2 py-0.5 border border-accent/20">{post.category}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-4 group-hover:text-accent transition-colors">
                  <Link href="/blog">{post.title}</Link>
                </h3>
                <p className="text-muted-foreground text-sm max-w-xl mb-6">
                  {post.desc}
                </p>
                <Link href="/blog" className="text-xs font-bold underline underline-offset-4 decoration-accent/30 hover:decoration-accent transition-all">
                  Lire la suite
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
