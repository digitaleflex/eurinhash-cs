import Link from 'next/link';
import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground max-w-xs">
              Solutions cloud & web, sécurité et performance au service de votre
              croissance.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-foreground transition-colors"
                >
                  Projets
                </Link>
              </li>
              <li>
                <Link
                  href="/skills"
                  className="hover:text-foreground transition-colors"
                >
                  Compétences
                </Link>
              </li>
              <li>
                <Link
                  href="/vision"
                  className="hover:text-foreground transition-colors"
                >
                  Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mt-4">
              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                Démarrer un projet →
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Légal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/legal/mentions-legales"
                  className="hover:text-foreground transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/politique-confidentialite"
                  className="hover:text-foreground transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cgv"
                  className="hover:text-foreground transition-colors"
                >
                  CGV
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cookies"
                  className="hover:text-foreground transition-colors"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:contact@eurinhash.com"
                  className="hover:text-foreground transition-colors"
                >
                  contact@eurinhash.com
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/eurinalmeida"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/digitaleflex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>©2025 Eurin Hash. Tous droits réservés.</div>
          <div className="flex items-center gap-4">
            <Link
              href="/legal/mentions-legales"
              className="hover:text-foreground transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/legal/politique-confidentialite"
              className="hover:text-foreground transition-colors"
            >
              Confidentialité
            </Link>
            <Link
              href="/legal/cookies"
              className="hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
