import Link from 'next/link';
import { Home, Search, Mail } from 'lucide-react';
import { BackButton } from '@/components/back-button';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(59,130,246,0.08),transparent_70%)]" />
      </div>

      <div className="text-center px-6 md:px-8 max-w-2xl mx-auto">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-accent/20 mb-4 animate-pulse">
            404
          </div>
          <div className="h-1 w-24 bg-accent mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Titre et description */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Page introuvable
        </h1>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Oups ! La page que vous recherchez semble avoir disparu dans le cloud.
          Elle a peut-être été déplacée, supprimée ou l&apos;URL est incorrecte.
        </p>

        {/* Suggestions */}
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <div className="p-4 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-sm">
            <Search className="h-6 w-6 text-accent mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Vérifiez l&apos;URL</h3>
            <p className="text-sm text-muted-foreground">
              Assurez-vous que l&apos;adresse est correcte
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-sm">
            <Mail className="h-6 w-6 text-accent mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Contactez-moi</h3>
            <p className="text-sm text-muted-foreground">
              Si le problème persiste, n&apos;hésitez pas
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-accent text-white px-6 py-3 font-medium transition-all duration-300 hover:bg-accent/90 hover:shadow-[0_10px_40px_-10px] hover:shadow-accent/30 hover:scale-105"
          >
            <Home className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>

          <BackButton />
        </div>

        {/* Navigation rapide */}
        <div className="mt-12 pt-8 border-t border-foreground/10">
          <p className="text-sm text-muted-foreground mb-4">
            Ou explorez directement :
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              {
                href: '/start-project',
                label: 'Démarrer un projet',
                isPrimary: true,
              },
              { href: '/about', label: 'À propos' },
              { href: '/projects', label: 'Projets' },
              { href: '/skills', label: 'Compétences' },
              { href: '/contact', label: 'Contact' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  link.isPrimary
                    ? 'border-accent bg-accent text-white hover:bg-accent/90'
                    : 'border-foreground/20 text-muted-foreground hover:border-accent hover:text-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
