import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-foreground/5 bg-background py-12 pb-28 lg:py-20 lg:pb-20">
      <div className="mx-auto w-full max-w-[1400px] px-8 lg:px-12">
        <div className="grid items-start gap-12 md:grid-cols-4">
          <div className="space-y-6 md:col-span-2">
            <Logo size="md" />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Je conçois des logiciels et des infrastructures numériques. J’aide à clarifier les problèmes, à choisir une approche adaptée et à construire des solutions fiables.
            </p>
            <Link href="/contact" className="group inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent/80">
              Parlons de votre besoin <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-foreground/60">Navigation</h2>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/" className="transition-colors hover:text-accent">Accueil</Link></li>
              <li><Link href="/a-propos" className="transition-colors hover:text-accent">À propos</Link></li>
              <li><Link href="/services" className="transition-colors hover:text-accent">Services</Link></li>
              <li><Link href="/realisations" className="transition-colors hover:text-accent">Projets</Link></li>
              <li><Link href="/blog" className="transition-colors hover:text-accent">Articles</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-accent">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-foreground/60">Me contacter</h2>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="mailto:contact@eurinhash.com" className="transition-colors hover:text-accent">contact@eurinhash.com</a></li>
              <li><a href="https://www.linkedin.com/in/eurindalemeida/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">LinkedIn</a></li>
              <li><a href="https://github.com/digitaleflex" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-foreground/5 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">Site personnel d’Eurin Hash</p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground">
            <Link href="/legal/mentions-legales" className="transition-colors hover:text-foreground">Mentions légales</Link>
            <Link href="/legal/politique-confidentialite" className="transition-colors hover:text-foreground">Confidentialité</Link>
            <span>© 2024–2026 Eurin Hash</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
