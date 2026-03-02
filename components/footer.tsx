import Link from 'next/link';
import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="bg-background border-t border-foreground/5 py-12 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-4 items-start">
          <div className="space-y-6 md:col-span-2">
            <Logo size="md" />
            <p className="text-base text-muted-foreground max-w-sm leading-relaxed">
              Ingénierie systémique et architectures numériques souveraines.
              Une infrastructure pensée pour la résilience et le contrôle.
            </p>
            <div className="pt-4">
              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-widest hover:text-accent/80 transition-colors"
              >
                Planifier une collaboration →
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 opacity-40">Structure</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/vision" className="hover:text-accent transition-colors">La Doctrine</Link></li>
              <li><Link href="/projects" className="hover:text-accent transition-colors">Écosystème</Link></li>
              <li><Link href="/skills" className="hover:text-accent transition-colors">Principes Techniques</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">L'Institution</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 opacity-40">Contact</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="mailto:contact@eurinhash.com" className="hover:text-accent transition-colors">contact@eurinhash.com</a></li>
              <li><a href="https://linkedin.com/in/eurinalmeida" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/digitaleflex" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-8 text-[11px] font-mono uppercase tracking-widest opacity-40">
          <div>© 2024-2026 Eurinhash CS Architecture Foundation.</div>
          <div className="flex items-center gap-8">
            <Link href="/legal/mentions-legales" className="hover:text-foreground">Légal</Link>
            <Link href="/legal/politique-confidentialite" className="hover:text-foreground">Confidentialité</Link>
            <Link href="/legal/cgv" className="hover:text-foreground">Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
