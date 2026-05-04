'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowUp, Calendar } from 'lucide-react';

type TocItem = { id: string; label: string };

interface LegalPageProps {
  title: string;
  description?: string;
  toc?: TocItem[];
  lastUpdated?: string;
  children: ReactNode;
}

export function LegalPage({
  title,
  description,
  toc = [],
  lastUpdated,
  children,
}: LegalPageProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative isolate min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-accent overflow-hidden font-sans">
      {/* Dynamic Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-accent/20 to-accent/5 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12 py-16 sm:py-24 md:py-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Main Content Area */}
          <div className="flex-1 order-2 lg:order-1">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 border-b border-foreground/5 pb-12"
            >
              <nav className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
                <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground/40">Espace Légal</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-accent underline underline-offset-4 font-bold">{title}</span>
              </nav>

              <h1 className="text-3xl md:text-4xl lg:text-2xl font-semibold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground/80 leading-relaxed max-w-2xl">
                {description && <p>{description}</p>}
                {lastUpdated && (
                  <div className="flex items-center gap-2 border-l border-foreground/10 pl-6 h-5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono uppercase tracking-tighter italic font-medium">Actualisé le {lastUpdated}</span>
                  </div>
                )}
              </div>
            </motion.header>

            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-neutral dark:prose-invert max-w-none 
                prose-headings:font-semibold prose-headings:tracking-tight
                prose-h2:text-xl prose-h2:border-b prose-h2:border-foreground/5 prose-h2:pb-4 prose-h2:mt-12 prose-h2:font-bold
                prose-h3:text-lg prose-h3:mt-8 prose-h3:font-semibold
                prose-p:text-muted-foreground/90 prose-p:leading-relaxed prose-p:text-base
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground/90 prose-strong:font-semibold
                prose-li:text-muted-foreground/90"
            >
              {children}
            </motion.article>
          </div>

          {/* Right Sidebar - TOC */}
          <aside className="lg:w-72 order-1 lg:order-2">
            <div className="lg:sticky lg:top-32 space-y-8">
              {toc.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="p-8 rounded-2xl border border-foreground/5 bg-foreground/[0.015] backdrop-blur-xl relative group overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                    
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-black text-foreground/30 mb-6 flex items-center justify-between">
                        Sommaire
                        <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                    </h3>
                    
                    <nav className="space-y-4">
                        {toc.map((item, idx) => (
                        <Link
                            key={item.id}
                            href={`#${item.id}`}
                            className="text-sm text-foreground/50 hover:text-accent transition-all duration-300 group/link flex items-center gap-3"
                        >
                            <span className="font-mono text-[10px] opacity-20 group-hover/link:opacity-100 transition-opacity">{(idx + 1).toString().padStart(2, '0')}</span>
                            <span className="group-hover/link:translate-x-1 transition-transform">{item.label}</span>
                        </Link>
                        ))}
                    </nav>
                </motion.div>
              )}

              <button
                onClick={scrollToTop}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-foreground/5 bg-background hover:bg-foreground/5 transition-all group font-mono text-xs uppercase tracking-widest font-bold"
              >
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                Retour en haut
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
