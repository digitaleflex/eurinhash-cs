import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-foreground/5 py-12 lg:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-4 items-start">
          <div className="space-y-6 md:col-span-2">
            <Logo size="md" />
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Ingénierie systémique et architectures numériques souveraines.
              Une infrastructure pensée pour la résilience et le contrôle.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors group"
            >
              Parlons de votre projet
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground/40 tracking-tight mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/" className="hover:text-accent transition-colors">Accueil</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="/realisations" className="hover:text-accent transition-colors">Réalisations</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground/40 tracking-tight mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="mailto:contact@eurinhash.com" className="hover:text-accent transition-colors">contact@eurinhash.com</a></li>
              <li><a href="https://www.linkedin.com/in/eurindalemeida/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/digitaleflex" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="text-[10px] text-foreground/20 tracking-tight italic">
              Initiative architecturale indépendante
            </span>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 font-mono text-[10px] text-foreground/25">
              <Link href="/services" className="hover:text-foreground/50 transition-colors">Services</Link>
              <span className="opacity-30">—</span>
              <Link href="/realisations" className="hover:text-foreground/50 transition-colors">Réalisations</Link>
              <span className="opacity-30">—</span>
              <Link href="/blog" className="hover:text-foreground/50 transition-colors">Ressources</Link>
            </div>
          </div>
          <div className="flex items-center gap-6 font-mono text-[10px] text-foreground/25">
            <Link href="/legal/mentions-legales" className="hover:text-foreground/50 transition-colors">Légal</Link>
            <Link href="/legal/politique-confidentialite" className="hover:text-foreground/50 transition-colors">Confidentialité</Link>
            <span>© 2024–2026 Eurin Hash</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
